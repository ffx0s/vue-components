(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-83253022"],{"065e":function(t,e,i){"use strict";i("c5f6");var n=i("6116");e["a"]={props:{tag:{type:String,default:"div"},data:{type:Array,default:function(){return[]}},itemSize:{type:Number,default:100},multiple:{type:Number,default:2},minMultiple:{type:Number,default:2},visibleHeight:Number,scrollOffset:{type:Number,default:0}},data:function(){return{startOffset:0,endOffset:0,visibleData:[]}},created:function(){this.listVisibleHeight=this.visibleHeight||n["r"].height(),this.visibleCount=Math.ceil(this.listVisibleHeight/this.itemSize),this.renderCount=this.visibleCount*Math.max(this.multiple,this.minMultiple)+1,this.isBind=!1,this.start=0},mounted:function(){this.bind(),this.data.length&&this.updateVisibleData()},activated:function(){this.bind()},deactivated:function(){this.unbind()},beforeDestroy:function(){this.unbind()},methods:{bind:function(){this.isBind||(this.isBind=!0,this.scrollEl=Object(n["e"])(this.$el),this.scrollHandler=Object(n["q"])(this.scrollHandler,50),Object(n["a"])(this.scrollEl,"scroll",this.scrollHandler))},unbind:function(){Object(n["n"])(this.scrollEl,"scroll",this.scrollHandler),this.isBind=!1,this.scrollEl=null},setScrollOffset:function(t){Object(n["o"])(this.scrollEl,t)},reload:function(t){t&&(this.itemRects=[],this.visibleData=[],this.lastIndex=-1),this.$nextTick(this.updateVisibleData)}}}},"0d05":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Navbar",{attrs:{title:"Virtual List"}}),n("VirtualList",{ref:"list",attrs:{data:t.data,itemSize:t.itemSize,scrollOffset:46},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.visibleData;return t._l(s,function(e,s){return n("div",{key:e.id,staticClass:"image-list-item v-bd-y-bottom",style:{height:t.itemSize+"px"}},[n("div",{staticClass:"image-list-item-inner"},[n("div",{staticClass:"image-list-item-background"},[n("span",{staticClass:"image-list-item-loading"},[t._v(" "+t._s(e.floor)+" ")]),n("VButton",{staticClass:"image-list-item-delete",attrs:{type:"icon"},on:{click:function(e){return t.showDeleteActionsheet(s)}}},[n("img",{staticStyle:{width:"20px",height:"20px"},attrs:{src:i("7345")}})])],1)])])})}}])}),n("Actionsheet",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}],attrs:{describe:"删除后不可恢复，确定要删除吗？",actions:t.deleteActions},on:{click:t.deleteHandler},model:{value:t.showDeleteMenus,callback:function(e){t.showDeleteMenus=e},expression:"showDeleteMenus"}})],1)},s=[],a=(i("9aea"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i(t.tag,{tag:"component",staticClass:"v-virtual-list"},[i("div",{style:t.style},[t._t("default",null,{visibleData:t.visibleData})],2)])}),o=[],l=i("6116"),r=i("065e"),c={name:"VirtualList",mixins:[r["a"]],computed:{style:function(){return{paddingTop:this.startOffset+"px",paddingBottom:this.endOffset+"px"}}},methods:{scrollHandler:function(){var t=Object(l["f"])(this.scrollEl)-this.scrollOffset,e=Math.max(Math.floor(t/this.itemSize),0);e+this.visibleCount>=this.end?(this.start=e,this.updateVisibleData()):e<this.start&&(this.start=Math.max(e-this.visibleCount,0),this.updateVisibleData())},updateVisibleData:function(){var t=this.data.length;this.end=Math.min(this.start+this.renderCount,t),this.startOffset=this.start*this.itemSize,this.endOffset=(t-this.end)*this.itemSize,this.visibleData=JSON.parse(JSON.stringify(this.data.slice(this.start,this.end)))},remove:function(t){if(!(t<0||t>this.visibleData.length)){var e=this.start+t;this.data.splice(e,1),this.updateVisibleData()}},scrollToIndex:function(t){this.setScrollOffset(t*this.itemSize+this.scrollOffset)}}},u=c,p=i("2877"),d=Object(p["a"])(u,a,o,!1,null,null,null),f=d.exports,h=i("427f");function v(t){for(var e=[],i=1;i<=t;i++)e.push({id:i,floor:"#"+i});return e}var m={name:"page-virtual-list",components:{VirtualList:f,Actionsheet:h["a"]},data:function(){return{itemSize:175,data:Object.preventExtensions(v(1e3)),showDeleteMenus:!1,deleteActions:[{name:"确定",type:"warning",delete:!0,loading:!1},{name:"我再想想",type:"primary"}],deleteIndex:0}},methods:{showDeleteActionsheet:function(t){this.showDeleteMenus=!0,this.deleteIndex=t},deleteHandler:function(t){t.delete&&this.$refs.list.remove(this.deleteIndex),this.showDeleteMenus=!1}}},b=m,g=(i("b330"),Object(p["a"])(b,n,s,!1,null,null,null));e["default"]=g.exports},"20ac":function(t,e,i){var n=i("f2e3");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=i("499e").default;s("753d17a4",n,!0,{sourceMap:!1,shadowMode:!1})},"26e2":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:t.transitionName}},[t.loaded?i("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],staticClass:"v-popup"},[i("div",{staticClass:"v-popup-content",class:"v-popup-content-"+t.position},[t._t("default")],2),t.overlay?i("div",{staticClass:"v-popup-overlay",on:{click:t.close,touchmove:function(t){t.preventDefault()}}}):t._e()]):t._e()])},s=[],a=i("b70d"),o={name:"Popup",mixins:[a["a"]],props:{value:{type:Boolean,default:!1},overlay:{type:Boolean,default:!0},overlayClick:{type:Boolean,default:!0},transitionName:{type:String,default:"v-popup"},position:{type:String,default:"bottom"}},methods:{close:function(){this.overlayClick&&(this.$emit("input",!1),this.$emit("close"))}}},l=o,r=(i("da37"),i("2877")),c=Object(r["a"])(l,n,s,!1,null,null,null);e["a"]=c.exports},"427f":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("Popup",{attrs:{lazy:t.lazy,overlayClick:t.overlayClick},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[i("div",{staticClass:"v-actionsheet"},[t._t("header",[t.title||t.describe?i("header",{staticClass:"v-actionsheet-header v-bd-y-bottom"},[i("h4",{staticClass:"v-actionsheet-title"},[t._v(t._s(t.title))]),i("p",{staticClass:"v-actionsheet-describe"},[t._v(t._s(t.describe))])]):t._e()]),t._t("default",[i("ul",{staticClass:"v-actionsheet-default"},[t._l(t.actions,function(e,n){return i("li",{key:n,staticClass:"v-actionsheet-item v-bd-y-top",class:["v-actionsheet-align-"+t.align,"v-actionsheet-item-"+(e.type||"default"),{"v-actionsheet-item-disabled":e.loading},e.className],on:{click:function(i){return t.clickHandler(e)}}},[e.loading?i("Loading",{attrs:{size:"22"}}):i("span",[t._v(t._s(e.name))])],1)}),t.cancelText?i("li",{staticClass:"v-actionsheet-item v-actionsheet-align-center v-actionsheet-cancel",on:{click:t.cancel}},[t._v("\n          取消\n        ")]):t._e()],2)])],2)])},s=[],a=i("26e2"),o=i("7ac2"),l={name:"Actionsheet",components:{Popup:a["a"],Loading:o["a"]},props:{value:{type:Boolean,required:!0},title:{type:String,default:""},describe:{type:String,default:""},actions:{type:Array,default:function(){return[]}},cancelText:{type:String,default:"取消"},overlayClick:{type:Boolean,default:!0},lazy:{type:Boolean,default:!0},align:{type:String,default:"center"}},computed:{show:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}},methods:{clickHandler:function(t){"disabled"===t.type||t.loading||this.$emit("click",t)},cancel:function(){this.$emit("input",!1),this.$emit("cancel")}}},r=l,c=(i("8ed0"),i("2877")),u=Object(c["a"])(r,n,s,!1,null,null,null);e["a"]=u.exports},"53dd":function(t,e,i){var n=i("c44b");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=i("499e").default;s("2843589e",n,!0,{sourceMap:!1,shadowMode:!1})},"67ab":function(t,e,i){var n=i("ca5a")("meta"),s=i("d3f4"),a=i("69a8"),o=i("86cc").f,l=0,r=Object.isExtensible||function(){return!0},c=!i("79e5")(function(){return r(Object.preventExtensions({}))}),u=function(t){o(t,n,{value:{i:"O"+ ++l,w:{}}})},p=function(t,e){if(!s(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!a(t,n)){if(!r(t))return"F";if(!e)return"E";u(t)}return t[n].i},d=function(t,e){if(!a(t,n)){if(!r(t))return!0;if(!e)return!1;u(t)}return t[n].w},f=function(t){return c&&h.NEED&&r(t)&&!a(t,n)&&u(t),t},h=t.exports={KEY:n,NEED:!1,fastKey:p,getWeak:d,onFreeze:f}},7345:function(t,e,i){t.exports=i.p+"img/icon-delete.6f4a9e73.svg"},"7b58":function(t,e,i){var n=i("d37d");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=i("499e").default;s("c0b56c80",n,!0,{sourceMap:!1,shadowMode:!1})},"8da7":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".image-list{padding:0;margin:0;list-style:none}.image-list-item{box-sizing:border-box;width:100%;background-color:#f0eff5}.image-list-item-inner{padding:10px 10px 0;height:100%;box-sizing:border-box}.image-list-item-background{background-color:#fff;height:100%}.image-list-item-loading{position:absolute;top:0;bottom:0;right:0;left:0;margin:auto;text-align:center;width:200px;height:40px;line-height:40px}.image-list-item-img{position:relative;width:100%}.image-list-item-delete{position:absolute;bottom:14px;right:14px}",""])},"8ed0":function(t,e,i){"use strict";var n=i("20ac"),s=i.n(n);s.a},"9aea":function(t,e,i){var n=i("d3f4"),s=i("67ab").onFreeze;i("5eda")("preventExtensions",function(t){return function(e){return t&&n(e)?t(s(e)):e}})},b330:function(t,e,i){"use strict";var n=i("7b58"),s=i.n(n);s.a},c44b:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".v-popup{-webkit-transition-duration:.3s;transition-duration:.3s}.v-popup-content{position:fixed;z-index:10000;width:100%;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;-webkit-user-select:none;user-select:none}.v-popup-content-top{left:0;top:0}.v-popup-content-right{right:0;bottom:0}.v-popup-content-bottom,.v-popup-content-left{left:0;bottom:0}.v-popup-overlay{position:fixed;top:0;left:0;z-index:9999;width:100%;height:100%;background-color:rgba(0,0,0,.7);-webkit-transition:opacity .3s;transition:opacity .3s}.v-popup-enter .v-popup-overlay,.v-popup-leave-active .v-popup-overlay{opacity:0}.v-popup-enter .v-popup-content-bottom,.v-popup-leave-active .v-popup-content-bottom{-webkit-transform:translateY(100%);transform:translateY(100%)}.v-popup-enter .v-popup-content-top,.v-popup-leave-active .v-popup-content-top{-webkit-transform:translateY(-100%);transform:translateY(-100%)}.v-popup-enter .v-popup-content-left,.v-popup-leave-active .v-popup-content-left{-webkit-transform:translateX(-100%);transform:translateX(-100%)}.v-popup-enter .v-popup-content-right,.v-popup-leave-active .v-popup-content-right{-webkit-transform:translateX(100%);transform:translateX(100%)}",""])},d37d:function(t,e,i){e=t.exports=i("2350")(!1),e.i(i("8da7"),""),e.push([t.i,"",""])},da37:function(t,e,i){"use strict";var n=i("53dd"),s=i.n(n);s.a},f2e3:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".v-actionsheet{background-color:#f0eff5;color:#000}.v-actionsheet-header{padding:12px;background-color:#fff;text-align:center}.v-actionsheet-title{font-size:17px;margin:0;padding:0;font-weight:400}.v-actionsheet-describe{margin:0;color:#8e8e90;font-size:14px}.v-actionsheet-default{margin:0;padding:0;list-style:none}.v-actionsheet-item{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding-left:20px;padding-right:20px;height:48px;font-size:16px;background-color:#fff}.v-actionsheet-item:first-child.v-bd-y-top:before{display:none}.v-actionsheet-item:active{background-color:#d9d9d9}.v-actionsheet-item-default{color:#000}.v-actionsheet-item-primary{color:#2196f3}.v-actionsheet-item-warning{color:#ff5252}.v-actionsheet-item-disabled{color:#d9d9d9}.v-actionsheet-item-disabled:active{background-color:#fff}.v-actionsheet-align-center{-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.v-actionsheet-align-left{-webkit-box-pack:left;-webkit-justify-content:left;justify-content:left}.v-actionsheet-cancel{margin-top:10px}",""])}}]);