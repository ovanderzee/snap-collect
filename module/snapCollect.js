const t=function(t){return t&&t.toString},e=function(t){return t.toString()},n=function(t){const e=Object.create(Object.getPrototypeOf(this));return e.add(...t),e},r={entries:function(){return Object.entries(this)},keys:function(){return Object.keys(this)},values:function(){return Object.values(this)},where:function(t){let e=Object.values(this);return Object.keys(t).forEach(n=>{e=e.filter(e=>JSON.stringify(e[n])==JSON.stringify(t[n]))}),e},combination:function(t){Array.isArray(t)&&(t=n.call(this,t));return function(t,e){const n=[...t,...e],r=new Set(n);return Array.from(r)}(this.keys(),t.keys()).map(e=>this.get(e)||t.get(e))},intersection:function(t){Array.isArray(t)&&(t=n.call(this,t));return function(t,e){let n={};return t.forEach(t=>n[t]=1),e.filter(t=>{if(1===n[t])return delete n[t],t})}(this.keys(),t.keys()).map(t=>this.get(t))}},i=function(n){if(!Boolean(n))throw"snapCollect: identifier must evaluate to true";const i=function(n){return{add:function(){const t=Array.from(arguments);t.forEach(t=>this.set(t[n],t))},clear:function(){const t=Object.keys(this);for(let e of t)this.delete(e)},delete:function(n){t(n)&&delete this[e(n)]},get:function(n){if(t(n))return this[e(n)]},has:function(n){if(t(n))return Object.prototype.hasOwnProperty.call(this,e(n))},get length(){return Object.keys(this).length},set:function(n,r){t(n)&&(this[e(n)]=r)},toggle:function(t){const e=t[n];this.has(e)?this.delete(e):this.set(e,t)}}}(n);return Object.assign(i,r),i.identifier=n,i.name="SnapCollect",i};export default function(t){const e=i(t);return Object.create(e)}
//# sourceMappingURL=snapCollect.js.map
