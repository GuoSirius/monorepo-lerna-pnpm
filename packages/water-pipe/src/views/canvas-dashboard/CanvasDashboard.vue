<template>
  <div class="wrapper">
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import CanvasDashboard from './CanvasDashboard.js'

import bocIcon from './images/boc.png'

export default {
  name: 'CanvasDashboard',
  created() {
    this.canvasDashborad = null

    // this.mockRequest()
    this.mockRequest(true)
  },
  mounted() {
    this.initialize()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    async mockRequest(isSync = false) {
      if (!isSync) {
        await new Promise(resolve => setTimeout(resolve, 10))
      }

      // 确保 元素存在，并且实例化完成
      this.$nextTick(() => {
        this.initialize()

        this.canvasDashborad.setValue(0, 10000, true)
        // this.canvasDashborad.setValue(10000, 10000000, true)
      })
    },
    initialize() {
      const { $refs, canvasDashborad } = this
      const { canvas } = $refs

      if (!canvas || canvasDashborad) return

      const _canvasDashborad = new CanvasDashboard(canvas, { icon: bocIcon })

      this.canvasDashborad = _canvasDashborad
      window.canvasDashborad = _canvasDashborad
    },
    destroy() {
      const { canvasDashborad } = this

      if (!canvasDashborad) return

      canvasDashborad.destroy()

      this.canvasDashborad = null
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;

  .canvas {
    margin-top: 48px;
    background-color: pink;
  }
}
</style>
