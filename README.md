## lvan
基于 Vue 的移动端 UI 组件库 (Alpha - 开发测试中)
  
<a href="https://ffx0s.github.io/lvan/example/demo.html" target="_blank">https://ffx0s.github.io/lvan/example/demo.html</a>  

<a href="https://ffx0s.github.io/lvan/example/dist/#/" target="_blank">
  <img src="https://static.webfed.cn/o_1dcle8l7rr941kov1s9015ir1let9.png" alt="lvan-qrcode" />
</a>  

## 功能特性  

* 更好的用户体验，以原生体验为目标向下兼容低版本浏览器 
* 支持路由切换动画(Android、IOS、Fade)  

## 使用 

```
npm i lvan -s  
```

```js
import Navbar from 'lvan/navbar'
```

```html
<Navbar title="Navbar" />
```


### 修改颜色变量  

```js
// 项目根目录
cd example 

// 创建 variables.js  
touch variables.js  

// 写入 variables.js  
module.exports = {
  primary: 'blue',
  // ...
}
 
// 执行
node node_modules/lvan/var.js ../../../variables.js
```  

### 移除颜色变量  

```
node node_modules/lvan/var.js  
```

默认变量：
```js  
{
  // 状态颜色
  primary: '#2196f3',
  success: '#4caf50',
  error: '#ff5252',
  warning: '#ffa93a',
  // 通用颜色
  lightGray: '#e5e5e5', // 浅灰
  // 文字颜色
  textPrimary: '#000000', // 主要
  textRegular: '#8e8e90', // 常规
  textSecondary: '#d9d9d9', // 次要
  // 边框颜色
  border: '#d9d9d9',
  // 背景色
  background: '#f0eff5'
}
```
