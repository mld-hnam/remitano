"use strict";(self.webpackChunk_finbase_fincare=self.webpackChunk_finbase_fincare||[]).push([[376],{9784:function(e,t,n){n.r(t),n.d(t,{default:function(){return d}});n(2791);var r=n(7063),i=n(3099),a=n(435),c=n.p+"static/media/403.4492e09c7a7ca1d67c3e.jpg",o=n(6871),l=n(4349),s=n(3575),u=n(184),d=function(){var e=(0,s.aC)(),t=(0,o.s0)();return(0,u.jsx)(r.ZP,{style:{height:"100vh",background:"white"},icon:(0,u.jsx)("img",{alt:"403",src:c}),title:(0,u.jsx)(l.Z,{id:"page.403.title"}),subTitle:(0,u.jsx)(l.Z,{id:"page.403.content"}),extra:(0,u.jsxs)(i.Z,{direction:"vertical",children:[(0,u.jsx)(a.Z,{size:"large",type:"primary",onClick:function(){return t("/")},children:(0,u.jsx)(l.Z,{id:"action.backHome"})}),(0,u.jsx)(a.Z,{size:"large",type:"link",onClick:function(){return e.logout()},children:(0,u.jsx)(l.Z,{id:"page.loginWithAnotherAccount"})}),(0,u.jsx)(a.Z,{size:"large",type:"link",onClick:function(){return t(-1)},children:(0,u.jsx)(l.Z,{id:"action.tryAgain"})})]})})}},8883:function(e,t,n){n.d(t,{Z:function(){return l}});var r,i=n(9439),a=n(2791),c=n(4937),o=function(){if(!(0,c.Z)()||!window.document.documentElement)return!1;if(void 0!==r)return r;var e=document.createElement("div");return e.style.display="flex",e.style.flexDirection="column",e.style.rowGap="1px",e.appendChild(document.createElement("div")),e.appendChild(document.createElement("div")),document.body.appendChild(e),r=1===e.scrollHeight,document.body.removeChild(e),r},l=function(){var e=a.useState(!1),t=(0,i.Z)(e,2),n=t[0],r=t[1];return a.useEffect((function(){r(o())}),[]),n}},3099:function(e,t,n){n.d(t,{u:function(){return f},Z:function(){return g}});var r=n(7462),i=n(4942),a=n(9439),c=n(1694),o=n.n(c),l=n(5501),s=n(2791),u=n(1929),d=n(8883);function p(e){var t=e.className,n=e.direction,a=e.index,c=e.marginDirection,o=e.children,l=e.split,u=e.wrap,d=s.useContext(f),p=d.horizontalSize,m=d.verticalSize,v=d.latestIndex,g={};return d.supportFlexGap||("vertical"===n?a<v&&(g={marginBottom:p/(l?2:1)}):g=(0,r.Z)((0,r.Z)({},a<v&&(0,i.Z)({},c,p/(l?2:1))),u&&{paddingBottom:m})),null===o||void 0===o?null:s.createElement(s.Fragment,null,s.createElement("div",{className:t,style:g},o),a<v&&l&&s.createElement("span",{className:"".concat(t,"-split"),style:g},l))}var m=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n},f=s.createContext({latestIndex:0,horizontalSize:0,verticalSize:0,supportFlexGap:!1}),v={small:8,middle:16,large:24};var g=function(e){var t,n=s.useContext(u.E_),c=n.getPrefixCls,g=n.space,h=n.direction,y=e.size,x=void 0===y?(null===g||void 0===g?void 0:g.size)||"small":y,Z=e.align,z=e.className,C=e.children,b=e.direction,j=void 0===b?"horizontal":b,E=e.prefixCls,k=e.split,w=e.style,O=e.wrap,S=void 0!==O&&O,A=m(e,["size","align","className","children","direction","prefixCls","split","style","wrap"]),N=(0,d.Z)(),G=s.useMemo((function(){return(Array.isArray(x)?x:[x,x]).map((function(e){return function(e){return"string"===typeof e?v[e]:e||0}(e)}))}),[x]),P=(0,a.Z)(G,2),F=P[0],_=P[1],I=(0,l.Z)(C,{keepEmpty:!0}),B=void 0===Z&&"horizontal"===j?"center":Z,D=c("space",E),H=o()(D,"".concat(D,"-").concat(j),(t={},(0,i.Z)(t,"".concat(D,"-rtl"),"rtl"===h),(0,i.Z)(t,"".concat(D,"-align-").concat(B),B),t),z),M="".concat(D,"-item"),W="rtl"===h?"marginLeft":"marginRight",L=0,R=I.map((function(e,t){null!==e&&void 0!==e&&(L=t);var n=e&&e.key||"".concat(M,"-").concat(t);return s.createElement(p,{className:M,key:n,direction:j,index:t,marginDirection:W,split:k,wrap:S},e)})),T=s.useMemo((function(){return{horizontalSize:F,verticalSize:_,latestIndex:L,supportFlexGap:N}}),[F,_,L,N]);if(0===I.length)return null;var q={};return S&&(q.flexWrap="wrap",N||(q.marginBottom=-_)),N&&(q.columnGap=F,q.rowGap=_),s.createElement("div",(0,r.Z)({className:H,style:(0,r.Z)((0,r.Z)({},q),w)},A),s.createElement(f.Provider,{value:T},R))}},5501:function(e,t,n){n.d(t,{Z:function(){return a}});var r=n(2791),i=n(7441);function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=[];return r.Children.forEach(e,(function(e){(void 0!==e&&null!==e||t.keepEmpty)&&(Array.isArray(e)?n=n.concat(a(e)):(0,i.isFragment)(e)&&e.props?n=n.concat(a(e.props.children,t)):n.push(e))})),n}}}]);
//# sourceMappingURL=376.aca79d39.chunk.js.map