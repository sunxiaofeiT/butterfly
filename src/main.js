import Vue from 'vue'
import App from './App.vue'
import draggableElement from '../package/index'

draggableElement.init(document.body, {})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount(document.body)
