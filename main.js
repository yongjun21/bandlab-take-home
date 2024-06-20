import { createApp } from 'vue';
import vueImport from 'vue-import';
import { createRouter, createWebHistory } from 'vue-router';

(async function () {
  const App = await vueImport('./App.vue');

  const app = createApp(App);
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/posts',
        component: await vueImport('./components/PostView/index.vue'),
        alias: '/'
      },
      {
        path: '/samples',
        component: await vueImport('./components/SampleView/index.vue')
      },
      {
        path: '/404',
        component: await vueImport('./components/NotFound.vue')
      },
      {
        path: '/:path(.*)*',
        redirect: '/404'
      }
    ]
  });
  app.use(router);
  app.mount('#app');
})();
