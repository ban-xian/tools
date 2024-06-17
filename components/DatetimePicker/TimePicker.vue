<!--
 * @Author: JieLiao
 * @Date: 2024-06-12 14:46:34
 * @Description: 时间选择组件
-->
<script setup>
import { ref, watch, computed, nextTick, useAttrs } from "vue";
import dayjs from "dayjs";
import { clamp, times, padZero, getIndexes } from "./utils";

// 获取透传的属性
const attrs = useAttrs();
const props = defineProps({
  // 当前日期
  modelValue: {
    type: String,
    default: dayjs().format("HH:mm")
  },
  // 最小小时
  minHour: {
    type: [Number, String],
    default: 0
  },
  // 最大小时
  maxHour: {
    type: [Number, String],
    default: 23
  },
  // 最小分钟
  minMinute: {
    type: [Number, String],
    default: 0
  },
  // 最大分钟
  maxMinute: {
    type: [Number, String],
    default: 59
  }
});
const emit = defineEmits(["update:modelValue", "change"]);
// 过滤时间
const formatValue = value => {
  const { minHour, maxHour, maxMinute, minMinute } = props;
  if (!value) return (value = `${padZero(minHour)}:${padZero(minMinute)}`);
  let [hour, minute] = value.split(":");
  hour = padZero(clamp(+hour, +minHour, +maxHour));
  minute = padZero(clamp(+minute, +minMinute, +maxMinute));
  return `${hour}:${minute}`;
};
// 选中数据
const selectedValues = ref([]);
// 当前时间
const currentTime = ref(formatValue(props.modelValue));
// 时间选择范围
const ranges = computed(() => [
  {
    type: "hour",
    range: [+props.minHour, +props.maxHour]
  },
  {
    type: "minute",
    range: [+props.minMinute, +props.maxMinute]
  }
]);
const originColumns = computed(() =>
  ranges.value.map(({ type, range: rangeArr }) => {
    let values = times(rangeArr[1] - rangeArr[0] + 1, index =>
      padZero(rangeArr[0] + index)
    );
    if (attrs.filter) values = attrs.filter(type, values);
    return {
      type,
      values
    };
  })
);
// 每一列显示的数据
const columns = computed(() =>
  originColumns.value.map(column =>
    column.values.map(value => attrs.formatter(column.type, value))
  )
);
// 更新当前选中时间
const updateColumnValue = () => {
  const [hour, minute] = currentTime.value.split(":");
  selectedValues.value = [
    attrs.formatter("hour", hour),
    attrs.formatter("minute", minute)
  ];
};
// 更新当前时间
const updateInnerValue = () => {
  const [hourIndex, minuteIndex] = getIndexes(
    selectedValues.value,
    columns.value
  );
  const [hourColumn, minuteColumn] = originColumns.value;
  const hour =
    hourColumn?.values[hourIndex]?.value || hourColumn?.values[0]?.value;
  const minute =
    minuteColumn?.values[minuteIndex]?.value || minuteColumn?.values[0]?.value;
  currentTime.value = formatValue(`${hour}:${minute}`);
  updateColumnValue();
};
// 选项变化
const handleChange = val => {
  updateInnerValue();
  nextTick(() => {
    nextTick(() => emit("change", { ...val, date: currentTime.value }));
  });
};
watch(columns, updateColumnValue);
watch(
  () => [attrs.filter, props.maxHour, props.minMinute, props.maxMinute],
  updateInnerValue
);
watch(
  () => props.minHour,
  () => {
    nextTick(updateInnerValue);
  }
);
watch(currentTime, value => emit("update:modelValue", value));
watch(
  () => props.modelValue,
  value => {
    value = formatValue(value);
    if (value !== currentTime.value) {
      currentTime.value = value;
      updateColumnValue();
    }
  }
);
updateColumnValue();
updateInnerValue();
</script>

<template>
  <van-picker
    v-model="selectedValues"
    :columns
    @change="handleChange"
    v-bind="$attrs"
  >
    <template v-for="name in Object.keys($slots)" :key="name" #[name]>
      <slot :name></slot>
    </template>
  </van-picker>
</template>
