import{I as B,r as G,ac as Vt,a6 as at,ad as Wt,ae as I,N as J,af as Bt}from"./entry.dce63502.js";function nt(t){return t.split("-")[1]}function Lt(t){return t==="y"?"height":"width"}function _(t){return t.split("-")[0]}function ot(t){return["top","bottom"].includes(_(t))?"x":"y"}function yt(t,e,n){let{reference:o,floating:i}=t;const r=o.x+o.width/2-i.width/2,l=o.y+o.height/2-i.height/2,c=ot(e),a=Lt(c),s=o[a]/2-i[a]/2,f=c==="x";let d;switch(_(e)){case"top":d={x:r,y:o.y-i.height};break;case"bottom":d={x:r,y:o.y+o.height};break;case"right":d={x:o.x+o.width,y:l};break;case"left":d={x:o.x-i.width,y:l};break;default:d={x:o.x,y:o.y}}switch(nt(e)){case"start":d[c]-=s*(n&&f?-1:1);break;case"end":d[c]+=s*(n&&f?-1:1)}return d}const Ht=async(t,e,n)=>{const{placement:o="bottom",strategy:i="absolute",middleware:r=[],platform:l}=n,c=r.filter(Boolean),a=await(l.isRTL==null?void 0:l.isRTL(e));let s=await l.getElementRects({reference:t,floating:e,strategy:i}),{x:f,y:d}=yt(s,o,a),y=o,h={},u=0;for(let p=0;p<c.length;p++){const{name:m,fn:v}=c[p],{x,y:w,data:R,reset:b}=await v({x:f,y:d,initialPlacement:o,placement:y,strategy:i,middlewareData:h,rects:s,platform:l,elements:{reference:t,floating:e}});f=x??f,d=w??d,h={...h,[m]:{...h[m],...R}},b&&u<=50&&(u++,typeof b=="object"&&(b.placement&&(y=b.placement),b.rects&&(s=b.rects===!0?await l.getElementRects({reference:t,floating:e,strategy:i}):b.rects),{x:f,y:d}=yt(s,y,a)),p=-1)}return{x:f,y:d,placement:y,strategy:i,middlewareData:h}};function it(t,e){return typeof t=="function"?t(e):t}function zt(t){return typeof t!="number"?function(e){return{top:0,right:0,bottom:0,left:0,...e}}(t):{top:t,right:t,bottom:t,left:t}}function U(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}async function Tt(t,e){var n;e===void 0&&(e={});const{x:o,y:i,platform:r,rects:l,elements:c,strategy:a}=t,{boundary:s="clippingAncestors",rootBoundary:f="viewport",elementContext:d="floating",altBoundary:y=!1,padding:h=0}=it(e,t),u=zt(h),p=c[y?d==="floating"?"reference":"floating":d],m=U(await r.getClippingRect({element:(n=await(r.isElement==null?void 0:r.isElement(p)))==null||n?p:p.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(c.floating)),boundary:s,rootBoundary:f,strategy:a})),v=d==="floating"?{...l.floating,x:o,y:i}:l.reference,x=await(r.getOffsetParent==null?void 0:r.getOffsetParent(c.floating)),w=await(r.isElement==null?void 0:r.isElement(x))&&await(r.getScale==null?void 0:r.getScale(x))||{x:1,y:1},R=U(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({rect:v,offsetParent:x,strategy:a}):v);return{top:(m.top-R.top+u.top)/w.y,bottom:(R.bottom-m.bottom+u.bottom)/w.y,left:(m.left-R.left+u.left)/w.x,right:(R.right-m.right+u.right)/w.x}}const _t=Math.min,Nt=Math.max;function gt(t,e,n){return Nt(t,_t(e,n))}const It=["top","right","bottom","left"];It.reduce((t,e)=>t.concat(e,e+"-start",e+"-end"),[]);const qt={left:"right",right:"left",bottom:"top",top:"bottom"};function Z(t){return t.replace(/left|right|bottom|top/g,e=>qt[e])}function Xt(t,e,n){n===void 0&&(n=!1);const o=nt(t),i=ot(t),r=Lt(i);let l=i==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(l=Z(l)),{main:l,cross:Z(l)}}const Yt={start:"end",end:"start"};function st(t){return t.replace(/start|end/g,e=>Yt[e])}const te=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n;const{placement:o,middlewareData:i,rects:r,initialPlacement:l,platform:c,elements:a}=e,{mainAxis:s=!0,crossAxis:f=!0,fallbackPlacements:d,fallbackStrategy:y="bestFit",fallbackAxisSideDirection:h="none",flipAlignment:u=!0,...p}=it(t,e),m=_(o),v=_(l)===l,x=await(c.isRTL==null?void 0:c.isRTL(a.floating)),w=d||(v||!u?[Z(l)]:function(E){const A=Z(E);return[st(E),A,st(A)]}(l));d||h==="none"||w.push(...function(E,A,C,S){const D=nt(E);let L=function(k,ct,Ft){const pt=["left","right"],ht=["right","left"],kt=["top","bottom"],Mt=["bottom","top"];switch(k){case"top":case"bottom":return Ft?ct?ht:pt:ct?pt:ht;case"left":case"right":return ct?kt:Mt;default:return[]}}(_(E),C==="start",S);return D&&(L=L.map(k=>k+"-"+D),A&&(L=L.concat(L.map(st)))),L}(l,u,h,x));const R=[l,...w],b=await Tt(e,p),$=[];let g=((n=i.flip)==null?void 0:n.overflows)||[];if(s&&$.push(b[m]),f){const{main:E,cross:A}=Xt(o,r,x);$.push(b[E],b[A])}if(g=[...g,{placement:o,overflows:$}],!$.every(E=>E<=0)){var P,W;const E=(((P=i.flip)==null?void 0:P.index)||0)+1,A=R[E];if(A)return{data:{index:E,overflows:g},reset:{placement:A}};let C=(W=g.filter(S=>S.overflows[0]<=0).sort((S,D)=>S.overflows[1]-D.overflows[1])[0])==null?void 0:W.placement;if(!C)switch(y){case"bestFit":{var j;const S=(j=g.map(D=>[D.placement,D.overflows.filter(L=>L>0).reduce((L,k)=>L+k,0)]).sort((D,L)=>D[1]-L[1])[0])==null?void 0:j[0];S&&(C=S);break}case"initialPlacement":C=l}if(o!==C)return{reset:{placement:C}}}return{}}}},ee=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){const{x:n,y:o}=e,i=await async function(r,l){const{placement:c,platform:a,elements:s}=r,f=await(a.isRTL==null?void 0:a.isRTL(s.floating)),d=_(c),y=nt(c),h=ot(c)==="x",u=["left","top"].includes(d)?-1:1,p=f&&h?-1:1,m=it(l,r);let{mainAxis:v,crossAxis:x,alignmentAxis:w}=typeof m=="number"?{mainAxis:m,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...m};return y&&typeof w=="number"&&(x=y==="end"?-1*w:w),h?{x:x*p,y:v*u}:{x:v*u,y:x*p}}(e,t);return{x:n+i.x,y:o+i.y,data:i}}}};function jt(t){return t==="x"?"y":"x"}const ne=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:o,placement:i}=e,{mainAxis:r=!0,crossAxis:l=!1,limiter:c={fn:m=>{let{x:v,y:x}=m;return{x:v,y:x}}},...a}=it(t,e),s={x:n,y:o},f=await Tt(e,a),d=ot(_(i)),y=jt(d);let h=s[d],u=s[y];if(r){const m=d==="y"?"bottom":"right";h=gt(h+f[d==="y"?"top":"left"],h,h-f[m])}if(l){const m=y==="y"?"bottom":"right";u=gt(u+f[y==="y"?"top":"left"],u,u-f[m])}const p=c.fn({...e,[d]:h,[y]:u});return{...p,data:{x:p.x-n,y:p.y-o}}}}};function T(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function F(t){return T(t).getComputedStyle(t)}function At(t){return t instanceof T(t).Node}function H(t){return At(t)?(t.nodeName||"").toLowerCase():"#document"}function O(t){return t instanceof HTMLElement||t instanceof T(t).HTMLElement}function vt(t){return typeof ShadowRoot<"u"&&(t instanceof T(t).ShadowRoot||t instanceof ShadowRoot)}function K(t){const{overflow:e,overflowX:n,overflowY:o,display:i}=F(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!["inline","contents"].includes(i)}function Gt(t){return["table","td","th"].includes(H(t))}function ut(t){const e=dt(),n=F(t);return n.transform!=="none"||n.perspective!=="none"||!!n.containerType&&n.containerType!=="normal"||!e&&!!n.backdropFilter&&n.backdropFilter!=="none"||!e&&!!n.filter&&n.filter!=="none"||["transform","perspective","filter"].some(o=>(n.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(n.contain||"").includes(o))}function dt(){return!(typeof CSS>"u"||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function rt(t){return["html","body","#document"].includes(H(t))}const ft=Math.min,q=Math.max,tt=Math.round,Q=Math.floor,z=t=>({x:t,y:t});function Dt(t){const e=F(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const i=O(t),r=i?t.offsetWidth:n,l=i?t.offsetHeight:o,c=tt(n)!==r||tt(o)!==l;return c&&(n=r,o=l),{width:n,height:o,$:c}}function M(t){return t instanceof Element||t instanceof T(t).Element}function mt(t){return M(t)?t:t.contextElement}function X(t){const e=mt(t);if(!O(e))return z(1);const n=e.getBoundingClientRect(),{width:o,height:i,$:r}=Dt(e);let l=(r?tt(n.width):n.width)/o,c=(r?tt(n.height):n.height)/i;return l&&Number.isFinite(l)||(l=1),c&&Number.isFinite(c)||(c=1),{x:l,y:c}}const Jt=z(0);function St(t){const e=T(t);return dt()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:Jt}function N(t,e,n,o){e===void 0&&(e=!1),n===void 0&&(n=!1);const i=t.getBoundingClientRect(),r=mt(t);let l=z(1);e&&(o?M(o)&&(l=X(o)):l=X(t));const c=function(y,h,u){return h===void 0&&(h=!1),!(!u||h&&u!==T(y))&&h}(r,n,o)?St(r):z(0);let a=(i.left+c.x)/l.x,s=(i.top+c.y)/l.y,f=i.width/l.x,d=i.height/l.y;if(r){const y=T(r),h=o&&M(o)?T(o):o;let u=y.frameElement;for(;u&&o&&h!==y;){const p=X(u),m=u.getBoundingClientRect(),v=getComputedStyle(u),x=m.left+(u.clientLeft+parseFloat(v.paddingLeft))*p.x,w=m.top+(u.clientTop+parseFloat(v.paddingTop))*p.y;a*=p.x,s*=p.y,f*=p.x,d*=p.y,a+=x,s+=w,u=T(u).frameElement}}return U({width:f,height:d,x:a,y:s})}function lt(t){return M(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function V(t){var e;return(e=(At(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Ot(t){return N(V(t)).left+lt(t).scrollLeft}function Y(t){if(H(t)==="html")return t;const e=t.assignedSlot||t.parentNode||vt(t)&&t.host||V(t);return vt(e)?e.host:e}function $t(t){const e=Y(t);return rt(e)?t.ownerDocument?t.ownerDocument.body:t.body:O(e)&&K(e)?e:$t(e)}function et(t,e){var n;e===void 0&&(e=[]);const o=$t(t),i=o===((n=t.ownerDocument)==null?void 0:n.body),r=T(o);return i?e.concat(r,r.visualViewport||[],K(o)?o:[]):e.concat(o,et(o))}function wt(t,e,n){let o;if(e==="viewport")o=function(i,r){const l=T(i),c=V(i),a=l.visualViewport;let s=c.clientWidth,f=c.clientHeight,d=0,y=0;if(a){s=a.width,f=a.height;const h=dt();(!h||h&&r==="fixed")&&(d=a.offsetLeft,y=a.offsetTop)}return{width:s,height:f,x:d,y}}(t,n);else if(e==="document")o=function(i){const r=V(i),l=lt(i),c=i.ownerDocument.body,a=q(r.scrollWidth,r.clientWidth,c.scrollWidth,c.clientWidth),s=q(r.scrollHeight,r.clientHeight,c.scrollHeight,c.clientHeight);let f=-l.scrollLeft+Ot(i);const d=-l.scrollTop;return F(c).direction==="rtl"&&(f+=q(r.clientWidth,c.clientWidth)-a),{width:a,height:s,x:f,y:d}}(V(t));else if(M(e))o=function(i,r){const l=N(i,!0,r==="fixed"),c=l.top+i.clientTop,a=l.left+i.clientLeft,s=O(i)?X(i):z(1);return{width:i.clientWidth*s.x,height:i.clientHeight*s.y,x:a*s.x,y:c*s.y}}(e,n);else{const i=St(t);o={...e,x:e.x-i.x,y:e.y-i.y}}return U(o)}function Pt(t,e){const n=Y(t);return!(n===e||!M(n)||rt(n))&&(F(n).position==="fixed"||Pt(n,e))}function Kt(t,e,n){const o=O(e),i=V(e),r=n==="fixed",l=N(t,!0,r,e);let c={scrollLeft:0,scrollTop:0};const a=z(0);if(o||!o&&!r)if((H(e)!=="body"||K(i))&&(c=lt(e)),O(e)){const s=N(e,!0,r,e);a.x=s.x+e.clientLeft,a.y=s.y+e.clientTop}else i&&(a.x=Ot(i));return{x:l.left+c.scrollLeft-a.x,y:l.top+c.scrollTop-a.y,width:l.width,height:l.height}}function xt(t,e){return O(t)&&F(t).position!=="fixed"?e?e(t):t.offsetParent:null}function bt(t,e){const n=T(t);if(!O(t))return n;let o=xt(t,e);for(;o&&Gt(o)&&F(o).position==="static";)o=xt(o,e);return o&&(H(o)==="html"||H(o)==="body"&&F(o).position==="static"&&!ut(o))?n:o||function(i){let r=Y(i);for(;O(r)&&!rt(r);){if(ut(r))return r;r=Y(r)}return null}(t)||n}const Qt={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:n,strategy:o}=t;const i=O(n),r=V(n);if(n===r)return e;let l={scrollLeft:0,scrollTop:0},c=z(1);const a=z(0);if((i||!i&&o!=="fixed")&&((H(n)!=="body"||K(r))&&(l=lt(n)),O(n))){const s=N(n);c=X(n),a.x=s.x+n.clientLeft,a.y=s.y+n.clientTop}return{width:e.width*c.x,height:e.height*c.y,x:e.x*c.x-l.scrollLeft*c.x+a.x,y:e.y*c.y-l.scrollTop*c.y+a.y}},getDocumentElement:V,getClippingRect:function(t){let{element:e,boundary:n,rootBoundary:o,strategy:i}=t;const r=[...n==="clippingAncestors"?function(a,s){const f=s.get(a);if(f)return f;let d=et(a).filter(p=>M(p)&&H(p)!=="body"),y=null;const h=F(a).position==="fixed";let u=h?Y(a):a;for(;M(u)&&!rt(u);){const p=F(u),m=ut(u);m||p.position!=="fixed"||(y=null),(h?!m&&!y:!m&&p.position==="static"&&y&&["absolute","fixed"].includes(y.position)||K(u)&&!m&&Pt(a,u))?d=d.filter(v=>v!==u):y=p,u=Y(u)}return s.set(a,d),d}(e,this._c):[].concat(n),o],l=r[0],c=r.reduce((a,s)=>{const f=wt(e,s,i);return a.top=q(f.top,a.top),a.right=ft(f.right,a.right),a.bottom=ft(f.bottom,a.bottom),a.left=q(f.left,a.left),a},wt(e,l,i));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}},getOffsetParent:bt,getElementRects:async function(t){let{reference:e,floating:n,strategy:o}=t;const i=this.getOffsetParent||bt,r=this.getDimensions;return{reference:Kt(e,await i(n),o),floating:{x:0,y:0,...await r(n)}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){return Dt(t)},getScale:X,isElement:M,isRTL:function(t){return getComputedStyle(t).direction==="rtl"}};function oe(t,e,n,o){o===void 0&&(o={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:l=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:a=!1}=o,s=mt(t),f=i||r?[...s?et(s):[],...et(e)]:[];f.forEach(m=>{i&&m.addEventListener("scroll",n,{passive:!0}),r&&m.addEventListener("resize",n)});const d=s&&c?function(m,v){let x,w=null;const R=V(m);function b(){clearTimeout(x),w&&w.disconnect(),w=null}return function $(g,P){g===void 0&&(g=!1),P===void 0&&(P=1),b();const{left:W,top:j,width:E,height:A}=m.getBoundingClientRect();if(g||v(),!E||!A)return;const C={rootMargin:-Q(j)+"px "+-Q(R.clientWidth-(W+E))+"px "+-Q(R.clientHeight-(j+A))+"px "+-Q(W)+"px",threshold:q(0,ft(1,P))||1};let S=!0;function D(L){const k=L[0].intersectionRatio;if(k!==P){if(!S)return $();k?$(!1,k):x=setTimeout(()=>{$(!1,1e-7)},100)}S=!1}try{w=new IntersectionObserver(D,{...C,root:R.ownerDocument})}catch{w=new IntersectionObserver(D,C)}w.observe(m)}(!0),b}(s,n):null;let y,h=-1,u=null;l&&(u=new ResizeObserver(m=>{let[v]=m;v&&v.target===s&&u&&(u.unobserve(e),cancelAnimationFrame(h),h=requestAnimationFrame(()=>{u&&u.observe(e)})),n()}),s&&!a&&u.observe(s),u.observe(e));let p=a?N(t):null;return a&&function m(){const v=N(t);!p||v.x===p.x&&v.y===p.y&&v.width===p.width&&v.height===p.height||n(),p=v,y=requestAnimationFrame(m)}(),n(),()=>{f.forEach(m=>{i&&m.removeEventListener("scroll",n),r&&m.removeEventListener("resize",n)}),d&&d(),u&&u.disconnect(),u=null,a&&cancelAnimationFrame(y)}}const Ut=(t,e,n)=>{const o=new Map,i={platform:Qt,...n},r={...i.platform,_c:o};return Ht(t,e,{...i,platform:r})};function Rt(t){var e;return(e=t==null?void 0:t.$el)!=null?e:t}function Ct(t){return typeof window>"u"?1:(t.ownerDocument.defaultView||window).devicePixelRatio||1}function Et(t,e){const n=Ct(t);return Math.round(e*n)/n}function ie(t,e,n){n===void 0&&(n={});const o=n.whileElementsMounted,i=B(()=>{var g;return(g=J(n.open))!=null?g:!0}),r=B(()=>J(n.middleware)),l=B(()=>{var g;return(g=J(n.placement))!=null?g:"bottom"}),c=B(()=>{var g;return(g=J(n.strategy))!=null?g:"absolute"}),a=B(()=>{var g;return(g=J(n.transform))!=null?g:!0}),s=B(()=>Rt(t.value)),f=B(()=>Rt(e.value)),d=G(0),y=G(0),h=G(c.value),u=G(l.value),p=Vt({}),m=G(!1),v=B(()=>{const g={position:h.value,left:"0",top:"0"};if(!f.value)return g;const P=Et(f.value,d.value),W=Et(f.value,y.value);return a.value?{...g,transform:"translate("+P+"px, "+W+"px)",...Ct(f.value)>=1.5&&{willChange:"transform"}}:{position:h.value,left:P+"px",top:W+"px"}});let x;function w(){s.value==null||f.value==null||Ut(s.value,f.value,{middleware:r.value,placement:l.value,strategy:c.value}).then(g=>{d.value=g.x,y.value=g.y,h.value=g.strategy,u.value=g.placement,p.value=g.middlewareData,m.value=!0})}function R(){typeof x=="function"&&(x(),x=void 0)}function b(){if(R(),o===void 0){w();return}if(s.value!=null&&f.value!=null){x=o(s.value,f.value,w);return}}function $(){i.value||(m.value=!1)}return at([r,l,c],w,{flush:"sync"}),at([s,f],b,{flush:"sync"}),at(i,$,{flush:"sync"}),Wt()&&Bt(R),{x:I(d),y:I(y),strategy:I(h),placement:I(u),middlewareData:I(p),isPositioned:I(m),floatingStyles:v,update:w}}export{te as A,ee as L,ne as O,oe as a,ie as u};
