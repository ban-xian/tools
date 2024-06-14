<!--
 * @Author: liaojie
 * @Date: 2023-03-21 16:17:49
 * @Description: 散点图
-->
<template>
  <div class="scatter-chart-container" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      scatterChart: null,
      chartData: [
        { x: '03/01', y: 820 },
        { x: '03/01', y: 920 },
        { x: '03/01', y: 620 },
        { x: '03/02', y: 932 },
        { x: '03/02', y: 732 },
        { x: '03/02', y: 532 },
        { x: '03/03', y: 901 },
        { x: '03/04', y: 934 },
        { x: '03/05', y: 1290 },
        { x: '03/06', y: 1330 },
        { x: '03/07', y: 1320 }
      ]
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.scatterChart = echarts.init(document.querySelector('.scatter-chart-container'))
      const options = {
        color: '#02AA5D',
        tooltip: {
          trigger: 'axis',
          extraCssText: 'z-index: 3'
        },
        grid: {
          top: '10%',
          left: 'left',
          right: '6%',
          // bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          data: [...new Set(this.chartData.map((item) => item.x))]
        },
        yAxis: {
          type: 'value',
          min: (val) => {
            const minVal = Math.floor(val.min - val.min * 0.2 < 0 ? 0 : val.min - val.min * 0.2)
            return Number(minVal)
          },
          max: (val) => {
            const maxVal = Math.ceil(val.max + val.max * 0.2)
            return Number(maxVal)
          }
        },
        series: [
          {
            type: 'scatter',
            symbolSize: 6,
            data: this.chartData.map((item, index) => ([index] = [item.x, item.y])),
            markArea: {
              silent: true,
              itemStyle: {
                color: '#8AD088',
                opacity: 0.1
              },
              data: [[{ yAxis: 600 }, { yAxis: 900 }]]
            }
          }
        ]
      }
      this.scatterChart.setOption(options)
    }
  }
}
</script>

<style lang="less" scoped>
.scatter-chart-container {
  width: 100%;
  height: 300px;
  padding-top: 10px;
}
</style>
