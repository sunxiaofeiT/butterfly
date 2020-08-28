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
    storeLocation: { type: Boolean, default: true },
    paddingSpace: { type: Number, default: 10 },
    adsorbDistance: { type: Number, default: 10 },
  },
  data() {
    let localx = this.storeLocation ? localStorage.getItem('draggable-element-x') : null
    let localy = this.storeLocation ? localStorage.getItem('draggable-element-y') : null
    return {
      size: { x: 0, y: 0 },
      offset: { x: 0, y: 0 }, // offset to the draggable-element
      position: { x: localx || 20, y: localy || 20 }, // draggable-element's position, x -> left, y -> top
      eventStatus: null, // enums: toConfirm, click, drag
      deviceSize: { height: window.innerHeight, width: window.innerWidth },
    }
  },
  computed: {
    style() {
      return { left: `${this.position.x}px`, top: `${this.position.y}px` }
    },
  },
  mounted() {
    let ele = this.$refs.ele
    this.size = ele ? { x: ele.offsetWidth, y: ele.offsetHeight } : { x: 0, y: 0 }
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
      if (!this.eventStatus) return
      document.removeEventListener('mousemove', this.onmousemove)
      this.$emit(this.eventStatus, { position: { ...this.position }, size: { ...this.size }, event: e })
      if (this.eventStatus === 'drag' && this.storeLocation) {
        localStorage.setItem('draggable-element-x', this.position.x)
        localStorage.setItem('draggable-element-y', this.position.y)
      }
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
        let x = e.x - this.offset.x
        let y = e.y - this.offset.y
        let rposition = this.paddingMonitor(x, y, e)
        this.position = { x: rposition.x, y: rposition.y }
      }
    },
    clearTimer() {
      if (!this.timer) return
      clearTimeout(this.timer)
      this.timer = null
    },
    paddingMonitor(x, y, e) {
      let tempx = x
      let tempy = y
      let paddingSpace = this.paddingSpace
      let adsorbDistance = this.adsorbDistance
      if (x < adsorbDistance) x = -paddingSpace
      if (y < adsorbDistance) y = -paddingSpace
      if (x > this.deviceSize.width - this.size.x - adsorbDistance) {
        x = this.deviceSize.width - this.size.x + paddingSpace
      }
      if (y > this.deviceSize.height - this.size.y - adsorbDistance) {
        y = this.deviceSize.height - this.size.y + paddingSpace
      }
      if (x !== tempx || y !== tempy) this.onmouseup(e)
      return { x, y }
    },
  },
}
</script>

<style lang="less" scoped>
.de-fixed-container {
  position: fixed;
}
</style>