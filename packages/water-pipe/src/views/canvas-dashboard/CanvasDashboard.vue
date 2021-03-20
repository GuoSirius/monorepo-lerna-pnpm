<template>
  <div class="wrapper">
    <canvas ref="canvas" class="canvas"></canvas>

    <div v-if="!NEED_DRAW_TEXT" class="text">
      <span class="text-title">最高额度</span>
      <span class="text-value">{{ canvasDashborad ? canvasDashborad.currentValue : 0 }}</span>
    </div>
  </div>
</template>

<script>
import CanvasDashboard from './CanvasDashboard.js'

import bocIcon from './images/boc.png'

const NEED_DRAW_TEXT = false

export default {
  name: 'CanvasDashboard',
  data() {
    return {
      canvasDashborad: null
    }
  },
  created() {
    this.NEED_DRAW_TEXT = NEED_DRAW_TEXT

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
        this.canvasDashborad.setValue(10000, 10000000, true)
      })
    },
    initialize() {
      const { $refs, canvasDashborad } = this
      const { canvas } = $refs

      if (!canvas || canvasDashborad) return

      const _canvasDashborad = new CanvasDashboard(canvas, {
        icon: bocIcon,
        radius: 240,
        titleOffsetY: 10,
        needDrawText: NEED_DRAW_TEXT
      })

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
  position: relative;
  text-align: center;

  .canvas {
    margin-top: 48px;
    background-color: pink;
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-weight: bold;

    &-title {
      margin-bottom: 36px;
      font-size: 18px;
    }

    &-value {
      font-size: 36px;
    }
  }
}
</style>
