import{A as U,r as q,u as A,a as F,b as M,c as W,d as z,j as c}from"./index-7165158c.js";import{S as g,i as N}from"./alerts-49db728b.js";const B=async e=>{try{return await(await fetch(`${U}get/${e}`)).json()}catch(m){console.log(m)}};var $={};Object.defineProperty($,"__esModule",{value:!0});var y=q,K=function(e){var m=e.timeToEvaluate,b=m===void 0?100:m,C=e.averageWaitTime,u=C===void 0?50:C,o=e.startCharacter,l=o===void 0?[]:o,E=e.endCharacter,P=E===void 0?[13,27]:E,h=e.onComplete,v=e.onError,s=e.minLength,w=s===void 0?1:s,k=e.ignoreIfFocusOn,n=e.stopPropagation,r=n===void 0?!1:n,a=e.preventDefault,t=a===void 0?!1:a,i=e.container,j=i===void 0?document:i,f=y.useRef([]),S=y.useRef(!1),D=function(){f.current=[]},I=function(){clearTimeout(S.current);var d=f.current.map(function(x,p,L){var R=x.time;return p>0?R-L[p-1].time:0}).slice(1).reduce(function(x,p){return x+p},0),T=d/(f.current.length-1),O=f.current.slice(l.length>0?1:0).map(function(x){var p=x.char;return p}).join("");T<=u&&f.current.slice(l.length>0?1:0).length>=w?h(O):T<=u&&v&&v(O),D()},_=y.useCallback(function(d){d.currentTarget!==k&&(P.includes(d.keyCode)&&I(),(f.current.length>0||l.includes(d.keyCode)||l.length===0)&&(clearTimeout(S.current),S.current=setTimeout(I,b),f.current.push({time:performance.now(),char:d.key}))),r&&d.stopPropagation(),t&&d.preventDefault()},[l,P,b,h,v,w,k,r,t]);y.useEffect(function(){return function(){clearTimeout(S.current)}},[]),y.useEffect(function(){return j.addEventListener("keydown",_),function(){j.removeEventListener("keydown",_)}},[_])},G=$.default=K;const Q=()=>{const e=A(),[m]=F(),[b]=M(),[C]=W(),[u]=z(),[o,l]=q.useState({codigo:"",nombre_paquete:""}),[E,P]=q.useState(!1),[h,v]=q.useState(!1),s=m.get("id"),w=n=>l({...o,[n.target.name]:[n.target.value]}),k=async n=>{if(n.preventDefault(),o.nombre_paquete.toString()==""&&n.target.name!="btn_submit")return!1;if(E){const a=await C({codigo:o.codigo.toString(),nombre_paquete:o.nombre_paquete.toString(),id:parseInt(s)});if(a.error)return g("Error","Ingresa todos los campos","error",5e3);if(a.data){const t=a.data.weightOptions.map(i=>i/100);N("Elige el peso correcto del paquete",`1-(${t[0]}), 2-(${t[1]}), 3-(${t[2]})`,"text","Enviar").then(async i=>{if(i.isConfirmed)return i.value=="1"&&await u({weight:a.data.weightOptions[0],id:s}),i.value=="2"&&await u({weight:a.data.weightOptions[1],id:s}),i.value=="3"&&await u({weight:a.data.weightOptions[2],id:s}),i.value>"3"||i.value<0||!parseInt(i.value)?g("Error","Solo colocar el numero opcion (1,2,3)","error",5e3):(g("Updated Package","Paquete actualizado correctamente","success",2e3),setTimeout(()=>{e("/")},2e3),!0);g("Update Package","Se ha actualizada el paquete mas no su peso","warning",2e3),setTimeout(()=>{e("/")},2e3)})}console.log(a)}const r=await b({codigo:o.codigo.toString(),nombre_paquete:o.nombre_paquete.toString()});if(r.error)return g("Error","Ingresa todos los campos","error",5e3);if(r.data){const a=r.data.weightOptions.map(t=>t/100);N("Elige el peso correcto del paquete",`1-(${a[0]}), 2-(${a[1]}), 3-(${a[2]})`,"text","Enviar").then(async t=>{if(t.isConfirmed){if(t.value=="1"&&await u({weight:r.data.weightOptions[0],id:r.data.newId}),t.value=="2"&&await u({weight:r.data.weightOptions[1],id:r.data.newId}),t.value=="3"&&await u({weight:r.data.weightOptions[2],id:r.data.newId}),t.value>"3"||t.value<0||!parseInt(t.value))return g("Error","Solo colocar el numero opcion (1,2,3)","error",5e3);g("Creaated Package","Paquete Registrado correctamente","success",2e3),setTimeout(()=>{e("/")},2e3)}else g("Create Package","Se ha registrado el paquete mas no su peso","warning",2e3),setTimeout(()=>{e("/")},2e3)})}return console.log(r),!0};return G({onComplete:v,onError:n=>console.log(n),minLength:13}),q.useEffect(()=>{(async()=>{if(s){P(!0);const n=await B(s);l({...o,nombre_paquete:n.data[0].nombre_paquete})}})()},[s]),c.jsx("div",{className:"mx-auto max-w-xl mt-20",children:c.jsxs("form",{className:"space-y-5",onSubmit:k,children:[c.jsxs("div",{children:[c.jsx("label",{htmlFor:"example1",className:"mb-1 block text-sm font-medium text-gray-700",children:"Codigo"}),c.jsx("input",{type:"text",id:"codigo",name:"codigo",className:"block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",placeholder:"(01)923840938(123)123112321",value:h||o.codigo,onChange:w})]}),c.jsxs("div",{children:[c.jsx("label",{htmlFor:"example2",className:"mb-1 block text-sm font-medium text-gray-700",children:"Nombre del paquete"}),c.jsx("input",{type:"text",id:"nombre_paquete",name:"nombre_paquete",className:"block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",placeholder:"Paquete1",value:o.nombre_paquete,onChange:w})]}),c.jsx("button",{type:"submit",name:"btn_submit",className:"w-full rounded-lg border border-blue-500 bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-blue-700 hover:bg-blue-700 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300",children:s?"Actualizar":"Registrar"})]})})};export{Q as default};
