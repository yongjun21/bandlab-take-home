<template>
  <div class="sample-visualizer">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

const BACKGROUND_COLOR = 'rgb(0, 0, 0)';

export default {
  name: 'SampleVisualizer',
  props: {
    analyser: Object
  },
  setup(props) {
    const canvasRef = ref(null);

    const analyserData = new Uint8Array(props.analyser.frequencyBinCount);

    onMounted(() => {
      const $canvas = canvasRef.value;
      const ctx = $canvas.getContext('2d');

      const gradient = ctx.createLinearGradient(0, 0, $canvas.width, 0);
      gradient.addColorStop(0, 'rgb(255, 0, 0)'); // Red
      gradient.addColorStop(0.15, 'rgb(255, 255, 0)'); // Yellow
      gradient.addColorStop(0.3, 'rgb(0, 255, 0)'); // Green
      gradient.addColorStop(0.45, 'rgb(0, 255, 255)'); // Cyan
      gradient.addColorStop(0.6, 'rgb(0, 0, 255)'); // Blue
      gradient.addColorStop(0.75, 'rgb(255, 0, 255)'); // Magenta
      gradient.addColorStop(1, 'rgb(255, 0, 0)'); // Red again to loop the spectrum

      const draw = () => {
        props.analyser.getByteFrequencyData(analyserData);
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, $canvas.width, $canvas.height);
        ctx.fillStyle = gradient;
        const barWidth = ($canvas.width / analyserData.length) * 2.5;
        let x = 0;
        let y = 0;
        for (let i = 0; i < analyserData.length; i++) {
          y = (analyserData[i] / 255) * $canvas.height;
          ctx.fillRect(x, $canvas.height - y, barWidth, y);
          x += barWidth + 1;
        }
        requestAnimationFrame(draw);
      };

      draw();
    });

    return { canvasRef };
  }
};
</script>

<style>
.sample-visualizer {
  canvas {
    width: 100%;
    height: 160px;
  }

  margin: 20px 0;
}
</style>
