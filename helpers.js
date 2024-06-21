import { DB_ENDPOINT } from '../../constants.js';

export function fetchContent(endpoint) {
  return fetch(DB_ENDPOINT + endpoint).then(response => response.json());
}
