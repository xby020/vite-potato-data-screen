import { createApp } from 'vue';
import 'virtual:windi.css';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from './store';
import { setupHead } from './utils/head';
import { setupDerictives } from './directives';
import DataVVue3 from '@kjgl77/datav-vue3';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { MotionPlugin } from '@vueuse/motion';

const app = createApp(App);

async function setupAPP() {
  // 挂载 vueuse/head
  setupHead(app);

  // 挂载 store
  setupStore(app);

  // 挂载路由
  setupRouter(app);

  // 挂载 DataV
  app.use(DataVVue3);

  // 挂载 auto-animate
  app.use(autoAnimatePlugin);

  // 挂载 vueuse/motion
  app.use(MotionPlugin);

  // 挂载 directives
  setupDerictives(app);

  await router.isReady();

  app.mount('#app');
}

setupAPP();
