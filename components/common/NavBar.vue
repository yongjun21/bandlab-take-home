<template>
  <nav class="nav-bar">
    <router-link to="/posts">Posts</router-link>
    <router-link to="/samples">Samples</router-link>
  </nav>
</template>

<style>
.nav-bar {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background-color: #f0f0f0;
  position: sticky;
}
</style>
