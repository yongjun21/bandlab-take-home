import { ref, shallowRef, onMounted } from 'vue';
import { fetchContent } from '../../helpers.js';

export default function useSampleData() {
  const loading = ref(true);
  const samples = shallowRef([]);

  onMounted(async () => {
    samples.value = await fetchContent('/samples');
    loading.value = false;
  });

  return { loading, samples };
}
