<!--
 * @Author: liaojie
 * @Date: 2023-08-11 11:23:16
 * @Description: 输入框公用组件
-->
<template>
  <div class="field-container">
    <van-field
      ref="field"
      v-model.trim="inputValue"
      v-bind="$attrs"
      @input="handleInput"
      @blur="handleBlur"
    />
    <div v-if="countText && maxTextLength" class="count-text">
      {{ textNum }}/{{ maxTextLength }}
    </div>
  </div>
</template>

<script>
import { toArray } from 'lodash'

export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    // 当前输入值
    value: {
      type: String,
      default: ''
    },
    // 输入的最大字符数
    maxTextLength: {
      type: Number,
      default: 300
    },
    // 是否显示字数统计，需要设置maxTextlength属性
    countText: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 当前输入值
      inputValue: this.value,
      // 已输入字符字数
      textNum: 0
    }
  },
  watch: {
    value: {
      handler() {
        this.inputValue = this.value
        if (!this.countText || !this.maxTextLength) return
        this.textNum = toArray(this.inputValue).length
      },
      deep: true
    }
  },
  created() {
    if (!this.countText || !this.maxTextLength) return
    this.textNum = toArray(this.inputValue).length
  },
  methods: {
    // 设置光标位置
    setSelectionStart() {
      if (!this.inputValue.length) return
      const textAreaDom = document.querySelector('.van-field__control')
      textAreaDom.setSelectionRange(this.inputValue.length, this.inputValue.length)
    },
    // 设置聚焦
    setFocus() {
      this.$refs['field'].focus()
    },
    // 输入框失焦
    handleBlur() {
      this.$emit('blur')
    },
    // 输入框输入
    handleInput() {
      // 判断当前输入字符数是否已超出最大可输入字符数
      if (this.maxTextLength && this.countText) {
        const strArr = toArray(this.inputValue)
        this.textNum = strArr.length
        if (this.textNum > this.maxTextLength) {
          const lastArr = strArr.slice(0, this.maxTextLength)
          this.textNum = lastArr.length
          this.inputValue = lastArr.join('')
        }
      }
      this.$emit('input', this.inputValue)
    }
  }
}
</script>
<style lang="less" scoped>
.field-container {
  padding: 32px;
  background: #fff;
  border-radius: 16px;
  :deep(.van-cell) {
    padding: 0;
    .van-field__control {
      height: 240px;
      font-size: 28px;
      line-height: 40px;
      &::placeholder {
        font-size: 32px;
        font-family: PingFang SC-Medium, PingFang SC;
        color: #9ea3ba;
      }
    }
  }
  .count-text {
    margin-top: 8px;
    font-size: 28px;
    text-align: right;
    color: #646566;
  }
}
</style>
