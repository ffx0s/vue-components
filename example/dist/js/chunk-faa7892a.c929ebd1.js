(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-faa7892a"],{"4bd8":function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,".v-haedroom{width:100%;z-index:99996;opacity:0;-webkit-transition:opacity .2s;transition:opacity .2s}.v-headroom-visible{opacity:1}.v-headroom-pinned{-webkit-transform:translateZ(0) translateY(0);transform:translateZ(0) translateY(0)}.v-headroom-top{position:relative}.v-headroom-bottom{position:fixed;bottom:0;-webkit-transform:translateZ(0);transform:translateZ(0)}.v-headroom-bottom .v-headroom-unpinned{-webkit-transform:translateZ(0) translateY(100%);transform:translateZ(0) translateY(100%)}.v-headroom-top .v-headroom-unpinned{-webkit-transform:translateZ(0) translateY(-100%);transform:translateZ(0) translateY(-100%)}.v-headroom-transition{position:fixed;left:0;width:100%;z-index:5;-webkit-transition:-webkit-transform .3s ease-in-out;transition:-webkit-transform .3s ease-in-out;transition:transform .3s ease-in-out;transition:transform .3s ease-in-out,-webkit-transform .3s ease-in-out}.v-headroom-notransition{-webkit-transition-duration:0s;transition-duration:0s}",""])},"57e6":function(t,i,e){"use strict";var o=e("9e02"),s=e.n(o);s.a},"5c97":function(t,i,e){"use strict";var o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("WithScroll",{staticClass:"v-haedroom",class:[{"v-headroom-visible":t.visible},"v-headroom-"+t.position],style:{height:this.containerHeight+"px"},attrs:{rAF:"",onscroll:t.update}},[e("div",{ref:"headroom",class:[t.initialClass,t.toggleClass&&t.transitionClass,t.toggleClass,{"v-headroom-notransition":!t.fixed&&t.noTransition}]},[t._t("default")],2)])},s=[],n=(e("83d8"),e("992d")),a={name:"Headroom",components:{WithScroll:n["a"]},props:{disabled:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1},position:{type:String,default:"top"},height:{type:Number,default:0},resistance:{type:Number,default:10},maxTop:{type:Number,default:100},visible:{type:Boolean,default:!0},pinnedClass:{type:String,default:"v-headroom-pinned"},unpinnedClass:{type:String,default:"v-headroom-unpinned"},transitionClass:{type:String,default:"v-headroom-transition"},initialClass:{type:String,default:"v-headroom-initial"}},data:function(){var t="top"===this.position;return{isTop:t,noTransition:t,toggleClass:"",containerHeight:this.height}},mounted:function(){this.lastTop=0,this.startTop=0,this.containerHeight=this.height||this.$refs.headroom.firstChild.offsetHeight},methods:{update:function(t){if(!this.disabled){if(t<=0)return this.restore();0===this.startTop&&(this.startTop=t),t<this.containerHeight&&this.toggleClass===this.unpinnedClass?this.pinned():(Math.abs(this.lastTop-t)>=this.resistance||Math.abs(this.lastTop-this.startTop)>this.maxTop)&&t>this.containerHeight&&(this[t>this.lastTop?"unpinned":"pinned"](),this.startTop=0),this.lastTop=t}},pinned:function(){this.toggleClass=this.pinnedClass,this.noTransition=!1,this.$emit("pinned")},unpinned:function(){this.toggleClass=this.unpinnedClass,this.$emit("unpinned")},restore:function(){this.toggleClass="",this.noTransition=this.isTop,this.$emit("restore")}}},r=a,l=(e("57e6"),e("2877")),d=Object(l["a"])(r,o,s,!1,null,null,null);i["a"]=d.exports},"838f":function(t,i,e){var o=e("8c42");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var s=e("499e").default;s("615239fa",o,!0,{sourceMap:!1,shadowMode:!1})},"8c42":function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,".demo-scrollToTop{width:45px;height:45px;line-height:45px;text-align:center;font-size:22px;font-weight:700;background-color:rgba(0,0,0,.4);color:#fff;border-radius:4px}.demo-scrollToTop-initial,.demo-scrollToTop-unpinned{opacity:0}.demo-scrollToTop-pinned{opacity:1}.demo-scrollToTop-transition{-webkit-transition:opacity .3s;transition:opacity .3s}.page-headroom-space{height:46px}.page-headeroom-items{padding:0 10px;margin:0;margin-top:10px;font-size:0;list-style-type:none}.page-headeroom-items li{margin-bottom:10px;width:100%;height:120px;line-height:120px;background:#fff;border-radius:4px;font-size:16px;text-align:center}",""])},"992d":function(t,i,e){"use strict";var o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[t._t("default")],2)},s=[],n=(e("83d8"),e("cef0")),a={name:"WithScroll",props:{rAF:Boolean,wait:Number,onscroll:{type:Function,default:function(){}}},mounted:function(){this.bind()},activated:function(){this.bind()},deactivated:function(){this.unbind()},beforeDestroy:function(){this.unbind(),this.handleScroll=null},methods:{bind:function(){this.isBind||(this.handleScroll=this.rAF?Object(n["m"])(this.handleScroll):Object(n["q"])(this.handleScroll,this.wait),this.scrollEl=Object(n["e"])(this.$el),Object(n["a"])(this.scrollEl,"scroll",this.handleScroll),this.isBind=!0)},unbind:function(){this.isBind&&(Object(n["n"])(this.scrollEl,"scroll",this.handleScroll),this.isBind=!1,this.scrollEl=null)},handleScroll:function(){this.scrollTop=Object(n["f"])(this.scrollEl),this.onscroll(this.scrollTop)},setScrollTop:function(t){Object(n["o"])(this.scrollEl,t)}}},r=a,l=e("2877"),d=Object(l["a"])(r,o,s,!1,null,null,null);i["a"]=d.exports},"9e02":function(t,i,e){var o=e("4bd8");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var s=e("499e").default;s("36280a08",o,!0,{sourceMap:!1,shadowMode:!1})},bac0:function(t,i,e){"use strict";var o=e("838f"),s=e.n(o);s.a},d01e:function(t,i,e){"use strict";e.r(i);var o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{directives:[{name:"show",rawName:"v-show",value:t.shouldTransfer,expression:"shouldTransfer"}],staticClass:"page-headroom-space"}),e("Headroom",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom",value:t.shouldTransfer,expression:"shouldTransfer"}],attrs:{visible:t.visible,fixed:""}},[e("Navbar",{attrs:{title:"Headroom"}},[e("VButton",{attrs:{slot:"right",small:"",type:"icon"},on:{click:t.showDrawer},slot:"right"},[e("svg",{staticStyle:{width:"25px",height:"25px"},attrs:{viewBox:"0 0 1024 1024"}},[e("path",{attrs:{d:"M800 320 224 320c-17.664 0-32-14.336-32-32s14.336-32 32-32l576 0c17.696 0 32 14.336 32 32S817.696 320 800 320z",fill:"currentColor"}}),e("path",{attrs:{d:"M800 544 224 544c-17.664 0-32-14.336-32-32s14.336-32 32-32l576 0c17.696 0 32 14.336 32 32S817.696 544 800 544z",fill:"currentColor"}}),e("path",{attrs:{d:"M800 768 224 768c-17.664 0-32-14.336-32-32s14.336-32 32-32l576 0c17.696 0 32 14.336 32 32S817.696 768 800 768z",fill:"currentColor"}})])])],1)],1),e("h4",{staticClass:"text-center"},[t._v("在有transform属性的父元素里使用会失效")]),e("ul",{staticClass:"page-headeroom-items"},t._l(10,function(i){return e("li",{key:i},[t._v(t._s(i))])}),0),e("Headroom",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom",value:t.shouldTransfer,expression:"shouldTransfer"}],staticStyle:{width:"45px",bottom:"100px",right:"20px"},attrs:{visible:t.visible,position:"bottom",initialClass:"demo-scrollToTop-initial",pinnedClass:"demo-scrollToTop-pinned",unpinnedClass:"demo-scrollToTop-unpinned",transitionClass:"demo-scrollToTop-transition"}},[e("div",{staticClass:"demo-scrollToTop"},[t._v("↑")])]),e("Headroom",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom",value:t.shouldTransfer,expression:"shouldTransfer"}],attrs:{visible:t.visible,position:"bottom"}},[e("VButton",{staticStyle:{"border-radius":"0"},attrs:{block:"",type:"primary"}},[t._v(" Toolbar ")])],1)],1)},s=[],n=e("5c97"),a=e("c233"),r={name:"page-headroom",components:{Headroom:n["a"],VButton:a["a"]},data:function(){return{visible:!0,transfer:!0}},computed:{drawerShow:function(){return this.$store.state.page.drawerShow},shouldTransfer:function(){return this.transfer&&!this.drawerShow}},beforeRouteLeave:function(t,i,e){this.visible=!1,e()},activated:function(){this.visible=!0,this.transfer=!0},deactivated:function(){this.transfer=!1},methods:{showDrawer:function(){this.$store.commit("page/drawerShow",{show:!0,direction:"right"})}}},l=r,d=(e("bac0"),e("2877")),h=Object(d["a"])(l,o,s,!1,null,null,null);i["default"]=h.exports}}]);