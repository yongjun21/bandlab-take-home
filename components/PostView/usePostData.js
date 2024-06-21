import { ref, computed, onMounted } from 'vue';
import { fetchContent } from '../../helpers.js';

export default function usePostData() {
  const loading = ref(true);
  const posts = [];
  const users = {
    anon: {
      uid: 'anon',
      display_name: 'Anon',
      avatar: 'avatar_placeholder_0.png',
      date_joined: 0
    }
  };

  const popularity = {
    anon: 0
  };
  const popularityRanked = {};

  const sortAlphabetically = ref(false);
  const groupedByUser = ref(false);

  onMounted(async () => {
    const [postsData, usersData] = await Promise.all([
      fetchContent('/posts'),
      fetchContent('/users')
    ]);

    usersData.forEach(user => {
      users[user.uid] = user;
      popularity[user.uid] = 0;
    });

    postsData.forEach(post => {
      const key = post.composed_by in users ? post.composed_by : 'anon';
      post.composed_by = users[key];
      popularity[key] += post.likes;
      posts.push(post);
    });

    const popularitySorted = Object.entries(popularity).sort(
      (a, b) => b[1] - a[1]
    );
    let rank = 0;
    popularitySorted.forEach(([uid]) => {
      popularityRanked[uid] = ++rank;
    });

    loading.value = false;
  });

  const sortedPosts = computed(() => {
    if (loading.value) return [];
    const sorted = [...posts];
    sorted.sort((a, b) =>
      sortAlphabetically.value
        ? a.title.localeCompare(b.title)
        : b.created_date - a.created_date
    );
    if (groupedByUser.value) {
      sorted.sort((a, b) => {
        const aRank = popularityRanked[a.composed_by.uid];
        const bRank = popularityRanked[b.composed_by.uid];
        return aRank - bRank;
      });
    }
    return sorted;
  });

  return {
    loading,
    posts: sortedPosts,
    sortAlphabetically,
    groupedByUser
  };
}
