/* =====================================================================
   HALLOWEEN FX — STARKLAB®  (чистый JS, без библиотек)
   Настройки — в объекте CFG. Эффекты можно выключить кнопкой 🦇 внизу слева.
   ===================================================================== */
(function(){
'use strict';
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
var FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
var MOBILE=function(){return innerWidth<=700};
var CFG={
  month:9,day:31,                 // дата Хэллоуина (месяц с 0: 9 = октябрь)
  bats:{desktop:5,mobile:3,everyMs:[2600,6200]},
  embers:{desktop:40,mobile:16},
  lightning:{everyMs:[16000,34000]}
};
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}}
function rnd(a,b){return a+Math.random()*(b-a)}
var body=document.body;

/* ---------- переключатель эффектов ---------- */
var fxOn=store('fx')!=='0'&&!RM;
var tg=$('#fxToggle');
function setFx(on,save){fxOn=on;body.classList.toggle('fx-off',!on);if(tg){tg.setAttribute('aria-pressed',on)}if(save)store('fx',on?'1':'0');if(on)start();else stop()}
if(tg){tg.addEventListener('click',function(){setFx(!fxOn,true)})}
if(RM){if(tg)tg.hidden=true;body.classList.add('fx-off')}

/* ---------- паутина и слизь ---------- */
var WEB='<svg class="web web--%P" viewBox="0 0 100 100" aria-hidden="true"><use href="#hw-web"/></svg>';
function addWeb(el,pos){if(!el)return;el.insertAdjacentHTML('beforeend',WEB.replace('%P',pos))}
$$('.svc').forEach(function(e,i){addWeb(e,i%2?'tl':'tr')});
$$('.pv').forEach(function(e){addWeb(e,'tr')});
addWeb($('.dialog-card'),'tr');
addWeb($('.contact-card'),'bl');addWeb($('.contact-card'),'br');
addWeb($('#about'),'tl');addWeb($('#portfolio'),'tr');
$$('.contact-card,.payment-card').forEach(function(e){e.insertAdjacentHTML('afterbegin','<i class="drip" aria-hidden="true"></i>')});

/* ---------- паук, спускающийся при прокрутке ---------- */
var spider=$('.spider'),spTick=false;
function spUpdate(){spTick=false;if(!spider)return;var h=document.documentElement.scrollHeight-innerHeight,p=h>0?scrollY/h:0;
  var base=MOBILE()?58:74,max=MOBILE()?150:230;spider.style.setProperty('--sp',(base+Math.min(1,p*1.6)*(max-base))+'px')}
addEventListener('scroll',function(){if(!spTick){spTick=true;requestAnimationFrame(spUpdate)}},{passive:true});
addEventListener('resize',spUpdate);spUpdate();

/* ---------- обратный отсчёт до Хэллоуина ---------- */
var pill=$('#hwPill');
if(pill){
  var cd={d:$('#cdD'),h:$('#cdH'),m:$('#cdM'),s:$('#cdS'),box:$('#hwCd'),now:$('#hwNow')};
  var pad=function(n){return n<10?'0'+n:''+n};
  function tick(){
    var n=new Date(),y=n.getFullYear(),t=new Date(y,CFG.month,CFG.day,0,0,0),end=new Date(y,CFG.month,CFG.day+1,0,0,0);
    if(n>=end){pill.hidden=true;return}                 // 1 ноября и позже — прячем плашку
    if(n>=t){cd.box.hidden=true;cd.now.hidden=false;return}
    cd.box.hidden=false;cd.now.hidden=true;
    var diff=t-n,D=Math.floor(diff/864e5),H=Math.floor(diff/36e5)%24,M=Math.floor(diff/6e4)%60,S=Math.floor(diff/1e3)%60;
    cd.d.textContent=D;cd.h.textContent=pad(H);cd.m.textContent=pad(M);cd.s.textContent=pad(S)}
  tick();setInterval(function(){if(!document.hidden)tick()},1000);
}

