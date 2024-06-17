/*
 * @Author: JieLiao
 * @Date: 2024-01-03 17:23:33
 * @Description: 计算颜色渐变
 */
/**
 * 
 * @param {Number} step 步长
 * @param {String} startRGB 渐变开始颜色
 * @param {String} endRGB 渐变结束颜色
 * @returns 渐变颜色数组
 */
const gradientColor = (step, startRGB , endRGB ) => {
	const startR = startRGB[0];
	const startG = startRGB[1];
	const startB = startRGB[2];
	const endR = endRGB[0];
	const endG = endRGB[1];
	const endB = endRGB[2];
	const sR = (endR - startR) / step; // 总差值
	const sG = (endG - startG) / step;
	const sB = (endB - startB) / step;
	let colorArr = [];
	for (let i = 0; i < step; i++) {
		let color = `rgb(${parseInt(sR * i + startR)},${parseInt(sG * i + startG)},${parseInt(
			sB * i + startB
		)})`;
		colorArr = [...colorArr, color];
	}
	return colorArr;
};