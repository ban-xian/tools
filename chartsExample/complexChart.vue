<!--
 * @Author: liaojie
 * @Date: 2023-03-28 15:18:08
 * @Description:
-->
<template>
  <div class="complex-chart-container" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      complexChart: null,
      chartData: [
        { x: 60, y: 70, line: 40 },
        { x: 85, y: 90, line: 60 },
        { x: 100, y: 80, line: 80 },
        { x: 120, y: 85, line: 90 },
        { x: 140, y: 110, line: 100 },
        { x: 160, y: 120, line: 110 },
        { x: 180, y: 100, line: 120 },
        { x: 200, y: 95, line: 130 },
        { x: 220, y: 75, line: 140 },
        { x: 240, y: 100, line: 150 }
      ]
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.scatterChart = echarts.init(document.querySelector('.complex-chart-container'))
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
          axisTick: {},
          data: this.chartData.map((item) => item.x)
        },
        yAxis: {
          type: 'value',
          min: 40,
          max: 150
          // data: [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]
          // min: (val) => {
          //   const minVal = Math.floor(val.min - val.min * 0.2 < 0 ? 0 : val.min - val.min * 0.2)
          //   return Number(minVal)
          // },
          // max: (val) => {
          //   const maxVal = Math.ceil(val.max + val.max * 0.2)
          //   return Number(maxVal)
          // }
        },
        series: [
          // {
          //   type: 'line',
          //   symbol: 'none',
          //   symbolSize: 6,
          //   data: this.chartData.map((item) => item.line),
          //   markArea: {
          //     silent: true,
          //     data: [
          //       [
          //         {
          //           name: '血压水平偏高',
          //           label: {
          //             position: 'insideTop',
          //             color: '#000'
          //           },
          //           itemStyle: {
          //             color: '#f0f'
          //           },
          //           xAxis: '60',
          //           yAxis: 40
          //         },
          //         {
          //           xAxis: '140',
          //           yAxis: 90
          //         }
          //       ],
          //       [
          //         {
          //           name: '血压水平正常',
          //           label: {
          //             position: 'insideTop',
          //             color: '#000'
          //           },
          //           itemStyle: {
          //             color: '#0ff'
          //           },
          //           xAxis: '60',
          //           yAxis: 40
          //         },
          //         {
          //           xAxis: '120',
          //           yAxis: 80
          //         }
          //       ],
          //       [
          //         {
          //           name: '血压水平偏低',
          //           label: {
          //             position: 'insideTop',
          //             color: '#000'
          //           },
          //           itemStyle: {
          //             color: '#ff0'
          //           },
          //           xAxis: '60',
          //           yAxis: 40
          //         },
          //         {
          //           xAxis: '85',
          //           yAxis: 60
          //         }
          //       ]
          //     ]
          //   }
          // },
          {
            type: 'scatter',
            symbolSize: 6,
            data: this.chartData.map((item) => item.y),
            markLine: {
              symbol: 'none',
              lineStyle: {
                type: 'solid',
                color: '#02AA5D',
                cap: 'round'
              },
              data: [
                [
                  { xAxis: '60', yAxis: 40 },
                  { xAxis: '240', yAxis: 150 }
                ]
              ]
            },
            markArea: {
              silent: true,
              data: [
                [
                  {
                    name: '血压水平偏高',
                    label: {
                      position: 'insideTop',
                      color: '#000'
                    },
                    itemStyle: {
                      color: '#f0f'
                    },
                    xAxis: '60',
                    yAxis: 40
                  },
                  {
                    xAxis: '140',
                    yAxis: 90
                  }
                ],
                [
                  {
                    name: '血压水平正常',
                    label: {
                      position: 'insideTop',
                      color: '#000'
                    },
                    itemStyle: {
                      color: '#0ff'
                    },
                    xAxis: '60',
                    yAxis: 40
                  },
                  {
                    xAxis: '120',
                    yAxis: 80
                  }
                ],
                [
                  {
                    name: '血压水\n平偏低',
                    label: {
                      position: 'insideTop',
                      color: '#000'
                    },
                    itemStyle: {
                      color: '#ff0'
                    },
                    xAxis: '60',
                    yAxis: 40
                  },
                  {
                    xAxis: '85',
                    yAxis: 60
                  }
                ]
              ]
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
.complex-chart-container {
  width: 100%;
  height: 300px;
  padding-top: 10px;
}
</style>
