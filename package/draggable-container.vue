<template>
  <div ref="ele" class="de-fixed-container" :style="style" @mousedown="onmousedown" @mouseup="onmouseup">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'draggable-container',
  props: {
    distance: { type: Number, default: 40 },
    duration: { type: Number, default: 400 },
  },
  data() {
    return {
      offset: { x: 0, y: 0 }, // offset to the draggable-element
      position: { x: 20, y: 20 }, // draggable-element's position, x -> left, y -> top
      eventStatus: null, // enums: toConfirm, click, drag
    }
  },
  computed: {
    style() {
      return { left: `${this.position.x}px`, top: `${this.position.y}px` }
    },
  },
  methods: {
    onmousedown(e) {
      document.addEventListener('mousemove', this.onmousemove)
      this.eventStatus = 'click'
      this.timer = setTimeout(() => {
        this.timer = null
        this.eventStatus = 'drag'
      }, this.duration)
      this.clickPosition = { x: e.x, y: e.y }
      this.offset = { x: e.x - this.position.x, y: e.y - this.position.y }
    },
    onmouseup(e) {
      document.removeEventListener('mousemove', this.onmousemove)
      let ele = this.$refs.ele
      let size = ele ? { x: ele.offsetWidth, y: ele.offsetHeight } : { x: 0, y: 0 }
      this.$emit(this.eventStatus, { position: { ...this.position }, size, event: e })
      this.eventStatus = null
    },
    onmousemove(e) {
      if (this.eventStatus === 'click') {
        if (!this.clickPosition) return
        let curx = e.x
        let cury = e.y
        let movex = Math.abs(curx - this.clickPosition.x)
        let movey = Math.abs(cury - this.clickPosition.y)
        if (movex > this.distance || movey > this.distance) {
          this.clearTimer()
          this.eventStatus = 'drag'
        }
      } else if (this.eventStatus === 'drag') {
        this.position = { x: e.x - this.offset.x, y: e.y - this.offset.y }
      }
    },
    clearTimer() {
      if (!this.timer) return
      clearTimeout(this.timer)
      this.timer = null
    },
  },
}
</script>

<style lang="less" scoped>
.de-fixed-container {
  position: fixed;
}
</style>