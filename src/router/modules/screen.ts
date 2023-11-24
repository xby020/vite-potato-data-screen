import { RouteRecordRaw } from 'vue-router';
import { ScreenLayout } from '@/router/constant';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/screen',
    name: 'screen',
    component: ScreenLayout,
    redirect: '/screen/screen1',
    meta: {
      title: '数据大屏',
      icon: markRaw(IconRiDashboardFill),
      sort: 1,
      auth: false,
    },
    children: [
      {
        path: 'screen1',
        name: 'screen1',
        component: () => import('@pages/screen/Screen1.vue'),
        meta: {
          title: '数据大屏',
          icon: markRaw(IconRiDashboardFill),
        },
      },
      {
        path: 'screen2',
        name: 'screen2',
        component: () => import('@pages/screen/Screen1.vue'),
        meta: {
          title: '数据大屏',
          icon: markRaw(IconRiDashboardFill),
        },
      },
    ],
  },
];

export default routes;
