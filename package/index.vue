<template>
  <div class="de-container">
    <div class="de-fixed-container" :style="style" @mousedown="onmousedown" @mouseup="onmouseup" @mousemove="onmousemove"></div>
    <div v-if="showContent" class="de-content-container">
      <p>dfasffaf</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'drggable-element',
  props: {
    distance: { type: Number, default: 80 },
    duration: { type: Number, default: 400 },
  },
  data() {
    return {
      showContent: false,
      style: { left: '20px', top: '20px' },
      eventStatus: null, // toConfirm, click, drag
    }
  },
  mounted() {
    document.addEventListener('mousemove', this.onmousemove)
  },
  methods: {
    onmousedown(e) {
      this.eventStatus = 'toConfirm'
      this.timer = setTimeout(() => {
        this.timer = null
        this.ondrag()
      }, this.duration)
      this.clickPosition = { x: e.x, y: e.y }
    },
    onmouseup() {
      if (this.eventStatus === 'toConfirm') {
        this.clearTimer()
      }
      if (this.eventStatus === 'drag') {
        this.eventStatus = null
      }
    },
    onmousemove(e) {
      if (this.eventStatus === 'toConfirm') {
        if (!this.clickPosition) return
        let curx = e.x
        let cury = e.y
        if (this.clickPosition.x - curx > this.distance || this.clickPosition.y - cury > this.distance) {
          this.clearTimer()
          this.ondrag()
        }
      }
      if (this.eventStatus === 'drag') {
        this.style = { left: `${e.x}px`, top: `${e.y}px` }
      }
    },
    onclick() {
      this.eventStatus = 'click'
      /**
       * do something
       */
      console.info('click')
      this.eventStatus = null
    },
    ondrag() {
      this.eventStatus = 'drag'
      console.info('drag')
    },
    clearTimer() {
      if (!this.timer) return
      clearTimeout(this.timer)
      this.timer = null
    }
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