(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c37c909"],{"1af6":function(e,t,r){var o=r("63b6");o(o.S,"Array",{isArray:r("9003")})},"1bcb":function(e,t,r){var o=r("5134");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var n=r("499e").default;n("7f7a62ee",o,!0,{sourceMap:!1,shadowMode:!1})},"40c3":function(e,t,r){var o=r("6b4c"),n=r("5168")("toStringTag"),a="Arguments"==o(function(){return arguments}()),i=function(e,t){try{return e[t]}catch(r){}};e.exports=function(e){var t,r,s;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(r=i(t=Object(e),n))?r:a?o(t):"Object"==(s=o(t))&&"function"==typeof t.callee?"Arguments":s}},"469f":function(e,t,r){r("6c1c"),r("1654"),e.exports=r("7d7b")},5134:function(e,t,r){t=e.exports=r("2350")(!1),t.push([e.i,".error-info{position:absolute;right:14px;top:15px;color:red;font-size:12px;margin:0}.hide-info .error-info{display:none}.demo-form-button{margin-bottom:40px;padding:0 14px}.demo-form-agreement{position:relative;margin:25px 0 30px}.demo-form-agreement .error-info{left:3px;top:auto;right:auto;margin-top:3px}.demo-form-code-cell .v-cell-content{padding-right:0;padding-top:5px;padding-bottom:5px}.demo-form-code-cell .demo-form-code{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.demo-form-code-cell .demo-form-code input{display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1}.demo-form-code-cell .demo-form-code .v-button{display:block;margin-right:-14px}.demo-form-code-cell .error-info{position:static}",""])},"59da":function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("label",{staticClass:"v-checkbox",class:{"v-checkbox-active":e.checked,"v-checkbox-disbled":e.disabled}},["left"===e.textAlign?[r("span",{staticClass:"v-checkbox-text"},[e._t("default",[e._v(e._s(e.label))])],2),e._v("\n     \n  ")]:e._e(),r("input",{staticClass:"v-checkbox-input",style:e.inputStyle,attrs:{type:"checkbox",disabled:e.disabled},domProps:{checked:e.checked},on:{change:function(t){return e.change(t.target.checked)}}}),"right"===e.textAlign?[e._v("\n     \n    "),r("span",{staticClass:"v-checkbox-text"},[e._t("default",[e._v(e._s(e.label))])],2)]:e._e()],2)},n=[],a=(r("83d8"),r("cef0")),i=r("a030"),s={name:"Checkbox",props:{value:null,label:{type:[String,Number],default:""},color:{type:String,default:i["properties"].primary},disabled:{type:Boolean,default:!1},textAlign:{type:String,default:"right"}},computed:{checked:{get:function(){return this.parent?-1!==this.parent.value.indexOf(this.label):this.value},set:function(e){this.change(e)}},inputStyle:function(){return this.checked?{backgroundColor:this.color,borderColor:this.color}:{backgroundColor:"transparent"}}},data:function(){return{parent:Object(a["g"])(this,"CheckboxGroup")}},methods:{change:function(e){if(this.parent)if(e){var t=this.parent.max;(t<0||t>this.parent.value.length)&&(this.parent.value.push(this.label),this.emitChange(e))}else{var r=this.parent.value.indexOf(this.label);-1!==r&&(this.parent.value.splice(r,1),this.emitChange(e))}else this.$emit("input",e)},emitChange:function(e){this.parent.$emit("change",this.parent.value,{checked:e,label:this.label})}}},l=s,c=(r("687b"),r("2877")),d=Object(c["a"])(l,o,n,!1,null,null,null);t["a"]=d.exports},"5d73":function(e,t,r){e.exports=r("469f")},"5dc0":function(e,t,r){var o=r("ddd4");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var n=r("499e").default;n("48980e04",o,!0,{sourceMap:!1,shadowMode:!1})},"687b":function(e,t,r){"use strict";var o=r("5dc0"),n=r.n(o);n.a},"7cd6":function(e,t,r){var o=r("40c3"),n=r("5168")("iterator"),a=r("481b");e.exports=r("584a").getIteratorMethod=function(e){if(void 0!=e)return e[n]||e["@@iterator"]||a[o(e)]}},"7d7b":function(e,t,r){var o=r("e4ae"),n=r("7cd6");e.exports=r("584a").getIterator=function(e){var t=n(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return o(t.call(e))}},"8b96":function(e,t,r){var o=r("f692");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var n=r("499e").default;n("d75397a0",o,!0,{sourceMap:!1,shadowMode:!1})},a745:function(e,t,r){e.exports=r("f410")},ddd4:function(e,t,r){t=e.exports=r("2350")(!1),t.push([e.i,".v-checkbox{position:relative;display:inline-block;vertical-align:middle;font-size:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-checkbox+.v-checkbox{margin-left:15px}.v-checkbox-disbled{cursor:default}.v-checkbox-disbled .v-checkbox-input{background-color:#e5e5e5!important;border-color:#d9d9d9!important}.v-checkbox-disbled .v-checkbox-text{color:#d9d9d9}.v-checkbox-input{margin:0;outline:0;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:initial;-webkit-touch-callout:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;width:20px;height:20px;border-radius:50%;border:1px solid #d9d9d9;vertical-align:middle;opacity:1;-webkit-transition:.3s;transition:.3s}.v-checkbox-input:before{content:\"\";position:absolute;top:2px;left:1px;width:16px;height:16px;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M870.4 332.8l-89.6-89.6L416 601.6 243.2 435.2l-89.6 89.6 262.4 256z' fill='%23fff'/%3E%3C/svg%3E\");background-position:50%;background-repeat:no-repeat;z-index:2;display:none}.v-checkbox-input:checked:before{display:block}.v-checkbox-text{padding-left:6px;font-size:14px;display:inline-block;vertical-align:middle}",""])},df50:function(e,t,r){"use strict";var o=r("8b96"),n=r.n(o);n.a},e86b:function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("label",{staticClass:"v-radio",class:{"v-radio-disabled":e.disabled}},["left"===e.textAlign?[r("span",{staticClass:"v-radio-text"},[e._t("default",[e._v(e._s(e.label))])],2),e._v("\n     \n  ")]:e._e(),r("input",{staticClass:"v-radio-input",attrs:{type:"radio",disabled:e.disabled},domProps:{checked:e.checked,value:e.label},on:{change:function(t){return e.change(t.target.checked)}}}),"right"===e.textAlign?[e._v("\n     \n    "),r("span",{staticClass:"v-radio-text"},[e._t("default",[e._v(e._s(e.label))])],2)]:e._e()],2)},n=[],a=(r("83d8"),r("cef0")),i={name:"Radio",props:{value:null,disabled:{type:Boolean,default:!1},label:{type:[String,Number],default:""},textAlign:{type:String,default:"right"}},computed:{checked:{get:function(){return this.parent?this.parent.value===this.label:this.value===this.label},set:function(e){this.change(e)}}},data:function(){return{parent:Object(a["g"])(this,"RadioGroup")}},methods:{change:function(){this.parent?this.parent.$emit("input",this.label):this.$emit("input",this.label)}}},s=i,l=(r("df50"),r("2877")),c=Object(l["a"])(s,o,n,!1,null,null,null);t["a"]=c.exports},ed9b:function(e,t,r){"use strict";var o=r("1bcb"),n=r.n(o);n.a},f410:function(e,t,r){r("1af6"),e.exports=r("584a").Array.isArray},f690:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Navbar",{attrs:{title:"Validator"}}),r("div",{class:{"hide-info":2===e.type}},[r("br"),r("Group",[r("Cell",{attrs:{title:"验证方式"}},[r("Radio",{attrs:{label:1},model:{value:e.type,callback:function(t){e.type=e._n(t)},expression:"type"}},[e._v("输入时验证")]),r("Radio",{attrs:{label:2},model:{value:e.type,callback:function(t){e.type=e._n(t)},expression:"type"}},[e._v("提交时验证")])],1)],1),r("Validator",{ref:"form",attrs:{model:e.form,rules:e.rules},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.error,n=t.check;return[r("Group",{attrs:{labelAlign:"left",labelWidth:"80",valueAlign:"left",title:"示例"}},[r("Cell",{attrs:{title:"用户名"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.username,expression:"form.username"}],attrs:{type:"text",placeholder:"请输入用户名"},domProps:{value:e.form.username},on:{blur:function(e){return n("username")},input:function(t){t.target.composing||e.$set(e.form,"username",t.target.value)}}}),r("p",{staticClass:"error-info"},[e._v(e._s(o.username))])]),r("Cell",{attrs:{title:"密码"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.password,expression:"form.password"}],attrs:{type:"password",placeholder:"请输入密码",autocomplete:""},domProps:{value:e.form.password},on:{blur:function(e){return n("password")},input:function(t){t.target.composing||e.$set(e.form,"password",t.target.value)}}}),r("p",{staticClass:"error-info"},[e._v(e._s(o.password))])]),r("Cell",{attrs:{title:"确认密码"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.password2,expression:"form.password2"}],attrs:{type:"password",placeholder:"请再次输入密码",autocomplete:""},domProps:{value:e.form.password2},on:{blur:function(e){return n("password2")},input:function(t){t.target.composing||e.$set(e.form,"password2",t.target.value)}}}),r("p",{staticClass:"error-info"},[e._v(e._s(o.password2))])]),r("Cell",{staticClass:"demo-form-code-cell",attrs:{title:"验证码"}},[r("div",{staticClass:"demo-form-code"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.code,expression:"form.code"}],attrs:{type:"tel",placeholder:"请输入验证码"},domProps:{value:e.form.code},on:{blur:function(e){return n("code")},input:function(t){t.target.composing||e.$set(e.form,"code",t.target.value)}}}),r("VButton",{attrs:{text:"",type:"primary"}},[e._v("获取验证码")])],1),r("p",{staticClass:"error-info"},[e._v(e._s(o.code))])]),r("Cell",{attrs:{title:"类型"}},[r("select",{directives:[{name:"model",rawName:"v-model",value:e.form.type,expression:"form.type"}],on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.form,"type",t.target.multiple?r:r[0])},function(e){return n("type")}]}},[r("option",{attrs:{value:""}},[e._v("会员类型")]),e._l(e.options,function(t,o){return r("option",{key:o,domProps:{value:t.value}},[e._v("\n                "+e._s(t.name)+"\n              ")])})],2),r("p",{staticClass:"error-info"},[e._v(e._s(o.type))])]),r("Cell",{attrs:{title:"真实姓名"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.idCard.name,expression:"form.idCard.name"}],attrs:{type:"text",placeholder:"请输入真实姓名"},domProps:{value:e.form.idCard.name},on:{blur:function(e){return n("idCard.name")},input:function(t){t.target.composing||e.$set(e.form.idCard,"name",t.target.value)}}}),r("p",{staticClass:"error-info"},[e._v(e._s(o["idCard.name"]))])]),r("Cell",{attrs:{title:"身份证号码"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.idCard.number,expression:"form.idCard.number"}],attrs:{type:"text",placeholder:"请输入身份证号码"},domProps:{value:e.form.idCard.number},on:{blur:function(e){return n("idCard.number")},input:function(t){t.target.composing||e.$set(e.form.idCard,"number",t.target.value)}}}),r("p",{staticClass:"error-info"},[e._v(e._s(o["idCard.number"]))])])],1),r("div",{staticClass:"demo-form-button"},[r("div",{staticClass:"demo-form-agreement"},[r("Checkbox",{on:{input:function(e){return n("checked")}},model:{value:e.form.checked,callback:function(t){e.$set(e.form,"checked",t)},expression:"form.checked"}},[e._v("\n              我已阅读和接受"),r("span",{staticStyle:{color:"red"}},[e._v("《用户服务协议》")])]),r("p",{staticClass:"error-info"},[e._v(e._s(o.checked))])],1),r("VButton",{attrs:{block:"",type:"primary",loading:e.loading},on:{click:e.submit}},[e._v("\n            注册\n          ")]),r("VButton",{staticClass:"reset",attrs:{block:""},on:{click:e.reset}},[e._v(" 还原 ")])],1)]}}])})],1)],1)},n=[],a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("form",{staticClass:"v-validator",on:{submit:function(e){e.preventDefault()}}},[e._t("default",null,{error:e.error,check:e.check})],2)},i=[],s=r("a745"),l=r.n(s);function c(e){if(l()(e))return e}var d=r("5d73"),u=r.n(d);function p(e,t){var r=[],o=!0,n=!1,a=void 0;try{for(var i,s=u()(e);!(o=(i=s.next()).done);o=!0)if(r.push(i.value),t&&r.length===t)break}catch(l){n=!0,a=l}finally{try{o||null==s["return"]||s["return"]()}finally{if(n)throw a}}return r}function f(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function m(e,t){return c(e)||p(e,t)||f()}var b=r("7618"),v=(r("3dae"),r("af89"),r("5b8b"),r("cef0"));function h(e,t){return e.split(".").reduce(function(e,t){return e[t]},t)}function g(e,t){var r={},o={};return Object.keys(t).forEach(function(e){r[e]=""}),Object.keys(e).forEach(function(t){o[t]="object"===Object(b["a"])(e[t])?JSON.parse(JSON.stringify(e[t])):e[t]}),[r,o]}function x(e,t,r){return!Object(v["h"])(e)||!Object(v["h"])(t)||(Object(v["h"])(r)&&(r=""+r),r.length>=e&&r.length<=t)}var k={name:"Validator",props:{model:{type:Object,default:function(){}},rules:{type:Object,default:function(){}}},data:function(){var e=g(this.model,this.rules),t=m(e,2),r=t[0],o=t[1];return{error:r,originalModel:o}},methods:{check:function(e){var t=this,r=this.rules[e],o=!1;return r?(r.some(function(n,a){var i=h(e,t.model);if(n.validator){var s=n.validator(n,i);if("string"===typeof s)return t.error[e]=s,o=!0,o}if(n.required&&t.isEmptyValue(i)||!x(n.min,n.max,i))return t.error[e]=r[a].message||"The ".concat(e," field is required"),o=!0,o;t.error[e]=""}),!o):!o},checkAll:function(e){var t=this,r=!0,o=[];return Object.keys(this.rules).forEach(function(e){t.check(e),t.error[e]&&(r=!1,o.push(t.error[e]))}),o[0]&&e&&e(o),r},reset:function(){var e=this;Object.keys(this.originalModel).forEach(function(t){e.model[t]="object"===Object(b["a"])(e.originalModel[t])?JSON.parse(JSON.stringify(e.originalModel[t])):e.originalModel[t]}),Object.keys(this.rules).forEach(function(t){e.error[t]=""})},isEmptyValue:function(e){return"string"===typeof e?!e.trim():0!==e&&(e===1/0||!e)}}},y=k,w=r("2877"),_=Object(w["a"])(y,a,i,!1,null,null,null),C=_.exports,O=r("dfae"),j=r("6391"),z=r("e86b"),$=r("59da"),A={components:{Validator:C,Group:O["a"],Cell:j["a"],Radio:z["a"],Checkbox:$["a"]},data:function(){var e=this,t=function(t,r){return""===r?"请再次输入密码":r!==e.form.password?"两次输入密码不一致":void 0};return{form:{username:"",password:"",password2:"",code:"",type:"",checked:!1,idCard:{number:"",name:""}},rules:{username:[{required:!0,message:"请填写用户名"}],password:[{required:!0,message:"请填写密码"},{min:6,max:12,message:"请填写6-12位数的密码"}],password2:[{validator:t}],code:[{required:!0,message:"请输入验证码"}],type:[{required:!0,message:"请选择会员类型"}],checked:[{required:!0,message:"请阅读并同意注册条款"}],"idCard.number":[{required:!0,message:"请填写身份证号码"}],"idCard.name":[{required:!0,message:"请填写真实姓名"}]},options:[{name:"黄金会员",value:1},{name:"钻石会员",value:2},{name:"青铜会员",value:3}],type:2,loading:!1}},methods:{submit:function(){var e=this,t=2===this.type?function(t){return e.$toast(t[0])}:null;this.$refs.form.checkAll(t)&&(this.loading=!0)},reset:function(){this.$refs.form.reset(),this.loading=!1}}},E=A,N=(r("ed9b"),Object(w["a"])(E,o,n,!1,null,null,null));t["default"]=N.exports},f692:function(e,t,r){t=e.exports=r("2350")(!1),t.push([e.i,'.v-radio{position:relative;display:inline-block;font-size:0;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.v-radio+.v-radio{margin-left:15px}.v-radio-disabled{cursor:default}.v-radio-input{margin:0;outline:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:initial;-webkit-touch-callout:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;z-index:99997;width:20px;height:20px;border-radius:50%;border:2px solid #2196f3;vertical-align:middle;-webkit-transform:translateZ(0);transform:translateZ(0);cursor:pointer}.v-radio-input:disabled{cursor:default;border-color:#d9d9d9}.v-radio-input:disabled:before{background-color:#d9d9d9}.v-radio-input:before{content:"";position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:75%;height:75%;border-radius:50%;background-color:#2196f3;-webkit-transform:scale(0);transform:scale(0);-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;-webkit-transform-origin:center 50%;transform-origin:center 50%;z-index:3}.v-radio-input:checked:before{-webkit-transform:scale(1);transform:scale(1)}.v-radio-text{padding-left:6px;font-size:16px;display:inline-block;vertical-align:middle}',""])}}]);