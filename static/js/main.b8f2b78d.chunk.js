(this["webpackJsonpmoduloose-admin"]=this["webpackJsonpmoduloose-admin"]||[]).push([[0],{36:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var o=n(4),c=n(2),i=n.n(c),r=n(17),l=n.n(r),a=n(11),u=n(20),s=n(13),d=(n(35),n(36),n(51)),m=n(24);m.a.initializeApp({apiKey:"AIzaSyDmZSo7o8WB-bsge5T_Rd9VJdODhA-wD2Y",authDomain:"my-firebase-1f789.firebaseapp.com",projectId:"my-firebase-1f789",messagingSenderId:"917517905132",appId:"1:917517905132:web:2cc22f398c1a2511a209c9",measurementId:"G-7N4N4SG1FZ"});var j=m.a.firestore(),f=function(e){var t=Object(c.useState)([]),n=Object(s.a)(t,2),o=n[0],i=n[1];return Object(c.useEffect)((function(){var t=j.collection(e).onSnapshot((function(e){var t=[];e.forEach((function(e){t.push(Object(a.a)(Object(a.a)({},e.data()),{},{id:e.id}))})),i(t)}));return function(){return t()}}),[e]),o},p=function(e,t){j.collection(e).doc(t.id).set(t).then((function(){return console.log("document uploaded to firestore")})).catch((function(e){console.error("Error writing document: ",e)}))},b=n(26);var O=function(){var e=f("moduloose/moduloose-main/modules"),t=f("moduloose/moduloose-main/groups"),n=Object(c.useState)(null),i=Object(s.a)(n,2),r=i[0],l=i[1],m=Object(c.useState)(null),O=Object(s.a)(m,2),g=O[0],h=O[1],y=Object(c.useState)(""),x=Object(s.a)(y,2),v=x[0],C=x[1],S=Object(c.useState)(""),w=Object(s.a)(S,2),T=w[0],M=w[1],N=Object(c.useState)(""),I=Object(s.a)(N,2),k=I[0],D=I[1];return Object(c.useEffect)((function(){r&&l(t.find((function(e){return e.name===r.name}))),r&&h(e.filter((function(e){return e.group===r.name})))}),[t,r,e]),Object(o.jsx)("div",{id:"app",className:"admin",children:Object(o.jsx)("div",{id:"content-container",children:Object(o.jsxs)("div",{id:"selector-wrapper",children:[Object(o.jsx)("div",{className:"title-div",children:Object(o.jsx)("h1",{children:"Moduloose Admin"})}),t&&Object(o.jsxs)(d.a,{children:[Object(o.jsx)(d.a.Toggle,{variant:"light",id:"main-dropdown",children:r?r.name:"Select Group"}),Object(o.jsx)(d.a.Menu,{children:t.sort((function(e,t){var n=e.name.toLowerCase(),o=t.name.toLowerCase();return n<o?-1:n>o?1:0})).map((function(t){return Object(o.jsx)(d.a.Item,{id:t.name,onClick:function(){return function(t){l(t),h(e.filter((function(e){return e.group===t.name})))}(t)},children:t.name})}))})]}),e&&r&&r.types.sort().map((function(e){return Object(o.jsxs)(d.a,{id:e,className:"selector-dropdown",children:[Object(o.jsx)(d.a.Toggle,{variant:"dark",children:e}),Object(o.jsx)(b.CopyToClipboard,{id:e+"-copy",text:e,children:Object(o.jsx)("button",{className:"btn btn-light edit-button ml-2",children:"Copy"})}),Object(o.jsx)(d.a.Menu,{children:g&&g.filter((function(t){return t.type===e})).map((function(e){return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)(d.a.Item,{onClick:function(){return function(e){C(e.type),M(e.title),D(e.content)}(e)},children:e.title})})}))})]})})),e&&r&&Object(o.jsxs)("form",{className:"form-container",children:[Object(o.jsx)("h3",{children:"Add-Update-Remove Module"}),Object(o.jsx)("label",{children:"Type"}),Object(o.jsx)("input",{id:"type-input",type:"text",value:v,onChange:function(e){C(e.target.value)}}),Object(o.jsx)("label",{children:"Title"}),Object(o.jsx)("input",{id:"title-input",type:"text",value:T,onChange:function(e){M(e.target.value)}}),Object(o.jsx)("label",{children:"Content"}),Object(o.jsx)("textarea",{id:"content-input",type:"text",value:k,onChange:function(e){D(e.target.value)}}),Object(o.jsx)("button",{className:"btn btn-dark edit-button",onClick:function(e){if(e.preventDefault(),v&&T&&"delete"!==k&&"change"!==k){var t=g.filter((function(e){return e.type===v})).find((function(e){return e.title===T}));if(t)console.log("Updating Module"),p("moduloose/moduloose-main/modules",{group:r.name,type:v,title:T,content:k,id:t.id});else{console.log("Creating Module");var n=r.name+v+T;if(n=n.split(" ").join("_"),p("moduloose/moduloose-main/modules",{group:r.name,type:v,title:T,content:k,id:n}),r.types.find((function(e){return e===v})))console.log("--Type already exists");else{console.log("--Creating Type");var o=Object(u.a)(r.types).concat([v]);p("moduloose/moduloose-main/groups",Object(a.a)(Object(a.a)({},r),{},{types:o}))}}}else if(v&&T&&"delete"===k){var c=g.find((function(e){return e.title===T&&e.type===v}));if(c)if(console.log("Deleting Module"),d="moduloose/moduloose-main/modules",m=c.id,j.collection(d).doc(m).delete().then((function(){return console.log("document deleted from firestore")})).catch((function(e){console.error("Error deleting document: ",e)})),g.filter((function(e){return e.type===v})).length<=1){console.log("--Deleting Type from Group");var i=Object(u.a)(r.types).filter((function(e){return e!==v}));p("moduloose/moduloose-main/groups",Object(a.a)(Object(a.a)({},r),{},{types:i}))}else console.log("--Type was preserved");else console.log("Module does not exist")}else if(v&&T&&"change"===k){var l=T;if(r.types.find((function(e){return e===v}))){g.filter((function(e){return e.type===v})).forEach((function(e){console.log("Changing type in Module"),p("moduloose/moduloose-main/modules",Object(a.a)(Object(a.a)({},e),{},{type:l}))}));var s=Object(u.a)(r.types).filter((function(e){return e!==v})).concat([l]);console.log("New Types: "+s),p("moduloose/moduloose-main/groups",Object(a.a)(Object(a.a)({},r),{},{types:s})),console.log("Changing Type in Group")}}else console.log("No valid option");var d,m;C(""),M(""),D("")},children:"Submit"})]})]})})})};l.a.render(Object(o.jsx)(i.a.StrictMode,{children:Object(o.jsx)(O,{})}),document.getElementById("root"))}},[[46,1,2]]]);
//# sourceMappingURL=main.b8f2b78d.chunk.js.map