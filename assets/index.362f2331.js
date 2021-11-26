var e=Object.defineProperty,t=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,r=Math.pow,h=(t,s,n)=>s in t?e(t,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[s]=n;import{e as c,d as l,u as a,r as u,o,c as i,a as p,w as d,b as f,t as g,f as w,N as y,g as m,F as v,h as b,i as S,j as k,k as _,l as T,m as x,n as $,p as j,q as E,s as N,v as F,x as I,y as V,z as O,A,B as q,C as M,D as P,E as C,G as L,H as B,I as D,J as R,K as U,L as z,M as Q,O as G,P as H,Q as K,R as W,S as X,T as Y,U as J,V as Z}from"./vendor.0d19655d.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const s of e)if("childList"===s.type)for(const e of s.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var ee={eq:5,impliedby:4.1,imply:4,nor:3.1,or:3,xor:2.5,nand:2.1,and:2,not:1,atom:0,true:0,false:0};class te{constructor(){this.children=[],this.str=""}ch(e){return this.children[e]}static quote(e,t){return ee[e.type]<ee[t.type]+1?`(${t})`:t.toString()}updateStr(){this.children.forEach((e=>e.updateStr())),1===this.children.length?this.str=`${this.operator}${te.quote(this,this.children[0])}`:2===this.children.length&&(this.str=`${te.quote(this,this.children[0])} ${this.operator} ${te.quote(this,this.children[1])}`)}toString(){return this.str}dfsTruth(e){return void 0===e[this.str]&&(e[this.str]=this.calc(e)?1:0),!!e[this.str]}}class se extends te{constructor(e){super(),this.type="atom",this.operator="",this.str=e}calc(){return!!this.type}}class ne extends te{constructor(e){super(),this.type="not",this.operator="¬",this.children.push(e)}calc(e){return!this.children[0].dfsTruth(e)}}class re extends te{constructor(e,t){super(),this.type="and",this.operator="∧",this.children.push(e,t)}calc(e){const t=this.children[1].dfsTruth(e);return this.children[0].dfsTruth(e)&&t}}class he extends te{constructor(e,t){super(),this.type="nand",this.operator="↑",this.children.push(e,t)}calc(e){const t=this.children[1].dfsTruth(e);return!(this.children[0].dfsTruth(e)&&t)}}class ce extends te{constructor(e,t){super(),this.type="xor",this.operator="⊕",this.children.push(e,t)}calc(e){return this.children[0].dfsTruth(e)!==this.children[1].dfsTruth(e)}}class le extends te{constructor(e,t){super(),this.type="or",this.operator="∨",this.children.push(e,t)}calc(e){const t=this.children[1].dfsTruth(e);return this.children[0].dfsTruth(e)||t}}class ae extends te{constructor(e,t){super(),this.type="nor",this.operator="↓",this.children.push(e,t)}calc(e){const t=this.children[1].dfsTruth(e);return!(this.children[0].dfsTruth(e)||t)}}class ue extends te{constructor(e,t){super(),this.type="imply",this.operator="→",this.children.push(e,t)}calc(e){const t=this.children[1].dfsTruth(e);return!this.children[0].dfsTruth(e)||t}}class oe extends te{constructor(e,t){super(),this.type="impliedby",this.operator="←",this.children.push(e,t)}calc(e){const t=this.children[0].dfsTruth(e);return!this.children[1].dfsTruth(e)||t}}class ie extends te{constructor(e,t){super(),this.type="eq",this.operator="↔",this.children.push(e,t)}calc(e){return this.children[0].dfsTruth(e)===this.children[1].dfsTruth(e)}}class pe extends te{constructor(){super(),this.type="true",this.operator="",this.str="T"}calc(){return!!this.type}}class de extends te{constructor(){super(),this.type="false",this.operator="",this.str="F"}calc(){return!this.type}}const fe={"=":5,"<":4.1,">":4,"↓":3.1,"|":3,"^":2.5,"↑":2.1,"&":2};function ge(e){const t=[];switch(e.type){case"and":e.ch(0).type===e.type&&t.push({name:"结合律",result:new re(e.ch(0).ch(0),new re(e.ch(0).ch(1),e.ch(1)))}),e.ch(1).type===e.type&&t.push({name:"结合律",result:new re(new re(e.ch(0),e.ch(1).ch(0)),e.ch(1).ch(1))}),t.push({name:"交换律",result:new re(e.ch(1),e.ch(0))}),"or"===e.ch(0).type&&"or"===e.ch(1).type&&e.ch(0).ch(0).toString()===e.ch(1).ch(0).toString()&&t.push({name:"分配律",result:new le(e.ch(0).ch(0),new re(e.ch(0).ch(1),e.ch(1).ch(1)))}),"or"===e.ch(1).type&&t.push({name:"分配律",result:new le(new re(e.ch(0),e.ch(1).ch(0)),new re(e.ch(0),e.ch(1).ch(1)))}),e.ch(0).toString()===e.ch(1).toString()&&t.push({name:"等幂律",result:e.ch(0)}),"or"===e.ch(1).type&&e.ch(0).toString()===e.ch(1).ch(0).toString()&&t.push({name:"吸收律",result:e.ch(0)}),"not"===e.ch(0).type&&"not"===e.ch(1).type&&t.push({name:"摩根律",result:new ne(new le(e.ch(0).ch(0),e.ch(1).ch(0)))}),"not"===e.ch(1).type&&t.push({name:"摩根律",result:new ne(new ue(e.ch(0),e.ch(1).ch(0)))}),"true"===e.ch(1).type&&t.push({name:"同一律",result:e.ch(0)}),"false"===e.ch(1).type&&t.push({name:"零律",result:e.ch(1)}),"not"===e.ch(1).type&&e.ch(0).toString()===e.ch(1).ch(0).toString()&&t.push({name:"补余律",result:new de}),"imply"===e.ch(0).type&&"imply"===e.ch(1).type&&e.ch(0).ch(1).toString()===e.ch(1).ch(1).toString()&&t.push({name:"前提析取合并",result:new ue(new le(e.ch(0).ch(0),e.ch(1).ch(0)),e.ch(0).ch(1))}),"or"===e.ch(0).type&&"or"===e.ch(1).type&&"not"===e.ch(0).ch(1).type&&"not"===e.ch(1).ch(0).type&&e.ch(0).ch(0).toString()===e.ch(1).ch(0).ch(0).toString()&&e.ch(0).ch(1).ch(0).toString()===e.ch(1).ch(1).toString()&&t.push({name:"从取假来描述双条件",result:new ie(e.ch(0).ch(0),e.ch(1).ch(1))}),"imply"===e.ch(0).type&&"imply"===e.ch(1).type&&e.ch(0).ch(0).toString()===e.ch(1).ch(1).toString()&&e.ch(0).ch(1).toString()===e.ch(1).ch(0).toString()&&t.push({name:"等价等值式",result:new ie(e.ch(0).ch(0),e.ch(0).ch(1))}),"imply"===e.ch(0).type&&"imply"===e.ch(1).type&&"not"===e.ch(1).ch(1).type&&e.ch(0).ch(0).toString()===e.ch(1).ch(0).toString()&&e.ch(0).ch(1).toString()===e.ch(1).ch(1).ch(0).toString()&&t.push({name:"归谬论",result:new ne(e.ch(0).ch(0))});break;case"atom":break;case"eq":e.ch(0).type===e.type&&t.push({name:"结合律",result:new ie(e.ch(0).ch(0),new ie(e.ch(0).ch(1),e.ch(1)))}),e.ch(1).type===e.type&&t.push({name:"结合律",result:new ie(new ie(e.ch(0),e.ch(1).ch(0)),e.ch(1).ch(1))}),t.push({name:"交换律",result:new ie(e.ch(1),e.ch(0))}),e.ch(0).toString()===e.ch(1).toString()&&t.push({name:"等幂律",result:new pe}),"true"===e.ch(0).type&&t.push({name:"同一律",result:e.ch(1)}),"false"===e.ch(0).type&&t.push({name:"同一律",result:new ne(e.ch(1))}),"not"===e.ch(1).type&&e.ch(0).toString()===e.ch(1).ch(0).toString()&&t.push({name:"补余律",result:new de}),t.push({name:"从取真来描述双条件",result:new le(new re(e.ch(0),e.ch(1)),new re(new ne(e.ch(0)),new ne(e.ch(1))))},{name:"从取假来描述双条件",result:new re(new le(e.ch(0),new ne(e.ch(1))),new le(new ne(e.ch(0)),e.ch(1)))},{name:"等价等值式",result:new re(new ue(e.ch(0),e.ch(1)),new ue(e.ch(1),e.ch(0)))},{name:"等价否定等值式",result:new ie(new ne(e.ch(0)),new ne(e.ch(1)))}),"not"===e.ch(0).type&&"not"===e.ch(1).type&&t.push({name:"等价否定等值式",result:new ie(e.ch(0).ch(0),e.ch(1).ch(0))});break;case"false":t.push({name:"F = ¬T",result:new ne(new pe)});break;case"impliedby":t.push({name:"被蕴含的定义",result:new ue(e.ch(1),e.ch(0))});break;case"imply":"imply"===e.ch(1).type&&t.push({name:"分配律",result:new ue(new ue(e.ch(0),e.ch(1).ch(0)),new ue(e.ch(0),e.ch(1).ch(1)))}),e.ch(0).toString()===e.ch(1).toString()&&t.push({name:"等幂律",result:new pe}),"true"===e.ch(0).type&&t.push({name:"同一律",result:e.ch(1)}),"false"===e.ch(1).type&&t.push({name:"同一律",result:new ne(e.ch(0))}),"true"===e.ch(1).type&&t.push({name:"零律",result:e.ch(1)}),"false"===e.ch(0).type&&t.push({name:"零律",result:new pe}),"not"===e.ch(1).type&&e.ch(0).toString()===e.ch(1).ch(0).toString()&&t.push({name:"补余律",result:e.ch(1)}),"not"===e.ch(0).type&&e.ch(1).toString()===e.ch(0).ch(0).toString()&&t.push({name:"补余律",result:e.ch(1)}),t.push({name:"蕴含等值式",result:new le(new ne(e.ch(0)),e.ch(1))},{name:"假言易位",result:new ue(new ne(e.ch(1)),new ne(e.ch(0)))}),"not"===e.ch(0).type&&"not"===e.ch(1).type&&t.push({name:"假言易位",result:new ue(e.ch(1).ch(0),e.ch(0).ch(0))}),"imply"===e.ch(1).type&&t.push({name:"前提合取合并",result:new ue(new re(e.ch(0),e.ch(1).ch(0)),e.ch(1).ch(1))},{name:"前提交换",result:new ue(e.ch(1).ch(0),new ue(e.ch(0),e.ch(1).ch(1)))}),"and"===e.ch(0).type&&t.push({name:"前提合取合并",result:new ue(e.ch(0).ch(0),new ue(e.ch(0).ch(1),e.ch(1)))}),"or"===e.ch(0).type&&t.push({name:"前提析取合并",result:new re(new ue(e.ch(0).ch(0),e.ch(1)),new ue(e.ch(0).ch(1),e.ch(1)))});break;case"nand":t.push({name:"与非的定义",result:new ne(new re(e.ch(0),e.ch(1)))});break;case"nor":t.push({name:"或非的定义",result:new ne(new le(e.ch(0),e.ch(1)))});break;case"not":"not"===e.ch(0).type&&t.push({name:"双重否定律",result:e.ch(0).ch(0)}),"or"===e.ch(0).type&&t.push({name:"摩根律",result:new re(new ne(e.ch(0).ch(0)),new ne(e.ch(0).ch(1)))}),"and"===e.ch(0).type&&t.push({name:"摩根律",result:new le(new ne(e.ch(0).ch(0)),new ne(e.ch(0).ch(1)))}),"imply"===e.ch(0).type&&t.push({name:"摩根律",result:new re(e.ch(0).ch(0),new ne(e.ch(0).ch(1)))}),"eq"===e.ch(0).type&&t.push({name:"摩根律",result:new le(new re(new ne(e.ch(0).ch(0)),e.ch(0).ch(1)),new re(e.ch(0).ch(0),new ne(e.ch(0).ch(1))))}),"true"===e.ch(0).type&&t.push({name:"¬T = F",result:new de}),"false"===e.ch(0).type&&t.push({name:"¬F = T",result:new pe});break;case"or":e.ch(0).type===e.type&&t.push({name:"结合律",result:new le(e.ch(0).ch(0),new le(e.ch(0).ch(1),e.ch(1)))}),e.ch(1).type===e.type&&t.push({name:"结合律",result:new le(new le(e.ch(0),e.ch(1).ch(0)),e.ch(1).ch(1))}),t.push({name:"交换律",result:new le(e.ch(1),e.ch(0))}),"and"===e.ch(1).type&&t.push({name:"分配律",result:new re(new le(e.ch(0),e.ch(1).ch(0)),new le(e.ch(0),e.ch(1).ch(1)))}),"and"===e.ch(0).type&&"and"===e.ch(1).type&&e.ch(0).ch(0).toString()===e.ch(1).ch(0).toString()&&t.push({name:"分配律",result:new re(e.ch(0).ch(0),new le(e.ch(0).ch(1),e.ch(1).ch(1)))}),e.ch(0).toString()===e.ch(1).toString()&&t.push({name:"等幂律",result:e.ch(0)}),"and"===e.ch(1).type&&e.ch(0).toString()===e.ch(1).ch(0).toString()&&t.push({name:"吸收律",result:e.ch(0)}),"not"===e.ch(0).type&&"not"===e.ch(1).type&&t.push({name:"摩根律",result:new ne(new re(e.ch(0).ch(0),e.ch(1).ch(0)))}),"and"===e.ch(0).type&&"and"===e.ch(1).type&&"not"===e.ch(0).ch(0).type&&"not"===e.ch(1).ch(1).type&&e.ch(0).ch(0).ch(0).toString()===e.ch(1).ch(0).toString()&&e.ch(0).ch(1).toString()===e.ch(1).ch(1).ch(0).toString()&&t.push({name:"摩根律",result:new ne(new ie(e.ch(1).ch(0),e.ch(0).ch(1)))}),"false"===e.ch(1).type&&t.push({name:"同一律",result:e.ch(0)}),"true"===e.ch(1).type&&t.push({name:"零律",result:e.ch(1)}),"not"===e.ch(1).type&&e.ch(0).toString()===e.ch(1).ch(0).toString()&&t.push({name:"补余律",result:new pe}),"not"===e.ch(0).type&&t.push({name:"蕴涵等值式",result:new ue(e.ch(0).ch(0),e.ch(1))}),"and"===e.ch(0).type&&"and"===e.ch(1).type&&"not"===e.ch(1).ch(0).type&&"not"===e.ch(1).ch(1).type&&e.ch(0).ch(0).toString()===e.ch(1).ch(0).ch(0).toString()&&e.ch(0).ch(1).toString()===e.ch(1).ch(1).ch(0).toString()&&t.push({name:"从取真来描述双条件",result:new ie(e.ch(0).ch(0),e.ch(0).ch(1))});break;case"xor":t.push({name:"异或的定义",result:new ne(new ie(e.ch(0),e.ch(1)))});break;case"true":t.push({name:"T = ¬F",result:new ne(new de)});break;default:c(e.type)}return t}const we=l({props:{node:null,root:null,addStep:null},setup(e){const t=e,s=a(),n=u(!1),r=[];function h(){r.length=0,r.push(...ge(t.node)),r.forEach((({result:e})=>e.updateStr())),0===r.length?s.error({title:"错误",content:"没有可用的等值公式",positiveText:"😢"}):n.value=!0}function c(e,s){e.children.forEach(((n,r)=>{n===t.node?e.children[r]=s:c(n,s)}))}function l(e){t.node===t.root?t.addStep({exp:e.result.toString(),rule:e.name}):(c(t.root,e.result),t.root.updateStr(),t.addStep({exp:t.root.toString(),rule:e.name})),n.value=!1}return(t,s)=>(o(),i(v,null,[p(w(y),{onClick:h},{default:d((()=>[f(g(e.node),1)])),_:1}),p(w(S),{show:n.value,"onUpdate:show":s[0]||(s[0]=e=>n.value=e),preset:"dialog",title:"置换"},{default:d((()=>[p(w(m),null,{default:d((()=>[f("你要将 "+g(e.node)+" 替换成？",1)])),_:1}),(o(),i(v,null,b(r,((e,t)=>p(w(y),{key:t,onClick:t=>l(e)},{default:d((()=>[f(g(e.result)+" （"+g(e.name)+"） ",1)])),_:2},1032,["onClick"]))),64))])),_:1},8,["show"])],64))}});function ye(e,r,c){const{children:l,type:a}=e,u={title:"atom"!==a?()=>k(we,{node:e,root:r,addStep:c}):e.toString(),key:e.toString(),align:"center"},o=((e,r)=>{for(var c in r||(r={}))s.call(r,c)&&h(e,c,r[c]);if(t)for(var c of t(r))n.call(r,c)&&h(e,c,r[c]);return e})({title:e.operator,key:e.toString(),align:"center"},e===r?{className:"truth-table-result"}:{});return 1===l.length?u.children=[o,ye(l[0],r,c)]:2===l.length&&(u.children=[ye(l[0],r,c),o,ye(l[1],r,c)]),u}const me=f(" by. "),ve=f(" ouuan "),be=f(" Source Code @ GitHub "),Se=f(" Built with "),ke=f(" Vue 3 "),_e=f(" and "),Te=f(" Naive UI "),xe=f(" 是离散数学这门课的选做作业，用的教材是 "),$e=f(" 石纯一、王家廞：《数理逻辑与集合论（第二版）》 "),je=l({setup:e=>(e,t)=>(o(),_(w($),null,{default:d((()=>[p(w(x),null,{default:d((()=>[me,p(w(T),{href:"https://github.com/ouuan"},{default:d((()=>[ve])),_:1})])),_:1}),p(w(x),null,{default:d((()=>[p(w(T),{href:"https://github.com/ouuan/truth-table-generator"},{default:d((()=>[be])),_:1})])),_:1}),p(w(x),null,{default:d((()=>[Se,p(w(T),{href:"https://v3.vuejs.org/"},{default:d((()=>[ke])),_:1}),_e,p(w(T),{href:"https://www.naiveui.com/"},{default:d((()=>[Te])),_:1})])),_:1}),p(w(x),null,{default:d((()=>[xe,p(w(T),{href:"https://book.douban.com/subject/1128250/"},{default:d((()=>[$e])),_:1})])),_:1})])),_:1}))}),Ee=f(" 运算符的种类，表示方法，以及优先级顺序： "),Ne=f("括号（这些括号作用都相同）: (), [], {}, （）, 【】, ｛｝"),Fe=f("非: ¬, !, ！, ~, ～, NOT, \\lnot, \\neg"),Ie=f("与: ∧, &, &&, AND, \\land, \\wedge"),Ve=f("与非: ↑, ⊼, NAND, \\nand, \\uparrow"),Oe=f("异或: ⊕, ^, ⊻, !=, ……, XOR, \\xor"),Ae=f("或: ∨, |, ｜, ||, OR, \\lor, \\vee"),qe=f("或非: ↓, ⊽, NOR, \\nor, \\downarrow"),Me=f("蕴含（右结合）: →, >, ->, 》, IMPLIES, \\to, \\rightarrow"),Pe=f("被蕴含: ←, <, <-, 《, IMPLIEDBY, \\gets, \\leftarrow"),Ce=f("等价: ↔, ⟷, =, ==, <->, <>, EQ, \\leftrightarrow"),Le={key:1},Be=f("T/F 或 true/false 表示真/假"),De=f("命题变项用除了 T/F 的单个大写字母表示"),Re=l({setup(e){const t=u(!1);return(e,s)=>(o(),_(w(m),null,{default:d((()=>[p(w(F),{justify:"space-between"},{default:d((()=>[p(w($),null,{default:d((()=>[p(w(x),null,{default:d((()=>[Ee,t.value?(o(),_(w(j),{key:0},{default:d((()=>[p(w(x),null,{default:d((()=>[Ne])),_:1}),p(w(x),null,{default:d((()=>[Fe])),_:1}),p(w(x),null,{default:d((()=>[Ie])),_:1}),p(w(x),null,{default:d((()=>[Ve])),_:1}),p(w(x),null,{default:d((()=>[Oe])),_:1}),p(w(x),null,{default:d((()=>[Ae])),_:1}),p(w(x),null,{default:d((()=>[qe])),_:1}),p(w(x),null,{default:d((()=>[Me])),_:1}),p(w(x),null,{default:d((()=>[Pe])),_:1}),p(w(x),null,{default:d((()=>[Ce])),_:1})])),_:1})):(o(),i("span",Le," 非: !，与: &，或: |，蕴含: >，等价: = "))])),_:1}),p(w(x),null,{default:d((()=>[Be])),_:1}),p(w(x),null,{default:d((()=>[De])),_:1})])),_:1}),p(w(E),{label:"显示更多","label-placement":"left"},{default:d((()=>[p(w(N),{value:t.value,"onUpdate:value":s[0]||(s[0]=e=>t.value=e)},null,8,["value"])])),_:1})])),_:1})])),_:1}))}});class Ue{constructor(e,t){this.values=e,this.value=t,this.used=!1,this.values.sort()}toString(){return`m(${this.values.join(", ")}) = ${this.value}`}equals(e){return e instanceof Ue&&(this.value===e.value&&this.values.length===e.values.length&&this.values.every(((t,s)=>t===e.values[s])))}getValues(){return this.values}getValue(){return this.value}isUsed(){return this.used}use(){this.used=!0}combine(e){if(this.value===e.value)return null;if(this.values.length===e.values.length&&this.values.every(((t,s)=>t===e.values[s])))return null;let t=0,s="";for(let n=0;n<this.value.length;n+=1)if(this.value.charAt(n)!==e.value.charAt(n)?(t+=1,s+="-"):s+=this.value.charAt(n),t>1)return null;return new Ue(this.values.concat(e.values),s)}}function ze(e,t){return Boolean(t.find((t=>e instanceof Ue&&t instanceof Ue?e.equals(t):t===e)))}class Qe{constructor(e,t,s=[],n=!1){t.sort(),this.variables=e,this.values=t,this.allValues=t.concat(s),this.allValues.sort(),this.dontCares=s,this.isMaxterm=n,this.func=this.getFunction()||""}getBits(e){let t=(e>>>0).toString(2);for(let s=t.length;s<this.variables.length;s+=1)t=`0${t}`;return t}initialGroup(){const e=[];for(let t=0;t<this.variables.length+1;t+=1)e.push([]);for(const t of this.allValues){let s=0;const n=this.getBits(t);for(const e of n)"1"===e&&(s+=1);e[s].push(new Ue([t],n))}return e}static powerSet(e,t){let s=[];for(let c=1;c<r(2,t.length)-1;c+=1){const e=[];let n=(c>>>0).toString(2);for(let s=n.length;s<t.length;s+=1)n=`0${n}`;for(let s=0;s<n.length;s+=1)"1"===n.charAt(s)&&e.push(t[s]);s.push(e)}const n=[];for(const r of s){const t=[];for(const s of r)for(const n of s.getValues())!ze(n,t)&&ze(n,e)&&t.push(n);t.sort(),t.length===e.length&&t.every(((t,s)=>t===e[s]))&&n.push(r)}s=n;let h=s[0];for(const r of s)r.length<h.length&&(h=r);return void 0===h?[]:h}getPrimeImplicants(e=this.initialGroup()){if(1===e.length)return e[0];const t=[],s=[...Array(e.length-1).keys()],n=s.map((()=>[]));for(const r of s){const t=e[r],s=e[r+1];for(const e of t)for(const t of s){const s=e.combine(t);null!==s&&(e.use(),t.use(),ze(s,n[r])||n[r].push(s))}}for(const r of e)for(const e of r)e.isUsed()||ze(e,t)||t.push(e);for(const r of this.getPrimeImplicants(n))r.isUsed()||ze(r,t)||t.push(r);return t}solve(){let e=this.getPrimeImplicants();const t=[],s=[];for(let c=0;c<this.values.length;c+=1)s.push(!1);for(let c=0;c<this.values.length;c+=1){const n=this.values[c];let r=0,h=null;for(const t of e)ze(n,t.getValues())&&(r+=1,h=t);if(1===r&&h&&!ze(h,t)){for(const e of h.getValues())ze(e,this.dontCares)||(s[this.values.indexOf(e)]=!0);t.push(h)}}let n=!1;for(const c of s)if(!c){n=!0;break}if(!n)return t;const r=[];for(const c of e)if(!ze(c,t)){let e=!1;for(const t of c.getValues())if(!ze(t,this.dontCares)){e=!0;break}e&&r.push(c)}if(e=r,1===e.length)return t.concat(e);const h=[];for(let c=0;c<this.values.length;c+=1)s[c]||h.push(this.values[c]);return t.concat(Qe.powerSet(h,e))}getFunction(){if(null!=this.func)return this.func;const e=this.solve();if(0===e.length)return this.isMaxterm?"T":"F";if(1===e.length){let t=0;for(const s of e[0].getValue())"-"===s&&(t+=1);if(t===this.variables.length)return this.isMaxterm?"F":"T"}let t="";for(let s=0;s<e.length;s+=1){const n=e[s];(n.getValue().match(/-/g)||[]).length<this.variables.length-1&&(t+="(");for(let e=0;e<n.getValue().length;e+=1)n.getValue().charAt(e)===(this.isMaxterm?"1":"0")&&(t+="¬"),"-"!==n.getValue().charAt(e)&&(t+=this.variables[e]),(n.getValue().substring(e+1).match(/-/g)||[]).length<n.getValue().length-e-1&&"-"!==n.getValue().charAt(e)&&(t+=this.isMaxterm?" ∨ ":" ∧ ");(n.getValue().match(/-/g)||[]).length<this.variables.length-1&&(t+=")"),s<e.length-1&&(t+=this.isMaxterm?" ∧ ":" ∨ ")}return t}}const Ge=f(" 主合取范式 = "),He={key:0},Ke=f(" ⋀ "),We=f(" = "),Xe=f(" 主析取范式 = "),Ye={key:0},Je=f(" ⋁ "),Ze=f(" = "),et={key:1},tt=l({props:{atoms:null,truths:null},setup(e){const t=e,s=I((()=>{const e=[],s=[],n=[],r=[];return t.truths.forEach(((h,c)=>{const l=[];t.atoms.forEach(((e,s)=>{h===!!(c>>t.atoms.length-1-s&1)?l.push(e):l.push(`¬${e}`)})),h?(r.push(c),s.push(`(${l.join(" ∧ ")})`)):(n.push(t.truths.length-1-c),e.push(`(${l.join(" ∨ ")})`))})),{pcnf:e.length?e.reverse().join(" ∧ "):"T",pdnf:s.length?s.join(" ∨ "):"F",pcnfSub:n.reverse().join(", "),pdnfSub:r.join(", "),pdnfNums:r,pcnfNums:n}})),n=I((()=>{if(t.atoms.length>9)return null;const e=new Qe(t.atoms.join(""),s.value.pcnfNums.map((e=>t.truths.length-1-e)),[],!0).getFunction();return{dnf:new Qe(t.atoms.join(""),s.value.pdnfNums,[]).getFunction(),cnf:e}}));return(e,t)=>(o(),i(v,null,[V("p",null,[p(w(A),{"expand-trigger":"click","line-clamp":1,tooltip:!1},{default:d((()=>[Ge,w(s).pcnfSub.length?(o(),i("span",He,[Ke,V("sub",null,g(w(s).pcnfSub),1),We])):O("",!0),f(" "+g(w(s).pcnf),1)])),_:1})]),V("p",null,[p(w(A),{"expand-trigger":"click","line-clamp":1,tooltip:!1},{default:d((()=>[Xe,w(s).pdnfSub.length?(o(),i("span",Ye,[Je,V("sub",null,g(w(s).pdnfSub),1),Ze])):O("",!0),f(" "+g(w(s).pdnf),1)])),_:1})]),w(n)?(o(),i(v,{key:0},[V("p",null,[p(w(A),{"expand-trigger":"click","line-clamp":1,tooltip:!1},{default:d((()=>[f(" 最简合取范式 = "+g(w(n).cnf),1)])),_:1})]),V("p",null,[p(w(A),{"expand-trigger":"click","line-clamp":1,tooltip:!1},{default:d((()=>[f(" 最简析取范式 = "+g(w(n).dnf),1)])),_:1})])],64)):(o(),i("p",et," 命题变项太多了，最简范式算不过来了 😢 "))],64))}}),st=V("br",null,null,-1),nt=l({props:{steps:null},setup:e=>(t,s)=>(o(),_(w(F),{justify:"space-between"},{default:d((()=>[p(w(m),{style:{"text-indent":"1em"}},{default:d((()=>[(o(!0),i(v,null,b(e.steps,((e,t)=>(o(),i("span",{key:t},[f(g(t?"=":"")+" "+g(e.exp)+" "+g(e.rule?`（${e.rule}）`:"")+" ",1),st])))),128))])),_:1})])),_:1}))});class rt extends Error{}class ht{constructor(e){if(this.left=new Set,this.right=new Set,this.leftStr=new Set,this.rightStr=new Set,this.isTrue=!1,this.rule="",e instanceof te)this.leftStr.add("T"),this.rightStr.add("F"),this.rightStr.add(e.toString()),e.toString().length>1&&this.right.add(e),"true"===e.type&&(this.isTrue=!0,this.rule="T ⇒ T"),this.key=1,this.tot={value:1};else{for(const t of e.left)this.left.add(t);for(const t of e.right)this.right.add(t);for(const t of e.leftStr)this.leftStr.add(t);for(const t of e.rightStr)this.rightStr.add(t);if(this.tot=e.tot,this.tot.value+=1,this.tot.value>1e4)throw new rt;this.key=e.tot.value}}toString(){const e=[],t=[];for(const s of this.leftStr.values())"T"!==s&&e.push(s);0===e.length&&e.push("T");for(const s of this.rightStr.values())"F"!==s&&t.push(s);return 0===t.length&&t.push("F"),`${e.join(", ")} ⇒ ${t.join(", ")}`}del(e,t){this[t].delete(e),this[`${t}Str`].delete(e.toString())}add(e,t){this[`${t}Str`].has(e.toString())||(this[`${t}Str`].add(e.toString()),e.toString().length>1&&this[t].add(e),this["left"===t?"rightStr":"leftStr"].has(e.toString())&&(this.isTrue=!0,this.rule=`${e} ⇒ ${e}`))}solve(){const e=[];if(!this.isTrue){if(this.left.size>0){const t=this.left.values().next().value,s=new ht(this);switch(s.del(t,"left"),this.rule=`${t.operator} ⇒`,t.type){case"not":s.add(t.ch(0),"right"),e.push(s.solve());break;case"and":s.add(t.ch(0),"left"),s.add(t.ch(1),"left"),e.push(s.solve());break;case"or":{const n=new ht(s);s.add(t.ch(0),"left"),n.add(t.ch(1),"left"),e.push(s.solve(),n.solve());break}case"imply":{const n=new ht(s);s.add(t.ch(1),"left"),n.add(t.ch(0),"right"),e.push(s.solve(),n.solve());break}case"eq":{const n=new ht(s);s.add(t.ch(0),"left"),s.add(t.ch(1),"left"),n.add(t.ch(0),"right"),n.add(t.ch(1),"right"),e.push(s.solve(),n.solve());break}case"nor":case"xor":case"nand":case"impliedby":{const{result:n}=ge(t)[0];n.updateStr(),s.add(n,"left"),e.push(s.solve());break}case"atom":case"true":case"false":throw Error(`${t.type} appears in WangHao's left!`);default:c(t.type)}}else if(this.right.size>0){const t=this.right.values().next().value,s=new ht(this);switch(s.del(t,"right"),this.rule=`⇒ ${t.operator}`,t.type){case"not":s.add(t.ch(0),"left"),e.push(s.solve());break;case"and":{const n=new ht(s);s.add(t.ch(0),"right"),n.add(t.ch(1),"right"),e.push(s.solve(),n.solve());break}case"or":s.add(t.ch(0),"right"),s.add(t.ch(1),"right"),e.push(s.solve());break;case"imply":s.add(t.ch(0),"left"),s.add(t.ch(1),"right"),e.push(s.solve());break;case"eq":{const n=new ht(s);s.add(t.ch(0),"left"),s.add(t.ch(1),"right"),n.add(t.ch(0),"right"),n.add(t.ch(1),"left"),e.push(s.solve(),n.solve());break}case"nor":case"xor":case"nand":case"impliedby":{const{result:n}=ge(t)[0];n.updateStr(),s.add(n,"right"),e.push(s.solve());break}case"atom":case"true":case"false":throw Error(`${t.type} appears in WangHao's right!`);default:c(t.type)}}e.length&&(this.isTrue=!0,e.forEach((({isTrue:e})=>{e||(this.isTrue=!1)})))}return{key:`${Number(this.isTrue)}-${this.key}-wh-${(new Date).valueOf()}`,label:this.toString(),isTrue:this.isTrue,children:0===e.length?void 0:e,isLeaf:0===e.length,suffix:()=>k(q,{type:"info",class:"wanghao-rule"},{default:()=>this.rule?this.rule:void 0})}}}var ct=(e,t)=>{const s=e.__vccOpts||e;for(const[n,r]of t)s[n]=r;return s};const lt=f("点击左侧三角可以展开定理推演过程，式子的颜色表示是否是重言式（定理），每行最右侧是下一步所使用的规则。"),at=f(" 式子过长，王浩算法的步骤太多了 😫 ");var ut=ct(l({props:{root:null},setup(e){const t=e,s=I((()=>{try{return new ht(t.root).solve()}catch(e){if(e instanceof rt)return null;throw e}}));function n({option:e}){let t="error";const{key:s}=e;return"string"==typeof s&&"1"===s[0]&&(t="success"),k(q,{type:t,class:"wanghao-step"},{default:()=>e.label})}return(e,t)=>w(s)?(o(),i(v,{key:0},[p(w(m),null,{default:d((()=>[lt])),_:1}),p(w(M),{data:[w(s)],selectable:!1,"render-label":n,"block-node":"","virtual-scroll":"",class:"wanghao"},null,8,["data"])],64)):(o(),_(w(m),{key:1},{default:d((()=>[at])),_:1}))}}),[["__scopeId","data-v-24022a44"]]);const ot=f(" 将输入规范化 "),it=f(" 如果太长了，式子会被省略，点击式子就可以全部显示。 "),pt=f(" 撤销 "),dt=f(" 可以点击表头中的按钮来进行等值演算。如果没有发现你想要的规则，很可能是要多用几次交换律。 ");var ft=ct(l({setup(e){P((e=>({"086b240c":w(j)})));const t=u(""),s=u([]),n=u(""),r=u(void 0),h=C([]),l=C([]),a=u(0),i=C([]),v=C([]),b=u(!1),S=C(null);function k(e){s.value.push(e)}function T(){s.value.pop()}L(t,(e=>{s.value=[{exp:e,rule:""}]})),L([s,()=>s.value.length],(([e,t])=>{b.value=!1;const{exp:u}=e[t-1];if(h.value=[],l.value=[],0===u.length)return n.value="",void(r.value=void 0);const o=function(e){try{let t=function(){return l[l.length-1]},s=function(e){return"string"==typeof e&&/^[&↑^↓|><=]$/.test(e)},n=function(e){if(0===t().length)return void t().push(e);const r=t()[t().length-1];function h(){return`Invalid expression: "${e}" after "${r}"`}if("!"===r){if(s(e))throw h();"!"===e?t().push("!"):(t().pop(),n(new ne(e)))}else if(s(r)){if(s(e))throw h();t().push(e)}else{if(!s(e))throw h();t().push(e)}},r=function(){const e=new Error("Reduce error"),s=t().pop();if("object"!=typeof s)throw e;const r=t().pop();if("string"!=typeof r)throw e;const h=t().pop();if("object"!=typeof h)throw e;switch(r){case"&":n(new re(h,s));break;case"↑":n(new he(h,s));break;case"^":n(new ce(h,s));break;case"↓":n(new ae(h,s));break;case"|":n(new le(h,s));break;case">":n(new ue(h,s));break;case"<":n(new oe(h,s));break;case"=":n(new ie(h,s));break;case"!":throw e;default:c(r)}};const h=function(e){return e.replace(/\\(land|wedge)\b/g,"&").replace(/∧|&&|\bAND\b/gi,"&").replace(/\\(nand|uparrow)\b/g,"↑").replace(/⊼|\bNAND\b/gi,"↑").replace(/\\xor\b/g,"^").replace(/⊻|⊕|!=|……|\bXOR\b/gi,"^").replace(/\\(nor|downarrow)\b/g,"↓").replace(/⊽|\bNOR\b/gi,"↓").replace(/\\(lor|vee)\b/g,"|").replace(/∨|｜|\|\||\bOR\b/gi,"|").replace(/\\leftrightarrow\b/g,"=").replace(/⟷|↔|==|<->|<>|\bEQ\b/gi,"=").replace(/\\(to|rightarrow)\b/g,">").replace(/→|》|->|\bIMPLIES\b/gi,">").replace(/\\(gets|leftarrow)\b/g,"<").replace(/←|《|<-|\bIMPLIEDBY\b/gi,"<").replace(/\\(neg|lnot)\b/g,"!").replace(/¬|~|！|～|\bNOT\b/gi,"!").replace(/（|\[|【|\{|｛/g,"(").replace(/）|\]|】|\}|｝/g,")").replace(/\btrue\b/gi,"T").replace(/\bfalse\b/gi,"F").replace(/\s/g,"")}(e);if(/[^A-Z()!&|><=↑^↓]/.test(h))return null;const l=[[]],a=new Map;for(let e=0;e<h.length;e+=1){const s=h[e];switch(s){case"(":l.push([]);break;case")":{for(;t().length>1;)r();const e=t()[0];if("object"!=typeof e)throw Error("End bracket error");l.pop(),n(e);break}case"&":case"↑":case"^":case"↓":case"|":case">":case"<":case"=":for(;t().length>1;){const e=t()[t().length-2];if("string"!=typeof e||"!"===e)throw Error("Invalid stack");if(!(fe[e]<fe[s]||e===s&&">"!==s))break;r()}n(s);break;case"!":n("!");break;case"T":n(new pe);break;case"F":n(new de);break;default:{const e=new se(s);let t=a.get(s);t||(t=[],a.set(s,t)),t.push(e),n(e);break}}}if(1!==l.length)throw Error("Bracket error");for(;t().length>1;)r();const u=t()[0];if("string"==typeof u)throw Error("Invalid root");return u.updateStr(),{root:u,atomNodes:a}}catch(t){return null}}(u);if(!o)return n.value="表达式好像不合法 😢",void(r.value="error");const{root:p,atomNodes:d}=o;if(d.size>12)return n.value="命题变项太多了 😫",void(r.value="error");d.size>6?(n.value="命题变项有点多诶 🤔",r.value="warning"):(n.value="",r.value="success"),b.value=!0;const f=function(e,t,s){const n=[],r=Array.from(t.keys()).sort();r.forEach((e=>{n.push({title:e,key:e,align:"center"})})),n.push(ye(e,e,s));const h=[],c=[];for(let l=0;l<1<<r.length;l+=1){const t={key:l};for(let e=0;e<r.length;e+=1)t[r[e]]=l>>r.length-1-e&1;c.push(e.dfsTruth(t)),h.push(t)}return{atoms:r,columns:n,data:h,truths:c}}(o.root,d,k);h.value=f.columns,l.value=f.data,1===t&&(S.value=p,s.value[0].exp=p.toString(),i.value=f.atoms,v.value=f.truths),a.value+=1}));const x=I((()=>i.value.length>=3)),$=I((()=>s.value[s.value.length-1].exp.length>1)),j=B(D().value,"successColor"),N=I((()=>{var e;return t.value===(null==(e=S.value)?void 0:e.toString())}));function V(){S.value&&(t.value=S.value.toString())}return(e,c)=>(o(),_(w(F),{class:"main-page",vertical:""},{default:d((()=>[p(w(R),{title:"真值表生成器",subtitle:"「是个真值表生成器，但不完全是～」"}),p(w(G),null,{default:d((()=>[p(w(U),{"default-expanded-names":["about","input","simplify"]},{default:d((()=>[p(w(z),{title:"关于",name:"about"},{default:d((()=>[p(je)])),_:1}),p(w(z),{title:"输入",name:"input"},{default:d((()=>[p(Re),p(w(E),{label:"输入逻辑表达式","validation-status":r.value,feedback:n.value},{default:d((()=>[p(w(Q),{value:t.value,"onUpdate:value":c[0]||(c[0]=e=>t.value=e),maxlength:200,placeholder:"!(P & Q) = !P | !Q"},null,8,["value"])])),_:1},8,["validation-status","feedback"]),b.value&&!w(N)?(o(),_(w(G),{key:0},{default:d((()=>[p(w(F),{justify:"space-between"},{default:d((()=>[f(" 规范的表达式: "+g(w(S))+" ",1),p(w(y),{onClick:V},{default:d((()=>[ot])),_:1})])),_:1})])),_:1})):O("",!0)])),_:1}),b.value&&w(i).length?(o(),_(w(z),{key:0,title:"主范式与最简范式",name:"nf"},{default:d((()=>[w(x)?(o(),_(w(m),{key:0},{default:d((()=>[it])),_:1})):O("",!0),p(tt,{atoms:w(i),truths:w(v)},null,8,["atoms","truths"])])),_:1})):O("",!0),b.value?(o(),_(w(z),{key:1,title:"王浩算法",name:"wanghao"},{default:d((()=>[p(ut,{root:w(S)},null,8,["root"])])),_:1})):O("",!0),s.value.length>1?(o(),_(w(z),{key:2,title:"等值演算",name:"simplify"},{default:d((()=>[p(w(F),{justify:"space-between"},{default:d((()=>[p(nt,{steps:s.value},null,8,["steps"]),p(w(y),{type:"warning",onClick:T},{default:d((()=>[pt])),_:1})])),_:1})])),_:1})):O("",!0),b.value?(o(),_(w(z),{key:3,title:"真值表",name:"table"},{default:d((()=>[w($)?(o(),_(w(m),{key:0},{default:d((()=>[dt])),_:1})):O("",!0),p(w(H),{key:a.value,data:w(l),columns:w(h),"single-line":!1,"single-column":!0,pagination:{pageSize:16}},null,8,["data","columns"])])),_:1})):O("",!0)])),_:1})])),_:1})])),_:1}))}}),[["__scopeId","data-v-268fec39"]]);Z(l({setup(e){const t=I((()=>"dark"===Y().value?J:null));return(e,s)=>(o(),_(w(K),{theme:w(t)},{default:d((()=>[p(w(W)),p(w(X),null,{default:d((()=>[p(ft)])),_:1})])),_:1},8,["theme"]))}})).mount("#app");
