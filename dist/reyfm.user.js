// ==UserScript==
// @name         reyfm-plus
// @namespace    https://github.com
// @version      1.0.0
// @description  ReyFM++
// @author       
// @match        https://rey.fm/*
// @grant        none
// ==/UserScript==
(()=>{function h(t,e,n,a,o){let i=t.cloneNode(!0);return i.childNodes[0].textContent=e,i.style.backgroundColor=n,i.style.color="#ffffff",i.style.marginTop=a?"10px":"0px",i.style.paddingLeft="10px",i.style.paddingRight="10px",i.style.borderRadius="10px",i.style.fontSize="12px",i.addEventListener("click",o),i}function m(t,e){new MutationObserver((n,a)=>{let o=document.querySelectorAll(t)[0];o&&o.offsetParent!==null&&(e(o),a.disconnect())}).observe(document,{childList:!0,subtree:!0})}function E(){let t=document.querySelectorAll("p[data-v-5fde3039]")[0].textContent?.trim(),e=document.querySelectorAll("p[data-v-5fde3039]")[1].textContent?.trim(),n=`https://open.spotify.com/search/${t} ${e}`;window.open(n,"_blank")}function N(){let t=document.querySelectorAll("div.base-container")[4],n=t.childNodes[2].cloneNode(!0);n.childNodes[0].textContent="ReyfmPlus",n.querySelector("div > a > p").textContent=`A script to enhance the rey.fm experience

 Version: 1.0`,n.querySelector("div > a > p").innerHTML=n.querySelector("div > a > p").innerHTML.replace(/\n/g,"<br>"),n.querySelector("div > a").removeAttribute("href"),t.insertBefore(n,t.childNodes[5])}function c(t){window.__NUXT__.state.player.audio.pause(),window.__NUXT__.state.player.audio=null,window.__NUXT__.state.player.audio=t,window.__NUXT__.state.player.audio?.play()}var u=(t,e,n=!1)=>{let a=document.querySelector("body"),o=document.createElement("div");o.className="fmplus notification";let i=document.querySelectorAll(".fmplus.notification");if(i.length>0){let d=i[i.length-1].getBoundingClientRect();o.style.top=`${d.bottom+15}px`}else o.style.top="0";o.style.position="fixed",o.style.right="0",o.style.width="fit-content",o.style.maxWidth="50%",o.style.minWidth="25rem",o.style.margin="0.5rem",o.style.padding="0.5rem",o.style.backgroundColor="rgba(22, 24, 25, 0.8)",o.style.backdropFilter="blur(10px)",o.style.borderRadius="0.25rem",o.style.color="#fff",o.style.textAlign="center",o.style.zIndex="9999";let s=document.createElement("h3");s.className="fmplus notification-title",s.style.top="0",s.style.left="0",s.style.margin="0",s.style.padding="0",s.style.fontSize="1.5rem",s.style.fontWeight="bold",s.innerHTML=t;let r=document.createElement("p");return r.className="fmplus notification-message",r.style.textAlign="left",r.style.margin="0",r.style.padding="0",r.innerHTML=e,o.appendChild(s),o.appendChild(r),o.animate([{transform:"translateY(-100%)"},{transform:"translateY(0)"}],{duration:500,easing:"ease-in-out"}),a.appendChild(o),n||setTimeout(()=>{o.animate([{transform:"translateY(0)"},{transform:"translateY(-100%)"}],{duration:500,easing:"ease-in-out"}),setTimeout(()=>{o.remove()},500)},5e3),o.addEventListener("click",()=>{o.animate([{transform:"translateY(0)"},{transform:"translateY(-100%)"}],{duration:500,easing:"ease-in-out"}),setTimeout(()=>{o.remove()},500);let p=document.querySelectorAll(".fmplus.notification"),d=Array.from(p).indexOf(o);Array.from(p).slice(d+1).forEach(w=>{let _=w.getBoundingClientRect();w.animate([{transform:`translateY(${_.top}px)`},{transform:`translateY(${_.top-65}px)`}],{duration:500,easing:"ease-in-out"}),w.style.top=`${_.top-65}px`})}),o};function k(t){c(window.__NUXT__.state.player.audio),window.__NUXT__.state.player.audio=t,window.__NUXT__.state.player.playing=!0,window.__NUXT__.state.player.audio.play()}function L(t,e){let n=window.location.pathname;new MutationObserver((a,o)=>{window.location.pathname!==n&&(n=window.location.pathname,b(n))}).observe(document,{childList:!0,subtree:!0})}function b(t){console.log("[REYFMPLUS] New path: "+t),t.startsWith("/station/")&&m("div.name",e=>{let n=e.parentElement,a=e;a.childNodes[0].textContent=a.childNodes[0].textContent+" \u2014 ReyfmPlusEnhanced";let o=h(e,"Bass Boost Menu","#ff0000",!0,()=>{console.log("clicked boost chip"),B()});if(n.appendChild(o),!window.rfmPlus.state.bassBoostActive){let i=h(e,"Bass Boost Active (Lvl: "+window.rfmPlus.state.bassBoostLevel+")","#ff0000",!0,()=>{console.log("clicked boost active chip"),u("Bass Boost","Bass boost is already active. Click the Bass Boost Menu chip to change the level.")});n.appendChild(i)}})}function v(t,e){let n=window.__NUXT__.state.player.audio;window.__NUXT__.state.player.currentStation=t,n.src=`https://listen.reyfm.de/${t}_${e}kbps.mp3`,n.play()}var M={original:1,nightlife:2,raproyal:3,usrap:4,hitsonly:5,gaming:6,houseparty:7,chillout:8,lofi:9,oldschool:10,mashup:11,charts:12,partyhard:13,bass:14,kpop:15,xmas:20};function y(t){return t}var x={state:{bassBoostActive:!1,bassBoostLevel:0},api:{getStation:async t=>{let e=await window.rfmPlus.api.getStations();return M[t]},getStations:async()=>new Promise((t,e)=>{let n=window.__NUXT__.state.main.data.channels;n?t(n):e("Could not get stations")}),playBoosted:async(t,e)=>{window.__NUXT__.state.player.audio&&c(window.rfmPlus.state.audioPlayer),window.rfmPlus.state.bassBoostActive=!0,v(t,e)},playOriginal:async(t,e)=>{window.__NUXT__.state.player.audio&&c(window.rfmPlus.state.audioPlayer),window.rfmPlus.state.bassBoostActive=!1,v(t,e)}},plugins:new Map};var l=class{constructor(e,n="white"){this.name=e;this.color=n}static makeTitle(e,n){return["%c %c %s ","",`background: ${e}; color: black; font-weight: bold; border-radius: 5px;`,n]}_log(e,n,a,o=""){console[e](`%c Rey.fm Plus %c %c ${this.name} ${o}`,`background: ${n}; color: black; font-weight: bold; border-radius: 5px;`,"",`background: ${this.color}; color: black; font-weight: bold; border-radius: 5px;`,...a)}log(...e){this._log("log","#a6d189",e)}info(...e){this._log("info","#a6d189",e)}error(...e){this._log("error","#e78284",e)}errorCustomFmt(e,...n){this._log("error","#e78284",n,e)}warn(...e){this._log("warn","#e5c890",e)}debug(...e){this._log("debug","#eebebe",e)}};var me=new l("Plugins/BassBoost"),P=y({name:"Bass Boost",enabled:!0,author:"built-in",version:"1.0.0",description:"Adds a bass boost button to the player",awaitElementVisible:null,entrypoint:()=>{let t=document.createElement("button");t.className="btn btn-primary btn-sm",t.innerHTML="Bass Boost",t.addEventListener("click",()=>{let e=document.querySelector("audio");e&&(e.playbackRate=1.5)}),document.querySelector(".player-controls").appendChild(t)}});var f=new l("Plugins/RankingSystem"),S=y({name:"Ranking System",enabled:!0,author:"built-in",version:"1.0.0",description:"Adds a ranking system to the player",awaitElementVisible:null,entrypoint:()=>{let t=new WebSocket("ws://localhost:8080");t.addEventListener("open",()=>{f.info("Socket connection established"),u("Socket connection established","Socket connection established",!1)}),t.addEventListener("message",a=>{let o=JSON.parse(a.data);f.info(o)}),t.addEventListener("close",a=>{f.info("Socket connection closed. Code: %s, Reason: %s",a.code,a.reason),u("Socket connection closed","WebSocket connection terminated",!1),clearInterval(e),clearInterval(n)}),t.addEventListener("error",a=>{f.error(a),u("Socket connection error","WebSocket connection error",!1)});let e=setInterval(()=>{f.info("Sending heartbeat"),t.send(JSON.stringify({type:"heartbeat",data:{timestamp:Date.now()}}))},15e3),n=setInterval(()=>{f.info("Sending play state update"),t.send(JSON.stringify({type:"PlayStateUpdate",data:{timestamp:Date.now(),discord_id:12345679e12,channel_id:"1",listening_delta:30}}))},3e4)}});var xe=new l("Plugins/SleepTimer"),T=y({name:"Sleep Timer",enabled:!0,description:"Automatically stops playback after a set amount of time",version:"1.0.0",author:"built-in",pathConstraint:RegExp("/station/"),injectTarget:"div.name",entrypoint:()=>{let t=document.querySelector("div.space-y-1[data-v-5946bf68]"),e=document.createElement("button");e.className="fmplus sleep-timer-button",e.style.width="100px",e.style.margin="0.25rem",e.style.backgroundColor="#1e1e1e",e.style.color="#fff",e.style.border="1px solid #1e1e1e",e.style.borderRadius="0.25rem",e.style.padding="0.25rem",e.style.fontSize="12px",e.style.fontWeight="bold",e.style.textAlign="center",e.style.cursor="pointer",e.style.lineHeight="1.5",e.innerHTML="Sleep Timer",e.addEventListener("click",()=>{let a=u("Sleep Timer","Started sleep timer for 5 minutes",!0).querySelector("p.fmplus.notification-message"),o="0:20",i=setInterval(()=>{let s=Number(o.split(":")[1]),r=Number(o.split(":")[0]);if(s===0&&r===0){clearInterval(i),a.innerHTML="Sleep timer engaged. Good night!",window.__NUXT__.state.player.audio.pause(),window.__NUXT__.state.player.playing=!1,window.__NUXT__.state.player.audio=null,window.rfmPlus.state.audioPlayer.pause(),window.rfmPlus.state.audioPlayer=null,a.innerHTML="Sleep timer engaged. Good night!";return}s===0?(s=59,r--):s--,o=`${r}:${s<10?"0"+s:s}`,a.innerHTML=`Sleep timer engaging in ${o}`},1e3)}),t.appendChild(e)}});var g=new Map;g.set(P.name,P);g.set(S.name,S);g.set(T.name,T);var A="div.inset-center > div.buttonShine";var C=new l("Observer"),U=()=>{let t=window.location.pathname;new MutationObserver((e,n)=>{window.location.pathname!==t&&(t=window.location.pathname,X(t))}).observe(document,{childList:!0,subtree:!0})},O=()=>{document.querySelector(A).addEventListener("click",()=>{$()})},X=t=>{if(C.log("New path: "+t),!t.startsWith("/station/"))return;let e=window.rfmPlus.plugins;for(let[n,a]of e)a.injectTarget&&m(a.injectTarget,()=>{a.entrypoint()})},$=()=>{let t=window.__NUXT__.state.player.audio,e=window.rfmPlus.state.audioPlayer;t&&e?(C.log("Resuming"),window.__NUXT__.state.player.audio=e,window.__NUXT__.state.player.playing=!0):!t&&e&&(C.log("Pausing"),t?.pause(),window.__NUXT__.state.player.audio=null,window.__NUXT__.state.player.playing=!1,e.pause())},R=[{name:"pathObserver",associatedFn:U,enabled:!0},{name:"playButtonClicked",associatedFn:O,enabled:!0}];m("div[data-v-733b83fc] > a > svg",t=>{H()});function H(){let t=new l("Loader");t.info("Hello from ReyfmPlus!"),R.forEach(e=>{if(e.enabled){t.info(`Loading observer: ${e.name}`);try{e.associatedFn()}catch(n){t.error(`Error while loading observer ${e.name}: ${n}`)}}}),g.forEach(e=>{if(e.enabled){t.info(`Loading plugin: ${e.name}`);try{e.awaitElementVisible&&(document.querySelector(e.awaitElementVisible)?(t.info(`Plugin ${e.name} has a dependent element ${e.awaitElementVisible} which has already been loaded. Loading plugin...`),e.entrypoint()):(t.info(`Plugin ${e.name} has a dependent element ${e.awaitElementVisible} which has not been loaded yet. Waiting for it to load...`),m(e.awaitElementVisible,e.entrypoint))),e.entrypoint()}catch(n){t.error(`Error while loading plugin ${e.name}: ${n}`)}}}),x.plugins=g,window.rfmPlus=window.rfmPlus||x,N(),b(window.location.pathname),L(window.location.pathname,b),m("a[data-v-5fde3039] > div.w-max > p.akira",e=>{let a=e.parentElement?.parentElement,o=h(e,"On Spotify","#1db954",!1,i=>{i.preventDefault(),E()});a.appendChild(o)})}function B(){window.__NUXT__.state.player.audio&&c(window.rfmPlus.state.audioPlayer);let t=location.pathname.split("/")[2],e=q[t];console.log("[REYFMPLUS] Station ID: "+e),console.log("[REYFMPLUS] Bass boost menu for station: "+t),window.__NUXT__.state.player.currentStation=e;let n=`https://listen.reyfm.de/${t}_320kbps.mp3`,a=document.createElement("div");a.style.position="fixed",a.style.top="0",a.style.left="0",a.style.width="100%",a.style.height="100%",a.style.backgroundColor="rgba(0, 0, 0, 0.5)";let o=document.createElement("div");o.style.position="absolute",o.style.top="50%",o.style.left="50%",o.style.transform="translate(-50%, -50%)",o.style.backgroundColor="#ffffff",o.style.padding="20px",o.style.borderRadius="10px",o.style.width="80%",o.style.maxWidth="500px",o.style.height="80%",o.style.maxHeight="500px",o.style.overflow="auto",o.style.boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.5)",o.textContent="REYFMPlus \u2014 Bass Boost Menu",o.style.fontSize="20px",o.style.fontWeight="bold",o.style.textAlign="center",o.style.marginBottom="20px",document.body.appendChild(a),a.appendChild(o),[{name:"Normal",description:"No bass boost",value:0},{name:"Regular Bass Boost",description:"A regular bass boost, nothing fancy",value:1},{name:"Heavy Bass Boost",description:"A heavy bass boost, for the bassheads",value:5},{name:"Bass Boost + Limiter",description:"A regular bass boost with a limiter to prevent clipping",value:3},{name:"Absolutely fucking crazy",description:"A heavy bass boost, why are you even using this",value:15}].forEach(s=>{let r=document.createElement("div");r.style.display="flex",r.style.flexDirection="column",r.style.alignItems="center",r.style.marginBottom="20px",r.style.cursor="pointer";let p=document.createElement("div");p.style.fontSize="18px",p.style.fontWeight="bold",p.textContent=s.name;let d=document.createElement("div");d.style.fontSize="14px",d.style.fontWeight="normal",d.style.textAlign="center",d.textContent=s.description,r.appendChild(p),r.appendChild(d),r.addEventListener("click",()=>{F(n,s.value),a.remove()}),o.appendChild(r)}),a.style.display="block",a.addEventListener("click",s=>{s.target===a&&a.remove()})}var q={original:1,nightlife:2,raproyal:3,usrap:4,hitsonly:5,gaming:6,houseparty:7,chillout:8,lofi:9,oldschool:10,mashup:11,charts:12,partyhard:13,bass:14,kpop:15,xmas:20};function F(t="https://listen.reyfm.de/original_320kbps.mp3",e=1){let n=new window.AudioContext,a=new Audio;a.src=t,a.crossOrigin="anonymous";let o=n.createMediaElementSource(a),i=n.createBiquadFilter();i.type="lowshelf",i.frequency.value=1e3,i.gain.value=e,o.connect(i),i.connect(n.destination),window.__NUXT__.state.player.playing=!0,window.__NUXT__.state.player.audio&&c(a),window.rfmPlus.state.audioPlayer=a,window.rfmPlus.state.audioContext=n,window.__NUXT__.state.player.audio=a,k(a)}})();
/*! For license information please see reyfm.user.js.LEGAL.txt */
