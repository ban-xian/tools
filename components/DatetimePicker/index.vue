<!--
 * @Author: JieLiao
 * @Date: 2024-06-12 14:42:46
 * @Description: 日期时间选择组件
-->
<script setup>
import DatePicker from "./DatePicker.vue";
import TimePicker from "./TimePicker.vue";

const props = defineProps({
  // 时间类型，可选值为 date time year-month month-day datehour
  type: {
    type: String,
    default: "datetime"
  },
  // 选项过滤函数
  filter: {
    type: Function
  },
  // 自定义列排序数组, 子项可选值为year、month、day、hour、minute
  columnsOrder: {
    type: Array,
    default: () => []
  },
  // 选项格式化函数
  formatter: {
    type: Function,
    default: (type, value) => value
  }
});
</script>

<template>
  <Component
    :is="type === 'time' ? TimePicker : DatePicker"
    v-bind="{ ...$attrs, ...props }"
  >
    <template v-for="name in Object.keys($slots)" :key="name" #[name]>
      <slot :name></slot>
    </template>
  </Component>
</template>
