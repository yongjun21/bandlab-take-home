<template>
  <nav>
    <router-link to="/posts">Posts</router-link>
    <router-link to="/samples">Samples</router-link>
  </nav>
  <main>
    <h1>Posts</h1>
    <button @click="create">New post</button><span>{{ count }}</span>
  </main>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'PostView',
  setup() {
    const count = ref(0);
    const create = () => {
      count.value++;
    };

    return { count, create };
  }
};
</script>
