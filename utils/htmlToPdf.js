/*
 * @Author: liaojie
 * @Date: 2023-02-23 09:43:14
 * @Description: 导出页面为PDF
 */
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
  install(Vue, options) {
    Vue.prototype.getPdf = (config = {}) => {
      const fileTitle = config.title || new Date().getTime()
      html2Canvas(document.querySelector(`#${config.id || 'pdf-dom'}`), {
        allowTaint: true,
        taintTest: false,
        useCORS: true,
        // y: 72, // 对Y轴进行裁切
        // width:1200,
        // height:5000,
        dpi: window.devicePixelRatio * 4, // 将分辨率提高到特定的DPI 提高四倍
        scale: 4 // 按比例增加分辨率
      }).then((canvas) => {
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        const pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        const imgWidth = 595.28
        const imgHeight = 592.28 / contentWidth * contentHeight
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        const PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        // 方式一：直接保存
        PDF.save(fileTitle + '.pdf')

        // 方式二：转成base64转成blob下载
        // 转成base64
        // const pdf64 = PDF.output('datauristring')
        // // base64转成blob文件
        // const arr = `${pdf64}`.split(',')
        // const mime = arr[0].match(/:(.*?);/)[1]
        // const bstr = atob(arr[1])
        // let n = bstr.length
        // const u8arr = new Uint8Array(n)
        // while (n--) {
        //   u8arr[n] = bstr.charCodeAt(n)
        // }
        // const blob = new Blob([u8arr], {
        //   type: mime
        // })
        // blob.lastModifiedDate = new Date()
        // blob.name = fileTitle
        // const path = blob
        // const link = document.createElement('a')
        // link.href = window.URL.createObjectURL(path)
        // link.download = fileTitle + '.pdf'
        // link.click()
        // // 释放内存
        // window.URL.revokeObjectURL(link.href)
      })
    }
  }
}
