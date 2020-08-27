<template>
  <div>
    <draggable-container @click="onclick" @drag="ondrag"></draggable-container>
  </div>
</template>

<script>
import DraggableContainer from './draggable-container.vue'

export default {
  name: 'drggable-element',
  components: { DraggableContainer },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    onclick(target) {
      console.log('MY LOG: : onclick -> target', target)
    },
    ondrag(target) {
      console.log('MY LOG: : ondrag -> target', target)
    },
  },
}
</script>

<style lang="less" scoped>
@icon-size: 40px;

.de-fixed-container {
  position: fixed;
  width: @icon-size;
  height: @icon-size;
  border-radius: 4px;
  background: #409eff;
}
.de-fixed-container,
.de-content-container {
  position: fixed;
}
</style>