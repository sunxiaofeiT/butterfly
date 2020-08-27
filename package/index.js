import Vue from 'vue'
import draggableElement from './index.vue'

const DraggableElement = Vue.extend(draggableElement)

export default {
  el: null,

  init(container, config) {
    this.el = new DraggableElement(config)
    this.el.$mount(container)
  }
}