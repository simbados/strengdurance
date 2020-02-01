const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Overview.vue'),
      },
      {
        path: '/addWorkout',
        component: () => import('pages/addWorkout.vue'),
      },
      {
        path: '/strengthworkout',
        component: () => import('pages/StrengthWorkout.vue'),
      },
      {
        path: '/enduranceworkout',
        component: () => import('pages/EnduranceWorkout.vue'),
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
