(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2675aa2e"],{"086f":function(e,t,i){"use strict";var s=i("30c7"),a=i.n(s);a.a},"30c7":function(e,t,i){var s=i("3eb9");"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var a=i("499e").default;a("b2547940",s,!0,{sourceMap:!1,shadowMode:!1})},"3eb9":function(e,t,i){t=e.exports=i("2350")(!1),t.i(i("8da7"),""),t.push([e.i,"",""])},f24e:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("Navbar",{attrs:{title:"Virtual List"}}),s("VirtualList",{ref:"list",attrs:{data:e.data,itemSize:200,itemSizeGetter:e.itemSizeGetter,scrollOffset:46},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.visibleData;return e._l(a,(function(t,a){return s("div",{key:t.id,staticClass:"virtual-list v-bd-bottom",style:{height:t.height+"px"}},[s("div",{staticClass:"virtual-list__inner"},[s("div",{staticClass:"virtual-list__background"},[s("span",{staticClass:"virtual-list__loading"},[e._v(e._s(t.floor))]),s("VButton",{staticClass:"virtual-list__delete",attrs:{type:"icon"},on:{click:function(t){return e.showDeleteActionsheet(a)}}},[s("img",{staticStyle:{width:"20px",height:"20px"},attrs:{src:i("11ca")}})])],1)])])}))}}])}),s("Actionsheet",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}],attrs:{describe:"删除后不可恢复，确定要删除吗？",actions:e.deleteActions},on:{click:e.deleteHandler},model:{value:e.showDeleteMenus,callback:function(t){e.showDeleteMenus=t},expression:"showDeleteMenus"}})],1)},a=[],n=(i("9aea"),i("3671")),l=i("439b");function r(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}function o(e){for(var t=[],i=1;i<=e;i++)t.push({id:i,floor:"#"+i,height:r(100,300)});return t}var c={name:"page-virtual-list-variable",components:{VirtualList:n["a"],Actionsheet:l["a"]},data:function(){return{data:Object.preventExtensions(o(1e3)),showDeleteMenus:!1,deleteActions:[{name:"确定",type:"warning",delete:!0,loading:!1},{name:"我再想想",type:"primary"}],deleteIndex:0}},methods:{itemSizeGetter:function(e){return e.height},showDeleteActionsheet:function(e){this.showDeleteMenus=!0,this.deleteIndex=e},deleteHandler:function(e){e.delete&&this.$refs.list.remove(this.deleteIndex),this.showDeleteMenus=!1}}},u=c,d=(i("086f"),i("2877")),h=Object(d["a"])(u,s,a,!1,null,null,null);t["default"]=h.exports}}]);