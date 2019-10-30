import Vue from 'vue'
import App from './App'
import {router} from './router/index';
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import {appRouter} from './router/router';
import API from '@/libs/config'
import {post,get} from '@/libs/http'
import 'babel-polyfill'
import means from '@/components/comfunction/means.js'
import moment from 'moment'
import LunarFullCalendar from 'vue-lunar-full-calendar'
import vSelectPage from 'v-selectpage'
import VueQuillEditor  from 'vue-quill-editor'


Vue.use(LunarFullCalendar)
Vue.use(iView);
Vue.prototype.GLOBAL = API;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.means = means;
Vue.prototype.moment = moment;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    let tagsList = [];
    appRouter.map((item) => {
        if (item.children.length <= 1) {
            tagsList.push(item.children[0]);
        } else {
            tagsList.push(...item.children);
        }
    });
    this.$store.commit('setTagsList', tagsList);
  }
})
