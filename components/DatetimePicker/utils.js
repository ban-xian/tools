/*
 * @Author: JieLiao
 * @Date: 2024-06-13 10:34:56
 * @Description: 日期时间选择组件公用方法
 */
/**
 * 获取当前日期、最小日期、最大日期之间的中间值
 * @param {Number} num 当前日期
 * @param {Number} min 最小日期
 * @param {Number} max 最大日期
 * @returns 当前日期、最小日期、最大日期之间的中间值
 */
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
/**
 * 获取当前月份天数
 * @param {Number} year 当前年
 * @param {Number} month 当前月
 * @returns 当前月份天数
 */
export const getMonthEndDay = (year, month) => {
  return 32 - new Date(year, month - 1, 32).getDate();
};
/**
 * 获取所有日期
 * @param {*} n 日期个数
 * @param {*} iteratee
 * @returns 所有日期
 */
export const times = (n, iteratee) => {
  if (n < 0) return [];
  const result = Array(n);
  let index = -1;
  while (++index < n) {
    result[index] = { text: iteratee(index), value: iteratee(index) };
  }
  return result;
};
/**
 * 分割日期
 * @param {Number} num 日期
 * @param {Number} targetLength 字符串长度
 * @returns 日期字符串
 */
export const padZero = (num, targetLength = 2) => {
  let str = num + "";
  while (str.length < targetLength) {
    str = "0" + str;
  }
  return str;
};
/**
 * 获取所有列选中值对应的索引
 * @param {Array} selectedValues 选中值
 * @param {Array} allOptions 所有选项
 * @returns 所有列选中值对应的索引
 */
export const getIndexes = (selectedValues, allOptions) => {
  if (!selectedValues?.length || !allOptions?.length) return [];
  const indices = [];
  selectedValues.forEach((item, index) => {
    const subArray = allOptions[index];
    const foundIndex = subArray.findIndex(val => val.value === item);
    if (foundIndex !== -1) indices.push(foundIndex);
  });
  return indices;
};
export const getTrueValue = ({ value }) => {
  if (!value) return 0;
  while (Number.isNaN(parseInt(value, 10))) {
    if (value.length > 1) {
      value = value.slice(1);
    } else {
      return 0;
    }
  }
  return parseInt(value, 10);
};
