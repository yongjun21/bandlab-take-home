<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style>
#app {
  max-width: 480px;
  margin: 0 auto;

  font-family: 'Roboto', sans-serif;
}
</style>
