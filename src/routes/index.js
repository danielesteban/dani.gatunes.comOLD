import Vue from 'vue';
import VueRouter from 'vue-router';
import Chat from './chat.vue';
import Projects from './projects.vue';
import NotFound from './notfound.vue';

Vue.use(VueRouter);

export default new VueRouter({
  base: __BASENAME__,
  routes: [
    {
      component: Projects,
      name: 'projects',
      path: '/',
    },
    {
      component: Chat,
      name: 'chat',
      path: '/π',
    },
    {
      component: NotFound,
      name: '404',
      path: '*',
    },
  ],
});
