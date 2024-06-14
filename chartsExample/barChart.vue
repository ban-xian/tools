<!--
 * @Author: liaojie
 * @Date: 2023-03-20 09:48:25
 * @Description: 折柱混合图
-->
<template>
  <div class="bar-chart-container" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      barChart: null,
      chartsData: [
        { x: '04-08', y: 37, yb: 47 },
        { x: '04-09', y: 53, yb: 25 },
        { x: '04-10', y: 34, yb: 50 },
        { x: '04-11', y: 20, yb: 37 }
      ]
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.barChart = echarts.init(document.querySelector('.bar-chart-container'))
      const option = {
        title: {
          text: '统计总量',
          textStyle: {
            fontSize: 16,
            padding: '10px'
          }
        },
        legend: {
          data: ['总量', '走量高', '分量']
        },
        tooltip: {
          trigger: 'axis',
          extraCssText: 'z-index: 3',
          formatter: (params) => {
            const tips = params.filter((item) => !['走量低', '测试'].includes(item.seriesName))
            let tipsDom = ''
            tips.forEach((item) => {
              tipsDom += `<div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="margin-right: 20px">${item.marker}<span>${item.seriesName}</span></div>
              <span style="font-weight: 600">${item.data}</span>
              </div>`
            })
            return `<div>${tips[0].name}</div>${tipsDom}`
          }
        },
        xAxis: {
          axisTick: {
            show: false
          },
          data: [...new Set(this.chartsData.map((item) => item.x))]
        },
        yAxis: {
          splitArea: { show: false }
        },
        // series: [
        //   {
        //     type: 'line',
        //     name: '总量',
        //     smooth: true,
        //     symbol: 'none',
        //     data: ['37', '34', '53', '59'],
        //     emphasis: { disabled: true }, // 禁用点击事件和高亮效果
        //     itemStyle: {
        //       color: '#02AA5D'
        //     },
        //     markArea: {
        //       silent: true,
        //       itemStyle: {
        //         color: '#8AD088',
        //         opacity: 0.1
        //       },
        //       data: [[{ yAxis: 40 }, { yAxis: 62 }]]
        //     }
        //   },
        //   {
        //     type: 'bar',
        //     name: '走量低',
        //     stack: 'Ad',
        //     emphasis: {
        //       disabled: true
        //     }, // 禁用点击事件和高亮效果
        //     barMaxWidth: 10, // 柱图最大宽度
        //     barMinWidth: 5, // 柱图最小宽度
        //     // barGap: '-100%' /* 这里设置包含关系，只需要这一句话*/,
        //     data: this.chartsData.map((item) => ({ itemStyle: { color: item.ybColor }, value: [item.x, item.y] }))
        //   },
        //   {
        //     type: 'bar',
        //     name: '分量',
        //     stack: 'Ad',
        //     emphasis: {
        //       disabled: true
        //     }, // 禁用点击事件和高亮效果
        //     barMaxWidth: 10, // 柱图最大宽度
        //     barMinWidth: 5, // 柱图最小宽度
        //     // barGap: '-100%' /* 这里设置包含关系，只需要这一句话*/,
        //     data: this.chartsData.map((item) => ({ itemStyle: { color: item.color }, value: [item.x, item.yb] }))
        //   }
        // ]
        series: [
          {
            type: 'line',
            name: '总量',
            smooth: true,
            symbol: 'none',
            data: ['37', '34', '53', '59'],
            emphasis: { disabled: true }, // 禁用点击事件和高亮效果
            itemStyle: {
              color: '#02AA5D'
            },
            markArea: {
              silent: true,
              itemStyle: {
                color: '#8AD088',
                opacity: 0.1
              },
              data: [[{ yAxis: 40 }, { yAxis: 62 }]]
            }
          },
          {
            type: 'bar',
            name: '走量低',
            stack: 'Ad',
            emphasis: {
              disabled: true
            }, // 禁用点击事件和高亮效果
            itemStyle: {
              opacity: 0
            },
            // barWidth: 20,
            // barGap: '-100%' /* 这里设置包含关系，只需要这一句话*/,
            data: ['27', '14', '13', '5']
          },
          {
            // barWidth: 20,
            type: 'bar',
            name: '走量高',
            stack: 'Ad',
            emphasis: { disabled: true }, // 禁用点击事件和高亮效果
            itemStyle: {
              color: '#80D37E',
              opacity: 0.8
            },
            barMaxWidth: 10, // 柱图最大宽度
            barMinWidth: 5, // 柱图最小宽度
            data: ['47', '59', '95', '74']
          },
          {
            type: 'bar',
            name: '测试',
            stack: 'Search Engine',
            emphasis: { disabled: true }, // 禁用点击事件和高亮效果
            itemStyle: {
              opacity: 0
            },
            // barWidth: 20,
            // barGap: '-100%' /* 这里设置包含关系，只需要这一句话*/,
            data: ['37', '34', '33', '35']
          },
          {
            type: 'bar',
            name: '分量',
            stack: 'Search Engine',
            barGap: '-100%' /* 这里设置包含关系，只需要这一句话*/,
            barMaxWidth: 10, // 柱图最大宽度
            barMinWidth: 5, // 柱图最小宽度
            emphasis: { disabled: true }, // 禁用点击事件和高亮效果
            itemStyle: {
              color: '#068E50',
              opacity: 0.3
            },
            // barWidth: 20,
            data: ['27', '24', '43', '10']
          }
        ]
      }
      this.barChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.bar-chart-container {
  width: 100%;
  height: 300px;
  padding-top: 10px;
}
</style>
