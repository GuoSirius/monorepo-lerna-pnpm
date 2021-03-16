<template>
  <g>
    <defs>
      <clipPath :id="clipPathId">
        <rect :x="x" :y="y" :width="width" :height="height">
          <animate
            v-if="needAnimate"
            attributeType="XML"
            :attributeName="animateAttributeName"
            :from="animateFrom"
            :to="animateTo"
            :dur="`${duration}ms`"
            fill="freeze"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </clipPath>
    </defs>
    <rect :x="rectX" :y="rectY" :width="rectWidth" :height="rectHeight" :fill="fill" :clip-path="`url(#${clipPathId})`">
      <animateTransform
        v-if="needAnimate"
        attributeType="XML"
        attributeName="transform"
        type="translate"
        from="0, 0"
        :to="animateTransformTo"
        :dur="`${duration}ms`"
        fill="freeze"
        repeatCount="indefinite"
      ></animateTransform>
    </rect>
  </g>
</template>

<script>
import uniqueId from 'lodash/uniqueId'

import {
  ANIMATION_LENGTH,
  ANIMATION_DOUBLE_LENGTH,
  ANIMATION_DURATION
} from './constant'

export default {
  name: 'LiePipe',
  props: {
    id: {
      type: String,
      default: ''
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    fill: {
      type: String,
      default: 'none'
    },
    duration: {
      type: Number,
      default: ANIMATION_DURATION
    },
    isReverse: {
      type: Boolean,
      default: false
    },
    isVertical: {
      type: Boolean,
      default: false
    },
    needAnimate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    prefix() {
      return this.isVertical ? 'V' : 'H'
    },
    clipPathId() {
      const { id, prefix } = this

      return id || `${prefix}${Date.now()}@${uniqueId()}`
    },
    animateAttributeName() {
      return this.isVertical ? 'y' : 'x'
    },
    animateFrom() {
      const { x, y, isVertical } = this

      return isVertical ? y : x
    },
    animateTo() {
      const { isReverse, animateFrom } = this

      const animationLength = isReverse ? -ANIMATION_LENGTH : ANIMATION_LENGTH

      return animateFrom - animationLength
    },
    animateTransformTo() {
      const { isReverse, isVertical } = this

      const animationLength = isReverse ? -ANIMATION_LENGTH : ANIMATION_LENGTH
      const animateTransformTo = [animationLength, 0]

      if (isVertical) animateTransformTo.reverse()

      return animateTransformTo.join(',')
    },
    rectX() {
      const { x, isVertical } = this

      return isVertical ? x : x - ANIMATION_LENGTH
    },
    rectY() {
      const { y, isVertical } = this

      return isVertical ? y - ANIMATION_LENGTH : y
    },
    rectWidth() {
      const { width, isVertical } = this

      return isVertical ? width : width + ANIMATION_DOUBLE_LENGTH
    },
    rectHeight() {
      const { height, isVertical } = this

      return isVertical ? height + ANIMATION_DOUBLE_LENGTH : height
    }
  },
  created() {
    this.ANIMATION_LENGTH = ANIMATION_LENGTH
    this.ANIMATION_DOUBLE_LENGTH = ANIMATION_DOUBLE_LENGTH
    this.ANIMATION_DURATION = ANIMATION_DURATION
  }
}
</script>
