## muvc
移动端 UI 组件  
  
<a href="https://ffx0s.github.io/muvc/example/demo.html" target="_blank">https://ffx0s.github.io/muvc/example/demo.html</a>  

<a href="https://ffx0s.github.io/muvc/example/dist/#/" target="_blank">
  <img src="https://static.webfed.cn/o_1dcle8l7rr941kov1s9015ir1let9.png" alt="muvc-qrcode" />
</a>  

### SwipeTabView  

<img src="https://static.webfed.cn/o_1dffs3tkr13fj1vjnquq1jv31l9a9.gif" alt="muvc-SwipeTabView" />  

### ImageViewer  

<img src="https://static.webfed.cn/o_1dffsvfqm1qfflc44t21ae0crue.gif" alt="muvc-ImageViewer">

### 其它组件  
```
.
├── actionsheet
├── badge
├── button
├── card
├── cell
├── checkbox
├── city
├── delay
├── drawer
├── headroom
├── imageViewer
├── infiniteScroll
├── loading
├── modal
├── navbar
├── notice
├── picker
├── popup
├── pullRefresh
├── radio
├── ring
├── route
├── scrollView
├── styles
├── swipe
├── swipeCell
├── switch
├── tab
├── tabBar
├── textarea
├── toast
├── validator
├── virtualList
├── vnode
└── withScroll
```  

### 自定义颜色变量  

```
// 到项目根目录
cd example 

// 创建 variables.js  
touch variables.js  

// 写入 variables.js  
module.exports = {
  primary: 'blue',
  // ...
}
 
// 执行
node node_modules/muvc/var.js ../../../variables.js
```  

默认变量：
```  
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
