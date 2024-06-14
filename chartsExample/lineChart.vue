<!--
 * @Author: liaojie
 * @Date: 2023-03-17 14:13:53
 * @Description: 折线图
-->
<template>
  <div class="line-chart-container" @touchstart="handleTouchStart" @touchmove="handleTouchMove" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'LineChart',
  data() {
    return {
      myChart: null,
      startX: 0,
      dataIndex: 0,
      chartData: [
        [
          { x: '03/01', y: 820 },
          { x: '03/01', y: 1020 },
          { x: '03/02', y: 932, img: 'http://localhost:8080/img/temperatureBg.8bf8d16c.png' },
          { x: '03/03', y: 601 },
          { x: '03/03', y: 501 },
          { x: '03/03', y: 801 },
          { x: '03/04', y: 934 },
          { x: '03/04', y: 734 },
          { x: '03/04', y: 1134 },
          { x: '03/05', y: 1290 },
          { x: '03/06', y: 1330 },
          { x: '03/07', y: 1320 }
        ],
        [
          { x: '03/01', y: 320 },
          { x: '03/02', y: 232 },
          { x: '03/03', y: 501 },
          { x: '03/04', y: 634 },
          { x: '03/05', y: 890 },
          { x: '03/06', y: 2330 },
          { x: '03/07', y: 3320 }
        ]
      ]
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      this.myChart = echarts.init(document.querySelector('.line-chart-container'))
      const options = {
        title: {
          text: 'Stacked Area Chart'
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            const [tipsData] = params.slice(-1)
            const tipDom = `<div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="margin-right: 20px">${tipsData.marker}<span>${tipsData.seriesName}</span></div>
              <span style="font-weight: 600">${tipsData.data}</span>
              </div>`
            return `<div>${tipsData.name}</div>${tipDom}`
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisTick: {
              show: false
            },
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
          }
        ],
        yAxis: [
          {
            type: 'value',
            interval: 8,
            max: 32
          },
          {
            type: 'value',
            interval: 25,
            max: 100
          }
        ],
        series: [
          {
            name: 'Email',
            type: 'line',
            symbol: 'none',
            stack: 'Total',
            yAxisIndex: 1,
            emphasis: { disabled: true }, // 取消高亮
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            },
            // areaStyle: {
            //   color: '#EBF9D7'
            // },
            data: [24, 30, 40, 35, 25]
          },
          {
            name: 'Union Ads',
            type: 'line',
            symbol: 'none',
            stack: 'Total',
            yAxisIndex: 1,
            emphasis: { disabled: true }, // 取消高亮
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            },
            areaStyle: {
              silent: true,
              opacity: 1,
              color: '#EBF9D7'
            },
            // data: [40, 40, 60, 40, 35]
            data: [16, 10, 20, 5, 10]
          },

          {
            name: 'Direct',
            type: 'line',
            symbol: 'none',
            stack: 'Total',
            yAxisIndex: 1,
            emphasis: { disabled: true }, // 取消高亮
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            },
            areaStyle: {
              silent: true,
              opacity: 1,
              color: '#D4F2C2'
            },
            // data: [60, 55, 70, 50, 55]
            data: [20, 15, 10, 10, 20]
          },
          {
            name: 'Search Engine',
            type: 'line',
            symbol: 'none',
            emphasis: { disabled: true }, // 取消高亮
            stack: 'Total',
            yAxisIndex: 1,
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            },
            areaStyle: {
              silent: true,
              opacity: 1,
              color: '#EBF9D7'
            },
            // data: [75, 70, 85, 60, 74]
            data: [15, 15, 15, 10, 19]
          },
          {
            name: 'Video Ads',
            type: 'line',
            symbol: 'none',
            emphasis: { disabled: true }, // 取消高亮
            // areaStyle: {
            //   color: '#D4F2C2'
            // },
            itemStyle: {
              color: '#02AA5D'
            },
            markArea: {
              itemStyle: {
                color: '#FF8A87',
                opacity: 0.1
              },
              data: [[{ yAxis: 8 }, { yAxis: 24 }]]
            },
            data: [17, 16, 20, 15, 13]
          }
        ]
      }
      // const options = {
      //   tooltip: {
      //     trigger: 'axis',
      //     extraCssText: 'z-index: 3'
      //   },
      //   grid: {
      //     top: '10%',
      //     left: 'left',
      //     right: '6%',
      //     // bottom: '10%',
      //     containLabel: true
      //   },
      //   xAxis: {
      //     type: 'category',
      //     boundaryGap: false,
      //     axisTick: {
      //       show: false
      //     },
      //     // data: this.chartData[0].map((item) => item.x)
      //     data: [...new Set(this.chartData[0].map((item) => item.x))]
      //   },
      //   yAxis: {
      //     type: 'value',
      //     min: (val) => {
      //       const minVal = Math.floor(val.min - val.min * 0.2 < 0 ? 0 : val.min - val.min * 0.2)
      //       return Number(minVal)
      //     },
      //     max: (val) => {
      //       const maxVal = Math.ceil(val.max + val.max * 0.2)
      //       return Number(maxVal)
      //     }
      //   },
      //   series: [
      //     {
      //       type: 'line',
      //       smooth: true,
      //       // data: this.chartData[0].map((item) => ({ symbol: `image://${item.img}`, symbolSize: 14, value: item.y })),
      //       data: this.chartData[0].map((item) => ({ symbol: `image://${item.img}`, symbolSize: 14, value: [item.x, item.y] })),
      //       markArea: {
      //         silent: true,
      //         itemStyle: {
      //           color: '#8AD088',
      //           opacity: 0.1
      //         },
      //         data: [[{ yAxis: 600 }, { yAxis: 900 }]]
      //       }
      //     }
      //   ]
      // }
      this.myChart.setOption(options)
    },
    handleTouchStart(e) {
      this.startX = e.touches[0].pageX
    },
    // handleTouchEnd(e) {
    handleTouchMove(e) {
      const pointInPixel = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]
      if (this.myChart.containPixel('grid', pointInPixel)) {
        const x = e.changedTouches[0].pageX - this.startX
        // 开始X坐标与结束X坐标差值大于0右滑反之左滑
        if (x > 0) {
          this.dataIndex--
          if (this.dataIndex < 0) return (this.dataIndex = 0)
          this.setChartOption()
        } else {
          this.dataIndex++
          if (this.dataIndex >= this.chartData.length) return (this.dataIndex = this.chartData.length - 1)
          this.setChartOption()
        }
      }
    },
    setChartOption() {
      this.myChart.setOption({
        series: [
          {
            // data: this.chartData[this.dataIndex].map((item) => ({ symbol: `image://${item.img}`, symbolSize: 14, value: item.y }))
            data: this.chartData[this.dataIndex].map((item) => ({ symbol: `image://${item.img}`, symbolSize: 14, value: [item.x, item.y] }))
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.line-chart-container {
  width: 100%;
  height: 300px;
}
</style>
