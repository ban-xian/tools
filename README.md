# tools

### 介绍

一些项目开发通用工具方法&组件&资源

### 使用说明

#### SlideRuler

适用于 H5 的滑动刻度尺组件。

目录：components/SlideRuler

使用方法：
1、复制该组件到项目

```

#### emoji 表情包

emoji 表情包大全

目录：emoji/

#### Field

表情包占用一个字符的输入框组件。

目录：components/Field

使用方法：
1、复制该组件到项目
2、引入该组件，具体参数参照 vant Field 组件

```

import Field from "@/components/Field/index.vue";
<field v-model="testDate"> </field>

```

#### DatetimePicker

适用于 vant4 的日期时间选择组件，使用该组件需安装 vant4，组件参数参照 vant3 DatetimePicker 组件。

目录：components/DatetimePicker

使用方法：
1、复制该组件到项目
2、引入该组件，具体参数参照 vant3 DatetimePicker 组件

```

import DatetimePicker from "@/components/DatetimePicker/index.vue";
<datetime-picker v-model="testDate"> </datetime-picker>

```

#### chartsExample 目录

echarts 复杂图表使用示例

#### pay 目录

微信支付 PHP 后台代码

#### htmlToPdf.js

Vue 导出页面为 PDF

```

<!-- 安装 html2Canvas、JsPDF -->

npm install html2Canvas JsPDF --save

<!-- main.js -->

import htmlToPdf from '@/utils/htmlToPdf'
Vue.use(htmlToPdf)

<!-- 页面 -->

<button @click="getPdf(config)">导出 PDF</button>
config={
id: 导出页面 dom id，默认 pdf-dom
title: 导出 PDF 文件名称，默认当前时间戳
}
config 可不传，不传为默认值

```

#### gradientColor.js

计算颜色渐变

```

直接调用 gradientColor 方法，传入步长、渐变开始颜色、渐变结束颜色，返回渐变颜色数组
gradientColor(20,[138,208,136],[241,39,39])

```

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
```
