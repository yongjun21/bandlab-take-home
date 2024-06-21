<template>
  <div class="sample-card">
    <div class="container">
      <img class="image" :src="getImageSrc(image)" :alt="name" />
      <h2>{{ name }}</h2>
      <button class="play-button" @click="toggleSample(index)">{{ current === index ? '\u23f8' : '\u25b6' }}</button>
    </div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: `${progress * 100}%` }"></div>
    </div>
  </div>
</template>

<script>
import { getImageSrc } from '../../helpers.js';

export default {
  name: 'SampleCard',
  props: {
    name: String,
    image: String,
    toggleSample: Function,
    index: Number,
    current: Number,
    progress: Number
  },
  setup () {
    return { getImageSrc }
  }
}
</script>

<style>
.sample-card {
  .progress-bar {
    width: 100%;
    height: 4px;
    background-color: #f0f0f0;
    margin-bottom: 8px;
    position: relative;
    
    .progress {
      height: 100%;
      background-color: #333;
    }
  }

  .container {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .image {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }

  .play-button {
    width: 48px;
    margin-left: auto;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
}
</style>