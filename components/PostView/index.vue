<template>
  <nav-bar></nav-bar>
  <main class="post-view">
    <loading-state v-if="loading"></loading-state>
    <div v-else class="post-container">
      <div class="post-controls">
        <label class="group">
          <input type="checkbox" v-model="groupedByUser" />
          Group by User
        </label>
        <label class="sort">
          Sort
          <select v-model="sortAlphabetically">
            <option :value="false">Chronologically</option>
            <option :value="true">Alphabetically</option>
          </select>
        </label>
      </div>
      <div v-if="groupedByUser" class="group-list">
        <div
          v-for="{ composed_by, posts: group } in grouped"
          :key="composed_by.uid"
          class="group-container"
        >
          <h2 class="group-meta">{{ composed_by.display_name }}</h2>
          <post-card
            v-for="post in group"
            :key="post.uid"
            v-bind="post"
            :show-composer="false"
          ></post-card>
        </div>
      </div>
      <div v-else class="post-list">
        <post-card
          v-for="post in grouped[0].posts"
          :key="post.uid"
          v-bind="post"
          :show-composer="true"
        ></post-card>
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue';
import usePostData from './usePostData.js';

export default {
  name: 'PostView',
  setup() {
    const { loading, posts, sortAlphabetically, groupedByUser } = usePostData();

    const grouped = computed(() => {
      if (!groupedByUser.value) return Object.freeze([{ posts: posts.value }]);
      const _grouped = [];
      let curr = { composed_by: null, posts: [] };
      posts.value.forEach(post => {
        if (curr.composed_by !== post.composed_by) {
          curr = { composed_by: post.composed_by, posts: [] };
          _grouped.push(curr);
        }
        curr.posts.push(post);
      });
      return Object.freeze(_grouped);
    });

    return {
      loading,
      grouped,
      sortAlphabetically,
      groupedByUser
    };
  }
};
</script>

<style>
.post-view {
  .group-list {
    padding-left: 32px;
    
    .group-meta {
      margin-left: -32px;
    };
  }
}
</style>
