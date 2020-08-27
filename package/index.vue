<template>
  <div>
    <draggable-container @click="onclick" @drag="ondrag">
      <div class="icon"></div>
    </draggable-container>
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
.icon {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background: #409eff;
}
</style>