<template>
  <div class="post-card">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
    <p>{{ new Date(created_date * 1000) }}</p>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    title: String,
    content: String,
    composed_by: Object,
    created_date: Number,
    likes: Number,
    showComposer: Boolean
  }
};
</script>
