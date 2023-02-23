# tools

#### 介绍

一些项目开发工具方法

#### 使用说明

htmlToPdf.js：Vue 导出页面为 PDF

```
<!-- 安装 html2Canvas、JsPDF -->
npm install html2Canvas JsPDF --save

<!-- main.js -->
import htmlToPdf from '@/utils/htmlToPdf'
Vue.use(htmlToPdf)

<!-- 页面 -->
<button @click="getPdf(config)">导出PDF</button>
config={
  id: 导出页面dom id，默认pdf-dom
  title: 导出PDF文件名称，默认当前时间戳
}
config可不传，不传为默认值

```

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

#### 特技

1.  使用 Readme_XXX.md 来支持不同的语言，例如 Readme_en.md, Readme_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
