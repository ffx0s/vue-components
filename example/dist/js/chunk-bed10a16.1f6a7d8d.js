(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bed10a16"],{"0678":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"v-swipe-item"},[t.loaded?i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"v-swipe-item-content"},[t._t("default")],2):t._e()])},n=[],o={name:"SwipeItem",props:{lazy:{type:Boolean,default:!1}},data:function(){return{show:!this.$parent.optimization,loaded:!this.lazy}}},a=o,r=(i("914e"),i("2877")),l=Object(r["a"])(a,s,n,!1,null,null,null);e["a"]=l.exports},"18af":function(t,e,i){"use strict";var s=i("a87c"),n=i.n(s);n.a},"2e4a":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".v-swipe{position:relative;z-index:2;width:100%;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-swipe-items{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transition-timing-function:ease;transition-timing-function:ease}.v-swipe-dots{position:absolute;bottom:10px;margin:0;padding:0;width:100%;list-style-type:none;text-align:center;font-size:0;-webkit-transform:translateZ(0);transform:translateZ(0)}.v-swipe-dots li{margin:0 3px;display:inline-block;width:6px;height:6px;background:#efefef;border-radius:50%;opacity:.5;-webkit-transition:opacity .3s;transition:opacity .3s}.v-swipe-dots li.v-swipe-dots-active{opacity:1}.v-swipe-vertical .v-swipe-items{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.v-swipe-vertical .v-swipe-item{height:100%}.v-swipe-vertical .v-swipe-dots{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;bottom:auto;left:10px;top:0;height:100%;width:auto}.v-swipe-vertical .v-swipe-dots li{display:block;margin:3px 0}",""])},"41ab":function(t,e,i){"use strict";var s=i("9b25"),n=i.n(s);n.a},"4c72":function(t,e,i){"use strict";i("af89");var s={linear:function(t,e,i,s){return i*t/s+e},easeInQuad:function(t,e,i,s){return i*(t/=s)*t+e},easeOutQuad:function(t,e,i,s){return-i*(t/=s)*(t-2)+e},easeOutStrong:function(t,e,i,s){return-i*((t=t/s-1)*t*t*t-1)+e},easeInOutQuad:function(t,e,i,s){return(t/=s/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e},easeOutCubic:function(t,e,i,s){return i*((t=t/s-1)*t*t+1)+e},easeOutBack:function(t,e,i,s,n){return void 0===n&&(n=1.70158),i*((t=t/s-1)*t*((n+1)*t+n)+1)+e}},n=s,o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(t){return setTimeout(t,1e3/60)},a=window.cancelAnimationFrame||function(t){clearTimeout(t)},r=function(){return(new Date).getTime()};function l(){return{time:500,type:"easeOutQuad"}}e["a"]=function(t){var e=null,i=Object.assign(l(),t),s=i.time,h=i.type,c=i.targets,u=i.running,d=i.end,p=r();function m(){var t=r(),i=1-(Math.max(0,p-t+s)/s||0),a=[];c.forEach(function(t){var e=t[0]===t[1]?t[0]:n[h](i*s,t[0],t[1]-t[0],s)||0;a.push(e)}),u(a),1===i?(v(),d&&d()):e=o(m)}function v(){a(e)}return e=o(m),{stop:v}}},"4ea6":function(t,e,i){"use strict";var s=i("5d3b"),n=i.n(s);n.a},"5d3b":function(t,e,i){var s=i("df4e");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var n=i("499e").default;n("3310ad82",s,!0,{sourceMap:!1,shadowMode:!1})},"729c":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-spacing"},[t._l(t.items,function(e,s){return i("div",{key:s,staticClass:"page-image-viewer-item",attrs:{id:"item"+s}},[i("h4",[t._v("#"+t._s(s+1)+" "+t._s(e.title))]),i("ul",t._l(e.images,function(e,n){return i("li",{key:n},[i("img",{attrs:{src:e.thumbnail,alt:e.alt},on:{click:function(e){return t.showViewer(s,n)}}})])}),0)])}),i("ImageViewer",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}],ref:"viewer",attrs:{images:t.images},scopedSlots:t._u([{key:"toolbar",fn:function(e){var s=e.index,n=e.item;return[i("div",{staticClass:"v-image-viewer-topbar"},[i("span",[t._v(t._s(s+1)+"/"+t._s(t.images.length))])]),i("div",{staticClass:"page-image-viewer-toolbar"},[t._v(t._s(n.alt))])]}}])})],2)},n=[],o=function(){var t,e=this,i=e.$createElement,s=e._self._c||i;return s("transition",{attrs:{name:"v-image-viewer"},on:{afterEnter:e.afterEnter,beforeLeave:e.beforeLeave}},[e.loaded?s("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],staticClass:"v-image-viewer",class:{"v-image-viewer-lock":e.lock}},[s("div",{staticClass:"v-image-viewer-toolbar",class:(t={},t[e.toolbarShowClass]=e.showToolbar,t)},[e._t("toolbar",[s("div",{staticClass:"v-image-viewer-topbar"},[s("span",[e._v(e._s(e.index+1)+"/"+e._s(e.images.length))])])],{index:e.index,item:e.images[e.index]||{}})],2),s("div",{staticClass:"v-image-viewer-touch",on:{"!touchstart":function(t){return e.touchstart(t)},"!touchmove":function(t){return e.touchmove(t)},"!touchend":function(t){return e.touchend(t)},"!mousedown":function(t){return e.mousedown(t)}}},[s("Swipe",{ref:"swipe",staticClass:"v-image-viewer-swipe",attrs:{showPrev:e.setInitStyle,showNext:e.setInitStyle,animationDuration:e.swipeAnimationDuration,preload:e.preload,dot:!1,offset:20,optimization:""},on:{beforeChange:e.beforeSwipeChange,change:e.showLoading,resize:e.resize},model:{value:e.index,callback:function(t){e.index=t},expression:"index"}},e._l(e.items,function(t,i){return s("SwipeItem",{key:t.uid,staticClass:"v-image-viewer-item",attrs:{lazy:""}},[s("div",{staticClass:"v-image-viewer-transform",style:{transitionDuration:t.style.duration+"ms",transform:"\n                translate3d("+t.style.x+"px, "+t.style.y+"px, 0)\n                scale("+t.style.scale+")\n              ",width:t.style.width+"px",height:t.style.height+"px"}},[!t.loaded||t.error?s("img",{staticClass:"v-image-viewer-img",attrs:{src:e.images[i].thumbnail}}):e._e(),t.error?e._e():s("img",{staticClass:"v-image-viewer-img",attrs:{src:e.images[i].src},on:{load:function(t){return e.onload(i)},error:function(t){return e.onerror(i)}}})])])}),1)],1),e._t("loading",[s("Delay",{staticClass:"v-image-viewer-center",attrs:{delay:e.loadingDelay},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[s("Ring",{attrs:{size:45,strokeWidth:0,innerStrokeWidth:6,color:"#fff",textColor:"#fff",backgroundColor:"rgba(0,0,0,.5)",outerColor:"rgba(0,0,0,.5)"},model:{value:e.progress,callback:function(t){e.progress=t},expression:"progress"}})],1)]),s("div",{staticClass:"v-image-viewer-overlay",style:{opacity:e.overlayOpacity}})],2):e._e()])},a=[],r=(i("af89"),i("83d8"),i("d10e")),l=i("802d"),h=i("0678"),c=i("e887"),u=i("6c5e"),d=i("cef0"),p=i("ec31");function m(t,e){return+t.toFixed(e)}function v(t){return t.touches?t.touches:[t]}function f(t,e){return t+e}function g(t){return{x:t.map(function(t){return t.x}).reduce(f)/t.length,y:t.map(function(t){return t.y}).reduce(f)/t.length}}function w(t,e,i){i=i||["x","y"];var s=e[i[0]]-t[i[0]],n=e[i[1]]-t[i[1]];return Math.sqrt(s*s+n*n)}function y(t,e){return w(e[0],e[1])/w(t[0],t[1])}function b(t,e,i){var s=e.x-t.x,n=e.y-t.y,o=1-i/t.scale,a=t.x+s*o,r=t.y+n*o;return{x:a,y:r,scale:i}}function x(t,e,i,s){var n,o,a=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],r=t/e,l=i/s;t<i&&e<s?(n=t,o=e):r>l&&a?(n=i,o=m(n/r,2)):(n=m(r*s,2),o=s);var h=m(-(n-i)/2,2),c=m(-(o-s)/2,2),u=m(n/t,5);return{width:n,height:o,x:h,y:c,scale:u}}var k=i("d225"),C=i("b0b4"),S=i("bd86"),I=i("4c72"),z=function(){function t(e){Object(k["a"])(this,t),this.upTime=0,this.downTime=0,this.options=e,this.last={move:{x:0,y:0},diff:{x:0,y:0,time:0},centerPoint:{x:0,y:0}},this.position=t.initPosition(!0),this.move=Object(d["m"])(this.move)}return Object(C["a"])(t,[{key:"start",value:function(t){t.preventDefault();var e=v(t);this.moved=!1,this.downTime=Date.now(),this.animation&&this.animation.stop(),clearTimeout(this.clickTimer),2===e.length?this.pinchstart(t):1===e.length&&this.dragstart(t)}},{key:"move",value:function(t){t.cancelable&&t.preventDefault();var e=v(t);this.moved=!0,2===e.length?this.pinchmove(t):1===e.length&&this.dragmove(t)}},{key:"up",value:function(t){var e=t.touches||[],i=Date.now();if(!this.moved){var s=300,n=500;i-this.upTime<=s?(this.options.dobuleClick(this.last.move),this.position=this.checkPosition(this.options.getCurrentItem().style)):i-this.downTime<=n&&(this.clickTimer=setTimeout(this.options.click,s))}this.upTime=i,e.length?this.dragstart(t):this.dragend(t)}},{key:"dragstart",value:function(t){var e=v(t);this.disabled=!1,this.isHide=!1,this.isSlideDown=!1,this.currentScale=void 0,this.last.move={x:e[0].clientX,y:e[0].clientY},this.timeStamp=t.timeStamp,this.touchDelay=2}},{key:"dragmove",value:function(t){var e=v(t),i={x:e[0].clientX,y:e[0].clientY},s=i.x-this.last.move.x,n=i.y-this.last.move.y;if(0!==s||0!==n){if(this.isHorizontal=Math.abs(s)>=Math.abs(n),this.isHorizontal){var o=this.options.getCurrentItem().style;this.position=this.checkPosition({x:o.x+s,y:o.y+n,scale:o.scale,width:o.width,height:o.height}),s<0?this.position.isRight&&!this.isSlideDown&&(this.disabled=!0):this.position.isLeft&&!this.isSlideDown&&(this.disabled=!0)}else{if(!this.position.isBottom&&this.position.isTop||this.position.isBottom&&this.position.isTop){var a=this.options.getCurrentItem().style,r=1-n/i.y,l=a.scale*r;void 0===this.currentScale&&(this.currentScale=a.scale,this.overlayOpcity=1),this.overlayOpcity*=r,n<0&&l>=this.currentScale&&(l=this.currentScale,this.overlayOpcity=1);var h=.05;this.isHide=this.currentScale-l>=h,this.options.scaleTo(i,l,!1,!1),this.options.updateOverlayOpcity(this.overlayOpcity)}this.isSlideDown=!0}this.last.diff={x:s,y:n,time:t.timeStamp-this.timeStamp},this.timeStamp=t.timeStamp,this.last.move=i,this.touchDelay?this.touchDelay--:this.disabled||this.options.move(s,n,!1)}}},{key:"dragend",value:function(){if(this.moved){if(this.isHide)return this.options.hide();this.isSlideDown&&this.options.updateOverlayOpcity(1);var t=this._isFastMove();if(t){var e=this.options.getCurrentItem().style,i=e.x+t.x,s=e.y+t.y,n=e.scale,o="easeOutCubic",a=this.validation({x:i,y:s,scale:n,width:e.width,height:e.height});a.isDraw&&(i=a.x,s=a.y,n=a.scale,((a.isBottom||a.isTop)&&!this.isHorizontal||(a.isLeft||a.isRight)&&this.isHorizontal)&&(o="easeOutBack")),this.animate(i,s,n,{type:o,time:t.time}),this.position=a}else this.position=this.validation(null,!0)}}},{key:"pinchstart",value:function(t){var e=Object(d["k"])(v(t)).map(function(t){return{x:t.clientX,y:t.clientY}});this.last.zoom=e,this.last.centerPoint=g(e),this.touchDelay=5}},{key:"pinchmove",value:function(t){var e=this,i=Object(d["k"])(v(t)).map(function(t){return{x:t.clientX,y:t.clientY}}),s=g(i),n=y(e.last.zoom,i);if(e.last.zoom=i,e.last.centerPoint=s,e.touchDelay)e.touchDelay--;else{var o=this.options.getCurrentItem().style.scale*n;this.options.scaleTo(s,o,!1,!1)}}},{key:"checkPosition",value:function(t){var e=t.x,i=t.y,s=t.scale,n=t.width,o=t.height;n=m(n*s,2),o=m(o*s,2);var a=d["r"].width()-(n+e),r=d["r"].height()-(o+i),l=!1,h=!1,c=!1,u=!1,p=!1;return o<=d["r"].height()?(i=(d["r"].height()-o)/2,l=u=p=!0):i>0?(i=0,l=u=!0):r>0&&(i+=r,l=p=!0),n<=d["r"].width()?(e=(d["r"].width()-n)/2,l=h=c=!0):e>0?(e=0,l=h=!0):a>0&&(e+=a,l=c=!0),{x:e,y:i,isDraw:l,isLeft:h,isRight:c,isTop:u,isBottom:p}}},{key:"validation",value:function(t,e){t=t||this.options.getCurrentItem().style;var i=this._checkScale(t.scale)||this.checkPosition(t);return void 0===i.scale&&(i.scale=t.scale),e&&i.isDraw&&this.animate(i.x,i.y,i.scale),i}},{key:"_checkScale",value:function(t){var e=this.options.getCurrentItem(),i=e.style,s=e.initStyle,n=1,o=s.scale,a=this;function r(t){var e=b(i,a.last.centerPoint,t),s=e.x,n=e.y,o=a.checkPosition({x:s,y:n,scale:t,width:i.width,height:i.height});return o.isDraw=!0,o.scale=t,o}return t>n?r(n):t<o?r(o):void 0}},{key:"_isFastMove",value:function(){var t=.2,e=this.last.diff,i=e.x/e.time,s=e.y/e.time;if(Math.abs(i)>t||Math.abs(s)>t){var n=420,o=1.4,a=i*(n/o),r=s*(n/o);return{x:a,y:r,time:2*n}}}},{key:"animate",value:function(t,e,i){var s=this,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{time:450,type:"easeOutCubic"},o=this.options.getCurrentItem().style;this.animation&&this.animation.stop(),this.animation=Object(I["a"])({targets:[[o.scale,i],[o.x,t],[o.y,e]],time:n.time,type:n.type,running:function(t){o.scale=t[0],s.options.moveTo(t[1],t[2],!1)}})}}]),t}();Object(S["a"])(z,"initPosition",function(t){return{isLeft:t,isRight:t,isTop:t,isBottom:t}});var T=0,_={name:"ImageViewer",components:{Swipe:l["a"],SwipeItem:h["a"],Ring:c["a"],Delay:u["a"]},mixins:[r["a"]],props:{images:{type:Array,default:function(){return[]}},swipeAnimationDuration:{type:Number,default:350},zoomAnimationDuration:{type:Number,default:350},preload:{type:Boolean,default:!1},toolbarShowClass:{type:String,default:"v-image-viewer-toolbar-show"},clickHidden:{type:Boolean,default:!0}},data:function(){return{index:0,value:!1,styles:[],overlayOpacity:null,items:[],loading:!1,loadingDelay:500,progress:0,showToolbar:!1}},watch:{images:{handler:function(t){this.$refs.swipe&&(this.isChange=!0),this.items=t.map(function(){return{style:{},loaded:!1,error:!1,uid:T++}})},immediate:!0}},created:function(){this.handler=new z({hide:this.hide,move:this.move,moveTo:this.moveTo,scaleTo:this.scaleTo,click:this.click,dobuleClick:this.dobuleClick,getCurrentItem:this.getCurrentItem,updateOverlayOpcity:this.updateOverlayOpcity})},methods:{touchstart:function(t){this.handler.start(t)},touchmove:function(t){this.handler.disabled||(t.stopPropagation(),this.handler.move(t))},touchend:function(t){this.$refs.swipe.removeMouseEvents(),this.handler.disabled||(t.stopPropagation(),this.handler.up(t))},mousedown:function(t){this.touchstart(t),Object(p["b"])(this.touchmove,this.touchend,!0)},showLoading:function(){this.getCurrentItem().loaded?this.loading=!1:(this.progress=Math.floor(80*Math.random()),this.loading=!0)},show:function(t){var e=this,i=t.selector,s=t.index;if(!this.value){this.lock=!0,this.showing=!0;var n=this.$refs.swipe;if(this.isChange&&s===this.index&&(n.showItem(s),this.isChange=!1),n){var o=1;n.slide(s,o)}else this.index=s;this.selector=i,this.items[s].error=!1;var a=i&&this.getThumbnail(s);if(a){var r=a.getBoundingClientRect();this.setStyle({x:r.left,y:r.top,scale:+(r.width/this.images[s].w).toFixed(4),duration:0}),setTimeout(function(){e.setInitStyle(s,e.zoomAnimationDuration)},50)}else this.setInitStyle(s);this.showLoading(),this.updateOverlayOpcity(1),this.value=!0,this.showing=!1}},hide:function(){var t,e,i;this.lock=!0;var s=this.selector&&this.getThumbnail(this.index);if(s){var n=s.getBoundingClientRect();t=n.left,e=n.top,i=+(n.width/this.images[this.index].w).toFixed(4)}else t=d["r"].width()/2,e=d["r"].height()/2,i=0;this.setStyle({x:t,y:e,scale:i,duration:this.zoomAnimationDuration}),this.value=!1},getThumbnail:function(t){return document.querySelectorAll(this.selector)[t]},getCurrentItem:function(){return this.items[this.index]},getInitStyle:function(t){if(!this.items[t].initStyle){var e=this.images[t];this.items[t].initStyle=x(e.w,e.h,d["r"].width(),d["r"].height())}return this.items[t].initStyle},setInitStyle:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=this.items[t].style,s=this.getInitStyle(t);i.x===s.x&&i.y===s.y&&i.scale===s.scale||(s.duration=e,this.setStyle(s,t))},setStyle:function(t,e){var i=t.x,s=t.y,n=t.scale,o=t.duration;void 0===e&&(e=this.index),this.items[e].style={x:i,y:s,scale:n,duration:o,width:this.images[e].w,height:this.images[e].h}},updateOverlayOpcity:function(t){this.overlayOpacity=t},move:function(t,e){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=this.getCurrentItem().style;s.duration=i?this.zoomAnimationDuration:0,s.x+=t,s.y+=e},moveTo:function(t,e){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=this.getCurrentItem().style;s.duration=i?this.zoomAnimationDuration:0,s.x=t,s.y=e},scaleTo:function(t,e){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],n=this.getCurrentItem(),o=n.style;if(e!==o.scale){var a=b(o,t,e),r=a.x,l=a.y;if(s){var h=this.handler.checkPosition({x:r,y:l,scale:e,width:o.width,height:o.height});r=h.x,l=h.y}o.scale=e,this.moveTo(r,l,i)}},click:function(){this.clickHidden&&this.hide(),this.$emit("singleClick")},dobuleClick:function(t){var e=this.getCurrentItem(),i=this.getInitStyle(this.index),s=i.x,n=i.y,o=i.scale;if(e.style.scale!==o)e.style.scale=o,this.moveTo(s,n,!0);else{var a=this.images[this.index],r=a.w,l=a.h,h=!1,c=r/l>1?x(r,l,d["r"].width(),d["r"].height(),h).scale:1;this.scaleTo(t,c,!0)}this.$emit("dobuleClick",e.style.scale)},onload:function(t){var e=this.items[t];e.loaded=!0,e.error=!1,this.progress=100,this.loading=!1},onerror:function(t){var e=this.items[t];e.loaded=e.error=!0,this.loading=!1,this.$emit("error",t)},beforeSwipeChange:function(t){this.showing||(this.setInitStyle(t),this.items[t].error=!1)},resize:function(){this.items.forEach(function(t){t.initStyle=null}),this.getInitStyle(this.index),this.handler.validation(null,!0)},afterEnter:function(){this.lock=!1,this.showToolbar=!0},beforeLeave:function(){this.showToolbar=!1}}},O=_,j=(i("4ea6"),i("2877")),M=Object(j["a"])(O,o,a,!1,null,null,null),D=M.exports,A={components:{ImageViewer:D},data:function(){return{images:[],items:[{title:"Cat",images:[{alt:"CatYoung Animal",thumbnail:"https://static.webfed.cn/o_1d9u7gc8c8ip1u35n111i46ehce.jpg?imageView2/0/w/300",src:"https://static.webfed.cn/o_1d9u7gc8c8ip1u35n111i46ehce.jpg",w:1280,h:781},{alt:"Kitty Cat Kitten",thumbnail:"https://static.webfed.cn/o_1d9u7gc8cedal1q1nhuc8g243d.jpg?imageView2/0/w/300",src:"https://static.webfed.cn/o_1d9u7gc8cedal1q1nhuc8g243d.jpg",w:1280,h:853},{alt:"Cat Kitten",thumbnail:"https://static.webfed.cn/o_1d9uckkvb1e8m1dd71ir2e95krh.jpg?imageView2/0/w/300",src:"https://static.webfed.cn/o_1d9uckkvb1e8m1dd71ir2e95krh.jpg",w:384,h:384}]},{title:"People",images:[{alt:"Woman Beautiful Girl",thumbnail:"https://static.webfed.cn/o_1d9u7gc8cnpnke014pnu1g25ch.jpg?imageView2/0/w/300",src:"https://static.webfed.cn/o_1d9u7gc8cnpnke014pnu1g25ch.jpg",w:1280,h:853},{alt:"Soldier Military",thumbnail:"https://static.webfed.cn/o_1d9u7gc8ceef1kip1f6kg0jb67g.jpg?imageView2/0/w/300",src:"https://static.webfed.cn/o_1d9u7gc8ceef1kip1f6kg0jb67g.jpg",w:1280,h:818}]},{title:"Sky",images:[{alt:"Direction Sunlight Clouds Sky",thumbnail:"https://static.webfed.cn/o_1d9u7gc8c1ke3jrfliekhu1h3gf.jpg?imageView2/0/w/300",src:"https://static.webfed.cn/o_1d9u7gc8c1ke3jrfliekhu1h3gf.jpg",w:1024,h:1280},{alt:"Bule Clouds Sky",thumbnail:"https://static.webfed.cn/o_1d9u8era42691t556jgo5u1h4d9.jpg?imageView2/0/w/300",src:"https://static.webfed.cn/o_1d9u8era42691t556jgo5u1h4d9.jpg",w:1280,h:1280}]},{title:"Flowers",images:[{alt:"flowers pink",thumbnail:"https://static.webfed.cn/o_1dcbamjfsee0152kobcojq1gh49.jpg?imageView2/0/w/300",src:"https://static.webfed.cn/o_1dcbamjfsee0152kobcojq1gh49.jpg",w:1280,h:853}]}]}},methods:{showViewer:function(t,e){var i=this;this.images=this.items[t].images,this.$nextTick(function(){i.$refs.viewer.show({index:e,selector:"#item".concat(t," img")})})}}},P=A,R=(i("904b"),Object(j["a"])(P,s,n,!1,null,null,null));e["default"]=R.exports},"802d":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"v-swipe",class:{"v-swipe-vertical":t.vertical},on:{touchstart:t.pointerdown,touchmove:t.pointermove,touchend:t.pointerup,mousedown:t.onMousedown}},[i("div",{ref:"items",staticClass:"v-swipe-items",style:t.style,on:{webkitTransitionEnd:function(e){return e.target!==e.currentTarget?null:t.transitionend(e)},transitionEnd:function(e){return e.target!==e.currentTarget?null:t.transitionend(e)}}},[t._t("default")],2),t.dot?i("ul",{staticClass:"v-swipe-dots"},t._l(t.items.length,function(e,s){return i("li",{key:s,class:{"v-swipe-dots-active":s===t.currentIndex}})}),0):t._e()])},n=[],o=(i("af89"),i("83d8"),i("ec31")),a=i("cef0");function r(t){return{nextAction:t[0],prevAction:t[1],size:t[2]}}var l={name:"Swipe",props:{value:{type:Number,default:0},animationDuration:{type:Number,default:350},threshold:{type:Number,default:10},distance:{type:Number,default:30},friction:{type:Number,default:.2},dot:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!1},playInterval:{type:Number,default:2e3},vertical:{type:Boolean,default:!1},optimization:{type:Boolean,default:!1},stopPropagation:{type:Boolean,default:!0},preload:{type:Boolean,default:!1},touchmove:{type:Function,required:!1},showPrev:{type:Function,required:!1},showNext:{type:Function,required:!1},offset:{type:Number,default:0}},data:function(){return{translate:0,duration:0,items:[],currentIndex:this.value}},computed:{style:function(){return{transitionDuration:"".concat(this.duration,"ms"),transform:this.vertical?"translate3d(0, ".concat(this.translate,"px, 0)"):"translate3d(".concat(this.translate,"px, 0, 0)")}}},watch:{value:function(t){this.isChange||(this.isVaildIndex(t)?this.slide(t):this.$emit("input",this.getVaildIndex(t))),this.isChange=!1},vertical:function(){this.duration=0,this.initActions(),this.setTranslate(this.currentIndex)}},created:function(){this.items=this.$children},mounted:function(){this.handleResize=Object(a["c"])(this.handleResize),this.removeMouseEvents=a["l"],this.handler=new o["a"]({touchDelay:2,threshold:this.threshold,isPreventDefault:this.isPrevOrNextAction,isStopPropagation:this.isStopPropagation}),this.initActions(),this.showItem(this.currentIndex),this.setTranslate(this.currentIndex),this.bindResizeEvent(),this.play()},activated:function(){this.bindResizeEvent()},deactivated:function(){clearTimeout(this.playTimer),this.removeResizeEvent()},beforeDestroy:function(){clearTimeout(this.playTimer),this.removeResizeEvent(),this.handler=null,this.removeMouseEvents=null},methods:{pointerdown:function(t){this.handler.start(t),this.duration=0,this.startTranslate=this.translate,clearTimeout(this.playTimer),this.$emit("down")},pointermove:function(t){this.handler.move(t)},pointerup:function(){this.handler.up();var t=this.shouldSlide();if(this.$emit("up",t),t)return t.restore?this.slide(this.currentIndex):t.next?this.next():t.prev?this.prev():void 0},onMousedown:function(t){t.preventDefault(),this.pointerdown(t),this.removeMouseEvents=Object(o["b"])(this.pointermove,this.pointerup)},isPrevOrNextAction:function(){return this.handler.is(this.directionMap.nextAction)||this.handler.is(this.directionMap.prevAction)},isStopPropagation:function(){return this.stopPropagation&&this.isPrevOrNextAction()},update:function(t,e){var i=this.hasPrevNext(this.handler.is(this.directionMap.nextAction))?1:this.friction,s=this.vertical?e:t,n=s*i;this.showAdjacentItem(),this.translate+=n,this.touchmove&&this.touchmove(this.translate,n)},slide:function(t,e){t=this.getVaildIndex(t),this.isChange=t!==this.currentIndex,this.isChange&&(this.$emit("beforeChange",t),this.showItem(t),this.$emit("input",t),this.$emit("change",t),this.currentIndex=t),this.duration=e||this.animationDuration,this.setTranslate(t)},next:function(){this.slide(this.currentIndex+1)},prev:function(){this.slide(this.currentIndex-1)},transitionend:function(){this.optimization&&this.showCurrentItem(),this.play(),this.$emit("stop",this.currentIndex)},setTranslate:function(t){var e=-t*(this.getSwipeRect()[this.directionMap.size]+this.offset);this.translate=e},shouldSlide:function(){var t=this.handler.is(this.directionMap.prevAction),e=this.handler.is(this.directionMap.nextAction);if(!t&&!e)return!1;if(this.handler.isFast)return{restore:!1,prev:t,next:e};var i=this.translate-this.startTranslate,s=Math.abs(i)<this.distance,n=this.translate<this.startTranslate;return{restore:s,next:n,prev:!n}},isVaildIndex:function(t){return t>=0&&t<this.items.length},getVaildIndex:function(t){return Math.max(Math.min(t||0,this.items.length-1),0)},getSwipeRect:function(){return this.swipeRect||(this.swipeRect=this.$el.getBoundingClientRect())},hasPrevNext:function(t){var e=this.currentIndex-1>=0,i=this.currentIndex+1<this.items.length;return!t&&e||t&&i},play:function(){var t=this;this.autoPlay&&(clearTimeout(this.playTimer),this.playTimer=setTimeout(function(){var e=t.currentIndex===t.items.length-1;e?t.slide(0):t.next()},this.playInterval))},initActions:function(){this.handler.removeActions(),this.directionMap=r(this.vertical?["panup","pandown","height"]:["panleft","panright","width"]);var t=this.directionMap,e=t.prevAction,i=t.nextAction,s=this.handler.options;s[e]=s[i]=this.update},preloadItem:function(t){var e=this.items[t-1],i=this.items[t+1];e&&(e.loaded=!0),i&&(i.loaded=!0)},showItem:function(t){var e=this.items[t];e.loaded=e.show=!0,this.preload&&this.preloadItem(t)},showCurrentItem:function(){var t=this;this.items.forEach(function(e,i){e.show=i==t.currentIndex})},showAdjacentItem:function(){if(this.handler.is(this.directionMap.prevAction)){var t=this.currentIndex-1,e=this.items[t];e&&(this.showPrev&&this.showPrev(t),e.loaded=e.show=!0)}else if(this.handler.is(this.directionMap.nextAction)){var i=this.currentIndex+1,s=this.items[i];s&&(this.showNext&&this.showNext(i),s.loaded=s.show=!0)}},bindResizeEvent:function(){this.isBindResize||(window.addEventListener("resize",this.handleResize),this.isBindResize=!0)},removeResizeEvent:function(){window.removeEventListener("resize",this.handleResize),this.isBindResize=!1},handleResize:function(){this.swipeRect=null,this.setTranslate(this.currentIndex),this.$emit("resize")}}},h=l,c=(i("18af"),i("2877")),u=Object(c["a"])(h,s,n,!1,null,null,null);e["a"]=u.exports},"85f4":function(t,e,i){var s=i("fa53");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var n=i("499e").default;n("6e7988b7",s,!0,{sourceMap:!1,shadowMode:!1})},"904b":function(t,e,i){"use strict";var s=i("db65"),n=i.n(s);n.a},"914e":function(t,e,i){"use strict";var s=i("85f4"),n=i.n(s);n.a},"9b25":function(t,e,i){var s=i("d3b2");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var n=i("499e").default;n("1e2b499e",s,!0,{sourceMap:!1,shadowMode:!1})},a6a8:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".page-image-viewer-item ul{list-style:none;margin:0 -5px;padding:0}.page-image-viewer-item li{padding-bottom:10px;padding-left:5px;padding-right:5px;display:inline-block;box-sizing:border-box;width:33.33333%}.page-image-viewer-item li img{width:100%;vertical-align:middle}.page-image-viewer-toolbar{position:absolute;bottom:0;left:0;padding:10px;width:100%;height:100px;color:#e5e5e5;font-size:14px;background-color:rgba(0,0,0,.3);box-sizing:border-box}",""])},a87c:function(t,e,i){var s=i("2e4a");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var n=i("499e").default;n("712811af",s,!0,{sourceMap:!1,shadowMode:!1})},d3b2:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".v-ring{position:relative;color:#2196f3}.v-ring-inner{-webkit-transform:rotate(-90deg);transform:rotate(-90deg);-webkit-transition:stroke-dasharray .3s;transition:stroke-dasharray .3s}.v-ring-progress{position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:100%;height:30px;line-height:30px;text-align:center;font-size:12px}",""])},db65:function(t,e,i){var s=i("a6a8");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var n=i("499e").default;n("55d8bc88",s,!0,{sourceMap:!1,shadowMode:!1})},df4e:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".v-image-viewer{position:fixed;top:0;left:0;z-index:10000;width:100%;height:100%}.v-image-viewer-lock{pointer-events:none}.v-image-viewer-touch{position:absolute;width:100%;height:100%;left:0;top:0}.v-image-viewer-swipe{height:100%}.v-image-viewer-item{margin-right:20px;overflow:hidden;width:100%}.v-image-viewer-transform{position:absolute;left:0;top:0;-webkit-transition-timing-function:ease;transition-timing-function:ease;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transform-origin:left top;transform-origin:left top}.v-image-viewer-img,.v-image-viewer-toolbar{position:absolute;top:0;left:0;width:100%;height:100%}.v-image-viewer-toolbar{visibility:hidden;opacity:0;-webkit-transition:visibility .3s,opacity .3s;transition:visibility .3s,opacity .3s;z-index:3;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-image-viewer-toolbar>div{pointer-events:auto}.v-image-viewer-toolbar-show{opacity:1;visibility:visible}.v-image-viewer-topbar{position:absolute;top:0;left:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 10px;width:100%;height:40px}.v-image-viewer-topbar span{font-size:14px;color:#e5e5e5;text-shadow:1px 1px 1px rgba(0,0,0,.8);letter-spacing:2px}.v-image-viewer-center{margin:auto;position:absolute;top:0;bottom:0;left:0;right:0;width:45px;height:45px;z-index:2}.v-image-viewer-overlay{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000}.v-image-viewer-enter-active,.v-image-viewer-enter-active .v-image-viewer-overlay,.v-image-viewer-leave-active,.v-image-viewer-leave-active .v-image-viewer-overlay{-webkit-transition:opacity .35s;transition:opacity .35s}.v-image-viewer-enter .v-image-viewer-overlay,.v-image-viewer-leave-to .v-image-viewer-overlay{opacity:0!important}",""])},e887:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"v-ring",style:t.style},[i("svg",{attrs:{viewBox:t.viewBox}},[i("circle",{attrs:{fill:t.backgroundColor,"stroke-linecap":"round",stroke:t.outerColor,"stroke-width":t.strokeWidth,cx:t.offset,cy:t.offset,r:t.radius}}),i("circle",{staticClass:"v-ring-inner",style:t.innerStyle,attrs:{fill:"none","stroke-dashoffset":"round"===t.linecap?"1px":0,stroke:t.color,"stroke-width":t.innerWidth,"stroke-linecap":t.linecap,"stroke-dasharray":t.dasharray,cx:t.offset,cy:t.offset,r:t.radius}})]),t._t("progress",[i("div",{staticClass:"v-ring-progress",style:{color:t.textColor,fontSize:t.fontSize}},[t._v("\n      "+t._s(t.value)+"%\n    ")])])],2)},n=[],o=(i("83d8"),{name:"Ring",props:{value:{type:Number,default:0},color:{type:String,default:"currentColor"},outerColor:{type:String,default:"#ffffff"},backgroundColor:{type:String,default:"none"},size:{type:Number,default:100},linecap:{type:String,default:"round"},strokeWidth:{type:Number,default:5},innerStrokeWidth:{type:Number,default:5},radius:{type:Number,default:50},textColor:{type:String,default:"inherit"}},computed:{innerStyle:function(){return{transformOrigin:"".concat(this.offset,"px ").concat(this.offset,"px")}},style:function(){return{width:this.size+"px",height:this.size+"px"}},offset:function(){return 2*this.radius+this.innerStrokeWidth},viewBox:function(){return"".concat(this.offset/2,",").concat(this.offset/2,",").concat(this.offset,",").concat(this.offset)},dasharray:function(){var t=Math.floor(2*Math.PI*this.radius);return"".concat(t*this.value/100,",10000")},innerWidth:function(){return"number"===typeof this.innerStrokeWidth?this.innerStrokeWidth:this.strokeWidth-1},fontSize:function(){return Math.max(Math.floor(this.size/6),10)+"px"}}}),a=o,r=(i("41ab"),i("2877")),l=Object(r["a"])(a,s,n,!1,null,null,null);e["a"]=l.exports},fa53:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".v-swipe-item{position:relative;-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%}.v-swipe-item-content{height:100%}",""])}}]);