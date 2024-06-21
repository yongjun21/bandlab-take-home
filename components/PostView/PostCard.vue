<template>
  <div class="post-card">
    <h2>{{ title }}</h2>
    <p class="composed">
      <span v-if="showComposer" class="composed-by">
        <img
          class="avatar"
          :src="getImageSrc(composed_by.avatar)"
          :alt="composed_by.display_name"
        />
        {{ composed_by.display_name }}
      </span>
      {{
        new Date(created_date * 1000).toLocaleDateString('en-SG', {
          dateStyle: 'medium'
        })
      }}
    </p>
    <p>{{ content }}</p>
    <img
      class="media"
      v-if="attached_media.endsWith('.jpg')"
      :src="getImageSrc('calendar.png')"
      alt="media"
    />
    <p><span class="heart">&#x2665;</span>{{ likes }}</p>
  </div>
</template>

<script>
import { getImageSrc } from '../../helpers.js';

export default {
  name: 'PostCard',
  props: {
    title: String,
    content: String,
    attached_media: String,
    composed_by: Object,
    created_date: Number,
    likes: Number,
    showComposer: Boolean
  },
  setup() {
    return { getImageSrc };
  }
};
</script>

<style>
.post-card {
  border: 1px solid #f0f0f0;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 4px;

  .composed {
    margin: -16px 0 16px;
    font-size: 12px;
    font-weight: 400;
  }

  .composed-by {
    display: inline-block;
    margin-right: 8px;
  }

  .avatar {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    border-radius: 50%;
    object-fit: cover;
    vertical-align: -2px;
  }

  .media {
    display: block;
    margin-left: 5%;
    width: 80%;
  }

  .heart {
    display: inline-block;
    color: red;
    margin-right: 6px;
    vertical-align: 2px;
  }
}
</style>
