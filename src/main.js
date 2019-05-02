import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResourse from 'vue-resource';
import moment from 'moment-timezone';
import Tooltip from './util/tooltip';

import './style.scss';

import { checkFilter, setDay } from './util/bus';
import routes from './util/routes';

Vue.use(VueResourse);
Vue.use(VueRouter);
Vue.use(Tooltip);

moment.tz.setDefault("America/Phoenix");

const bus = new Vue();
const router = new VueRouter({ routes });

Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment(),
    bus,
  },
  created() {
    this.$http.get('/api').then(response => {
      this.movies = response.data;
    });
    this.$bus.$on('check-filter', checkFilter.bind(this));
    this.$bus.$on('set-day', setDay.bind(this));
  },
  router,
});