/* ---------- летучие мыши ---------- */
var batLayer=$('.bats'),batTimer=null,batCount=0;
function maxBats(){return MOBILE()?CFG.bats.mobile:CFG.bats.desktop}
function spawnBat(){
  if(!fxOn||document.hidden||!batLayer||batCount>=maxBats())return;
  var el=document.createElement('div'),rtl=Math.random()<.5,s=rnd(.55,1.35);
  el.className='bat'+(rtl?' bat--rtl':'');
  el.style.cssText='--y:'+rnd(8,62).toFixed(1)+'vh;--s:'+s.toFixed(2)+';--dur:'+rnd(11,20).toFixed(1)+'s;--wob:'+rnd(2.4,4.4).toFixed(1)+'s';
  el.innerHTML='<i><svg viewBox="0 0 100 50" aria-hidden="true"><use href="#hw-bat"/></svg></i>';
  batLayer.appendChild(el);batCount++;
  el.addEventListener('animationend',function(e){if(e.target===el){el.remove();batCount--}});
}
function scheduleBat(){clearTimeout(batTimer);batTimer=setTimeout(function(){spawnBat();scheduleBat()},rnd(CFG.bats.everyMs[0],CFG.bats.everyMs[1]))}
function burstBats(x,y,n){
  if(!batLayer)return;
  for(var i=0;i<n;i++){(function(i){
    var el=document.createElement('div');el.className='bat bat--burst';
    el.style.cssText='left:'+x+'px;top:'+y+'px;--s:'+rnd(.45,.9).toFixed(2)+';opacity:1;transform:translate(-50%,-50%) scale(.3)';
    el.innerHTML='<i><svg viewBox="0 0 100 50" aria-hidden="true"><use href="#hw-bat"/></svg></i>';
    batLayer.appendChild(el);
    var ang=rnd(-Math.PI*.95,-Math.PI*.05),dist=rnd(140,340);
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      el.style.transform='translate('+(Math.cos(ang)*dist-30).toFixed(0)+'px,'+(Math.sin(ang)*dist-20).toFixed(0)+'px) scale(1)';el.style.opacity='0'})});
    setTimeout(function(){el.remove()},1900)})(i)}
}

/* ---------- угольки, светлячки, искры (canvas) ---------- */
var cv=$('#fxCanvas'),cx=cv&&cv.getContext('2d'),W=0,H=0,dpr=1,E=[],S=[],raf=0,last=0,running=false;
var COLORS=[[255,140,40],[255,190,70],[255,110,20],[157,255,59],[180,130,255]];
function mkEmber(init){var c=COLORS[Math.random()<.18?3:Math.random()<.2?4:Math.floor(rnd(0,3))];
  return{x:rnd(0,W),y:init?rnd(0,H):H+rnd(5,60),r:rnd(.8,2.3),vy:rnd(.18,.62),sw:rnd(.4,1.6),ph:rnd(0,6.28),a:rnd(.35,.9),c:c,t:rnd(0,6.28)}}
function resizeFx(){if(!cv)return;dpr=Math.min(devicePixelRatio||1,MOBILE()?1.5:2);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);
  var n=MOBILE()?CFG.embers.mobile:CFG.embers.desktop;while(E.length<n)E.push(mkEmber(true));E.length=n}
