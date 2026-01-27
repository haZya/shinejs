import{useCallback as C,useEffect as H,useState as A}from"react";var d=class{r;g;b;constructor(t=0,e=0,i=0){this.r=t,this.g=e,this.b=i}};var u=class{numSteps=5;opacity=.15;opacityPow=1.2;offset=.15;offsetPow=1.8;blur=40;blurPow=1;shadowRGB=new d(0,0,0);constructor(t){t&&this.applyValues(t)}applyValues(t){t&&(t.numSteps!==void 0&&(this.numSteps=t.numSteps),t.opacity!==void 0&&(this.opacity=t.opacity),t.opacityPow!==void 0&&(this.opacityPow=t.opacityPow),t.offset!==void 0&&(this.offset=t.offset),t.offsetPow!==void 0&&(this.offsetPow=t.offsetPow),t.blur!==void 0&&(this.blur=t.blur),t.blurPow!==void 0&&(this.blurPow=t.blurPow),t.shadowRGB!==void 0&&(this.shadowRGB=t.shadowRGB))}};var p=class o{x;y;constructor(t=0,e=0){this.x=t,this.y=e}delta(t){return new o(t.x-this.x,t.y-this.y)}};var c=class{position;intensity;constructor(t){this.position=t||new p(0,0),this.intensity=1}};var w=class{position=new p(0,0);domElement;shadowProperty="textShadow";constructor(t){this.domElement=t,this.recalculatePosition()}draw(t,e){let i=this.position.delta(t.position),s=Math.sqrt(i.x*i.x+i.y*i.y);s=Math.max(32,s);let r=[];for(let n=0;n<e.numSteps;n++){let l=n/e.numSteps,h=l**e.opacityPow,a=l**e.offsetPow,f=l**e.blurPow,M=t.intensity*Math.max(0,e.opacity*(1-h)),P=-e.offset*i.x*a,v=-e.offset*i.y*a,T=s*e.blur*f/512,L=this.getShadow(e.shadowRGB,M,P,v,T);r.push(L)}this.drawShadows(r)}getShadow(t,e,i,s,r){return`${`rgba(${t.r}, ${t.g}, ${t.b}, ${e})`} ${i}px ${s}px ${Math.round(r)}px`}drawShadows(t){this.domElement.style[this.shadowProperty]=t.join(", ")}recalculatePosition(){if(!this.domElement)return;let t=this.domElement.getBoundingClientRect();this.position.x=t.left+t.width*.5,this.position.y=t.top+t.height*.5}};var b=class{subscribers=new Set;handleMouseMove=t=>{this.subscribers.forEach(e=>e(t.clientX,t.clientY))};subscribe(t){return this.subscribers.size===0&&window.addEventListener("mousemove",this.handleMouseMove),this.subscribers.add(t),()=>{this.subscribers.delete(t),this.subscribers.size===0&&window.removeEventListener("mousemove",this.handleMouseMove)}}},x=new b;var g=class{domElement;classPrefix;wrapperElement;maskElement;wordElements=[];elements=[];text="";originalHTML;constructor(t,e=""){this.domElement=t,this.classPrefix=e,this.wrapperElement=document.createElement("div"),this.maskElement=document.createElement("div"),this.originalHTML=t.innerHTML}destroy(){this.domElement&&(this.domElement.innerHTML=this.originalHTML)}split(t,e){this.text=t||this.domElement.textContent||"",this.wordElements=[],this.elements=[],this.wrapperElement.className=`${this.classPrefix}wrapper`,this.wrapperElement.innerHTML="",t&&(this.domElement.textContent=this.text,this.originalHTML=this.domElement.innerHTML),e?this.splitChildren():this.splitText()}splitChildren(){Array.from(this.domElement.childNodes).forEach(e=>{if(e.nodeType!==1)return;let i=e;i.className+=` ${this.classPrefix}letter`,this.wrapperElement.appendChild(i),this.elements.push(i)}),this.finalizeSplit()}splitText(){let t=this.domElement.textContent||"",e=t.length,i=null;for(let s=0;s<e;s++){let r=t.charAt(s);if(i||(i=document.createElement("span"),i.className=`${this.classPrefix}word`,this.wrapperElement.appendChild(i),this.wordElements.push(i)),r.match(/\s/)){let l=document.createElement("span");l.className=`${this.classPrefix}spacer`,l.innerHTML=r,this.wrapperElement.appendChild(l),i=null;continue}let n=document.createElement("span");n.innerHTML=r,n.className=`${this.classPrefix}letter`,this.elements.push(n),i.appendChild(n),r.match(/\W/)&&(i=null)}this.finalizeSplit()}finalizeSplit(){this.maskElement.innerHTML=this.wrapperElement.innerHTML,this.maskElement.className=`${this.classPrefix}mask`,this.wrapperElement.appendChild(this.maskElement),this.domElement.innerHTML="",this.domElement.appendChild(this.wrapperElement)}};var y=class o{injections={};static instance=null;constructor(){}static getInstance(){return o.instance||(o.instance=new o),o.instance}inject(t,e=window.document){if(this.injections[t]===e)return;let i=document.createElement("style");i.type="text/css",i.innerHTML=t;let s=e.getElementsByTagName("head")[0];if(s){let r=s.firstChild;s.insertBefore(i,r)}return this.injections[t]=e,i}};function E(o,t=0,e){let i;return function(...s){let r=e||this;i!==void 0&&clearTimeout(i),i=window.setTimeout(()=>{o.apply(r,s)},t)}}var m=class{light=new c;config;domElement;classPrefix="shine-";shadowProperty;shadows=[];splitter;areAutoUpdatesEnabled=!0;rafId=null;handleAutoUpdate;unsubscribeMouseMonitor=null;constructor(t,e,i,s){if(!t)throw new Error("No valid DOM element passed as the first parameter");this.domElement=t,this.config=new u(e),this.classPrefix=i||"shine-",this.shadowProperty=s||(this.elementHasTextOnly(t)?"textShadow":"boxShadow"),this.splitter=new g(t,this.classPrefix),this.handleAutoUpdate=E(()=>{this.recalculatePositions(),this.draw()},1e3/15),this.updateContent()}destroy(){this.disableAutoUpdates(),this.disableMouseTracking(),this.shadows=[],this.splitter&&(this.splitter.destroy(),this.splitter=null),this.handleAutoUpdate=null,this.light=null,this.config=null,this.domElement=null}draw(){!this.light||!this.config||!this.shadows.length||(this.rafId&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(()=>{this.shadows.forEach(t=>t.draw(this.light,this.config)),this.rafId=null}))}recalculatePositions(){this.shadows.forEach(t=>t.recalculatePosition())}updateContent(t){let e=this.areAutoUpdatesEnabled;this.disableAutoUpdates(),y.getInstance().inject(this.getCSS()),this.shadows=[],this.splitter.split(t,!t&&!this.elementHasTextOnly(this.domElement)),this.splitter.elements.forEach(i=>{let s=new w(i);s.shadowProperty=this.shadowProperty,this.shadows.push(s)}),e&&this.enableAutoUpdates(),this.recalculatePositions(),this.draw()}enableAutoUpdates(){this.disableAutoUpdates(),this.areAutoUpdatesEnabled=!0,window.addEventListener("scroll",this.handleAutoUpdate,!1),window.addEventListener("resize",this.handleAutoUpdate,!1)}disableAutoUpdates(){this.areAutoUpdatesEnabled=!1,this.handleAutoUpdate&&(window.removeEventListener("scroll",this.handleAutoUpdate,!1),window.removeEventListener("resize",this.handleAutoUpdate,!1))}enableMouseTracking(){this.unsubscribeMouseMonitor||(this.unsubscribeMouseMonitor=x.subscribe((t,e)=>{this.light&&(this.light.position.x=t,this.light.position.y=e,this.draw())}))}disableMouseTracking(){this.unsubscribeMouseMonitor&&(this.unsubscribeMouseMonitor(),this.unsubscribeMouseMonitor=null)}getCSS(){return`
      .${this.classPrefix}wrapper {
        display: inherit;
        flex-direction: inherit;
        flex-wrap: inherit;
        align-items: inherit;
        justify-content: inherit;
        align-content: inherit;
        gap: inherit;
        column-gap: inherit;
        row-gap: inherit;
        grid-template-columns: inherit;
        grid-template-rows: inherit;
        grid-template-areas: inherit;
        grid-auto-columns: inherit;
        grid-auto-rows: inherit;
        grid-auto-flow: inherit;
        justify-items: inherit;
        place-items: inherit;
        place-content: inherit;
        position: relative;
        width: 100%;
        height: 100%;
        grid-column: 1 / -1;
        grid-row: 1 / -1;
      }
      .${this.classPrefix}word {
        display: inline-block;
        white-space: nowrap;
      }
      .${this.classPrefix}letter {
        position: relative;
        display: inline-block;
      }
      .${this.classPrefix}mask {
        display: inherit;
        flex-direction: inherit;
        flex-wrap: inherit;
        align-items: inherit;
        justify-content: inherit;
        align-content: inherit;
        gap: inherit;
        column-gap: inherit;
        row-gap: inherit;
        grid-template-columns: inherit;
        grid-template-rows: inherit;
        grid-template-areas: inherit;
        grid-auto-columns: inherit;
        grid-auto-rows: inherit;
        grid-auto-flow: inherit;
        justify-items: inherit;
        place-items: inherit;
        place-content: inherit;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
    `}elementHasTextOnly(t){if(!t.childNodes||t.childNodes.length===0)return!0;for(let e=0;e<t.childNodes.length;e++)if(t.childNodes[e].nodeType!==3)return!1;return!0}};function S(o,t){let[e,i]=A(null),s=t?JSON.stringify(t):"{}";H(()=>{if(o.current){let{lightPosition:n="followMouse",lightIntensity:l,...h}=JSON.parse(s),a=new m(o.current,h);return l!==void 0&&(a.light.intensity=l),i(a),n==="followMouse"?a.enableMouseTracking():(typeof n=="object"&&n.x!==void 0&&n.y!==void 0&&(a.light.position.x=n.x,a.light.position.y=n.y),a.draw()),()=>{a.destroy()}}},[o,s]);let r=C(n=>{if(!e)return;let l=!1;if(n.content&&e.updateContent(n.content),n.light&&(n.light.position==="followMouse"?e.enableMouseTracking():n.light.position&&(e.disableMouseTracking(),e.light.position.x=n.light.position.x,e.light.position.y=n.light.position.y,l=!0),typeof n.light.intensity=="number"&&(e.light.intensity=n.light.intensity,l=!0)),n.config){let{shadowRGB:h,...a}=n.config,f={...a};h&&(f.shadowRGB=new d(h.r,h.g,h.b)),e.config.applyValues(f),l=!0}l&&e.draw()},[e]);return{shine:e,update:r}}var it=S;export{d as Color,c as Light,p as Point,m as Shine,u as ShineConfig,it as useShine};
