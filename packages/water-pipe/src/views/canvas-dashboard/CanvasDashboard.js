const DEFAULT_OPTIONS = {
  stats: null,
  title: '最高额度',
  titleColor: '#fff', // 标题颜色
  titleFontSize: 16, // 标题大小
  minValue: 0, // 最小值
  maxValue: 10000, // 最大值
  valueColor: '#fff', // 数值颜色
  valueFontSize: 16, // 数值大小
  margin: 8, // 画板留白
  padding: 8, // 画板内边距
  radius: 96, // 圆弧半径
  stroke: '#fff', // 圆弧描边颜色
  fill: 'transparent', // 圆弧填充颜色
  activeStroke: '#fff', // 圆弧填充后的描边颜色
  activeFill: 'transparent', // 圆弧填充后的填充颜色
  innerStroke: 'red', // 内圆描边颜色
  innerFill: 'red', // 内圆填充颜色
  dotCount: 10, // 圆点数量
  dotStroke: 'transparent', // 圆点描边色
  dotFill: '#fff', //圆点填充色
  activeDotStroke: 'transparent', // 圆点激活后的描边色
  activeDotFill: '#fff' //圆点激活后的填充色
}

function CanvasDashboard(canvas, options) {
  this.options = Object.assign({}, DEFAULT_OPTIONS, options)

  this.canvas = canvas
  this.context = canvas.getContext('2d')

  // 定时器 相关
  this.timerId = 0
  this.animationId = 0

  this.initialize()
}

Object.assign(CanvasDashboard.prototype, {
  // 初始化 处理
  initialize() {},
  // 加载 图标
  loadIcon() {},
  // 设置 最小值
  setMinimumValue() {},
  // 设置 最大值
  setMaximumValue() {},
  // 设置 最小值、最大值
  setValue() {},
  // 绘制 实心圆
  drawCircle() {},
  // 绘制 圆弧
  drawArc() {},
  // 绘制 进度
  drawProgress() {},
  // 开始 动画
  startAnimate() {},
  // 停止 动画
  stopAnimate() {},
  // 销毁
  destroy() {}
})

export default CanvasDashboard