var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(resizeFx,160)});
function spark(x,y,n,spread){for(var i=0;i<n;i++){var a=rnd(0,6.28),v=rnd(.4,spread||2.4);S.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-.6,l:1,d:rnd(.016,.035),r:rnd(.8,2.2),c:COLORS[Math.floor(rnd(0,3))]})}if(S.length>260)S.splice(0,S.length-260)}
function frame(ts){
  if(!running)return;raf=requestAnimationFrame(frame);
  var dt=Math.min((ts-last)/16.67||1,3);last=ts;if(document.hidden)return;
  cx.clearRect(0,0,W,H);cx.globalCompositeOperation='lighter';
  for(var i=0;i<E.length;i++){var p=E[i];p.t+=.02*dt;p.y-=p.vy*dt;p.x+=Math.sin(p.t+p.ph)*p.sw*.35*dt;
    if(p.y<-20){E[i]=mkEmber(false);continue}
    var al=p.a*(.6+.4*Math.sin(p.t*2.4+p.ph)),c=p.c;
    cx.fillStyle='rgba('+c+','+(al*.18).toFixed(3)+')';cx.beginPath();cx.arc(p.x,p.y,p.r*4,0,6.283);cx.fill();
    cx.fillStyle='rgba('+c+','+al.toFixed(3)+')';cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.283);cx.fill()}
  for(var j=S.length-1;j>=0;j--){var s=S[j];s.x+=s.vx*dt;s.y+=s.vy*dt;s.vy+=.05*dt;s.vx*=.985;s.l-=s.d*dt;
    if(s.l<=0){S.splice(j,1);continue}
    cx.fillStyle='rgba('+s.c+','+(s.l*.9).toFixed(3)+')';cx.beginPath();cx.arc(s.x,s.y,s.r*(.4+s.l*.6),0,6.283);cx.fill()}
  cx.globalCompositeOperation='source-over';
}

/* ---------- курсор: свет и искры (только мышь) ---------- */
var spot=$('.spot'),mx=-999,my=-999,sx=0,sy=0,spRaf=0,lastSpark=0;
if(FINE&&!RM&&spot){
  addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;mx=e.clientX;my=e.clientY;spot.classList.add('on');
    var t=performance.now();if(fxOn&&t-lastSpark>38){lastSpark=t;spark(mx,my,1,1.3)}},{passive:true});
  document.addEventListener('pointerleave',function(){spot.classList.remove('on')});
  (function follow(){spRaf=requestAnimationFrame(follow);if(!fxOn)return;sx+=(mx-sx)*.14;sy+=(my-sy)*.14;spot.style.transform='translate3d('+sx.toFixed(1)+'px,'+sy.toFixed(1)+'px,0)'})();
}
addEventListener('pointerdown',function(e){if(!fxOn||!cv)return;if(e.target.closest&&e.target.closest('.pk'))return;spark(e.clientX,e.clientY,e.pointerType==='mouse'?16:10,3.2)},{passive:true});

/* ---------- молния ---------- */
var flash=$('.hw-flash'),flTimer=null;
function scheduleFlash(){clearTimeout(flTimer);if(MOBILE()||!fxOn)return;flTimer=setTimeout(function(){
  if(fxOn&&!document.hidden&&flash){flash.classList.remove('go');void flash.offsetWidth;flash.classList.add('go')}scheduleFlash()},rnd(CFG.lightning.everyMs[0],CFG.lightning.everyMs[1]))}

/* ---------- пасхалка: тык по тыкве ---------- */
$$('.pk').forEach(function(p){p.addEventListener('click',function(e){
  var r=p.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height*.4;
  var b=document.createElement('span');b.className='boo';b.textContent='BOO!';b.style.left=x+'px';b.style.top=y+'px';body.appendChild(b);setTimeout(function(){b.remove()},1200);
  if(RM)return;
  body.classList.remove('shake');void body.offsetWidth;body.classList.add('shake');setTimeout(function(){body.classList.remove('shake')},520);
  if(fxOn){burstBats(x,y,MOBILE()?6:10);spark(x,y,30,4)}})});

/* ---------- старт / стоп ---------- */
var bootDone=false;
function start(){
  if(RM||!cv)return;
  resizeFx();if(!running){running=true;last=performance.now();raf=requestAnimationFrame(frame)}
  scheduleBat();scheduleFlash();
  if(!bootDone){bootDone=true;setTimeout(spawnBat,900);setTimeout(spawnBat,2600)}
}
function stop(){running=false;cancelAnimationFrame(raf);clearTimeout(batTimer);clearTimeout(flTimer);if(cx)cx.clearRect(0,0,W,H)}
document.addEventListener('visibilitychange',function(){if(!document.hidden&&fxOn&&!running)start()});
if(tg)tg.setAttribute('aria-pressed',fxOn);
body.classList.toggle('fx-off',!fxOn);
if(fxOn)start();
})();
