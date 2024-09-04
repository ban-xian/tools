/*
 * @Author: JieLiao
 * @Date: 2024-09-04 16:50:41
 * @Description: 阿拉伯数字转中文数字
 */
const getChineseNumber = (num) => {
  // 检查输入是否为自然数
  if (!Number.isInteger(num) && num < 0) {
    throw Error('请输入自然数')
  }
  // 定义中文数字和位置的数组
  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const positions = [
    '',
    '十',
    '百',
    '千',
    '万',
    '十万',
    '百万',
    '千万',
    '亿',
    '十亿',
    '百亿',
    '千亿',
  ]
  // 将输入数字转换为字符串并拆分为字符数组
  const charArray = String(num).split('')
  let result = '' // 存储最终结果的变量
  let prevIsZero = false // 用于标记前一个字符是否为零
  // 处理0
  for (let i = 0; i < charArray.length; i++) {
    const ch = charArray[i] // 获取当前字符
    if (ch !== '0' && !prevIsZero) {
      // 如果当前字符不是零且前一个字符也不是零，则将中文数字和位置添加到结果中
      result += digits[parseInt(ch)] + positions[charArray.length - i - 1]
    } else if (ch === '0') {
      // 如果当前字符是零，则标记前一个字符为零
      prevIsZero = true
    } else if (ch !== '0' && prevIsZero) {
      // 如果当前字符不是零且前一个字符是零，则添加零和中文数字和位置到结果中
      result += '零' + digits[parseInt(ch)] + positions[charArray.length - i - 1]
      prevIsZero = false
    }
  }
  // 处理十
  if (num < 100) {
    // 如果输入数字小于100，则将结果中的“一十”替换为“十”
    result = result.replace('一十', '十')
  }
  return result // 返回最终结果
}
