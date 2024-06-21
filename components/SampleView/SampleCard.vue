<template>
  <div class="sample-card">
    <img :src="imageSrc" alt="name" />
    <h2>{{ name }}</h2>
    <button @click="toggleSample(index)">{{ current === index ? 'Pause' : 'Play' }}</button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { IMAGE_ASSET_ENDPOINT } from '../../constants';

export default {
  name: 'SampleCard',
  props: {
    name: String,
    image: String,
    toggleSample: Function,
    index: Number,
    current: Number
  },
  setup (props) {
    const imageSrc = computed(() => IMAGE_ASSET_ENDPOINT + props.image);

    return { imageSrc }
  }
}
</script>