import React from 'react';

import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';
import AdminLayout from '@/layouts/AdminLayout';

const Login = React.lazy(() => import('@/pages/Login'));
const AdminHome = React.lazy(() => import('@/pages/Admin/Home'));
const AdminRole = React.lazy(() => import('@/pages/Admin/Role'));
const AdminUser = React.lazy(() => import('@/pages/Admin/User'));
const AdminOrganization = React.lazy(() => import('@/pages/Admin/Organization'));
const AdminProject = React.lazy(() => import('@/pages/Admin/Project'));
const AdminModule = React.lazy(() => import('@/pages/Admin/Module'));
const AdminPermission = React.lazy(() => import('@/pages/Admin/Permission'));
const AdminSystemConst = React.lazy(() => import('@/pages/Admin/SystemConst'));
const Home = React.lazy(() => import('@/pages/Web/Home'));

const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '/home',
        component: AdminHome,
      },
      {
        path: '/organization',
        component: AdminOrganization,
      },
      {
        path: '/project',
        component: AdminProject,
      },
      {
        path: '/module',
        component: AdminModule,
      },
      {
        path: '/role',
        component: AdminRole,
      },
      {
        path: '/user',
        component: AdminUser,
      },
      {
        path: '/permission',
        component: AdminPermission,
      },
      {
        path: '/systemconst',
        component: AdminSystemConst,
      },
      {
        path: '/',
        redirect: '/admin/home',
      },
    ],
  }, {
    path: '/',
    component: BasicLayout,
    children: [
      {
        // FIXME 暂时路由回管理端
        path: '/',
        redirect: '/admin/home',
      },
      {
        path: '/home',
        component: Home,
      },
      {
        path: '/',
        redirect: '/home',
      },
    ],
  },
];
export default routerConfig;
