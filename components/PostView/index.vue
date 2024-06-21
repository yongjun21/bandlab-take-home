<template>
  <nav-bar></nav-bar>
  <main class="post-view">
    <loading-state v-if="loading"></loading-state>
    <div v-else class="post-container">
      <div class="post-controls">
        <label class="group">
          Group [ ]
          <select v-model="groupedByUser">
            <option :value="false">&#x274C;</option>
            <option :value="true">By user</option>
          </select>
        </label>
        <label class="sort">
          Sort &#x2B0D;
          <select v-model="sortAlphabetically">
            <option :value="false">Date &#x2193;</option>
            <option :value="true">ABC &#x2191;</option>
          </select>
        </label>
      </div>
      <div v-if="groupedByUser" class="group-list">
        <div
          v-for="{ composed_by, posts: group } in grouped"
          :key="composed_by.uid"
          class="group-container"
        >
          <h2 class="group-meta">
            <img
              class="avatar"
              :src="getImageSrc(composed_by.avatar)"
              :alt="composed_by.display_name"
            />
            {{ composed_by.display_name }}
          </h2>
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
import { getImageSrc } from '../../helpers';

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
      groupedByUser,
      getImageSrc
    };
  }
};
</script>

<style>
.post-view {
  .post-controls {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 24px 0;

    label {
      font-size: 120%;
    }
  }

  .group-list {
    padding-left: 16px;
  }

  .group-container {
    position: relative;
    margin: 32px 0 64px;
  }

  .group-meta {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #333;
    color: white;
    padding: 12px 20px;
    border-radius: 32px;
    margin-top: -32px;
    margin-left: -16px;

    .avatar {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 8px;
      border-radius: 50%;
    }
  }

  .loading-state {
    margin: 80px 0;
  }
}
</style>
