import { PageEnum } from '@/enums/pageEnum';
import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RedirectRoute } from './constantRoutes';
import { createRouterGuards } from './routeGuard';

// Async routes
const modules: any = import.meta.glob('./modules/**/*.ts', { eager: true });

const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

function sortRoute(a: any, b: any) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0);
}
routeModuleList.sort(sortRoute);

export const asyncRouteList: RouteRecordRaw[] = [...routeModuleList];

// constant routes
const constantRouteList: RouteRecordRaw[] = [
  // login
  {
    path: '/login',
    name: 'Login',
    component: () => import('@pages/login/Login.vue'),
    meta: {
      title: '登录',
      noAuth: true,
      hide: true,
    },
  },
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
      title: '首页',
      noAuth: true,
    },
  },
];

// No Auth Route
const noAuthRouteList: RouteRecordRaw[] = [];
asyncRouteList.forEach((item) => {
  if (item.meta?.noAuth) {
    noAuthRouteList.push(item);
  }
});

// route
const routes = [...constantRouteList, ...noAuthRouteList, RedirectRoute];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export function setupRouter(app: App) {
  app.use(router);
  // create router guard
  createRouterGuards(router);
}

export default router;
