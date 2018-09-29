import Vue from 'vue';
import Layout from './components/layout';
import Meta from './data/meta';

Vue.config.performance = !__PRODUCTION__;
Vue.config.productionTip = false;

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#mount',
  components: { Layout },
  render: h => h('Layout'),
});

if (__PRODUCTION__ && Meta.analytics) {
  window.GoogleAnalyticsObject = 'ga';
  window.ga = (...args) => {
    if (!window.ga.q) window.ga.q = [];
    window.ga.q.push(args);
  };
  window.ga.l = (new Date()) * 1;
  window.ga('create', Meta.analytics, 'auto');
  window.ga('send', 'pageview');
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.google-analytics.com/analytics.js';
  document.body.appendChild(script);
}
