<template>
  <svg ref="svg" xmlns="http://www.w3.org/2000/svg" class="wrapper" :viewBox="`0.5 0.5 ${viewWidth} ${viewHeight}`" preserveAspectRatio="xMidYMid meet">
    <!-- 引用定义 start -->
    <defs>
      <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M0,0 30,0 30,30" stroke="red" stroke-width="0.5" fill="none"></path>
      </pattern>

      <!-- 水管 start -->
      <!-- <pattern id="hPipe" x="0" y="0" width="0.1" height="1"> -->
      <pattern id="hPipe" x="0" y="0" :width="DASHBOARD_WIDTH" :height="PIPE_WIDTH" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" :y2="PIPE_WIDTH" stroke="black" stroke-width="0.5"></line>
        <rect x="0.5" y="0" :width="LIGHT_LENGTH" :height="PIPE_WIDTH" fill="yellow"></rect>
        <!-- <line :x1="LIGHT_LENGTH + 0.5" y1="0" :x2="LIGHT_LENGTH + 0.5" :y2="PIPE_WIDTH" stroke="black" stroke-width="1"></line> -->
        <rect :x="LIGHT_LENGTH + 0.5" y="0" :width="DARK_LENGTH" :height="PIPE_WIDTH" fill="black"></rect>
        <!-- <line :x1="LIGHT_LENGTH + DARK_LENGTH + 1.5" y1="0" :x2="LIGHT_LENGTH + DARK_LENGTH + 1.5" :y2="PIPE_WIDTH" stroke="black" stroke-width="1"></line> -->
        <rect :x="LIGHT_LENGTH + DARK_LENGTH + 0.5" y="0" :width="LIGHT_LENGTH" :height="PIPE_WIDTH" fill="yellow"></rect>
        <line :x1="DASHBOARD_WIDTH - 0.5" y1="0" :x2="DASHBOARD_WIDTH - 0.5" :y2="PIPE_WIDTH" stroke="black" stroke-width="0.5"></line>
      </pattern>

      <pattern id="vPipe" x="0" y="0" :width="PIPE_WIDTH" :height="DASHBOARD_WIDTH" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" :x2="PIPE_WIDTH" y2="0" stroke="black" stroke-width="0.5"></line>
        <rect x="0" y="0.5" :width="PIPE_WIDTH" :height="LIGHT_LENGTH" fill="yellow"></rect>
        <!-- <line x1="0" :y1="LIGHT_LENGTH + 0.5" :x2="PIPE_WIDTH" :y2="LIGHT_LENGTH + 0.5" stroke="black" stroke-width="1"></line> -->
        <rect x="0" :y="LIGHT_LENGTH + 0.5" :width="PIPE_WIDTH" :height="DARK_LENGTH" fill="black"></rect>
        <!-- <line x1="0" :y1="LIGHT_LENGTH + DARK_LENGTH + 1.5" :x2="PIPE_WIDTH" :y2="LIGHT_LENGTH + DARK_LENGTH + 1.5" stroke="black" stroke-width="1"></line> -->
        <rect x="0" :y="LIGHT_LENGTH + DARK_LENGTH + 0.5" :width="PIPE_WIDTH" :height="LIGHT_LENGTH" fill="yellow"></rect>
        <line x1="0" :y1="DASHBOARD_WIDTH - 0.5" :x2="PIPE_WIDTH" :y2="DASHBOARD_WIDTH - 0.5" stroke="black" stroke-width="0.5"></line>
      </pattern>
      <!-- 水管 end -->

      <!-- 箭头、圆 start -->
      <g id="arrowCircle" :transform="`translate(${(10/Math.sin(Math.PI/4) + 5)*Math.tan(Math.PI/4)}, 10)`">
        <circle cx="0" cy="0" r="10" fill="blue"></circle>
        <polyline
          :points="`
            -${(10/Math.sin(Math.PI/4) + 5)*Math.tan(Math.PI/4)},-5
            0,${10/Math.sin(Math.PI/4)}
            ${(10/Math.sin(Math.PI/4) + 5)*Math.tan(Math.PI/4)},-5`
          "
          fill="none"
          stroke="black"
          stroke-width="3"
        ></polyline>
      </g>
      <!-- 箭头、圆 end -->

      <!-- 水盘 start -->
      <polygon
        id="waterPond"
        points="0,0 0,24 80,24 80,0 72,0 72,16 8,16 8,0"
        fill="yellow"
      ></polygon>
      <!-- 水盘 end -->

      <!-- 警示灯 start -->
      <g id="warnLamp">
        <path d="M0,24 A24,24,0,0,1,48,24 z" fill="white" stroke="black" stroke-width="1"></path>
        <line x1="24" y1="24" x2="24" y2="42" stroke="black" stroke-width="3"></line>
      </g>
      <!-- 警示灯 end -->

      <!-- 闪电 start -->
      <path
        id="lightning"
        d="M826.04032 1.71008 504.32 150.15936 188.93824 583.13728 572.43648 583.13728 312.64768 1022.28992 826.04032 465.6128 448.72704 465.6128Z"
        fill="black"
        transform="scale(0.015)"
      ></path>
      <!-- 闪电 end -->

      <!--气罐 start  -->
      <g id="gasTank">
        <path d="M0,12 A12,12,0,0,1,24,12 L24,36 A12,12,0,0,1,0,36 z" fill="green" stroke="black" stroke-width="1"></path>
        <line x1="0" y1="12" x2="24" y2="12" stroke="black" stroke-width="2"></line>
        <use xlink:href="#lightning" x="4"></use>
      </g>
      <!--气罐 end  -->

      <!--真实气罐 start  -->
      <g id="realGasTank01">
        <use xlink:href="#gasTank"></use>
        <line x1="24" y1="36" x2="36" y2="36" stroke="black" stroke-width="2"></line>
      </g>
      <!--真实气罐 end  -->

      <!-- 元件盒子 start -->
      <rect id="componentBox" width="72" height="36" fill="blue" stroke="black" stroke-width="1"></rect>
      <!-- 元件盒子 end -->

      <!-- 开关 start -->
      <g id="switch">
        <line x1="10" y1="0" x2="10" y2="14" stroke="black" stroke-width="1"></line>
        <line x1="0" y1="14" x2="20" y2="14" stroke="black" stroke-width="1"></line>
        <line x1="0" y1="22" x2="20" y2="22" stroke="black" stroke-width="1"></line>
        <line x1="10" y1="22" x2="10" y2="36" stroke="black" stroke-width="1"></line>
      </g>
      <!-- 开关 end -->

      <!-- 触头 start -->
      <g id="prods">
        <line x1="2" y1="0" x2="2" y2="36" stroke="black" stroke-width="1"></line>
        <line x1="10" y1="0" x2="10" y2="36" stroke="black" stroke-width="1"></line>
        <circle cx="2" cy="24" r="4" fill="black"></circle>
      </g>
      <!-- 触头 end -->

      <!-- 手柄 start -->
      <g id="handle">
        <line x1="0" y1="12" x2="16" y2="12" stroke="black" stroke-width="1"></line>
        <line x1="0" y1="22" x2="24" y2="22" stroke="black" stroke-width="1"></line>
        <line x1="8" y1="17" x2="32" y2="17" stroke="black" stroke-width="1" transform-origin="20 17" :transform="`rotate(${Math.atan(1.25) * 180 / Math.PI})`"></line>
        <circle cx="12" cy="6" r="4" fill="white" stroke="black" stroke-width="1"></circle>
      </g>

      <g id="backslashHandle">
        <rect x="0" y="0" width="12" height="24" fill="green" stroke="black" stroke-width="1"></rect>
        <line x1="0" y1="0" x2="12" y2="24" stroke="black" stroke-width="1"></line>
      </g>
      <!-- 手柄 end -->

      <!-- 字符 M 盒子 start -->
      <g id="letterMBox">
        <rect x="0"  y="0" width="48" height="36" fill="green" stroke="none"></rect>
        <text x="14" y="27" font-size="24" font-weight="bold">M</text>
      </g>
      <!-- 字符 M 盒子 end -->

      <!-- 字符 W start -->
      <polyline id="letterW" points="0,0 0,10, 8,0 16,10 20,5" fill="none" stroke="black" stroke-width="1"></polyline>
      <!-- 字符 W end -->

      <!-- 锚盒 start -->
      <g id="anchorBox">
        <rect x="0" y="0" width="36" height="48" fill="blue" stroke="black" stroke-width="1"></rect>
        <polygon points="8,18 18,2 28,18 20,12 20,46 16,46 16,12" fill="black"></polygon>
        <path id="bracket" d="M32,6 A100,50,0,0,0,32,42" fill="none" stroke="black" stroke-width="2"></path>
        <use xlink:href="#bracket" transform-origin="18 24" transform="scale(-1, 1)"></use>
      </g>
      <!-- 锚盒 start -->

      <!-- 实操 开关 start -->
      <g id="realSwitch01">
        <use xlink:href="#componentBox"></use>
        <use xlink:href="#switch" x="8"></use>
        <use xlink:href="#prods" x="45"></use>
        <use xlink:href="#handle" x="72"></use>
      </g>

      <g id="realSwitch02">
        <use xlink:href="#componentBox"></use>
        <use xlink:href="#prods" x="12"></use>
        <use xlink:href="#switch" x="45"></use>
        <use xlink:href="#handle" x="72"></use>
      </g>

      <g id="realSwitch03">
        <rect width="48" height="36" fill="green"></rect>
        <use xlink:href="#handle" x="48"></use>
      </g>

      <g id="realSwitch04">
        <use xlink:href="#componentBox"></use>
        <use xlink:href="#letterW" x="-20" y="10"></use>
        <use xlink:href="#prods" x="12"></use>
        <use xlink:href="#switch" x="45"></use>
        <use xlink:href="#backslashHandle" x="72" y="6"></use>
      </g>

      <g id="realSwitch05">
        <use xlink:href="#componentBox"></use>
        <use xlink:href="#letterW" x="-20" y="10"></use>
        <use xlink:href="#switch" x="8"></use>
        <use xlink:href="#prods" x="45"></use>
        <use xlink:href="#backslashHandle" x="72" y="6"></use>
      </g>
      <!-- 实操 开关 end -->
    </defs>
    <!-- 引用定义 end -->

    <!-- 正文 start -->
    <g>
      <rect x="0" y="0" :width="realWidth" :height="realHeight" fill="url(#grid)"></rect>

      <!-- 水管 start -->
      <g>
        <!-- 水平布局 start -->
        <!-- <rect x="0" y="0" :width="DASHBOARD_WIDTH * 20" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect> -->
        <rect x="240" y="50" width="210" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>
        <rect x="450" y="50" width="120" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>
        <rect x="570" y="50" width="120" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>
        <rect x="690" y="50" width="210" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>

        <rect x="810" y="140" width="90" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>
        <rect x="900" y="140" width="90" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>
        <rect x="1110" y="140" width="90" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>

        <rect x="60" y="260" width="120" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>

        <rect x="810" y="380" width="90" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>
        <rect x="900" y="380" width="90" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>
        <rect x="990" y="380" width="120" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>

        <rect x="180" y="500" width="60" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>
        <rect x="240" y="500" width="60" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>

        <rect x="990" y="590" width="120" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>

        <rect x="810" y="680" width="180" :height="PIPE_WIDTH" fill="url(#hPipe)"></rect>

        <rect x="60" y="860" width="1050" :height="PIPE_WIDTH" fill="url(#hPipe)">
          <animate
            id="right"
            attributeType="XML"
            attributeName="x"
            begin="0; left.end"
            from="60"
            to="800"
            dur="3s"
            fill="freeze"
          ></animate>
          <animate
            id="left"
            attributeType="XML"
            attributeName="x"
            begin="right.end"
            from="800"
            to="60"
            dur="3s"
            fill="freeze"
          ></animate>
        </rect>
        <!-- 水平布局 end -->

        <!-- 垂直布局 start -->
        <!-- <rect x="0" y="0" :width="PIPE_WIDTH" :height="DASHBOARD_WIDTH * 14" fill="url(#vPipe)"></rect> -->
        <rect x="60" y="260" :width="PIPE_WIDTH" height="600" fill="url(#vPipe)">
          <animateTransform
            id="down"
            attributeType="XML"
            attributeName="transform"
            type="translate"
            begin="0; up.end"
            from="0, 0"
            to="0, 120"
            dur="1s"
            fill="freeze"
            repeatCount="indefinite"
          ></animateTransform>
          <!-- <animateTransform
            id="up"
            attributeType="XML"
            attributeName="transform"
            type="translate"
            begin="down.end"
            from="0, 120"
            to="0, 0"
            dur="3s"
            fill="freeze"
          ></animateTransform> -->
        </rect>

        <rect x="180" y="510" :width="PIPE_WIDTH" height="240" fill="url(#vPipe)"></rect>

        <rect x="240" y="50" :width="PIPE_WIDTH" height="450" fill="url(#vPipe)"></rect>

        <rect x="300" y="500" :width="PIPE_WIDTH" height="250" fill="url(#vPipe)"></rect>

        <rect x="450" y="50" :width="PIPE_WIDTH" height="700" fill="url(#vPipe)"></rect>

        <rect x="570" y="50" :width="PIPE_WIDTH" height="700" fill="url(#vPipe)"></rect>

        <rect x="690" y="50" :width="PIPE_WIDTH" height="700" fill="url(#vPipe)"></rect>

        <rect x="810" y="140" :width="PIPE_WIDTH" height="240" fill="url(#vPipe)"></rect>
        <rect x="810" y="380" :width="PIPE_WIDTH" height="300" fill="url(#vPipe)"></rect>

        <rect x="900" y="50" :width="PIPE_WIDTH" height="90" fill="url(#vPipe)"></rect>
        <rect x="900" y="140" :width="PIPE_WIDTH" height="240" fill="url(#vPipe)"></rect>

        <rect x="990" y="140" :width="PIPE_WIDTH" height="240" fill="url(#vPipe)"></rect>

        <rect x="1110" y="150" :width="PIPE_WIDTH" height="240" fill="url(#vPipe)"></rect>
        <rect x="1110" y="590" :width="PIPE_WIDTH" height="280" fill="url(#vPipe)"></rect>

        <rect x="1200" y="140" :width="PIPE_WIDTH" height="210" fill="url(#vPipe)"></rect>
        <!-- 垂直布局 end -->
      </g>
      <!-- 水管 end -->

      <!-- 元件 start -->
      <g>
        <!-- 圆和箭头 start -->
        <use xlink:href="#arrowCircle" x="225" y="120"></use>
        <use xlink:href="#arrowCircle" x="165" y="550"></use>
        <use xlink:href="#arrowCircle" x="285" y="550"></use>
        <use xlink:href="#arrowCircle" x="435" y="180"></use>
        <use xlink:href="#arrowCircle" x="795" y="188" transform-origin="814 197" transform="rotate(180)"></use>
        <!-- 圆和箭头 end -->

        <!-- 实操开关 start -->
        <use xlink:href="#realSwitch01" x="555" y="120"></use>

        <use xlink:href="#realSwitch02" x="675" y="120"></use>
        <use xlink:href="#realSwitch02" x="975" y="300"></use>

        <use xlink:href="#realSwitch03" x="430" y="330"></use>

        <use xlink:href="#realSwitch04" x="675" y="520"></use>

        <use xlink:href="#realSwitch05" x="1185" y="240"></use>
        <!-- 实操开关 end -->

        <!-- 字母 M start -->
        <use xlink:href="#letterMBox" x="160" y="660"></use>
        <use xlink:href="#letterMBox" x="280" y="660"></use>
        <!-- 字母 M end -->

        <!-- 锚盒 start -->
        <use xlink:href="#anchorBox" x="888" y="180"></use>
        <use xlink:href="#anchorBox" x="978" y="180"></use>
        <!-- 锚盒 start -->

        <!-- 两个 接水盒 start -->
        <g>
          <polyline points="180,260 180,330 150,330 150,360" fill="none" stroke="black" stroke-width="2"></polyline>
          <use xlink:href="#waterPond" x="110" y="350"></use>
        </g>
        <use xlink:href="#waterPond" x="1165" y="345"></use>
        <!-- 两个 接水盒 start -->

        <!-- 警示灯 start -->
        <use xlink:href="#warnLamp" x="550" y="10"></use>
        <!-- 警示灯 end -->

        <!-- 真实气罐 start -->
        <use xlink:href="#realGasTank01" x="654" y="240"></use>
        <!-- 真实气罐 end -->

        <!-- 大水槽 start -->
        <rect x="110" y="750" width="660" height="60" fill="blue"></rect>
        <!-- 大水槽 end -->

        <!-- 反馈 start -->
        <g>
          <polyline points="240,390 390,390 390,750" fill="none" stroke="black" stroke-width="2"></polyline>
          <polyline points="300,390 300,330 360,330 360,360" fill="none" stroke="black" stroke-width="2"></polyline>
          <rect x="342" y="360" width="36" height="42" fill="blue"></rect>
          <line x1="342" y1="372" x2="378" y2="372" stroke="black" stroke-width="2"></line>
          <polyline points="360,360 378,372 360,384" fill="none" stroke="black" stroke-width="2"></polyline>
          <polyline points="360,402 366,408 360,414 366,420 362,423 366,425" fill="none" stroke="black" stroke-width="2"></polyline>
        </g>
        <!-- 反馈 end -->

        <!-- 度量 start -->
        <g>
          <line x1="1020" y1="580" x2="1020" y2="544" stroke="gray" stroke-width="2"></line>
          <line x1="984" y1="544" x2="1056" y2="544" stroke="gray" stroke-width="2" transform-origin="1020 544" transform="rotate(-20)"></line>
          <polygon points="988,556 980,564 996,564" fill="gray" stroke="black" stroke-width="0.5"></polygon>
          <circle cx="988" cy="556" r="3" fill="white" stroke="black" stroke-width="0.5"></circle>
          <rect x="1056" y="544" width="36" height="36" fill="blue" transform-origin="1056 544" transform="translate(-16, -24) scale(1.2, 1)  rotate(-45)"></rect>
          <rect x="990" y="580" width="60" height="120" fill="#ddd"></rect>
        </g>
        <!-- 度量 end -->
      </g>
      <!-- 元件 end -->
    </g>
    <!-- 正文 end -->
  </svg>
</template>

<script>
import {
  DESIGN_WIDTH,
  DESIGN_HEIGHT,
  PIPE_WIDTH,
  DARK_LENGTH,
  LIGHT_LENGTH,
  DASHBOARD_WIDTH
} from './constant'

export default {
  name: 'WaterPipe',
  data() {
    return {
      realWidth: DESIGN_WIDTH,
      realHeight: DESIGN_HEIGHT,
      viewWidth: DESIGN_WIDTH,
      viewHeight: DESIGN_HEIGHT
    }
  },
  created() {
    this.DESIGN_WIDTH = DESIGN_WIDTH
    this.DESIGN_HEIGHT = DESIGN_HEIGHT
    this.PIPE_WIDTH = PIPE_WIDTH
    this.DARK_LENGTH = DARK_LENGTH
    this.LIGHT_LENGTH = LIGHT_LENGTH
    this.DASHBOARD_WIDTH = DASHBOARD_WIDTH

    this.bindResizeHandler()
  },
  mounted() {
    this.resizeHandler()
  },
  beforeDestroy() {
    this.unbindResizeHandler()
  },
  methods: {
    resizeHandler() {
      const { $refs } = this
      const svg = $refs.svg

      const { clientWidth, clientHeight } = svg

      this.realWidth = clientWidth
      this.realHeight = clientHeight
    },
    bindResizeHandler() {
      window.addEventListener('resize', this.resizeHandler, false)
    },
    unbindResizeHandler() {
      window.removeEventListener('resize', this.resizeHandler)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
}
</style>
