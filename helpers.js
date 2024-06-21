import {
  DB_ENDPOINT,
  IMAGE_ASSET_ENDPOINT,
  AUDIO_ASSET_ENDPOINT
} from '../../constants.js';

export function fetchContent(endpoint) {
  return fetch(DB_ENDPOINT + endpoint).then(response => response.json());
}

export function getImageSrc(image) {
  return `${IMAGE_ASSET_ENDPOINT}/${image}`;
}

export function getAudioSrc(src) {
  return `${AUDIO_ASSET_ENDPOINT}/${src}`;
}
