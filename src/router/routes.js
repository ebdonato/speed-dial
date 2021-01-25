
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: "Index" },
      { path: 'edit/:id', component: () => import('pages/EditLink.vue'), props: true, name: "EditLink" },
      { path: 'new', component: () => import('pages/EditLink.vue'), props: false, name: "NewLink" },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
