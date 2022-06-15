import usersRoutes from './modules/users'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Root',
        component: () => import('pages/IndexPage.vue'),
        redirect: { name: 'DashboardPage' }
      },
      {
        path: 'dashboard',
        name: 'DashboardPage',
        component: () => import('src/pages/DashboardPage.vue')
      },
      ...usersRoutes
    ]
  }
]

export default routes
