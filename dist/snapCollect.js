!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).snapCollect=e()}(this,(function(){"use strict";const t=function(t){const e=Object.create({identifier:this.identifier});return t.forEach(t=>{e[t[this.identifier].toString()]=t}),e},e=function(t){return Object.keys(t)},n=function(n){return{add:function(){const t=Array.from(arguments);t.forEach(t=>this.set(t[n],t))},delete:function(t){delete this[t.toString()]},get:function(t){return this[t.toString()]},has:function(t){return Object.prototype.hasOwnProperty.call(this,t.toString())},get length(){return Object.keys(this).length},set:function(t,e){this[t.toString()]=e},toggle:function(t){const e=t[n];this.has(e)?this.delete(e):this.set(e,t)},entries:function(){return Object.entries(this)},keys:function(){return Object.keys(this)},values:function(){return Object.values(this)},combination:function(n){Array.isArray(n)&&(n=t.call(this,n));const i=e.call(this,n);if(!i)return;return function(t,e){const n=[...t,...e],i=new Set(n);return Array.from(i)}(this.keys(),i).map(t=>{const e=this.get(t.toString()),i=n[t];return e||i})},intersection:function(n){Array.isArray(n)&&(n=t.call(this,n));const i=e.call(this,n);if(!i)return;return function(t,e){let n={};return t.forEach(t=>n[t]=1),e.filter(t=>{if(1===n[t])return delete n[t],t})}(this.keys(),i).map(t=>this.get(t.toString()))}}};return function(t){const e=function(t){if(!Boolean(t))throw"snapCollect: identifier must evaluate to true";const e=n(t);return e.identifier=t,e.name="SnapCollect",e}(t);return Object.create(e)}}));
//# sourceMappingURL=snapCollect.js.map
