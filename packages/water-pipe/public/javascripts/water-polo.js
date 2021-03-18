;(function() {
  const DEFAULT_OPTIONS = {
    stats: null,
    autoRun: true, // 自动运行
    margin: 8, // 画板留白
    padding: 8, // 画板内边距
    radius: 96, // 圆的半径
    percent: 0, // 百分比
    color: '#fff', // 文字颜色
    fontSize: 16, // 文字大小
    stroke: '#fff', // 水球描边颜色
    fill: 'transparent', // 水球填充颜色
    innerFill: 'red', // 水球填充颜色
    lineWidth: 5, // 水球线宽
    speed: 1, // 变化速度
    waves: [{ fill: 'blue' }, { fill: 'green' }] // 波浪颜色
  }

  const DEFAULT_STEP = 0.1
  const DEFAULT_AMPLITUDE = 12

  function WaterPolo(canvas, options) {
    options = Object.assign({}, DEFAULT_OPTIONS, options)

    this.options = options

    this.canvas = canvas
    this.context = canvas.getContext('2d')

    // 定时器 相关
    this.animationId = 0

    // 进度 相关
    this.percent = 0
    this.percentage = 0

    this.initialize()
  }

  Object.assign(WaterPolo.prototype, {
    // 初始化
    initialize: function() {
      const canvas = this.canvas
      const options = this.options

      const autoRun = options.autoRun
      const margin = options.margin
      const padding = options.padding
      const radius = options.radius
      const percent = options.percent

      const outerRadius = radius + margin
      const outerDiameter = outerRadius * 2

      // 画布 尺寸
      const width = outerDiameter
      const height = width

      let innerRadius = radius - padding // - lineWidth
      innerRadius = innerRadius > 0 ? innerRadius : radius

      const diameter = radius * 2
      const innerDiameter = innerRadius * 2

      canvas.width = width
      canvas.height = height

      this.width = width
      this.height = height
      this.diameter = diameter

      this.outerRadius = outerRadius
      this.outerDiameter = outerDiameter

      this.innerRadius = innerRadius
      this.innerDiameter = innerDiameter

      this.initializeWaves()

      this.stopAnimation()
      this.updatePencent(percent)

      if (autoRun) this.startAnimation()
      else this.loopDraw()
    },
    // 更新 百分比值
    updatePencent: function(percent) {
      const options = this.options

      const autoRun = options.autoRun

      percent = Number.parseFloat(percent)

      if (Number.isNaN(percent)) percent = this.percentage || this.percent

      this.percentage = percent

      if (!autoRun) {
        this.percent = percent

        this.loopDraw()
      }
    },
    // 初始化 水波 参数
    initializeWaves: function() {
      const options = this.options

      let waves = options.waves

      if (!Array.isArray(waves)) {
        waves = [waves]
        options.waves = waves
      }

      options.waves = waves.map(function(item) {
        if (typeof item !== 'object' || !item) item = { fill: item }

        item.A = item.A || DEFAULT_AMPLITUDE
        item.w = item.w || Math.PI / (100 + 48 * Math.random())
        item.theta = item.theta == null ? 120 * Math.random() : item.theta
        item.step = item.step || DEFAULT_STEP

        return item
      })
    },
    // 绘制 圆
    drawCircle: function() {
      const context = this.context
      const options = this.options

      const outerRadius = this.outerRadius
      const innerRadius = this.innerRadius

      const radius = options.radius
      const fill = options.fill
      const innerFill = options.innerFill
      const stroke = options.stroke
      const lineWidth = options.lineWidth

      context.beginPath()
      context.fillStyle = fill
      context.strokeStyle = stroke
      context.lineWidth = lineWidth

      context.arc(outerRadius, outerRadius, radius, 0, Math.PI * 2, false)
      context.closePath()

      context.fill()
      context.stroke()

      context.beginPath()
      context.fillStyle = innerFill
      context.strokeStyle = 'none'
      context.lineWidth = 0

      context.arc(outerRadius, outerRadius, innerRadius, 0, Math.PI * 2, false)
      context.closePath()

      context.fill()
    },
    // 绘制 水波
    drawWave: function() {
      const context = this.context

      const percent = this.percent
      const outerRadius = this.outerRadius
      const innerRadius = this.innerRadius

      if (percent <= Number.MIN_VALUE) return

      context.save()

      context.beginPath()
      context.arc(outerRadius, outerRadius, innerRadius, 0, Math.PI * 2, false)
      context.closePath()
      context.clip()

      this.drawSingleWave()
      context.restore()
    },
    // 绘制 单个波浪
    drawSingleWave: function() {
      const context = this.context
      const options = this.options

      const width = this.width
      const height = this.height
      const percent = this.percent

      const waves = options.waves
      const margin = options.margin
      const padding = options.padding

      const offset = (height - margin - padding) * (1 - percent / 100)
      const maxX = width - margin
      const maxY = height - margin

      let x = margin
      let y = 0

      let A = 1
      let w = 1
      let theta = 0
      let step = DEFAULT_STEP

      waves.forEach(function(item, index) {
        context.save()

        // 获取 正弦曲线  计算参数
        A = item.A
        w = item.w
        theta = item.theta
        step = item.step

        item.theta += step

        context.beginPath()

        context.fillStyle = item.fill

        if (percent < 100) {
          for (x = margin; x <= maxX; x += step) {
            y = A * Math.sin(w * x + theta) + offset

            context.lineTo(x, y)
          }
        } else {
          x = maxX

          context.lineTo(margin, margin)
          context.lineTo(maxX, margin)
        }

        context.lineTo(x, maxY)
        context.lineTo(margin, maxY)
        context.closePath()

        context.fill()

        context.restore()
      })
    },
    // 绘制 文字
    drawText: function() {
      const context = this.context
      const options = this.options

      const percent = this.percent
      const outerRadius = this.outerRadius

      const color = options.color
      const fontSize = options.fontSize

      const _percent = Math.round(percent)

      context.save()
      context.textAlign = 'center'
      context.textBaseLine = 'middle'
      context.fillStyle = color
      context.font = `${fontSize}px Microsoft Yahei, Sans, Serif`

      context.fillText(`${_percent}%`, outerRadius, outerRadius + fontSize * 0.32)
      context.restore()
    },
    // 循环 绘制
    loopDraw: function(elapsedTime) {
      elapsedTime = elapsedTime || 0

      const context = this.context
      const options = this.options

      const width = this.width
      const height = this.height

      const stats = options.stats
      const autoRun = options.autoRun

      if (stats && stats.update) stats.update()

      context.clearRect(0, 0, width, height)

      this.drawCircle()
      this.drawWave()
      this.drawText()

      return autoRun
    },
    // 开始 动画
    startAnimation: function() {
      this.stopAnimation()
      this.startChange()

      if (!this.loopDraw()) return

      this.animationId = requestAnimationFrame(this.startAnimation.bind(this))
    },
    // 停止 动画
    stopAnimation: function() {
      const animationId = this.animationId

      if (!animationId) return

      this.animationId = 0

      cancelAnimationFrame(animationId)
    },
    // 开始 变化
    startChange: function() {
      const options = this.options

      let percent = this.percent
      const percentage = this.percentage

      let speed = options.speed

      const delta = percentage - percent
      const absDelta = Math.abs(delta)

      if (absDelta < Number.MIN_VALUE) return

      if (absDelta < speed) speed = absDelta

      if (delta < 0) speed *= -1

      percent += speed

      if (delta > 0) percent = Math.min(percentage, percent)
      else percent = Math.max(percentage, percent)

      this.percent = percent
    }
  })

  window.WaterPolo = WaterPolo
})()
