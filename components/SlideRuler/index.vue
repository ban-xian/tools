<!--
 * @Author: JieLiao
 * @Date: 2024-08-22 17:14:42
 * @Description: 滑动刻度尺组件
-->
<script setup>
import { onMounted, reactive } from 'vue'

const props = defineProps({
  // 尺子宽度
  canvasWidth: {
    type: Number,
    default: (document.body.clientWidth || 375) - 24,
  },
  // 尺子高度
  canvasHeight: {
    type: Number,
    default: 60,
  },
  // 当前值刻度线宽度
  currentLineWidth: {
    type: String,
    default: 'before:w-[2px]',
  },
  // 当前值刻度线高度
  currentLineHeight: {
    type: String,
    default: 'before:h-[16px]',
  },
  // 当前值刻度线颜色
  currentLineColor: {
    type: String,
    default: 'before:bg-[--van-blue]',
  },
  // 长刻度线高度
  heightDecimal: {
    type: Number,
    default: 16,
  },
  // 短刻度线高度
  heightDigit: {
    type: Number,
    default: 8,
  },
  // 长刻度线颜色
  colorDecimal: {
    type: String,
    default: '#B3BBB3',
  },
  // 短刻度线颜色
  colorDigit: {
    type: String,
    default: '#B3BBB3',
  },
  // 刻度线宽度
  lineWidth: {
    type: Number,
    default: 2,
  },
  // 两个刻度线之间的像素宽度
  divide: {
    type: Number,
    default: 10,
  },
  // 刻度字体大小
  fontSize: {
    type: Number,
    default: 16,
  },
  // 刻度字体颜色
  fontColor: {
    type: String,
    default: '#A7AAB4',
  },
  // 刻度字体与上边界距离
  fontMarginTop: {
    type: Number,
    default: 22,
  },
  // 是否显示状态文本
  showStatusText: {
    type: Boolean,
    default: true,
  },
  // 尺子最小值
  minValue: {
    type: Number,
    default: 0,
  },
  // 尺子最大值
  maxValue: {
    type: Number,
    default: 200,
  },
  // 警告最小值
  warnMinValue: {
    type: Number,
    default: 0,
  },
  // 警告最大值
  warnMaxValue: {
    type: Number,
    default: 0,
  },
  // 刻度小数位数
  precision: {
    type: Number,
    default: 1,
  },
})
// 尺子当前值
const currentValue = defineModel('currentValue', {
  type: Number,
  default: 100,
})
const emit = defineEmits(['change'])
let canvas
const localState = reactive({
  startX: 0,
  startY: 0,
  isTouchEnd: true,
  touchPoints: [],
})
const initCanvas = () => {
  canvas = document.querySelector('#canvasDom')
  handleDreawCanvas()
}
const handleDreawCanvas = () => {
  const context = canvas.getContext('2d')
  canvas.height = canvas.height
  let {
    canvasWidth,
    canvasHeight,
    maxValue,
    minValue,
    precision,
    divide,
    heightDecimal,
    heightDigit,
    lineWidth,
    colorDecimal,
    colorDigit,
    fontSize,
    fontColor,
    fontMarginTop,
  } = props
  // 计算当前值
  currentValue.value =
    currentValue.value > minValue
      ? currentValue.value < maxValue
        ? currentValue.value
        : maxValue
      : minValue
  currentValue.value = (Math.round((currentValue.value * 10) / precision) * precision) / 10
  emit('change', currentValue.value)
  let diffCurrentMin = ((currentValue.value - minValue) * divide) / precision,
    startValue = currentValue.value - Math.floor(canvasWidth / 2 / divide) * precision
  startValue = startValue > minValue ? (startValue < maxValue ? startValue : maxValue) : minValue
  let endValue = startValue + (canvasWidth / divide) * precision
  endValue = endValue < maxValue ? endValue : maxValue
  // 定义原点
  let origin = {
    x:
      diffCurrentMin > canvasWidth / 2
        ? (canvasWidth / 2 - ((currentValue.value - startValue) * divide) / precision) * 2
        : (canvasWidth / 2 - diffCurrentMin) * 2,
    y: canvasHeight * 2,
  }
  // 定义刻度线样式
  heightDecimal = heightDecimal * 2
  heightDigit = heightDigit * 2
  lineWidth = lineWidth * 2
  // 定义刻度字体样式
  fontSize = fontSize * 2
  fontMarginTop = fontMarginTop * 2
  // 每个刻度所占位的px
  divide = divide * 2
  // 定义每个刻度的精度
  const derivative = 1 / precision
  for (let i = Math.round((startValue / precision) * 10) / 10; i <= endValue / precision; i++) {
    context.beginPath()
    // 画刻度线
    context.moveTo(origin.x + (i - startValue / precision) * divide, 0)
    // 画线到刻度高度，10的位数就加高
    context.lineTo(
      origin.x + (i - startValue / precision) * divide,
      i % 10 === 0 ? heightDecimal : heightDigit,
    )
    context.lineWidth = lineWidth
    // 10的位数就加深
    context.strokeStyle = i % 10 === 0 ? colorDecimal : colorDigit
    context.stroke()
    // 描绘刻度值
    context.fillStyle = fontColor
    context.textAlign = 'center'
    context.textBaseline = 'top'
    if (i % 10 === 0) {
      context.font = `${fontSize}px Arial`
      context.fillText(
        Math.round(i / 10) / (derivative / 10),
        origin.x + (i - startValue / precision) * divide,
        fontMarginTop,
      )
    }
    context.closePath()
  }
}
const handleTouchStart = (e) => {
  e.preventDefault()
  if (e || localState.isTouchEnd) {
    handleTouchPoints(e)
    const touch = (e.touches && e.touches[0]) || e
    localState.startX = touch.pageX
    localState.startY = touch.pageY
    localState.startT = new Date().getTime() // 记录手指按下的开始时间
    localState.isTouchEnd = false // 当前开始滑动
  }
}
const handleTouchMove = (e) => {
  handleTouchPoints(e)
  const touch = (e.touches && e.touches[0]) || e
  const deltaX = touch.pageX - localState.startX
  const deltaY = touch.pageY - localState.startY
  // 如果X方向上的位移大于Y方向，则认为是左右滑动
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(Math.round(deltaX / props.divide)) > 0) {
    if (!handleRebound(deltaX)) return
    handleMoveDreaw(deltaX)
    localState.startX = touch.pageX
    localState.startY = touch.pageY
  }
}
const handleTouchEnd = () => {
  handleMoveDreaw(handleInertialShift())
  localState.isTouchEnd = true
  localState.touchPoints = []
  canvas.style.transform = 'translate3d(0, 0, 0)'
}
const handleTouchPoints = (e) => {
  const touch = (e.touches && e.touches[0]) || e
  const time = new Date().getTime()
  const shift = touch.pageX
  localState.touchPoints.push({ time: time, shift: shift })
}
const handleInertialShift = () => {
  let s = 0
  if (localState.touchPoints.length >= 4) {
    const _points = localState.touchPoints.slice(-4),
      v = ((_points[3].shift - _points[0].shift) / (_points[3].time - _points[0].time)) * 1000 // v 手指离开屏幕后的速度px/s
    const a = 6000 // a 手指离开屏幕后的加速度
    s = (Math.sign(v) * Math.pow(v, 2)) / (2 * a) // s 手指离开屏幕后惯性距离
  }
  return s
}
const handleRebound = (deltaX) => {
  const { maxValue, minValue } = props
  if (
    (currentValue.value === minValue && deltaX > 0) ||
    (currentValue.value === maxValue && deltaX < 0)
  ) {
    const reboundX = Math.sign(deltaX) * 1.5988 * Math.pow(Math.abs(deltaX), 0.7962)
    canvas.style.transform = `translate3d(${reboundX}px, 0, 0)`
    return false
  }
  return true
}
const handleMoveDreaw = (shift) => {
  const { divide, precision } = props
  let moveValue = Math.round(-shift / divide),
    _moveValue = Math.abs(moveValue)
  const draw = () => {
    if (_moveValue < 1) return
    currentValue.value += Math.sign(moveValue) * precision
    handleDreawCanvas()
    window.requestAnimationFrame(draw)
    _moveValue--
  }
  draw()
}
onMounted(initCanvas)
</script>

