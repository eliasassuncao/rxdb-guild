export default [
  {
    name: 'UsersList',
    path: 'users',
    component: () => import('src/pages/users/UsersList.vue')
  },
  {
    name: 'UsersCreate',
    path: 'users/new',
    component: () => import('src/pages/users/UsersForm.vue')
  },
  {
    name: 'UsersEdit',
    path: 'users/:id/edit',
    component: () => import('src/pages/users/UsersForm.vue')
  }
]
