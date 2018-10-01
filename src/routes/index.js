import Vue from 'vue';
import VueRouter from 'vue-router';
import Chat from './chat';
import Projects from './projects';
import NotFound from './notfound';

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
      path: '/%CF%80',
    },
    {
      component: NotFound,
      name: '404',
      path: '*',
    },
  ],
});
