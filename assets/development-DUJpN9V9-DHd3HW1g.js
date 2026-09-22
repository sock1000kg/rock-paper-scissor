import{t as e}from"./index-ByZ7pB9l.js";function t(e){return e===null?!0:typeof e==`number`?Number.isFinite(e):typeof e==`string`||typeof e==`boolean`}function n(e){return JSON.stringify(e)}function r(e){let n=e.trim();if(!n)return{ok:!1,error:`Enter a JSON string, number, boolean, or null.`};let r;try{r=JSON.parse(n)}catch{return{ok:!1,error:`Enter a valid JSON string, number, boolean, or null.`}}return t(r)?{ok:!0,value:r}:{ok:!1,error:`Only primitive values can be edited inline.`}}function i(e,n,r){if(n.length===0)return{ok:!1,error:`Choose a value inside the state tree.`};let i=a(e,n);return i.exists?t(i.value)?{ok:!0,data:s(e,n,r)}:{ok:!1,error:`Only primitive values can be edited inline.`}:{ok:!1,error:`State path does not exist.`}}function a(e,t){let n=e;for(let e of t){if(!o(n,e))return{exists:!1};n=n[e]}return{exists:!0,value:n}}function o(e,t){return Array.isArray(e)?typeof t==`number`&&Number.isInteger(t)&&t>=0&&t<e.length:typeof e!=`object`||!e?!1:Object.prototype.hasOwnProperty.call(e,String(t))}function s(e,t,n){let[r,...i]=t;if(r===void 0)return n;let a=Array.isArray(e)?[...e]:{...e};return a[r]=s(e[r],i,n),a}var c=null,l=null,u=null,d=new Map,f=null,p=null,m=null,h=null,g=`.ph-inspect-highlight, .ph-inspect-highlight-hover, .ph-inspect-selected`,_=[`ph-inspect-highlight`,`ph-inspect-highlight-hover`,`ph-inspect-selected`];function ee(){for(let e of d.values())e.unsubscribe();d.clear()}function te(){document.querySelectorAll(g).forEach(e=>{e.classList.remove(..._)}),document.querySelectorAll(`.ph-inspect-label`).forEach(e=>{e.remove()})}function ne(e){document.querySelectorAll(`.ph-inspect-highlight-hover`).forEach(e=>{e.classList.remove(`ph-inspect-highlight-hover`)}),e||document.querySelectorAll(`.ph-inspect-highlight`).forEach(e=>{e.classList.remove(`ph-inspect-highlight`)})}var re=`data:image/png;base64,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`,ie={inspect:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>`,minimize:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="6" y1="12" x2="18" y2="12"/></svg>`},ae={"can-move":`#4a9a8a`,"can-spin":`#5b8db8`,"can-toggle":`#c4724e`,"can-grow":`#d4b85c`,"can-duplicate":`#8a6abf`,"can-mirror":`#4a9a8a`,"can-play":`#3d3833`,"can-hover":`#5b8db8`},oe=`#8a8279`,se=`
#playhtml-dev-root {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100000;
  font-family: 'Atkinson Hyperlegible', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12px;
  line-height: 1.4;
  color: #3d3833;
  pointer-events: none;
}
#playhtml-dev-root * {
  box-sizing: border-box;
}
.ph-trigger {
  pointer-events: auto;
  position: fixed;
  bottom: 16px;
  right: 0;
  width: 120px;
  height: 48px;
  background: linear-gradient(135deg, #f0e9dd 0%, #e8e0d4 40%, #d8d0c4 100%);
  border: 3px solid;
  border-color: #f5f0e8 #7a7269 #6b6560 #ede6da;
  border-right: none;
  padding: 4px 6px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  z-index: 100000;
  box-shadow: -2px 0 4px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08), 0 -2px 6px rgba(0,0,0,0.1);
}
.ph-trigger:hover {
  background: linear-gradient(135deg, #f8f2e8 0%, #f0e9dd 40%, #e0d8cc 100%);
  box-shadow: -2px 0 6px rgba(0,0,0,0.16), 0 2px 6px rgba(0,0,0,0.12), 0 -3px 8px rgba(0,0,0,0.14);
}
.ph-trigger img {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  filter: drop-shadow(0 0 4px #5b8db8);
}
.ph-trigger-grip {
  display: flex;
  flex-direction: row;
  gap: 3px;
  align-items: center;
  flex: 1;
  justify-content: center;
}
.ph-trigger-grip span {
  display: block;
  width: 2px;
  height: 16px;
  background: linear-gradient(180deg, #f5f0e8 0%, #8a8279 50%, #6b6560 100%);
}
.ph-bar {
  pointer-events: auto;
  display: none;
  flex-direction: row;
  background: #e8e0d4;
  border-left: 3px solid #3d3833;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
}
.ph-bar.ph-open {
  display: flex;
}
.ph-bar-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}
.ph-bar-main {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.ph-toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: linear-gradient(180deg, #ede6da 0%, #d4cfc7 100%);
  border-bottom: 1px solid #8a8279;
  flex-shrink: 0;
}
.ph-toolbar .ph-logo-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}
.ph-toolbar .ph-logo-btn img {
  width: 22px;
  height: 22px;
  filter: drop-shadow(0 0 4px #5b8db8);
}
.ph-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: #e8e0d4;
  border: 2px solid;
  border-color: #f5f0e8 #8a8279 #8a8279 #f5f0e8;
  cursor: pointer;
  color: #3d3833;
  padding: 0;
}
.ph-btn:hover {
  background: #f5f0e8;
}
.ph-btn.ph-active {
  border-color: #8a8279 #f5f0e8 #f5f0e8 #8a8279;
  background: #d4cfc7;
}
.ph-btn svg {
  width: 16px;
  height: 16px;
}
.ph-data {
  flex: 1;
  padding: 6px 10px;
  overflow-y: auto;
  background: #f5f0e8;
  font-size: 12px;
}
.ph-data::-webkit-scrollbar {
  width: 4px;
}
.ph-data::-webkit-scrollbar-thumb {
  background: #d4cfc7;
}
.ph-reset-btn {
  font-family: 'Atkinson Hyperlegible', sans-serif;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #c4724e;
  cursor: pointer;
  background: #e8e0d4;
  border: 2px solid;
  border-color: #f5f0e8 #8a8279 #8a8279 #f5f0e8;
  padding: 2px 8px;
}
.ph-reset-btn:hover {
  background: #f5f0e8;
}
.ph-reset-btn:active {
  border-color: #8a8279 #f5f0e8 #f5f0e8 #8a8279;
  background: #d4cfc7;
}
.ph-tree-item {
  padding: 3px 0 3px 14px;
  border-left: 1px solid #d4cfc7;
  font-family: 'Martian Mono', 'SF Mono', monospace;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}
.ph-tree-item:hover {
  background: #faf7f2;
}
.ph-tree-toggle {
  color: #8a8279;
  font-size: 10px;
  width: 10px;
  flex-shrink: 0;
  text-align: center;
  user-select: none;
}
.ph-tree-key {
  color: #4a9a8a;
}
.ph-tree-value {
  color: #c4724e;
}
.ph-tree-badge {
  font-family: 'Atkinson Hyperlegible', sans-serif;
  font-size: 9px;
  padding: 1px 5px;
  font-weight: 700;
  text-transform: uppercase;
  color: #faf7f2;
  letter-spacing: 0.3px;
  flex-shrink: 0;
}
.ph-tree-el-name {
  font-family: 'Atkinson Hyperlegible', sans-serif;
  font-size: 12px;
}
.ph-tree-reset {
  font-family: 'Atkinson Hyperlegible', sans-serif;
  font-size: 10px;
  color: #c4724e;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s;
  background: none;
  border: none;
  padding: 0;
  margin-left: 4px;
}
.ph-tree-item:hover > .ph-tree-reset {
  opacity: 1;
}
.ph-tree-children {
  display: none;
  margin-left: 14px;
  padding-left: 6px;
  border-left: 1px solid #d4cfc7;
}
.ph-tree-children.ph-expanded {
  display: block;
}
.ph-tree-child {
  padding: 2px 0 2px 28px;
  font-family: 'Martian Mono', 'SF Mono', monospace;
  font-size: 11px;
  border-left: 1px solid #d4cfc7;
  margin-left: 14px;
}
.ph-resize-handle {
  width: 6px;
  cursor: ew-resize;
  background: #d4cfc7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-right: 1px solid #8a8279;
}
.ph-resize-handle::after {
  content: '';
  width: 2px;
  height: 40px;
  background: #8a8279;
  opacity: 0.5;
}
.ph-status {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 10px;
  background: #d4cfc7;
  border-bottom: 1px solid #8a8279;
  font-family: 'Martian Mono', 'SF Mono', monospace;
  font-size: 11px;
  color: #6b6560;
  flex-shrink: 0;
}
.ph-status-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.ph-status .ph-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ph-status .ph-dot.ph-connected {
  background: #4a9a8a;
}
.ph-status .ph-dot.ph-disconnected {
  background: #c4724e;
}
.ph-status .ph-sep {
  color: #b0a99e;
}
.ph-minimize-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 20px;
  background: #e8e0d4;
  border: 2px solid;
  border-color: #f5f0e8 #8a8279 #8a8279 #f5f0e8;
  cursor: pointer;
  color: #3d3833;
  padding: 0;
  margin-left: auto;
}
.ph-minimize-btn:hover {
  background: #f5f0e8;
}
.ph-minimize-btn:active {
  border-color: #8a8279 #f5f0e8 #f5f0e8 #8a8279;
  background: #d4cfc7;
}
.ph-minimize-btn svg {
  width: 12px;
  height: 12px;
}
.ph-status-field {
  position: relative;
  border: 1px solid #8a8279;
  padding: 2px 8px 2px 8px;
  margin: -2px 0;
  display: inline-flex;
  align-items: center;
}
.ph-status-field-label {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  background: #d4cfc7;
  padding: 0 4px;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 700;
  color: #4a9a8a;
  line-height: 1;
  white-space: nowrap;
}
.ph-json-string { color: #c4724e; }
.ph-json-number { color: #5b8db8; }
.ph-json-boolean { color: #d4b85c; }
.ph-json-null { color: #8a8279; font-style: italic; }
.ph-json-bracket { color: #8a8279; }
.ph-json-count { color: #8a8279; font-size: 10px; margin: 0 2px; }
.ph-json-leaf-value {
  border: 1px solid transparent;
  background: transparent;
  padding: 0 2px;
  margin: 0;
  font: inherit;
  cursor: text;
}
.ph-json-leaf-value:hover,
.ph-json-leaf-value:focus {
  background: #faf7f2;
  border-color: #d4cfc7;
  outline: none;
}
.ph-json-leaf-value:disabled {
  cursor: default;
}
.ph-json-edit-wrap {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.ph-json-edit-input {
  width: 12ch;
  min-width: 6ch;
  max-width: 24ch;
  border: 1px solid #4a9a8a;
  background: #faf7f2;
  color: #3d3833;
  font: inherit;
  padding: 1px 3px;
}
.ph-json-edit-error {
  color: #c4724e;
  font-family: 'Atkinson Hyperlegible', sans-serif;
  font-size: 10px;
}
.ph-json-row {
  padding: 2px 0 2px 4px;
  font-family: 'Martian Mono', 'SF Mono', monospace;
  font-size: 11px;
}
.ph-json-expandable {
  cursor: pointer;
  user-select: none;
}
.ph-json-expandable:hover {
  background: #faf7f2;
}
.ph-json-toggle {
  color: #8a8279;
  font-size: 8px;
  margin-right: 4px;
  display: inline-block;
  width: 10px;
}
.ph-json-nested {
  display: block;
  margin-left: 14px;
  padding-left: 6px;
  border-left: 1px solid #d4cfc7;
}
.ph-json-nested.ph-collapsed {
  display: none;
}
.ph-search-bar {
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
  align-items: center;
}
.ph-search-input {
  width: 180px;
  padding: 3px 8px;
  font-family: 'Martian Mono', 'SF Mono', monospace;
  font-size: 11px;
  color: #3d3833;
  background: #faf7f2;
  border: 2px solid;
  border-color: #8a8279 #f5f0e8 #f5f0e8 #8a8279;
  outline: none;
}
.ph-search-input::placeholder {
  color: #b0a99e;
}
.ph-search-input:focus {
  border-color: #4a9a8a #d4cfc7 #d4cfc7 #4a9a8a;
}
.ph-tag-filter {
  padding: 3px 6px;
  font-family: 'Atkinson Hyperlegible', sans-serif;
  font-size: 11px;
  color: #3d3833;
  background: #e8e0d4;
  border: 2px solid;
  border-color: #f5f0e8 #8a8279 #8a8279 #f5f0e8;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  padding-right: 18px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238a8279'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 5px center;
}
.ph-tag-filter:hover {
  background-color: #f5f0e8;
}
.ph-empty {
  text-align: center;
  padding: 20px;
  color: #8a8279;
  font-size: 12px;
  font-family: 'Atkinson Hyperlegible', sans-serif;
}
.ph-duplicate-warning {
  margin: 0 0 8px 0;
  padding: 8px 10px;
  background: #fff0ec;
  border: 2px solid #c4724e;
  box-shadow: inset 3px 0 0 #c4724e;
  color: #3d3833;
}
.ph-duplicate-warning-title {
  font-family: 'Atkinson Hyperlegible', sans-serif;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #9f3f2a;
}
.ph-duplicate-warning-message {
  margin-top: 3px;
  font-size: 11px;
  color: #6b352b;
}
.ph-duplicate-warning-list {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-family: 'Martian Mono', 'SF Mono', monospace;
  font-size: 11px;
}
.ph-duplicate-warning-item {
  display: flex;
  gap: 6px;
  align-items: center;
}
.ph-inspect-highlight {
  outline: 2px dashed #4a9a8a;
  outline-offset: 2px;
  position: relative;
}
.ph-inspect-highlight-hover {
  outline-color: #c4724e;
  box-shadow: 0 0 0 4px rgba(196, 114, 78, 0.15);
}
.ph-inspect-selected {
  outline: 2px solid #c4724e;
  outline-offset: 2px;
}
.ph-inspect-label {
  position: absolute;
  top: -18px;
  left: 0;
  background: #4a9a8a;
  color: #faf7f2;
  font-family: 'Martian Mono', monospace;
  font-size: 10px;
  padding: 2px 8px;
  pointer-events: none;
  z-index: 99999;
  white-space: nowrap;
}
@keyframes ph-flash {
  0% { outline: 3px solid #d4b85c; outline-offset: 2px; }
  100% { outline: 3px solid transparent; outline-offset: 2px; }
}
.ph-flash {
  animation: ph-flash 0.8s ease-out;
}
.ph-tabs {
  display: flex;
  gap: 0;
  background: linear-gradient(180deg, #ede6da 0%, #d4cfc7 100%);
  border-bottom: 1px solid #8a8279;
  flex-shrink: 0;
}
.ph-tab {
  font-family: 'Atkinson Hyperlegible', sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b6560;
  background: transparent;
  border: none;
  border-right: 1px solid #b0a99e;
  padding: 6px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}
.ph-tab:hover {
  background: #f5f0e8;
  color: #3d3833;
}
.ph-tab.ph-tab-active {
  background: #f5f0e8;
  color: #3d3833;
  box-shadow: inset 0 -2px 0 #4a9a8a;
}
.ph-tab-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 14px;
  padding: 0 4px;
  font-family: 'Martian Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  border-radius: 0;
  color: #faf7f2;
}
.ph-tab-badge.ph-badge-error { background: #c4724e; }
.ph-tab-badge.ph-badge-warn { background: #d4b85c; color: #3d3833; }
.ph-tab-badge.ph-badge-info { background: #5b8db8; }
.ph-console {
  flex: 1;
  overflow-y: auto;
  background: #faf7f2;
  font-family: 'Martian Mono', 'SF Mono', monospace;
  font-size: 11px;
  padding: 4px 0;
}
.ph-console::-webkit-scrollbar { width: 4px; }
.ph-console::-webkit-scrollbar-thumb { background: #d4cfc7; }
.ph-console-row {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 3px 8px;
  border-bottom: 1px solid #ede6da;
  white-space: pre-wrap;
  word-break: break-word;
}
.ph-console-row.ph-log-error { background: rgba(196, 114, 78, 0.08); }
.ph-console-row.ph-log-warn { background: rgba(212, 184, 92, 0.08); }
.ph-console-time {
  color: #b0a99e;
  font-size: 10px;
  flex-shrink: 0;
}
.ph-console-level {
  flex-shrink: 0;
  width: 12px;
  text-align: center;
  font-weight: 700;
}
.ph-console-level.ph-log-error { color: #c4724e; }
.ph-console-level.ph-log-warn { color: #d4b85c; }
.ph-console-level.ph-log-info { color: #5b8db8; }
.ph-console-level.ph-log-log { color: #8a8279; }
.ph-console-msg { flex: 1; min-width: 0; }
.ph-console-empty {
  padding: 20px;
  text-align: center;
  color: #8a8279;
  font-family: 'Atkinson Hyperlegible', sans-serif;
  font-size: 12px;
}
`;function ce(e){let t=[];for(let n of e){let e=new Map;document.querySelectorAll(`[${n}]`).forEach(t=>{if(!(t instanceof HTMLElement)||!t.id)return;let n=e.get(t.id)??[];n.push(t),e.set(t.id,n)}),e.forEach((e,r)=>{e.length<2||t.push({tagType:n,elementId:r,elements:e})})}return t}function v(e,t,n){let r=document.createElement(e);return t&&(r.className=t),n&&Object.entries(n).forEach(([e,t])=>r.setAttribute(e,t)),r}function le(a,o){ue();let s=document.getElementById(`playhtml-dev-root`);s&&s.remove(),ee();let g=document.createElement(`style`);g.textContent=se,document.head.appendChild(g);let _=!1,le=null,y=null,b=v(`div`);b.id=`playhtml-dev-root`,l=b;let x=v(`div`,`ph-trigger`),de=v(`img`,void 0,{src:re,alt:`playhtml`});x.appendChild(de);let fe=v(`div`,`ph-trigger-grip`);for(let e=0;e<4;e++)fe.appendChild(document.createElement(`span`));x.appendChild(fe);let S=v(`div`,`ph-bar`),pe=v(`div`,`ph-resize-handle`),C=v(`div`,`ph-bar-content`),w=v(`div`,`ph-toolbar`),me=v(`div`,`ph-logo-btn`),he=v(`img`,void 0,{src:re,alt:`playhtml`});me.appendChild(he),w.appendChild(me);let T=v(`button`,`ph-btn`);T.innerHTML=ie.inspect,T.title=`Inspect`,T.style.width=`26px`,T.style.height=`22px`,w.appendChild(T);let ge=v(`div`);ge.style.flex=`1`,w.appendChild(ge);let E=v(`button`,`ph-minimize-btn`);E.innerHTML=ie.minimize,E.title=`Minimize`,w.appendChild(E),C.appendChild(w);let _e=v(`div`,`ph-status`),D=v(`div`,`ph-status-row`),ve=v(`span`,`ph-dot ph-connected`);D.appendChild(ve),D.appendChild(document.createTextNode(`connected`));let ye=v(`span`,`ph-sep`);ye.textContent=`·`,D.appendChild(ye);let be=document.createTextNode(``);D.appendChild(be);let xe=v(`span`,`ph-sep`);xe.textContent=`·`,D.appendChild(xe);let Se=document.createTextNode(``);D.appendChild(Se);let O=v(`span`,`ph-sep`);O.textContent=`·`,D.appendChild(O);let k=v(`span`);D.appendChild(k),_e.appendChild(D);let A=v(`div`,`ph-status-row`),j;try{j=decodeURIComponent(a.roomId)}catch{j=a.roomId}let M=v(`span`,`ph-status-field`),Ce=v(`span`,`ph-status-field-label`);Ce.textContent=`room`,M.appendChild(Ce),M.appendChild(document.createTextNode(j)),A.appendChild(M);let we=v(`span`,`ph-sep`);we.textContent=`·`,A.appendChild(we);let N=v(`span`,`ph-status-field`),Te=v(`span`,`ph-status-field-label`);Te.textContent=`host`,N.appendChild(Te),N.appendChild(document.createTextNode(a.host)),A.appendChild(N),_e.appendChild(A);function P(){let e=1;try{let t=a.cursorClient?.getProvider();t&&(e=t.awareness.getStates().size)}catch{}be.textContent=`${e} client${e===1?``:`s`}`;let t=0,n=new Set;o.forEach((e,r)=>{t+=e.size,n.add(r)}),Se.textContent=`${t} element${t===1?``:`s`}`;let r=ce(n).length;O.style.display=r>0?``:`none`,k.style.display=r>0?``:`none`,k.textContent=r>0?`${r} conflict${r===1?``:`s`}`:``}P(),C.appendChild(_e);let Ee=v(`div`,`ph-tabs`),F=v(`button`,`ph-tab ph-tab-active`);F.textContent=`Data`,Ee.appendChild(F);let I=v(`button`,`ph-tab`);I.textContent=`Console`;let L=v(`span`,`ph-tab-badge`);L.style.display=`none`,I.appendChild(L),Ee.appendChild(I),C.appendChild(Ee);let De=v(`div`,`ph-bar-main`),R=v(`div`,`ph-data`),z=v(`div`,`ph-console`);z.style.display=`none`,De.appendChild(R),De.appendChild(z),C.appendChild(De);function Oe(e){U=e,e===`data`?(F.classList.add(`ph-tab-active`),I.classList.remove(`ph-tab-active`),R.style.display=``,z.style.display=`none`,Fe(),P(),Y()):(F.classList.remove(`ph-tab-active`),I.classList.add(`ph-tab-active`),R.style.display=`none`,z.style.display=``,V=0,H=0,je=0,ke(),Ae())}F.addEventListener(`click`,()=>Oe(`data`)),I.addEventListener(`click`,()=>Oe(`console`));function ke(){let e=V+H+je;if(e===0){L.style.display=`none`;return}L.style.display=``,L.textContent=String(e),L.classList.remove(`ph-badge-error`,`ph-badge-warn`,`ph-badge-info`),V>0?L.classList.add(`ph-badge-error`):H>0?L.classList.add(`ph-badge-warn`):L.classList.add(`ph-badge-info`)}function Ae(){if(z.innerHTML=``,B.length===0){let e=v(`div`,`ph-console-empty`);e.textContent=`No console output yet.`,z.appendChild(e);return}for(let e of B){let t=v(`div`,`ph-console-row ph-log-${e.level}`),n=v(`span`,`ph-console-time`);n.textContent=new Date(e.timestamp).toLocaleTimeString([],{hour12:!1});let r=v(`span`,`ph-console-level ph-log-${e.level}`);r.textContent=e.level===`error`?`✕`:e.level===`warn`?`!`:e.level===`info`?`i`:`·`;let i=v(`span`,`ph-console-msg`);i.textContent=e.parts.join(` `)+(e.source?`  @ ${e.source}`:``),t.appendChild(n),t.appendChild(r),t.appendChild(i),z.appendChild(t)}z.scrollTop=z.scrollHeight}let B=[],V=0,H=0,je=0,U=`data`,Me=!1,Ne=!1;function Pe(){Ne||(Ne=!0,queueMicrotask(()=>{Ne=!1,l===b&&S.classList.contains(`ph-open`)&&U===`data`&&(P(),Y())}))}function Fe(){let e=new Set;o.forEach((t,n)=>{t.forEach((t,r)=>{let i=`${n}:${r}`;e.add(i);let a=d.get(i);a?.handler!==t&&(a?.unsubscribe(),d.delete(i),typeof t.onDataUpdate==`function`&&d.set(i,{handler:t,unsubscribe:t.onDataUpdate(Pe)}))})});for(let[t,n]of d)e.has(t)||(n.unsubscribe(),d.delete(t))}function Ie(e){if(e instanceof Error)return e.stack||`${e.name}: ${e.message}`;if(typeof e==`string`)return e;if(e===null)return`null`;if(e===void 0)return`undefined`;try{return JSON.stringify(e)}catch{return String(e)}}function Le(e){B.push(e),B.length>500&&B.shift(),(U!==`console`||!S.classList.contains(`ph-open`))&&(e.level===`error`?V+=1:e.level===`warn`?H+=1:je+=1),e.level===`error`&&!Me&&S.classList.contains(`ph-open`)&&(Me=!0,Oe(`console`)),ke(),U===`console`&&Ae()}f||={log:console.log.bind(console),info:console.info.bind(console),warn:console.warn.bind(console),error:console.error.bind(console)};let Re=f;[`log`,`info`,`warn`,`error`].forEach(e=>{console[e]=(...t)=>{Re[e](...t),Le({level:e,timestamp:Date.now(),parts:t.map(Ie)})}}),p&&window.removeEventListener(`error`,p),m&&window.removeEventListener(`unhandledrejection`,m),p=e=>{Le({level:`error`,timestamp:Date.now(),parts:[e.message||String(e.error)],source:e.filename?`${e.filename}:${e.lineno}:${e.colno}`:void 0})},m=e=>{Le({level:`error`,timestamp:Date.now(),parts:[`Unhandled Promise rejection: `+Ie(e.reason)]})},window.addEventListener(`error`,p),window.addEventListener(`unhandledrejection`,m),S.appendChild(pe),S.appendChild(C),b.appendChild(x),b.appendChild(S),document.body.appendChild(b);function W(e,t){if(t===void 0)return;let n=v(`span`,`ph-tree-key`);n.textContent=t+`: `,e.appendChild(n)}function G(e,t,n,r,i,a,o){let s=v(`div`,`ph-json-row`);W(s,a);let c=v(`button`,`${r} ph-json-leaf-value`);if(c.type=`button`,c.textContent=i,i.endsWith(`..."`)&&(c.title=String(t)),s.appendChild(c),!o){c.disabled=!0,e.appendChild(s);return}c.onclick=e=>{e.stopPropagation(),c.replaceWith(ze(t,n,r,o))},e.appendChild(s)}function ze(e,t,i,a){let o=v(`span`,`ph-json-edit-wrap`),s=v(`input`,`ph-json-edit-input`),c=v(`span`,`ph-json-edit-error`);s.value=n(e),s.setAttribute(`aria-label`,`Edit state value`),o.appendChild(s);function l(){let n=v(`button`,`${i} ph-json-leaf-value`);n.type=`button`,n.textContent=typeof e==`string`?e.length>80?`"${e.substring(0,80)}..."`:`"${e}"`:String(e),n.onclick=r=>{r.stopPropagation(),n.replaceWith(ze(e,t,i,a))},o.replaceWith(n)}function u(e){c.textContent=e,c.parentElement||o.appendChild(c)}function d(){let e=r(s.value);if(!e.ok){u(e.error);return}let n=a(t,e.value);if(!n.ok){u(n.error);return}requestAnimationFrame(()=>Y())}return s.onclick=e=>e.stopPropagation(),s.onkeydown=e=>{e.key===`Enter`?(e.preventDefault(),d()):e.key===`Escape`&&(e.preventDefault(),l())},requestAnimationFrame(()=>{s.focus(),s.select()}),o}function K(e,n,r,i,a,o){if(n===null){G(e,n,i,`ph-json-null`,`null`,a,o);return}if(n===void 0){let t=v(`div`,`ph-json-row`);W(t,a);let n=v(`span`,`ph-json-null`);n.textContent=`undefined`,t.appendChild(n),e.appendChild(t);return}if(typeof n==`string`){G(e,n,i,`ph-json-string`,n.length>80?`"${n.substring(0,80)}..."`:`"${n}"`,a,o);return}if(typeof n==`number`){if(!t(n)){let t=v(`div`,`ph-json-row`);W(t,a);let r=v(`span`,`ph-json-number`);r.textContent=String(n),t.appendChild(r),e.appendChild(t);return}G(e,n,i,`ph-json-number`,String(n),a,o);return}if(typeof n==`boolean`){G(e,n,i,`ph-json-boolean`,String(n),a,o);return}if(Array.isArray(n)){let t=v(`div`,`ph-json-row ph-json-expandable`),s=v(`span`,`ph-json-toggle`),c=v(`div`,`ph-json-nested`),l=n.length<=5&&r<=2;s.textContent=l?`▼`:`▶`,l||c.classList.add(`ph-collapsed`),a!==void 0&&W(t,a),t.appendChild(s);let u=v(`span`,`ph-json-bracket`);u.textContent=`[`,t.appendChild(u);let d=v(`span`,`ph-json-count`);d.textContent=String(n.length),t.appendChild(d);let f=v(`span`,`ph-json-bracket`);f.textContent=`]`,t.appendChild(f),t.onclick=e=>{e.stopPropagation();let t=c.classList.toggle(`ph-collapsed`);s.textContent=t?`▶`:`▼`};for(let e=0;e<n.length;e++)K(c,n[e],r+1,[...i,e],String(e),o);e.appendChild(t),e.appendChild(c);return}if(typeof n==`object`){let t=Object.keys(n),s=v(`div`,`ph-json-row ph-json-expandable`),c=v(`span`,`ph-json-toggle`),l=v(`div`,`ph-json-nested`),u=t.length<=5&&r<=2;c.textContent=u?`▼`:`▶`,u||l.classList.add(`ph-collapsed`),a!==void 0&&W(s,a),s.appendChild(c);let d=v(`span`,`ph-json-bracket`);d.textContent=`{`,s.appendChild(d);let f=v(`span`,`ph-json-count`);f.textContent=String(t.length),s.appendChild(f);let p=v(`span`,`ph-json-bracket`);p.textContent=`}`,s.appendChild(p),s.onclick=e=>{e.stopPropagation();let t=l.classList.toggle(`ph-collapsed`);c.textContent=t?`▶`:`▼`};for(let e of t)K(l,n[e],r+1,[...i,e],e,o);e.appendChild(s),e.appendChild(l);return}let s=v(`div`,`ph-json-row`);W(s,a),s.appendChild(document.createTextNode(String(n))),e.appendChild(s)}function Be(e,t,n,r){if(t==null){let n=v(`span`,`ph-json-null`);n.textContent=String(t),e.appendChild(n)}else if(typeof t==`object`&&!Array.isArray(t))for(let[i,a]of Object.entries(t))K(e,a,n,[i],i,r);else K(e,t,n,[],void 0,r)}let q=``,J=``;function Y(){ne(_),R.innerHTML=``;let t=v(`div`,`ph-search-bar`),n=v(`input`,`ph-search-input`);n.type=`text`,n.placeholder=`Search by element ID...`,n.value=q;let r;n.oninput=()=>{q=n.value,clearTimeout(r),r=setTimeout(()=>Y(),150)},t.appendChild(n);let a=new Set;o.forEach((e,t)=>a.add(t));let s=ce(a);if(a.size>1){let e=v(`select`,`ph-tag-filter`),n=document.createElement(`option`);n.value=``,n.textContent=`All types`,e.appendChild(n),a.forEach(t=>{let n=document.createElement(`option`);n.value=t,n.textContent=t,e.appendChild(n)}),e.value=J,e.onchange=()=>{J=e.value,Y()},t.appendChild(e)}let c=v(`button`,`ph-reset-btn`);if(c.textContent=`Reset All`,c.onclick=()=>{window.confirm(`Reset all playhtml element data?`)&&(o.forEach(e=>{e.forEach(e=>{e.setData(e.defaultData)})}),Y())},t.appendChild(c),R.appendChild(t),s.length>0){let e=v(`div`,`ph-duplicate-warning`),n=v(`div`,`ph-duplicate-warning-title`);n.textContent=`Error: Duplicate playhtml IDs`,e.appendChild(n);let r=v(`div`,`ph-duplicate-warning-message`);r.textContent=`These elements share synced data and later duplicates are ignored.`,e.appendChild(r);let i=v(`div`,`ph-duplicate-warning-list`);for(let e of s){let t=v(`div`,`ph-duplicate-warning-item`),n=v(`span`,`ph-tree-badge`);n.textContent=e.tagType,n.style.background=`#c4724e`;let r=v(`span`);r.textContent=`#${e.elementId} (${e.elements.length})`,t.appendChild(n),t.appendChild(r),i.appendChild(t)}e.appendChild(i),R.insertBefore(e,t)}requestAnimationFrame(()=>{q&&(n.focus(),n.setSelectionRange(q.length,q.length))});let l=!1;if(o.forEach(e=>{e.size>0&&(l=!0)}),l){let e=0;if(o.forEach((t,n)=>{J&&n!==J||t.forEach((t,r)=>{if(q&&!r.toLowerCase().includes(q.toLowerCase()))return;e++;let a=v(`div`,`ph-tree-item`);a.setAttribute(`data-element-id`,r),a.setAttribute(`data-tag-type`,n);let o=v(`span`,`ph-tree-toggle`);o.textContent=`▶`;let s=v(`span`,`ph-tree-badge`);s.textContent=n,s.style.background=ae[n]||oe;let c=v(`span`,`ph-tree-el-name`);c.textContent=`#${r}`;let l=v(`button`,`ph-tree-reset`);l.textContent=`reset`,l.onclick=e=>{e.stopPropagation(),t.setData(t.defaultData),Y()},a.onmouseenter=()=>{let e=document.getElementById(r);e&&e.classList.add(`ph-inspect-highlight`,`ph-inspect-highlight-hover`)},a.onmouseleave=()=>{let e=document.getElementById(r);e&&e.classList.remove(`ph-inspect-highlight`,`ph-inspect-highlight-hover`)},a.appendChild(o),a.appendChild(s),a.appendChild(c),a.appendChild(l);let u=v(`div`,`ph-tree-children`);Be(u,t.data,0,(e,n)=>{let r=i(t.data,e,n);return r.ok?(t.setData(r.data),{ok:!0}):r});function d(){let e=u.classList.toggle(`ph-expanded`);o.textContent=e?`▼`:`▶`}o.onclick=e=>{e.stopPropagation(),d()},a.onclick=e=>{let t=e.target;if(t.closest(`.ph-tree-toggle`)||t.closest(`.ph-tree-reset`))return;let n=document.getElementById(r);n&&(n.scrollIntoView({behavior:`smooth`,block:`center`}),n.classList.add(`ph-flash`),n.addEventListener(`animationend`,()=>n.classList.remove(`ph-flash`),{once:!0})),u.classList.contains(`ph-expanded`)||d()},R.appendChild(a),R.appendChild(u)})}),e===0&&(q||J)){let e=v(`div`,`ph-empty`);e.textContent=`No elements match the current filter.`,R.appendChild(e)}}else{let e=v(`div`,`ph-empty`);e.textContent=`No playhtml elements found.`,R.appendChild(e)}if(s.length>0){let e=document.createElement(`hr`);e.style.border=`none`,e.style.borderTop=`1px solid #d4cfc7`,e.style.margin=`6px 0`,R.appendChild(e);let t=v(`div`,`ph-data-header`);t.textContent=`Duplicate IDs`,t.style.fontSize=`10px`,R.appendChild(t);for(let e of s){let t=v(`div`,`ph-tree-item`),n=v(`span`,`ph-tree-badge`);n.textContent=e.tagType,n.style.background=`#c4724e`;let r=v(`span`,`ph-tree-el-name`);r.textContent=`#${e.elementId} (${e.elements.length})`,r.title=`Multiple elements with this ID share the same capability tag.`,r.onclick=t=>{t.stopPropagation();for(let t of e.elements)t.classList.add(`ph-flash`),t.addEventListener(`animationend`,()=>t.classList.remove(`ph-flash`),{once:!0});e.elements[0]?.scrollIntoView({behavior:`smooth`,block:`center`})},t.appendChild(n),t.appendChild(r),R.appendChild(t)}}let u=e();if(u.length>0){let e=document.createElement(`hr`);e.style.border=`none`,e.style.borderTop=`1px solid #d4cfc7`,e.style.margin=`6px 0`,R.appendChild(e);let t=v(`div`,`ph-data-header`);t.textContent=`Shared Elements`,t.style.fontSize=`10px`,R.appendChild(t);for(let e of u){let t=v(`div`,`ph-tree-item`),n=v(`span`,`ph-tree-badge`);e.type===`source`?(n.textContent=`SRC`,n.style.background=`#4a9a8a`):(n.textContent=`REF`,n.style.background=`#5b8db8`);let r=v(`span`,`ph-tree-el-name`);r.textContent=`#${e.elementId}`,r.title=e.dataSource,r.onclick=t=>{t.stopPropagation(),e.element.scrollIntoView({behavior:`smooth`,block:`center`}),e.element.classList.add(`ph-flash`),e.element.addEventListener(`animationend`,()=>e.element.classList.remove(`ph-flash`),{once:!0})},t.appendChild(n),t.appendChild(r),R.appendChild(t)}}}let X=400,Z=240,Ve=document.body.style.marginRight,He=document.body.style.marginBottom;function Ue(){return b.dataset.position===`bottom`?`bottom`:`right`}function We(){x.style.display=`none`,S.classList.add(`ph-open`),Ue()===`bottom`?document.body.style.marginBottom=`${Z}px`:document.body.style.marginRight=`${X}px`,Fe(),P(),Y()}function Ge(){x.style.display=``,S.classList.remove(`ph-open`),document.body.style.marginRight=Ve,document.body.style.marginBottom=He,Me=!1,_&&(_=!1,T.classList.remove(`ph-active`),$())}let Q=0;o.forEach(e=>{Q+=e.size});function Ke(){Fe();let e=0;o.forEach(t=>{e+=t.size}),e!==Q&&(Q=e,S.classList.contains(`ph-open`)&&(P(),Y()))}let qe=new MutationObserver(e=>{for(let t of e)if(b.contains(t.target))return;Ke()});qe.observe(document.documentElement,{childList:!0,subtree:!0}),u!==null&&window.clearInterval(u),u=window.setInterval(Ke,250),c=qe,x.addEventListener(`click`,()=>We()),E.onclick=()=>Ge(),pe.addEventListener(`mousedown`,e=>{e.preventDefault();let t=Ue(),n=e=>{t===`bottom`?(Z=Math.max(120,Math.min(window.innerHeight-100,window.innerHeight-e.clientY)),S.style.height=`${Z}px`,document.body.style.marginBottom=`${Z}px`):(X=Math.max(280,Math.min(700,window.innerWidth-e.clientX)),S.style.width=`${X}px`,document.body.style.marginRight=`${X}px`)},r=()=>{document.removeEventListener(`mousemove`,n),document.removeEventListener(`mouseup`,r)};document.addEventListener(`mousemove`,n),document.addEventListener(`mouseup`,r)});function Je(e){let t=null;return o.forEach((n,r)=>{n.has(e)&&(t={tagType:r,handler:n.get(e)})}),t}function Ye(e){let t=R.querySelector(`.ph-tree-item[data-element-id="${e}"]`);if(!t)return;t.scrollIntoView({behavior:`smooth`,block:`nearest`});let n=t.nextElementSibling;if(n&&n.classList.contains(`ph-tree-children`)){n.classList.add(`ph-expanded`);let e=t.querySelector(`.ph-tree-toggle`);e&&(e.textContent=`▼`)}}function Xe(){document.querySelectorAll(`[class*='__playhtml-']`).forEach(e=>{let t=e;t.classList.add(`ph-inspect-highlight`);let n=t.id;if(n){let e=v(`div`,`ph-inspect-label`);e.textContent=`#${n}`,t.appendChild(e)}})}function $(){te(),y=null}T.onclick=()=>{_=!_,T.classList.toggle(`ph-active`,_),_?Xe():$()};let Ze=e=>{if(!_)return;let t=e.target.closest(`[class*='__playhtml-']`);t&&t!==y?(y&&y.classList.remove(`ph-inspect-highlight-hover`),y=t,t.classList.add(`ph-inspect-highlight-hover`)):t||(y&&=(y.classList.remove(`ph-inspect-highlight-hover`),null))};document.addEventListener(`mousemove`,Ze);let Qe=e=>{if(!_)return;let t=document.getElementById(`playhtml-dev-root`);if(t&&t.contains(e.target))return;let n=e.target.closest(`[class*='__playhtml-']`);if(n){e.preventDefault(),e.stopPropagation(),document.querySelectorAll(`.ph-inspect-selected`).forEach(e=>e.classList.remove(`ph-inspect-selected`)),n.classList.add(`ph-inspect-selected`);let t=n.id;le=t||null;let r=t?Je(t):null;r&&console.log(`[playhtml inspect] ${r.tagType} #${le}`,r.handler.data),t&&Ye(t)}};document.addEventListener(`click`,Qe,!0),h=()=>{_=!1,T.classList.remove(`ph-active`),document.removeEventListener(`mousemove`,Ze),document.removeEventListener(`click`,Qe,!0),$()}}function ue(){h?(h(),h=null):te(),f&&=(console.log=f.log,console.info=f.info,console.warn=f.warn,console.error=f.error,null),p&&=(window.removeEventListener(`error`,p),null),m&&=(window.removeEventListener(`unhandledrejection`,m),null),c&&=(c.disconnect(),null),u!==null&&(window.clearInterval(u),u=null),ee(),l&&l.parentElement&&(l.parentElement.removeChild(l),l=null)}export{ce as listDuplicatePlayElements,e as listSharedElements,le as setupDevUI,ue as teardownDevUI};