<!--
 * @Author: liaojie
 * @Date: 2023-03-20 09:41:52
 * @Description: echarts测试页
-->
<template>
  <div class="test-charts-container main-container">
    <line-chart />
    <bar-chart />
    <scatter-chart />
    <complex-chart />
  </div>
</template>

<script>
import LineChart from './lineChart.vue'
import BarChart from './barChart.vue'
import ScatterChart from './scatterChart.vue'
import ComplexChart from './complexChart.vue'

export default {
  name: 'TestCharts',
  components: {
    LineChart,
    BarChart,
    ScatterChart,
    ComplexChart
  }
}
</script>

<style lang="less" scoped></style>
