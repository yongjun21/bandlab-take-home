<template>
  <nav-bar></nav-bar>
  <main class="sample-view">
    <loading-state v-if="loading"></loading-state>
    <div v-else class="sample-container">
      <div class="player"></div>
      <sample-card
        v-for="sample in samples"
        :key="sample.uid"
        v-bind="sample"
        :play-sample="playSample"
        :image-url="getImageUrl(sample)"
      ></sample-card>
      <audio
        v-for="sample in samples"
        :key="sample.uid"
        ref="audioRefs"
        :src="getSampleSrc(sample)">
      </audio>
    </div>
  </main>
</template>

<script>
import { ref, watch, nextTick } from 'vue';
import useSampleData from './useSampleData.js';

import { AUDIO_ASSET_ENDPOINT, IMAGE_ASSET_ENDPOINT } from '../../constants.js';

export default {
  name: 'SampleView',
  setup() {
    const { loading, samples } = useSampleData();

    const audioRefs = ref([]);
    const tracks = [];

    let currSample = -1;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.connect(audioContext.destination);

    watch(samples, () => {
      nextTick(() => {
        audioRefs.value.forEach($el => {
          tracks.push(audioContext.createMediaElementSource($el));
        });
      });
    });

    const playSample = i => {
      if (currSample >= 0) {
        audioRefs.value[currSample].pause();
        audioRefs.value[currSample].currentTime = 0;
        tracks[currSample].disconnect(analyser);
      }

      audioRefs.value[i].play();
      tracks[i].connect(analyser);
      currSample = i;
    };

    const getImageUrl = sample => `${IMAGE_ASSET_ENDPOINT}/${sample.image}`;
    const getSampleSrc = sample => `${AUDIO_ASSET_ENDPOINT}/${sample.src}`;

    return {
      loading,
      samples,
      audioRefs,
      currSample,
      playSample,
      getImageUrl,
      getSampleSrc
    };
  }
};
</script>

<style>
.sample-view {
  
}
</style>
