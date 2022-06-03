import usersRoutes from './modules/users'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      ...usersRoutes
    ]
  }
]

export default routes
