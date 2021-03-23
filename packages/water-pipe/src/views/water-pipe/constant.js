// 设计 尺寸
export const DESIGN_WIDTH = 1280
export const DESIGN_HEIGHT = 900

// 水管 宽度
export const PIPE_WIDTH = 10
export const DARK_LENGTH = 20
export const LIGHT_LENGTH = 20
export const DASHBOARD_WIDTH = LIGHT_LENGTH * 2 + DARK_LENGTH + 1 // 3

// 动画 属性
export const ANIMATION_LENGTH = 60
export const ANIMATION_DOUBLE_LENGTH = ANIMATION_LENGTH * 2
export const ANIMATION_DURATION = 1000

// 线
export const LINE_LISTS = [
  // 水平线
  { id: 'H001@001', x: 240, y: 50, width: 210, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },
  { id: 'H001@002', x: 450, y: 50, width: 120, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },
  { id: 'H001@003', x: 570, y: 50, width: 120, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },
  { id: 'H001@004', x: 690, y: 50, width: 210, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },

  { id: 'H002@001', x: 810, y: 140, width: 90, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },
  { id: 'H002@002', x: 900, y: 140, width: 90, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },
  { id: 'H002@003', x: 1110, y: 140, width: 90, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },

  { id: 'H003@001', x: 60, y: 260, width: 150, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },

  { id: 'H004@001', x: 810, y: 380, width: 90, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },
  { id: 'H004@002', x: 900, y: 380, width: 90, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },
  { id: 'H004@003', x: 990, y: 380, width: 120, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },

  { id: 'H005@001', x: 180, y: 500, width: 60, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },
  { id: 'H005@002', x: 240, y: 500, width: 60, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },

  { id: 'H006@001', x: 990, y: 590, width: 120, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },

  { id: 'H007@001', x: 810, y: 680, width: 180, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },

  { id: 'H008@001', x: 60, y: 860, width: 1050, height: PIPE_WIDTH, fill: 'url(#hPipe)', needAnimate: true },

  // 垂直线
  {
    id: 'V001@001',
    x: 60,
    y: 260,
    width: PIPE_WIDTH,
    height: 600,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  },

  {
    id: 'V002@001',
    x: 180,
    y: 510,
    width: PIPE_WIDTH,
    height: 240,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  },

  {
    id: 'V003@001',
    x: 240,
    y: 50,
    width: PIPE_WIDTH,
    height: 450,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  },

  {
    id: 'V004@001',
    x: 300,
    y: 500,
    width: PIPE_WIDTH,
    height: 250,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  },

  {
    id: 'V005@001',
    x: 450,
    y: 50,
    width: PIPE_WIDTH,
    height: 700,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  },

  {
    id: 'V006@001',
    x: 570,
    y: 50,
    width: PIPE_WIDTH,
    height: 700,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  },

  {
    id: 'V007@001',
    x: 690,
    y: 50,
    width: PIPE_WIDTH,
    height: 700,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  },

  {
    id: 'V008@001',
    x: 810,
    y: 140,
    width: PIPE_WIDTH,
    height: 240,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  },
  {
    id: 'V008@002',
    x: 810,
    y: 380,
    width: PIPE_WIDTH,
    height: 300,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  },

  {
    id: 'V009@001',
    x: 900,
    y: 50,
    width: PIPE_WIDTH,
    height: 90,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  },
  {
    id: 'V009@002',
    x: 900,
    y: 140,
    width: PIPE_WIDTH,
    height: 240,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  },

  {
    id: 'V0010@001',
    x: 990,
    y: 140,
    width: PIPE_WIDTH,
    height: 240,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  },

  {
    id: 'V0011@001',
    x: 1110,
    y: 150,
    width: PIPE_WIDTH,
    height: 240,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  },
  {
    id: 'V0011@002',
    x: 1110,
    y: 590,
    width: PIPE_WIDTH,
    height: 280,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  },

  {
    id: 'V0012@001',
    x: 1200,
    y: 140,
    width: PIPE_WIDTH,
    height: 210,
    fill: 'url(#vPipe)',
    isVertical: true,
    needAnimate: true
  }
]
