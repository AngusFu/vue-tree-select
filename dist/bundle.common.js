!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.vFolder=t()}(this,function(){"use strict";function e(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function t(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;var r=Object.getOwnPropertyNames(t).map(function(e){return t[e]});if("0123456789"!==r.join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach(function(e){o[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(e){return!1}}function n(e,t){return t={exports:{}},e(t,t.exports),t.exports}var r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,c=t()?Object.assign:function(t,n){for(var c,i,s=arguments,d=e(t),f=1;f<arguments.length;f++){c=Object(s[f]);for(var l in c)o.call(c,l)&&(d[l]=c[l]);if(r){i=r(c);for(var h=0;h<i.length;h++)a.call(c,i[h])&&(d[i[h]]=c[i[h]])}}return d},i=c,s=function(e,t,n,r){void 0===e&&(e={}),void 0===t&&(t={}),void 0===n&&(n="0"),void 0===r&&(r="");var o=i({},t,d),a=o.node,c=o.branch,f=o.leaf,l=o.checked,h=o.open,u=e[a]||"/",p=e[c]||[],v=e[f]||[],b=p.length>0||v.length>0;return p=p.map(function(e,t){return s(e,o,n+"."+t,r+"/"+e.name)}),v=v.map(function(e,t){return{checked:l,name:e,level:n+"."+t,path:r+"/"+e}}),{name:u,level:n,path:r,node:{name:u,open:h,canOpen:b,checked:l,level:n},branches:p,leafs:v}},d={node:"name",branch:"dirs",leaf:"files",open:!1,checked:!1},f={transform:s,defaultConf:d},l=c,h=f.transform,u=f.defaultConf,p=[].push,v=function(){function e(e,t){this.dataStore=this.setStore(e,t)}return e.prototype.setStore=function(e,t){return void 0===e&&(e={}),void 0===t&&(t=u),this.dataStore=h(e,t)},e.prototype.findParentBranch=function(e){void 0===e&&(e="");var t=e.length,n=this.dataStore;if(t<=1)return null;for(var r=e.split(".").slice(1,-1),o=0;n&&(o=r.shift());)n=n.branches[o];return n},e.prototype.findCurrentBranch=function(e){void 0===e&&(e="");for(var t=e.split(".").slice(1),n=0,r=this.dataStore;r&&(n=t.shift());)r=r.branches[n];return r},e.prototype.replaceBranch=function(e,t,n){void 0===t&&(t="0"),void 0===n&&(n=u);for(var r=t.split(".").slice(1),o=0,a=l({},this.dataStore),c=a,i=r.pop();c&&(o=r.shift());)c=c.branches[o];return c.branches[i]=h(e,n,t),this.dataStore=a},e.prototype.checkAscendents=function(e,t){var n=this.findParentBranch(e),r=!1;if(n){if(t){var o=!n.branches.some(function(e){return!e.node.checked}),a=!n.leafs.some(function(e){return!e.checked});r=o&&a}n.node.checked=r,this.checkAscendents(n.level,r)}},e.prototype.getPathResult=function(e){var t=this;e=e||this.dataStore;var n=[],r=e.node,o=e.branches,a=e.leafs;e.path;return r.checked?n.push(e.path):(a.forEach(function(e){var t=e.checked,r=e.path;t&&n.push(r)}),o.forEach(function(e){p.apply(n,t.getPathResult(e))})),n},e}(),b={created:function(){var e=this;this.__EVENT_BUS.$on("descendents_force_checked",function(t,n){var r=e.data.level;0===r.indexOf(t)&&r.slice(t.length).length>0&&(e.data.checked=n)})}},g={template:'<li class="v-node" :key="data.level"><i class="fa" :class="[ data.canOpen && data.open ? \'fa-folder-open-o\' : \'fa-folder-o\' ]" @click="toggleExpanded"></i> <span @click="toggleChecked"><i class="fa" :class="[ data.checked ? \'fa-check-square-o\' : \'fa-square-o\' ]"></i> {{data.name}}</span></li>',props:{data:Object},mixins:[b],methods:{toggleChecked:function(){this.__EVENT_BUS.$emit("node_toggle_checked",this.data)},toggleExpanded:function(){this.__EVENT_BUS.$emit("node_toggle_expanded",this.data)}},created:function(){}},m={template:'<li class="v-leaf" @click="toggleChecked" :key="data.level"><i class="fa" :class="[ data.checked ? \'fa-check-square-o\' : \'fa-square-o\' ]"></i> {{data.name}}</li>',props:{data:Object},mixins:[b],methods:{toggleChecked:function(){this.__EVENT_BUS.$emit("leaf_toggle_checked",this.data)}},created:function(){}},k={template:'<ul class="branch" :key="node.level"><v-node :data="node"></v-node><v-branch v-show="node.open" v-for="branch in branches" :data="branch"></v-branch><v-leaf v-show="node.open" v-for="leaf in leafs" :data="leaf"></v-leaf></ul>',name:"v-branch",props:{data:Object},components:{"v-node":g,"v-leaf":m},computed:{branches:function(){return this.data.branches},leafs:function(){return this.data.leafs},node:function(){return this.data.node}}},_={template:'<ul class="branch"><v-node :data="node"></v-node><v-branch v-show="node.open" v-for="branch in branches" :data="branch"></v-branch><v-leaf v-show="node.open" v-for="leaf in leafs" :data="leaf"></v-leaf></ul>',name:"v-folder",props:{data:Object,conf:Object},components:{"v-node":g,"v-leaf":m,"v-branch":k},data:function(){var e=new v(this.data,this.conf);return{store:e,root:e.dataStore}},computed:{branches:function(){return this.root.branches},leafs:function(){return this.root.leafs},node:function(){return this.root.node}},created:function(){var e=this;this.__EVENT_BUS.$on("node_toggle_expanded",function(e){e.open=!e.open}),this.__EVENT_BUS.$on("node_toggle_checked",function(t){var n=e.store.findCurrentBranch(t.level),r=n.level,o=!n.node.checked;n.node.checked=o,n.branches.forEach(function(e){return e.node.checked=o}),n.leafs.forEach(function(e){return e.checked=o}),e.store.checkAscendents(r,o),e.__EVENT_BUS.$emit("descendents_force_checked",n.level,o),e.$nextTick(function(){e.$emit("change",e.store.getPathResult())})}),this.__EVENT_BUS.$on("leaf_toggle_checked",function(t){var n=!t.checked;t.checked=n,e.store.checkAscendents(t.level,n),e.$nextTick(function(){e.$emit("change",e.store.getPathResult())})})}},y="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},E=n(function(e,t){!function(t,n){e.exports=n()}(y,function(){function e(e){var t=e.split("."),n=t.splice(0,2);return n.push(t.join(".")),n}function t(e){return isNaN(Number(e))?e:Number(e)}function n(e){if("string"!=typeof e)throw new TypeError("Invalid argument expected string");if(!r.test(e))throw new Error("Invalid argument not valid semver")}var r=/^v?(?:0|[1-9]\d*)(\.(?:[x*]|0|[1-9]\d*)(\.(?:[x*]|0|[1-9]\d*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i,o=/-([0-9A-Za-z-.]+)/;return function(r,a){[r,a].forEach(n);for(var c=e(r),i=e(a),s=0;s<3;s++){var d=parseInt(c[s]||0,10),f=parseInt(i[s]||0,10);if(d>f)return 1;if(f>d)return-1}if([c[2],i[2]].every(o.test.bind(o))){var l=o.exec(c[2])[1].split(".").map(t),h=o.exec(i[2])[1].split(".").map(t);for(s=0;s<Math.max(l.length,h.length);s++){if(void 0===l[s]||"string"==typeof h[s]&&"number"==typeof l[s])return-1;if(void 0===h[s]||"string"==typeof l[s]&&"number"==typeof h[s])return 1;if(l[s]>h[s])return 1;if(h[s]>l[s])return-1}}else if([c[2],i[2]].some(o.test.bind(o)))return o.test(c[2])?-1:1;return 0}})}),O=function(e,t){return E(e,t)>=0};return _.install=function(e){if(!O(e.version,"2.0.0"))throw"This module can only supports vue@2!";e.prototype.__EVENT_BUS=new e,e.component(_.name,_)},_});
//# sourceMappingURL=bundle.common.js.map