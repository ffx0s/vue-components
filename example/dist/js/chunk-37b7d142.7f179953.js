(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-37b7d142","chunk-9d4413b6"],{"07e1":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("InfiniteScroll",{staticClass:"page-infinite-scroll",attrs:{empty:t.empty,failed:t.failed,finished:t.finished,backgroundColor:"#f0eff5"},on:{load:t.load,refresh:t.refresh},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[i("transition-group",{staticClass:"items",attrs:{tag:"ul",name:t.transitionName}},t._l(t.items,function(t){return i("Card",{key:t.id,attrs:{tag:"li",item:t}})}),1)],1)},s=[],l=i("cebc"),n=i("0de0"),o=i("90e0"),r=i("c4c8"),c={components:{Card:n["a"],InfiniteScroll:o["a"]},data:function(){return{items:[],loading:!0,finished:!1,failed:!1,empty:!1,transitionName:"item"}},created:function(){this.query={offset:0,limit:15}},methods:{fetchData:function(t){var e=this;return this.failed=!1,Object(r["b"])(t).then(function(i){var a=i.records,s=i.pages,l=i.total;e.loading?(e.transitionName="item",e.items=e.items.concat(a),e.query.offset=t.offset):(e.transitionName="",e.items=a,e.query.offset=1),e.empty=!l,e.finished=t.offset>=s}).catch(this.failure)},load:function(t){this.fetchData(Object(l["a"])({},this.query,{offset:this.query.offset+1})).then(t)},refresh:function(t){this.fetchData(Object(l["a"])({},this.query,{offset:1})).then(t)},failure:function(){this.failed=!0}}},d=c,u=(i("a7d0"),i("2877")),f=Object(u["a"])(d,a,s,!1,null,null,null);e["default"]=f.exports},"0ca5":function(t,e,i){var a=i("b57b");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("499e").default;s("f474bdda",a,!0,{sourceMap:!1,shadowMode:!1})},"0de0":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i(t.tag,{tag:"component",staticClass:"v-c2"},[i("div",{staticClass:"v-c2__image",class:t.loadingClass},[t.item.image?i("img",{attrs:{src:t.item.image}}):t._e()]),i("div",{staticClass:"v-c2__detail"},[i("div",{staticClass:"v-c2__title",class:t.loadingClass},[t._v(t._s(t.item.title))]),i("div",{staticClass:"v-c2__description",class:t.loadingClass},[t._v("\n      "+t._s(t.item.description)+"\n    ")])])])},s=[],l={name:"v-card-c2",props:{tag:{type:String,default:"div"},loading:{type:Boolean,default:!1},item:{type:Object,default:function(){return{image:"",title:"",description:""}}}},computed:{loadingClass:function(){return this.loading?"v-skeleton":""}}},n=l,o=(i("ef5d"),i("2877")),r=Object(o["a"])(n,a,s,!1,null,null,null);e["a"]=r.exports},"12b3":function(t,e,i){var a=i("3acd");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("499e").default;s("57d2f32c",a,!0,{sourceMap:!1,shadowMode:!1})},"17a6":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".v-c1{width:100%;margin-bottom:18px;-webkit-box-shadow:0 4px 8px rgba(0,0,0,.2);box-shadow:0 4px 8px rgba(0,0,0,.2);-webkit-transition:.3s;transition:.3s;background-color:#fff}.v-c1:hover{-webkit-box-shadow:0 8px 16px rgba(0,0,0,.2);box-shadow:0 8px 16px rgba(0,0,0,.2)}.v-c1__image{width:100%;height:130px;overflow:hidden}.v-c1__image img{max-width:100%}.v-c1__detail{padding:10px 15px}.v-c1__title{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-size:16px;min-height:26px;font-weight:450}.v-c1__description{margin-top:5px;min-height:80px;font-size:14px}",""])},"1c52":function(t,e,i){"use strict";var a=i("b1c4"),s=i.n(a);s.a},2318:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("h4",{staticClass:"text-center"},[t._v("Swpie 横向")]),i("Swipe",{staticClass:"demo-swipe",attrs:{preload:"",vertical:t.vertical},on:{change:t.change},model:{value:t.index,callback:function(e){t.index=e},expression:"index"}},t._l(t.imgs,function(t,e){return i("SwipeItem",{key:e,attrs:{lazy:""}},[i("img",{staticClass:"img",attrs:{src:t}})])}),1),i("h4",{staticClass:"text-center"},[t._v("Swpie 垂直")]),i("Swipe",{staticClass:"demo-swipe",attrs:{vertical:"",optimization:"",preload:""},on:{change:t.change},model:{value:t.index2,callback:function(e){t.index2=e},expression:"index2"}},t._l(t.imgs,function(t){return i("SwipeItem",{key:t,attrs:{lazy:""}},[i("img",{staticClass:"img",attrs:{src:t}})])}),1)],1)},s=[],l=i("802d"),n=i("0678"),o={components:{Swipe:l["a"],SwipeItem:n["a"]},data:function(){return{vertical:!1,index:0,index2:0,imgs:["https://static.webfed.cn/o_1d9u7gc8cedal1q1nhuc8g243d.jpg?imageView2/0/w/700","https://static.webfed.cn/o_1d9u7gc8c8ip1u35n111i46ehce.jpg?imageView2/0/w/700","https://static.webfed.cn/o_1d9u7gc8cnpnke014pnu1g25ch.jpg?imageView2/0/w/700","https://static.webfed.cn/o_1d9u7gc8ceef1kip1f6kg0jb67g.jpg?imageView2/0/w/700"]}},methods:{change:function(t){console.log(t)}}},r=o,c=(i("a505"),i("2877")),d=Object(c["a"])(r,a,s,!1,null,null,null);e["default"]=d.exports},"26ec":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".demo-swipe{margin:0 auto;width:100%;height:200px;background:#fff}.demo-swipe .img{max-width:100%}",""])},"29b6":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".page-infinite-scroll{padding-bottom:10px}",""])},"3acd":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".v-tab-nav{display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;left:-8px;margin:0;padding:0;list-style:none;height:44px;line-height:44px;text-align:center}.v-tab-nav dt{-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-sizing:border-box;box-sizing:border-box;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;-webkit-transition:color .3s;transition:color .3s}.v-tab-nav-scrollable dt{-webkit-box-flex:0;-ms-flex:0 0 22%;flex:0 0 22%;width:22%}.v-tab-nav-line{position:absolute;left:0;bottom:0;margin:0;width:40px;height:3px;-webkit-transition-property:width,-webkit-transform;transition-property:width,-webkit-transform;transition-property:transform,width;transition-property:transform,width,-webkit-transform}.v-tab-nav-active{color:#2196f3}",""])},"3b86":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".v-c4{font-size:12px;line-height:18px;background-color:#fff;border-radius:4px}.v-c4__header{padding:10px 10px 0}.v-c4__content{padding:10px}.v-c4__list{list-style:none;padding:0;margin:0}.v-c4__list li{margin-bottom:10px}.v-c4__item-image{width:90px;height:90px;border-radius:5px;background-position:50%;background-repeat:no-repeat}.v-c4__item-info{margin-left:10px}.v-c4__item-info,.v-c4__item-title{-webkit-box-flex:1;-ms-flex:1;flex:1}.v-c4__item-title{margin-bottom:5px}.v-c4__item-price{margin-left:10px;text-align:right}.v-c4__item-number{color:#8e8e90}.v-c4__footer{padding:10px;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.v-c4__total{text-align:right}.v-c4_row{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.v-c4_between,.v-c4_row{display:-webkit-box;display:-ms-flexbox;display:flex}.v-c4_between{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}",""])},"4c1f":function(t,e,i){var a=i("6dc3");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("499e").default;s("a35a6bdc",a,!0,{sourceMap:!1,shadowMode:!1})},"4ec8":function(t,e,i){var a=i("29b6");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("499e").default;s("878d5d48",a,!0,{sourceMap:!1,shadowMode:!1})},5005:function(t,e,i){"use strict";var a=i("4c1f"),s=i.n(a);s.a},"5c35":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".v-infinite-scroll-footer{padding-top:10px;padding-bottom:10px;width:100%;text-align:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.v-infinite-scroll-empty,.v-infinite-scroll-footer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.v-infinite-scroll-empty{min-height:400px}.v-infinite-scroll-loading{color:#d9d9d9}",""])},"5e62":function(t,e,i){var a=i("7752");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("499e").default;s("659c7993",a,!0,{sourceMap:!1,shadowMode:!1})},"5f31":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".demo-tab{position:absolute;top:46px;bottom:0;width:100%;height:auto}.demo-tab-item .items{margin-top:10px}",""])},"6dc3":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".v-tab{position:relative;height:100%}.v-tab-content{position:absolute;bottom:0;left:0;right:0;width:100%}.v-tab-item{position:relative;z-index:1;width:100%;height:100%}.v-tab-item>.v-swipe-item-content{overflow-y:auto;-webkit-overflow-scrolling:touch}",""])},7752:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".v-c2{display:-webkit-box;display:-ms-flexbox;display:flex;padding:10px;background-color:#fff}.v-c2__image{width:100px;height:100px;background-color:#f0eff5;border-radius:5px}.v-c2__image img{max-width:100%;border-radius:inherit}.v-c2__detail{margin-left:10px;-webkit-box-flex:1;-ms-flex:1;flex:1}.v-c2__title{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-size:16px;min-height:26px;font-weight:450}.v-c2__description{margin-top:5px;height:62px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;font-size:14px}",""])},7769:function(t,e,i){var a=i("5c35");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("499e").default;s("3cefd642",a,!0,{sourceMap:!1,shadowMode:!1})},"7d81":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"v-scroll-view",class:[{"v-scroll-view-hidebar":!t.scrollBar},{"v-scroll-view-disabled":!t.scrollable}]},[t.vertical?[i("div",{ref:"scroller",staticClass:"v-scroll-view-scroller v-scroll-view-vertical",on:{touchmove:function(t){t.stopPropagation()}}},[i("div",{staticClass:"v-scroll-view-slot"},[t._t("default")],2)]),t.gradient?[i("div",{staticClass:"v-scroll-view-overlay-vertical",style:{top:0,background:t.setStyle("bottom")}}),i("div",{staticClass:"v-scroll-view-overlay-vertical",style:{bottom:0,background:t.setStyle("top")}})]:t._e()]:[i("div",{ref:"scroller",staticClass:"v-scroll-view-scroller v-scroll-view-horizontal",on:{touchmove:function(t){t.stopPropagation()}}},[i("div",{style:{width:t.width}},[i("div",{staticClass:"v-scroll-view-slot",style:t.slotStyle},[t._t("default")],2)])]),t.gradient?[i("div",{staticClass:"v-scroll-view-overlay-horizontal",style:{left:0,background:t.setStyle("right")}}),i("div",{staticClass:"v-scroll-view-overlay-horizontal",style:{right:0,background:t.setStyle("left")}})]:t._e()]],2)},s=[],l=i("4c72"),n={name:"ScrollView",props:{vertical:{type:Boolean,default:!1},maxWidth:{type:String,required:!1,default:"5000px"},gradient:{type:String,default:"rgba(255, 255, 255, 1)"},scrollBar:{type:Boolean,default:!0},flex:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!0}},computed:{width:function(){return this.flex?"100%":this.maxWidth},slotStyle:function(){return this.flex?{width:"100%"}:{float:"left"}},scrollProps:function(){return this.vertical?"scrollTop":"scrollLeft"}},methods:{setStyle:function(t){return"linear-gradient(to ".concat(t,", ").concat(this.gradient,", rgba(255, 255, 255, 0))")},scrollTo:function(t){var e=this,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=this.getScrollValue();a!==t&&(this.animate&&this.animate.stop(),i?this.animate=Object(l["a"])({targets:[[a,t]],running:function(t){e.$refs.scroller[e.scrollProps]=t[0]}}):this.$refs.scroller[this.scrollProps]=t)},scroll:function(t){var e=this,i=this.getScrollValue(),a=i+t;this.animate&&this.animate.stop(),this.animate=Object(l["a"])({targets:[[i,a]],running:function(t){e.$refs.scroller[e.scrollProps]=t[0]}})},getScrollValue:function(){return this.$refs.scroller[this.scrollProps]}}},o=n,r=(i("c3df"),i("2877")),c=Object(r["a"])(o,a,s,!1,null,null,null);e["a"]=c.exports},"87a0":function(t,e,i){"use strict";var a=i("f789f"),s=i.n(a);s.a},"8e96":function(t,e,i){var a=i("26ec");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("499e").default;s("5946f42f",a,!0,{sourceMap:!1,shadowMode:!1})},"90e0":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("WithScroll",{attrs:{onscroll:t.update}},[i(t.pullRefresh?"PullRefresh":"div",t._b({tag:"component",attrs:{failed:t.failed,disabled:t.isLoading},on:{refresh:t.refresh},model:{value:t.refreshing,callback:function(e){t.refreshing=e},expression:"refreshing"}},"component",t.$attrs,!1),[i("div",{ref:"container",staticClass:"v-infinite-scroll"},[t._t("default")],2),i("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],staticClass:"v-infinite-scroll-footer"},[t._t("loading",[i("Loading",{staticClass:"v-infinite-scroll-loading",attrs:{size:"32"}})])],2),i("div",{directives:[{name:"show",rawName:"v-show",value:t.finished&&!t.empty,expression:"finished && !empty"}],staticClass:"v-infinite-scroll-footer"},[t._t("finished",[t._v("全部加载完成")])],2),i("div",{directives:[{name:"show",rawName:"v-show",value:t.empty,expression:"empty"}],staticClass:"v-infinite-scroll-footer"},[t._t("empty",[i("div",{staticClass:"v-infinite-scroll-empty"},[t._v("空空如也")])])],2),i("div",{directives:[{name:"show",rawName:"v-show",value:t.failed&&!t.finished,expression:"failed && !finished"}],staticClass:"v-infinite-scroll-footer",on:{click:t.load}},[t._t("failed",[t._v("加载失败,点击重试")])],2)])],1)},s=[],l=(i("83d8"),i("78a4a")),n=i("b4b5"),o=i("992d"),r=i("cef0"),c={name:"InfiniteScroll",inheritAttrs:!1,components:{WithScroll:o["a"],PullRefresh:l["a"],Loading:n["a"]},props:{value:{type:Boolean,required:!0},finished:{type:Boolean,default:!1},failed:{type:Boolean,default:!1},empty:{type:Boolean,default:!1},offset:{type:Number,default:300},pullRefresh:{type:Boolean,default:!0}},data:function(){return{refreshing:!1,isLoading:!1}},watch:{value:{handler:function(t){t&&this.load()},immediate:!0}},methods:{update:function(){this.shouldLoadMore()&&this.load()},shouldLoadMore:function(){if(this.finished||this.value||this.failed)return!1;var t=this.$refs.container.getBoundingClientRect().bottom;return t-r["r"].height()<=this.offset},load:function(){this.finished?this.done():this.isLoading||this.refreshing||(this.isLoading=!0,this.$emit("input",!0),this.$emit("load",this.done))},refresh:function(t){this.$emit("refresh",t)},done:function(){var t=this;this.$nextTick(function(){t.$emit("input",!1),t.isLoading=!1})}}},d=c,u=(i("cc5c"),i("2877")),f=Object(u["a"])(d,a,s,!1,null,null,null);e["a"]=f.exports},"97b3":function(t,e,i){"use strict";var a=i("bda4"),s=i.n(a);s.a},"992d":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._t("default")],2)},s=[],l=(i("83d8"),i("cef0")),n={name:"WithScroll",props:{rAF:Boolean,wait:Number,onscroll:{type:Function,default:function(){}}},mounted:function(){this.bind()},activated:function(){this.bind()},deactivated:function(){this.unbind()},beforeDestroy:function(){this.unbind(),this.handleScroll=null},methods:{bind:function(){this.isBind||(this.handleScroll=this.rAF?Object(l["m"])(this.handleScroll):Object(l["q"])(this.handleScroll,this.wait),this.scrollEl=Object(l["e"])(this.$el),Object(l["a"])(this.scrollEl,"scroll",this.handleScroll),this.isBind=!0)},unbind:function(){this.isBind&&(Object(l["n"])(this.scrollEl,"scroll",this.handleScroll),this.isBind=!1,this.scrollEl=null)},handleScroll:function(){this.scrollTop=Object(l["f"])(this.scrollEl),this.onscroll(this.scrollTop)},setScrollTop:function(t){Object(l["o"])(this.scrollEl,t)}}},o=n,r=i("2877"),c=Object(r["a"])(o,a,s,!1,null,null,null);e["a"]=c.exports},"99ac":function(t,e,i){"use strict";i.r(e);var a,s,l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Navbar",{attrs:{title:"Tab"}}),i("Tabs",{staticClass:"demo-tab",model:{value:t.index,callback:function(e){t.index=e},expression:"index"}},[i("Tab",{staticClass:"demo-tab-item",attrs:{title:"LoadMore",lazy:""}},[i("InfiniteScrollModule")],1),i("Tab",{staticClass:"demo-tab-item",attrs:{title:"PullRefresh",lazy:""}},[i("PullRefreshModule")],1),i("Tab",{staticClass:"demo-tab-item",attrs:{title:"Swipe",lazy:""}},[i("SwipeModule")],1),i("Tab",{staticClass:"demo-tab-item",attrs:{title:"ImgViewer",lazy:""}},[i("ImageViewerModule")],1),i("Tab",{staticClass:"demo-tab-item",attrs:{title:"Skeleton",lazy:""}},[i("SkeletonModule",{model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}})],1)],1)],1)},n=[],o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"v-tab"},[i("TabNav",t._b({ref:"nav",attrs:{index:t.value,tabs:t.tabs},on:{itemClick:t.tabNavItemClick}},"TabNav",t.$attrs,!1)),i("Swipe",{staticClass:"v-tab-content",style:{top:t.navHeight+"px"},attrs:{dot:!1,stopPropagation:!1,touchmove:t.tabMove,optimization:""},on:{up:t.tabUp,change:t.tabChange},model:{value:t.index,callback:function(e){t.index=e},expression:"index"}},t._l(t.$slots.default,function(t,e){return i("SwipeItem",{key:e,ref:"swipeItem",refInFor:!0,staticClass:"v-tab-item"},[i("VNode",{attrs:{node:t}})],1)}),1)],1)},r=[],c=(i("83d8"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ScrollView",{ref:"scrollView",staticClass:"v-bd-y-bottom",style:t.navStyle,attrs:{scrollable:t.scrollable,scrollBar:!1,flex:""}},[i("dl",{staticClass:"v-tab-nav",class:{"v-tab-nav-scrollable":t.scrollable}},[t._l(t.tabs,function(e,a){var s;return i("dt",{key:a,ref:"item",refInFor:!0,class:(s={},s[t.activeClass]=a===t.index,s),on:{click:function(e){return t.$emit("itemClick",a)}}},[e.title?i("span",{class:t.titleClass},[t._v(" "+t._s(e.title)+" ")]):e.$slots.title?i("VNode",{attrs:{node:e.$slots.title[0]}}):t._e()],1)}),i("dd",{staticClass:"v-tab-nav-line",style:t.lineStyle})],2)])}),d=[],u=i("7d81"),f={functional:!0,render:function(t,e){return e.props.node}},v=f,p=i("2877"),h=Object(p["a"])(v,a,s,!1,null,null,null),m=h.exports,b=i("cef0"),g=i("a030"),_={name:"TabNav",components:{ScrollView:u["a"],VNode:m},props:{tabs:Array,index:Number,lineAnimationDuration:{type:Number,default:500},lineColor:{type:String,default:g["properties"].primary},navHeight:{type:Number,default:44},scrollThreshold:{type:Number,default:4},activeClass:{type:String,default:"v-tab-nav-active"},titleClass:{type:String,default:"v-tab-nav-title"}},data:function(){return{lineWidth:0,translate:0,duration:0}},computed:{scrollable:function(){return this.tabs.length>this.scrollThreshold},lineStyle:function(){return{width:this.lineWidth+"px",transitionDuration:"".concat(this.duration,"ms"),transform:"translateX(".concat(this.translate,"px)"),backgroundColor:this.lineColor}},navStyle:function(){return{height:this.navHeight+"px",lineHeight:this.navHeight+"px"}}},mounted:function(){var t=this;this.$nextTick(function(){t.select(t.index,!1)})},methods:{getItemWidth:function(){return this.itemWidth||(this.itemWidth=this.$refs.item[0].getBoundingClientRect().width)},getTitleWidth:function(t){var e=this.$refs.item[t].querySelector("."+this.titleClass),i=this.getItemWidth();return e?Math.min(e.offsetWidth,i):i},getMaxScrollValue:function(){return this.tabs.length*this.getItemWidth()-b["r"].getWidth()},select:function(t,e){this.scrollTo(t,e),this.lineMoveTo(t,e)},scrollTo:function(t,e){if(this.scrollable){var i=this.getItemWidth(),a=i*t+8,s=a-b["r"].getWidth()/2+i/2,l=Math.max(Math.min(this.getMaxScrollValue(),s),0);this.$refs.scrollView.scrollTo(l,e)}},lineMoveTo:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=this.getItemWidth(),a=this.getTitleWidth(t),s=(i-a)/2;this.lineWidth=a,this.duration=e?this.lineAnimationDuration:0,this.translate=t*i+s},lineMove:function(t){this.duration=0,this.translate-=.1*t}}},x=_,w=(i("ea01"),Object(p["a"])(x,c,d,!1,null,null,null)),y=w.exports,C=i("802d"),k=i("0678"),S={name:"Tab",components:{TabNav:y,VNode:m,Swipe:C["a"],SwipeItem:k["a"]},props:{value:{type:Number,default:0}},computed:{index:{get:function(){return this.value},set:function(t){return this.$emit("input",t),t}}},data:function(){return{tabs:[],navHeight:this.$attrs.navHeight||y.props.navHeight.default}},mounted:function(){this.tabs=this.$refs.swipeItem.map(function(t){return t.$children[0]}),this.tabs[this.value].load()},methods:{tabChange:function(t){this.tabs[t].load(),this.$refs.nav.select(t),this.$emit("change",t)},tabMove:function(t,e){this.$refs.nav.lineMove(e)},tabUp:function(){this.$refs.nav.lineMoveTo(this.value)},tabNavItemClick:function(t){t!==this.value&&this.$emit("input",t)}}},$=S,M=(i("5005"),Object(p["a"])($,o,r,!1,null,null,null)),j=M.exports,T=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.loaded?i("div",[t._t("default")],2):t._e()},z=[],O={name:"TabItem",props:{title:{type:String,default:""},lazy:{type:Boolean,default:!1}},data:function(){return{loaded:!this.lazy}},methods:{load:function(){this.loaded||(this.loaded=!0)}}},V=O,B=Object(p["a"])(V,T,z,!1,null,null,null),N=B.exports,I=i("07e1"),E=i("15e8"),W=i("2318"),q=i("729c"),P=i("c8f3"),L={name:"page-tab",components:{Tabs:j,Tab:N,InfiniteScrollModule:I["default"],PullRefreshModule:E["default"],SwipeModule:W["default"],ImageViewerModule:q["default"],SkeletonModule:P["default"]},data:function(){return{index:0,loading:!0}}},R=L,H=(i("1c52"),Object(p["a"])(R,l,n,!1,null,null,null));e["default"]=H.exports},a505:function(t,e,i){"use strict";var a=i("8e96"),s=i.n(a);s.a},a7d0:function(t,e,i){"use strict";var a=i("4ec8"),s=i.n(a);s.a},b1c4:function(t,e,i){var a=i("5f31");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("499e").default;s("7ac3700c",a,!0,{sourceMap:!1,shadowMode:!1})},b57b:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".v-scroll-view{position:relative;z-index:2;background-color:#fff}.v-scroll-view-scroller{width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-overflow-scrolling:touch}.v-scroll-view-vertical{overflow-y:auto;overflow-x:hidden}.v-scroll-view-vertical .v-scroll-view-slot{padding:16px 0}.v-scroll-view-horizontal{overflow-x:auto;overflow-y:hidden}.v-scroll-view-horizontal .v-scroll-view-slot{padding:0 16px}.v-scroll-view-disabled .v-scroll-view-scroller,.v-scroll-view-hidebar{overflow:hidden}.v-scroll-view-hidebar .v-scroll-view-scroller::-webkit-scrollbar{display:none}.v-scroll-view-hidebar .v-scroll-view-vertical{padding-right:15px}.v-scroll-view-hidebar .v-scroll-view-horizontal{padding-bottom:15px}.v-scroll-view-overlay-horizontal{position:absolute;top:0;height:100%;padding:0 8px;pointer-events:none}.v-scroll-view-overlay-vertical{position:absolute;left:0;width:100%;padding:8px 0;pointer-events:none}",""])},bda4:function(t,e,i){var a=i("17a6");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("499e").default;s("4b1d68f3",a,!0,{sourceMap:!1,shadowMode:!1})},c3df:function(t,e,i){"use strict";var a=i("0ca5"),s=i.n(a);s.a},c8f3:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-spacing"},[t.loading?t._m(0):i("Card1",{attrs:{item:t.item}}),i("br"),t.loading?t._m(1):i("Card2",{attrs:{item:t.item2}}),i("br"),t.loading?t._m(2):i("Card3",{attrs:{item:t.item3}}),i("br"),t.loading?t._m(3):i("Card4",{attrs:{item:t.item4}},[i("template",{slot:"btns"},[i("VButton",{attrs:{small:"",outline:""}},[t._v("查看物流")]),i("VButton",{attrs:{small:"",outline:""}},[t._v("延长收货")]),i("VButton",{attrs:{small:"",outline:"",type:"warning"}},[t._v("确认收货")])],1)],2)],1)},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("Card1",{attrs:{loading:""}})},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("Card2",{attrs:{loading:""}})},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("Card3",{attrs:{loading:""}})},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("Card4",{attrs:{loading:""}})}],l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"v-c1"},[i("div",{staticClass:"v-c1__image",class:t.loadingClass},[t.item.image?i("img",{attrs:{src:t.item.image}}):t._e()]),i("div",{staticClass:"v-c1__detail"},[i("div",{staticClass:"v-c1__title",class:t.loadingClass},[t._v(t._s(t.item.title))]),i("div",{staticClass:"v-c1__description",class:t.loadingClass},[t._v("\n      "+t._s(t.item.description)+"\n    ")])])])},n=[],o={name:"v-card-c1",props:{loading:{type:Boolean,default:!1},item:{type:Object,default:function(){return{image:"",title:"",description:""}}}},computed:{loadingClass:function(){return this.loading?"v-skeleton":""}}},r=o,c=(i("97b3"),i("2877")),d=Object(c["a"])(r,l,n,!1,null,null,null),u=d.exports,f=i("0de0"),v=i("1511"),p=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"v-c4"},[i("div",{staticClass:"v-c4__header v-c4_between"},[i("div",{staticClass:"v-c4__header-shopname",class:t.loadingClass},[t._v("\n      "+t._s(t.item.shopname)+"\n    ")]),i("div",{staticClass:"v-color-warning",class:t.loadingClass},[t._v(t._s(t.item.status))])]),i("div",{staticClass:"v-c4__content"},[i("ul",{staticClass:"v-c4__list"},[i("li",{staticClass:"v-c4_row"},[i("div",{staticClass:"v-c4__item-image",class:t.loadingClass,style:t.imageStyle}),i("div",{staticClass:"v-c4__item-info v-c4_between",class:t.loadingClass},[i("div",{staticClass:"v-c4__item-title"},[t._v(t._s(t.item.title))]),i("div",{staticClass:"v-c4__item-price"},[i("div",[t._v(t._s(t.item.price))]),i("div",{staticClass:"v-c4__item-number"},[t._v("x"+t._s(t.item.number))])])])])]),i("div",{staticClass:"v-c4__total"},[i("span",{class:t.loadingClass},[i("span",{staticClass:"v-c4__item-number"},[t._v("共"+t._s(t.item.number)+"件商品")]),t._v("\n         合计: ￥"+t._s(t.item.price)+"\n      ")])])]),i("div",{staticClass:"v-c4__footer v-c4_between v-bd-y-top"},[i("span",{staticClass:"v-color-error"},[t._v(t._s(t.item.message))]),i("div",{staticClass:"v-c4__footer-actions"},[t._t("btns")],2)])])},h=[],m={name:"v-card-c4",props:{item:{type:Object,default:function(){return{image:"",title:"",price:"",number:"",status:"____________",shopname:"_______________",message:""}}},loading:{type:Boolean,default:!1}},computed:{imageStyle:function(){return this.item.image?{backgroundImage:"url("+this.item.image+")",backgroundSize:"cover"}:{}},loadingClass:function(){return this.loading?"v-skeleton":""}}},b=m,g=(i("87a0"),Object(c["a"])(b,p,h,!1,null,null,null)),_=g.exports,x={components:{Card1:u,Card2:f["a"],Card3:v["a"],Card4:_},props:{value:{type:Boolean,default:!0}},computed:{loading:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}},data:function(){return{item:{image:"https://static.webfed.cn/o_1dcbbpm8510miv7h1b0i1qvn1tln9.jpeg?imageView2/0/w/700",title:"江苏省",description:"江苏省，简称苏，是中华人民共和国省级行政区，位于华东地区，省会南京市。“江苏”之名可追溯至清初设置的江苏布政使司，是当时江宁府和苏州府两府首字之合称。"},item2:{image:"http://static.webfed.cn/Fv3hleoT5ts5kNSrqWpXTV6mrztB?imageView2/0/w/300",title:"江苏省",description:"江苏省，简称苏，是中华人民共和国省级行政区，位于华东地区，省会南京市。“江苏”之名可追溯至清初设置的江苏布政使司，是当时江宁府和苏州府两府首字之合称。"},item3:{image:"https://static.webfed.cn/o_1d9uckkvb1e8m1dd71ir2e95krh.jpg?imageView2/0/w/300",name:"在沙漠里打滚",date:"2018-08-18",content:"卖家超级好，有问题反馈了，很快就给解决，东西好评，还会再来。"},item4:{image:"https://static.webfed.cn/o_1dcbc380up531sgu178aebf62ph.jpg?imageView2/0/w/300",title:"安岳黄柠檬新鲜12个当季水果一二级小果皮薄多汁包邮非青香水柠檬",price:23,number:1,status:"卖家已发货",shopname:"润宁生鲜旗舰店"}}},mounted:function(){var t=this;setTimeout(function(){t.loading=!1},2e3)}},w=x,y=Object(c["a"])(w,a,s,!1,null,null,null);e["default"]=y.exports},cc5c:function(t,e,i){"use strict";var a=i("7769"),s=i.n(a);s.a},ea01:function(t,e,i){"use strict";var a=i("12b3"),s=i.n(a);s.a},ef5d:function(t,e,i){"use strict";var a=i("5e62"),s=i.n(a);s.a},f789f:function(t,e,i){var a=i("3b86");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("499e").default;s("cacaca5a",a,!0,{sourceMap:!1,shadowMode:!1})}}]);