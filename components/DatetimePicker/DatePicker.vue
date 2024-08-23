<!--
 * @Author: JieLiao
 * @Date: 2024-06-12 14:46:05
 * @Description: 日期选择组件
-->
<script setup>
import { ref, watch, computed, nextTick, useAttrs } from "vue";
import {
  clamp,
  getMonthEndDay,
  times,
  padZero,
  getIndexes,
  getTrueValue
} from "./utils";

// 获取透传的属性
const attrs = useAttrs();
const props = defineProps({
  // 当前日期
  modelValue: {
    type: Date,
    required: true,
    default: new Date()
  },
  // 最小日期
  minDate: {
    type: Date,
    default: () => new Date(new Date().getFullYear() - 10, 0, 1)
  },
  // 最大日期
  maxDate: {
    type: Date,
    default: () => new Date(new Date().getFullYear() + 10, 11, 31)
  }
});
const emit = defineEmits(["update:modelValue", "change"]);
// 过滤日期
const formatValue = value => {
  if (!value) return;
  const timestamp = clamp(
    value.getTime(),
    props.minDate.getTime(),
    props.maxDate.getTime()
  );
  return new Date(timestamp);
};
// 选中数据
const selectedValues = ref([]);
// 当前日期
const currentDate = ref(formatValue(props.modelValue));
// 获取年、月、日、时、分
const getBoundary = (type, value) => {
  const boundary = props[`${type}Date`];
  const year = boundary.getFullYear();
  let month = 1;
  let date = 1;
  let hour = 0;
  let minute = 0;
  if (type === "max") {
    month = 12;
    date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
    hour = 23;
    minute = 59;
  }
  if (value.getFullYear() === year) {
    month = boundary.getMonth() + 1;
    if (value.getMonth() + 1 === month) {
      date = boundary.getDate();
      if (value.getDate() === date) {
        hour = boundary.getHours();
        if (value.getHours() === hour) {
          minute = boundary.getMinutes();
        }
      }
    }
  }
  return {
    [`${type}Year`]: year,
    [`${type}Month`]: month,
    [`${type}Date`]: date,
    [`${type}Hour`]: hour,
    [`${type}Minute`]: minute
  };
};
// 日期选择范围
const ranges = computed(() => {
  const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = getBoundary(
    "max",
    currentDate.value || props.minDate
  );

  const { minYear, minDate, minMonth, minHour, minMinute } = getBoundary(
    "min",
    currentDate.value || props.minDate
  );

  let result = [
    {
      type: "year",
      range: [minYear, maxYear]
    },
    {
      type: "month",
      range: [minMonth, maxMonth]
    },
    {
      type: "day",
      range: [minDate, maxDate]
    },
    {
      type: "hour",
      range: [minHour, maxHour]
    },
    {
      type: "minute",
      range: [minMinute, maxMinute]
    }
  ];

  switch (attrs.type) {
    case "date":
      result = result.slice(0, 3);
      break;
    case "year-month":
      result = result.slice(0, 2);
      break;
    case "month-day":
      result = result.slice(1, 3);
      break;
    case "datehour":
      result = result.slice(0, 4);
      break;
  }

  if (attrs.columnsOrder) {
    const columnsOrder = attrs.columnsOrder.concat(
      result.map(column => column.type)
    );
    result.sort(
      (a, b) => columnsOrder.indexOf(a.type) - columnsOrder.indexOf(b.type)
    );
  }

  return result;
});
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
    column.values.map(value => ({
      ...value,
      text: attrs.formatter(column.type, value.text)
    }))
  )
);
// 更新当前选中日期
const updateColumnValue = () => {
  const value = currentDate.value || props.minDate;
  selectedValues.value = [
    `${value.getFullYear()}`,
    padZero(value.getMonth() + 1),
    padZero(value.getDate()),
    padZero(value.getHours()),
    padZero(value.getMinutes())
  ];
  // const { formatter } = attrs;
  // selectedValues.value = originColumns.value.map(column => {
  //   switch (column.type) {
  //     case "year":
  //       return formatter("year", `${value.getFullYear()}`);
  //     case "month":
  //       return formatter("month", padZero(value.getMonth() + 1));
  //     case "day":
  //       return formatter("day", padZero(value.getDate()));
  //     case "hour":
  //       return formatter("hour", padZero(value.getHours()));
  //     case "minute":
  //       return formatter("minute", padZero(value.getMinutes()));
  //     default:
  //       return "";
  //   }
  // });
  emit("update:modelValue", value);
};
// 更新当前日期
const updateInnerValue = () => {
  const { type } = attrs;
  const indexes = getIndexes(selectedValues.value, columns.value);
  const getValue = type => {
    let index = 0;
    originColumns.value.forEach((column, columnIndex) => {
      if (type === column.type) index = columnIndex;
    });
    const { values } = originColumns.value[index];
    return getTrueValue(values[indexes[index]]);
  };
  let year;
  let month;
  let day;
  if (type === "month-day") {
    year = (currentDate.value || props.minDate).getFullYear();
    month = getValue("month");
    day = getValue("day");
  } else {
    year = getValue("year");
    month = getValue("month");
    day = type === "year-month" ? 1 : getValue("day");
  }
  const maxDay = getMonthEndDay(year, month);
  day = day > maxDay ? maxDay : day;
  let hour = 0;
  let minute = 0;
  if (type === "datehour") hour = getValue("hour");
  if (type === "datetime") {
    hour = getValue("hour");
    minute = getValue("minute");
  }
  const value = new Date(year, month - 1, day, hour, minute);
  currentDate.value = formatValue(value);
};
// 选项变化
const handleChange = val => {
  updateInnerValue();
  nextTick(() => {
    updateInnerValue();
    nextTick(() => emit("change", { ...val, date: currentDate.value }));
  });
};
watch(columns, updateColumnValue);
watch(
  () => [attrs.filter, props.minDate, props.maxDate],
  () => {
    updateInnerValue();
  }
);
watch(
  () => props.modelValue,
  value => {
    value = formatValue(value);
    if (value && value.valueOf() !== currentDate.value?.valueOf()) {
      currentDate.value = value;
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
    v-bind="$attrs"
    @change="handleChange"
  >
    <template v-for="name in Object.keys($slots)" :key="name" #[name]>
      <slot :name></slot>
    </template>
  </van-picker>
</template>
