(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5fbe524a"],{"07e1":function(e,i,t){"use strict";t.r(i);var n=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("InfiniteScroll",{staticClass:"page-infinite-scroll",attrs:{empty:e.empty,failed:e.failed,finished:e.finished},on:{load:e.load,refresh:e.refresh},model:{value:e.loading,callback:function(i){e.loading=i},expression:"loading"}},[t("transition-group",{staticClass:"items",attrs:{tag:"ul",name:"item"}},e._l(e.items,function(i){return t("li",{key:i.id,staticClass:"item"},[e._v("\n      "+e._s(i.value)+"\n    ")])}),0)],1)},s=[],o=t("eae9"),l=0;function a(e){return new Promise(function(i){var t={records:[],pages:3,total:45},n=0;1===e.offset&&(l=0);while(n<e.limit)n++,l++,t.records.push({id:l,value:l});setTimeout(function(){return i(t)},~~(100*Math.random()+500))})}var r={components:{InfiniteScroll:o["a"]},data:function(){return{items:[],query:{offset:1,limit:15},loading:!0,finished:!1,failed:!1,empty:!1}},methods:{fetchData:function(){var e=this;return this.failed=!1,a(this.query).then(function(i){var t=i.records,n=i.pages,s=i.total;e.items=e.loading?e.items.concat(t):t,e.empty=!s,e.finished=e.query.offset>=n,e.query.offset++}).catch(this.failure)},load:function(e){this.fetchData().then(e)},refresh:function(e){this.query.offset=1,this.fetchData().then(e)},failure:function(){this.failed=!0}}},f=r,c=(t("0842"),t("2877")),d=Object(c["a"])(f,n,s,!1,null,null,null);i["default"]=d.exports},"0842":function(e,i,t){"use strict";var n=t("8c85"),s=t.n(n);s.a},"2f66":function(e,i,t){i=e.exports=t("2350")(!1),i.push([e.i,".v-infinite-scroll-footer{width:100%;height:50px;text-align:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.v-infinite-scroll-empty,.v-infinite-scroll-footer{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.v-infinite-scroll-empty{min-height:400px}.v-infinite-scroll-loading{color:#d9d9d9}",""])},"8c85":function(e,i,t){var n=t("aef3");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var s=t("499e").default;s("33f98242",n,!0,{sourceMap:!1,shadowMode:!1})},aef3:function(e,i,t){i=e.exports=t("2350")(!1),i.push([e.i,".page-infinite-scroll{padding-bottom:10px}",""])},d4fd:function(e,i,t){var n=t("2f66");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var s=t("499e").default;s("0f51879c",n,!0,{sourceMap:!1,shadowMode:!1})},eae9:function(e,i,t){"use strict";var n=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t(e.pullRefresh?"PullRefresh":"div",{ref:"pullRefresh",tag:"component",attrs:{failed:e.failed,disabled:e.isLoading},on:{refresh:e.refresh},model:{value:e.refreshing,callback:function(i){e.refreshing=i},expression:"refreshing"}},[t("div",{ref:"container",staticClass:"v-infinite-scroll"},[e._t("default")],2),t("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],staticClass:"v-infinite-scroll-footer"},[e._t("loading",[t("Loading",{staticClass:"v-infinite-scroll-loading",attrs:{size:"32"}})])],2),t("div",{directives:[{name:"show",rawName:"v-show",value:e.finished&&!e.empty,expression:"finished && !empty"}],staticClass:"v-infinite-scroll-footer"},[e._t("finished",[e._v("全部加载完成")])],2),t("div",{directives:[{name:"show",rawName:"v-show",value:e.empty,expression:"empty"}],staticClass:"v-infinite-scroll-footer"},[e._t("empty",[t("div",{staticClass:"v-infinite-scroll-empty"},[e._v("空空如也")])])],2),t("div",{directives:[{name:"show",rawName:"v-show",value:e.failed,expression:"failed"}],staticClass:"v-infinite-scroll-footer",on:{click:e.load}},[e._t("failed",[e._v("加载失败,点击重试")])],2)])},s=[],o=(t("c5f6"),t("5ed3")),l=t("7ac2"),a=t("ac6e"),r=t("6116"),f={name:"InfiniteScroll",components:{PullRefresh:o["a"],Loading:l["a"]},props:{value:{type:Boolean,required:!0},finished:{type:Boolean,default:!1},failed:{type:Boolean,default:!1},empty:{type:Boolean,default:!1},offset:{type:Number,default:300},pullRefresh:{type:Boolean,default:!0}},data:function(){return{refreshing:!1,isLoading:!1}},watch:{value:{handler:function(e){e&&this.load()},immediate:!0}},mounted:function(){this.bind()},activated:function(){this.bind()},deactivated:function(){this.unbind()},beforeDestroy:function(){this.unbind()},methods:{bind:function(){var e=this;this.isBind||(this.$nextTick(function(){e.onscroll=new a["a"](e.scrollHandler),e.scrollEl=e.pullRefresh?e.$refs.pullRefresh.scrollEl:Object(r["d"])(e.$el),e.container=e.$refs.container,Object(r["a"])(e.scrollEl,"scroll",e.onscroll)}),this.isBind=!0)},unbind:function(){Object(r["k"])(this.scrollEl,"scroll",this.onscroll),this.isBind=!1,this.scrollEl=null,this.container=null,this.onscroll=null},scrollHandler:function(){this.shouldLoadMore()&&this.load()},shouldLoadMore:function(){if(this.finished||this.value||this.failed)return!1;var e=this.container.getBoundingClientRect().bottom;return e-r["n"].height()<=this.offset},load:function(){this.finished?this.done():this.isLoading||this.refreshing||(this.isLoading=!0,this.$emit("input",!0),this.$emit("load",this.done))},refresh:function(e){this.$emit("refresh",e)},done:function(){var e=this;this.$nextTick(function(){e.$emit("input",!1),e.isLoading=!1})}}},c=f,d=(t("f552"),t("2877")),u=Object(d["a"])(c,n,s,!1,null,null,null);i["a"]=u.exports},f552:function(e,i,t){"use strict";var n=t("d4fd"),s=t.n(n);s.a}}]);
//# sourceMappingURL=chunk-5fbe524a.87f65e4b.js.map