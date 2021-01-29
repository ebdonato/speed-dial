
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: "Index" },
      { path: 'edit/:id', component: () => import('pages/EditLink.vue'), props: true, name: "EditLink" },
      { path: 'new', component: () => import('pages/EditLink.vue'), props: false, name: "NewLink" },
      { path: 'auth', component: () => import('pages/Auth.vue'), props: false, name: "Auth" },
      { path: 'config', component: () => import('pages/Config.vue'), props: false, name: "Config" },
      { path: 'avatar', component: () => import('pages/Avatar.vue'), props: false, name: "Avatar" },
    ]
  },
  {
    path: '/uid',
    component: () => import('layouts/ExternalLayout.vue'),
    children: [
      { path: ':id', component: () => import('pages/ExternalIndex.vue'), name: "ExternalIndex", props: true },
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
