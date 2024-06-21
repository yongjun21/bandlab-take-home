<template>
  <nav-bar></nav-bar>
  <main class="sample-view">
    <loading-state v-if="loading"></loading-state>
    <div v-else class="sample-container">
      <sample-visualizer :analyser="analyser"></sample-visualizer>
      <sample-card
        v-for="(sample, i) in samples"
        :key="sample.uid"
        v-bind="sample"
        :index="i"
        :current="currSample"
        :toggle-sample="toggleSample"
        :progress="progress[i]"
      ></sample-card>
      <audio
        v-for="sample in samples"
        :key="sample.uid"
        ref="audioRefs"
        :src="getAudioSrc(sample.src)"
        loop>
      </audio>
    </div>
  </main>
</template>

<script>
import { ref, reactive, watch, nextTick } from 'vue';
import useSampleData from './useSampleData.js';

import { getAudioSrc } from '../../helpers.js';

export default {
  name: 'SampleView',
  setup() {
    const { loading, samples } = useSampleData();

    const audioRefs = ref([]);
    const tracks = [];
    const progress = reactive([]);

    const currSample = ref(-1);

    const audioContext = new AudioContext();

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.connect(audioContext.destination);

    watch(samples, () => {
      nextTick(() => {
        audioRefs.value.forEach(($el, i) => {
          tracks.push(audioContext.createMediaElementSource($el));
          progress[i] = 0;
          $el.addEventListener('timeupdate', () => {
            progress[i] = $el.currentTime / ($el.duration || 1);
          });
        });
      });
    });

    const toggleSample = i => {
      const curr = currSample.value;
      if (curr >= 0) {
        audioRefs.value[curr].pause();
        tracks[curr].disconnect(analyser);
      }

      if (curr === i) {
        currSample.value = -1;
      } else {
        audioRefs.value[i].play();
        tracks[i].connect(analyser);
        currSample.value = i;
      }
    };

    return {
      loading,
      samples,
      progress,
      audioRefs,
      currSample,
      toggleSample,
      getAudioSrc,
      analyser
    };
  }
};
</script>

<style>
.sample-view {
  .loading-state {
    margin: 80px 0;
  }
}
</style>
