<template>
  <nav class="nav-bar">
    <router-link class="tab" to="/posts">Posts</router-link>
    <router-link class="tab" to="/samples">Samples</router-link>
  </nav>
</template>

<style>
.nav-bar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0;
  height: 60px;
  background-color: #f0f0f0;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;

  .tab {
    text-decoration: none;
    color: #333;
    font-size: 1.2rem;
    padding: 0 20px;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 80%;
  }

  .router-link-active {
    background-color: #333;
    color: #fff;
  }

  .tab:hover, .tab:focus {
    background-color: #e0e0e0;
    color: #000;
  }
}
</style>
