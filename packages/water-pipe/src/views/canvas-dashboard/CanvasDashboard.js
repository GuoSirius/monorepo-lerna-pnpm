const USE_AUXILIARY_LINE = true

const DEFAULT_OPTIONS = {
  stats: null,
  title: '最高额度',
  icon: '', // 图标 地址 或者 base64
  iconWidth: 18, // 图标 宽度
  iconHeight: 12, // 图标 高度
  titleColor: '#FFF', // 标题颜色
  titleFontSize: 16, // 标题大小
  minValue: 0, // 最小值
  maxValue: 0, // 最大值
  valueColor: '#FFF', // 数值颜色
  valueFontSize: 30, // 数值大小
  margin: 8, // 画板留白
  padding: 5, // 画板内边距
  radius: 96, // 圆弧半径
  stroke: 'red', // 圆弧描边颜色
  fill: '#B13333', // 圆弧填充颜色
  activeStroke: 'red', // 圆弧填充后的描边颜色
  activeFill: '#FFF', // 圆弧填充后的填充颜色
  innerStroke: 'red', // 内圆描边颜色
  innerFill: 'red', // 内圆填充颜色
  dotCount: 10, // 圆点数量
  dotRadius: 3, // 圆点半径
  dotMargin: 8, // 圆点留白
  dotStroke: 'transparent', // 圆点描边色
  dotFill: '#B13333', // 圆点填充色
  activeDotStroke: 'transparent', // 圆点激活后的描边色
  activeDotFill: '#FFF', // 圆点激活后的填充色
  arcDegree: 240, // 圆弧角度
  stepDegree: 1, // 步进角度
  delay: 1000 // 动画延迟时间
}

function CanvasDashboard(canvas, options) {
  this.options = Object.assign({}, DEFAULT_OPTIONS, options)

  this.canvas = canvas
  this.context = canvas.getContext('2d')

  // 定时器 相关
  this.timerId = 0
  this.animationId = 0
  this.animationCount = 0

  // 过程 相关
  this.minimumValue = 0
  this.maximumValue = 0
  this.deltaValue = 0
  this.currentValue = 0
  this.currentDegree = 0

  // 图标
  this.imagePromise = null

  this.initialize()
}

