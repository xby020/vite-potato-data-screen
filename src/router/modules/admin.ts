import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/admin',
    name: 'admin',
    component: Layout,
    redirect: '/admin/data',
    meta: {
      title: '数据填报',
      icon: markRaw(IconMdiDatabaseEdit),
      sort: 2,
      auth: true,
    },
    children: [
      {
        path: 'data',
        name: 'admin_data',
        component: () => import('@pages/admin/AdminData.vue'),
        meta: {
          title: '数据填报',
          icon: markRaw(IconMdiDatabaseEditOutline),
        },
      },
    ],
  },
];

export default routes;