<template>
  <div>
    <div class="mb-[16px] flex">
      <div
        class="h-[50px] mx-auto px-[25px] text-[14px] leading-[50px] text-[#fff] rounded-[25px]"
        :class="[
          (warnMinValue && currentValue < warnMinValue) ||
          (warnMaxValue && currentValue > warnMaxValue)
            ? 'bg-[#EA241E]'
            : 'bg-[--van-blue]',
        ]"
      >
        <span class="mr-[4px] text-[32px] font-bold">{{ currentValue }}</span>
        <span v-if="showStatusText">
          {{
            (warnMinValue && currentValue < warnMinValue) ||
            (warnMaxValue && currentValue > warnMaxValue)
              ? '超标'
              : '正常'
          }}
        </span>
      </div>
    </div>
    <div
      class="ruler-container m-0 p-0 relative bg-white rounded-[8px]"
      :class="[
        currentLineWidth,
        currentLineHeight,
        currentLineColor,
        ((warnMinValue && currentValue < warnMinValue) ||
          (warnMaxValue && currentValue > warnMaxValue)) &&
          'warning',
      ]"
    >
      <canvas
        class="m-[0_auto] p-0 block duration-300"
        id="canvasDom"
        :width="canvasWidth * 2"
        :height="canvasHeight * 2"
        :style="{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      ></canvas>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ruler-container {
  &::before {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    z-index: 1;
  }
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    right: 50%;
    transform: translateX(50%);
    border-top: 12px solid var(--van-blue);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
}
.warning {
  &::before {
    background: #ea241e;
  }
  &::after {
    border-top-color: #ea241e;
  }
}
</style>