Object.assign(CanvasDashboard.prototype, {
  // 初始化 处理
  initialize() {
    const canvas = this.canvas
    const options = this.options

    const margin = options.margin
    const padding = options.padding
    const radius = options.radius

    const outerRadius = radius + margin
    const outerDiameter = outerRadius * 2

    // 画布 尺寸
    const width = outerDiameter
    const height = width

    let innerRadius = radius - padding
    innerRadius = innerRadius > 0 ? innerRadius : radius

    const diameter = radius * 2
    const innerDiameter = innerRadius * 2

    canvas.width = width
    canvas.height = height

    this.width = width
    this.height = height
    this.diameter = diameter

    this.cx = outerRadius
    this.cy = outerRadius
    this.offsetY = height / 24

    this.outerRadius = outerRadius
    this.outerDiameter = outerDiameter

    this.innerRadius = innerRadius
    this.innerDiameter = innerDiameter

    this.loadIcon()

    this.stopTimer()
    this.stopAnimate()
    this.updateValue()

    this.startAnimate()
  },
  // 加载 图标
  loadIcon() {
    const options = this.options
    const imagePromise = this.imagePromise

    const icon = options.icon

    if (imagePromise) return imagePromise

    if (!icon) return Promise.reject()

    const _imagePromise = new Promise(function(resolve, reject) {
      const image = new Image()

      image.addEventListener(
        'load',
        function(e) {
          const target = e.target

          resolve(target)
        },
        { once: true, capture: false }
      )

      image.addEventListener(
        'error',
        function(error) {
          this.imagePromise = null

          reject(error)
        },
        { once: true, capture: false }
      )

      image.src = icon
    })

    this.imagePromise = _imagePromise

    return _imagePromise
  },
  // 绘制 图标
  drawIcon() {
    const context = this.context
    const options = this.options

    const cx = this.cx
    const cy = this.cy
    const currentDegree = this.currentDegree

    const radius = options.radius
    const padding = options.padding
    const iconWidth = options.iconWidth
    const iconHeight = options.iconHeight
    const arcDegree = options.arcDegree % 360

    const halfPI = Math.PI / 2
    const auxiliaryDegree = ((360 - arcDegree) * Math.PI) / 180
    const halfAuxiliaryDegree = auxiliaryDegree / 2

    const startAngle = halfPI + halfAuxiliaryDegree

    const _radius = radius - padding / 2
    const _currentDegree = startAngle + (currentDegree * Math.PI) / 180

    const x = cx - iconWidth / 2 + _radius * Math.cos(_currentDegree)
    const y = cy - iconHeight / 2 + _radius * Math.sin(_currentDegree)

    this.loadIcon()
      .then(function(image) {
        context.save()

        context.translate(x, y)
        context.drawImage(image, 0, 0, iconWidth, iconHeight)

        context.restore()
      })
      .catch(function(/* error */) {
        // TODO 图片加载异常
      })
  },
  // 设置 最小值
  setMinimumValue(minValue, needUpdate) {
    needUpdate = !!needUpdate

    const options = this.options

    minValue = minValue == null ? options.minValue : minValue
    minValue = Number(minValue) || 0

    options.minValue = minValue

    if (needUpdate) this.updateValue(minValue, null)
  },
  // 设置 最大值
  setMaximumValue(maxValue, needUpdate) {
    needUpdate = !!needUpdate

    const options = this.options

    maxValue = maxValue == null ? options.maxValue : maxValue
    maxValue = Number(maxValue) || 0

    options.maxValue = maxValue

    if (needUpdate) this.updateValue(null, maxValue)
  },
  // 设置 最小值、最大值
  setValue(minValue, maxValue, needUpdate) {
    needUpdate = !!needUpdate

    const options = this.options

    minValue = minValue == null ? options.minValue : minValue
    maxValue = maxValue == null ? options.maxValue : maxValue

    minValue = Number(minValue) || 0
    maxValue = Number(maxValue) || 0

    options.minValue = Math.min(minValue, maxValue)
    options.maxValue = Math.max(minValue, maxValue)

    if (needUpdate) this.updateValue(minValue, maxValue)
  },
  // 更新 最小值、最大值
  updateValue() {
    const options = this.options

    let minValue = options.minValue
    let maxValue = options.maxValue

    minValue = Number(minValue) || 0
    maxValue = Number(maxValue) || 0

    this.minimumValue = Math.min(minValue, maxValue)
    this.maximumValue = Math.max(minValue, maxValue)

    this.deltaValue = this.maximumValue - this.minimumValue
  },
  // 绘制 圆弧
  drawArc(isActive) {
    isActive = !!isActive

    const context = this.context
    const options = this.options

    const cx = this.cx
    const cy = this.cy
    const currentDegree = this.currentDegree

    const radius = options.radius
    const arcDegree = options.arcDegree % 360

    let fill = options.fill
    let stroke = options.stroke

    const halfPI = Math.PI / 2
    const auxiliaryDegree = ((360 - arcDegree) * Math.PI) / 180
    const halfAuxiliaryDegree = auxiliaryDegree / 2

    const startAngle = halfPI + halfAuxiliaryDegree
    let endAngle = halfPI - halfAuxiliaryDegree

    if (isActive) {
      fill = options.activeFill
      stroke = options.activeStroke
      endAngle = startAngle + (currentDegree * Math.PI) / 180
    }

    context.beginPath()

    context.fillStyle = fill
    context.strokeStyle = stroke

    context.moveTo(cx, cy)
    context.arc(cx, cy, radius, startAngle, endAngle, false)

    context.closePath()

    context.fill()
    context.stroke()
  },
  // 绘制 进度
  drawProgress() {
    this.drawArc(true)
  },
  // 绘制 实心圆
  drawCircle() {
    const context = this.context
    const options = this.options

    const cx = this.cx
    const cy = this.cy
    const innerRadius = this.innerRadius

    const innerFill = options.innerFill
    const innerStroke = options.innerStroke

    context.beginPath()

    context.fillStyle = innerFill
    context.strokeStyle = innerStroke

    context.arc(cx, cy, innerRadius, 0, Math.PI * 2, false)

    context.closePath()

    context.fill()
    context.stroke()
  },
  // 绘制 圆点
  drawDot() {
    const context = this.context
    const options = this.options

    const cx = this.cx
    const cy = this.cy
    const innerRadius = this.innerRadius
    const currentDegree = this.currentDegree

    const dotCount = Math.max(options.dotCount, 2)
    const dotRadius = options.dotRadius
    const dotMargin = options.dotMargin
    const dotFill = options.dotFill
    const dotStroke = options.dotStroke
    const activeDotFill = options.activeDotFill
    const activeDotStroke = options.activeDotStroke
    const arcDegree = options.arcDegree % 360

    const halfPI = Math.PI / 2
    const doublePI = Math.PI * 2
    const auxiliaryDegree = ((360 - arcDegree) * Math.PI) / 180
    const halfAuxiliaryDegree = auxiliaryDegree / 2

    const startAngle = halfPI + halfAuxiliaryDegree
    const _innerRadius = innerRadius - dotMargin

    const stepAngle = (arcDegree * Math.PI) / 180 / (dotCount - 1)
    const currentAngle = startAngle + (currentDegree * Math.PI) / 180

    let angle = startAngle

    Array.from({ length: dotCount }).forEach(function(item, index) {
      angle = startAngle + stepAngle * index

      context.beginPath()

      if (angle > currentAngle) {
        context.fillStyle = dotFill
        context.strokeStyle = dotStroke
      } else {
        context.fillStyle = activeDotFill
        context.strokeStyle = activeDotStroke
      }

      context.arc(
        cx + _innerRadius * Math.cos(angle),
        cy + _innerRadius * Math.sin(angle),
        dotRadius,
        0,
        doublePI,
        false
      )

      context.closePath()

      context.fill()
      context.stroke()
    })
  },
  // 绘制 文本
  drawText(isValue, offsetY) {
    isValue = !!isValue
    offsetY = Number(offsetY) || 0

    const context = this.context
    const options = this.options

    const cx = this.cx
    const cy = this.cy

    let text = options.title
    let color = options.titleColor
    let fontSize = options.titleFontSize
    let font = `Microsoft Yahei, Sans, Serif`

    if (isValue) {
      text = this.currentValue
      color = options.valueColor
      fontSize = options.valueFontSize
      font = `normal normal bolder ${fontSize}px ${font}`
    } else {
      font = `normal normal bold ${fontSize}px ${font}`
    }

    context.beginPath()

    context.textAlign = 'center'
    context.textBaseLine = 'middle'
    context.fillStyle = color
    context.font = font

    context.fillText(text, cx, cy + offsetY + fontSize * 0.32)

    context.fill()
    context.stroke()
  },
  // 绘制 标题
  drawTitle() {
    const options = this.options

    const offsetY = this.offsetY

    const valueFontSize = options.valueFontSize

    this.drawText(false, offsetY - valueFontSize * 1.2)
  },
  // 绘制 数值
  drawValue() {
    const offsetY = this.offsetY

    this.drawText(true, offsetY)
  },
  // 绘制 辅助线
  drawAuxiliaryLine() {
    const context = this.context

    const cx = this.cx
    const cy = this.cy
    const width = this.width
    const height = this.height

    context.beginPath()

    context.strokeStyle = '#FFF'
    context.lineWidth = 1

    context.moveTo(0, cy)
    context.lineTo(width, cy)

    context.moveTo(cx, 0)
    context.lineTo(cx, height)

    context.closePath()

    context.stroke()
  },
  // 绘制
  draw() {
    const context = this.context

    const width = this.width
    const height = this.height

    context.clearRect(0, 0, width, height)

    this.drawArc()
    this.drawProgress()

    this.drawCircle()

    this.drawDot()
    this.drawIcon()

    this.drawTitle()
    this.drawValue()

    if (USE_AUXILIARY_LINE) this.drawAuxiliaryLine()
  },
  // 更新
  update() {
    const options = this.options

    const arcDegree = options.arcDegree
    const stepDegree = options.stepDegree

    const deltaValue = this.deltaValue
    const minimumValue = this.minimumValue
    const maximumValue = this.maximumValue

    let currentValue = this.currentValue
    let currentDegree = this.currentDegree

    const _stepDegree = deltaValue ? stepDegree : 0

    if (currentDegree >= arcDegree) {
      this.currentDegree = 0

      return false
    }

    currentDegree = Math.min(arcDegree, currentDegree + _stepDegree)

    currentValue = Math.round(minimumValue + (deltaValue * currentDegree) / arcDegree)
    currentValue = Math.min(maximumValue, currentValue)

    this.currentValue = currentValue
    this.currentDegree = currentDegree

    return true
  },
  // 开始 动画
  startAnimate(elapsedTime) {
    elapsedTime = elapsedTime || 0

    const self = this

    const options = this.options

    const delay = options.delay

    this.stopAnimate()

    this.draw(elapsedTime)

    if (!this.update(elapsedTime)) {
      this.stopTimer()

      this.timerId = setTimeout(function() {
        self.timerId = 0

        self.startAnimate()
      }, delay)

      return
    }

    this.animationId = requestAnimationFrame(this.startAnimate.bind(this))
  },
  // 停止 动画
  stopAnimate() {
    const animationId = this.animationId

    if (!animationId) return

    this.animationId = 0
    cancelAnimationFrame(animationId)
  },
  // 停止 定时器
  stopTimer() {
    const timerId = this.timerId

    if (!timerId) return

    this.timerId = 0
    clearTimeout(timerId)
  },
  // 销毁
  destroy() {
    this.stopTimer()
    this.stopAnimate()
  }
})

export default CanvasDashboard
