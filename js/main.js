(function(){
'use strict';
var S=window.SITE,T=window.I18N,$=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches,tgUrl='https://t.me/'+S.telegram.replace(/^@/,'');
var lang='ua',store=function(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}};
function detect(){var s=store('lang');if(T[s])return s;var n=(navigator.language||'uk').toLowerCase();return n.indexOf('ru')==0?'ru':n.indexOf('en')==0?'en':'ua'}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
/* static content from config */
$('#brandName').textContent=S.brand;$('#brandTag').textContent=S.tagline||'';var nm=$('#nameText');nm.setAttribute('aria-label',S.name.normalize('NFKC'));nm.innerHTML=Array.from(S.name).map(function(c,i){return'<span class="ch" aria-hidden="true" style="--i:'+i+'">'+esc(c)+'</span>'}).join('');$('#copyName').textContent=S.name;$('#yr').textContent=new Date().getFullYear();
$$('[data-tg]').forEach(function(a){a.href=tgUrl;a.target='_blank';a.rel='noopener noreferrer'});
$('#techList').innerHTML=S.tech.map(function(t,i){return'<li style="--i:'+i+'">'+esc(t)+'</li>'}).join('');
$('#fMail').innerHTML=S.email?'<a href="mailto:'+esc(S.email)+'">'+esc(S.email)+'</a>':'';
$('#fTg').innerHTML='<a href="'+tgUrl+'" target="_blank" rel="noopener noreferrer">Telegram: @'+esc(S.telegram)+'</a>';
var IC={discord:'<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .079.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
instagram:'<svg class="ic ig" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5.2"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" stroke="none"/></svg>',
tiktok:'<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
telegram:'<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>'};
var soc=S.socials.filter(function(x){return x.url&&IC[x.id]});
function lbl(x){return x.id=='telegram'?'<span data-i18n="soc.tg"></span>':esc(x.label)}
$('#socBig').innerHTML=soc.map(function(x){return'<a class="tile" data-s="'+x.id+'" href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(x.label)+'" title="'+esc(x.label)+'">'+IC[x.id]+'</a>'}).join('');
$('#socials').innerHTML=soc.map(function(x){return'<a class="fs" href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer"><span class="tile tile--s" data-s="'+x.id+'">'+IC[x.id]+'</span>'+lbl(x)+'</a>'}).join('');
  var discord=S.socials.filter(function(x){return x.id=='discord'&&x.url})[0];
var arrow='<svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg>';
  $('#serviceList').innerHTML=S.services.map(function(s,i){var no=(i+1<10?'0':'')+(i+1);return'<article class="svc rule" data-r><div class="svc-top"><span class="svc-no">'+no+'</span><span class="svc-arrow">↗</span></div><div class="svc-body"><h3 data-sv="'+s.id+'"></h3><p data-sd="'+s.id+'"></p></div><div class="svc-bottom"><span class="price"><span data-i18n="from"></span><b>$'+s.price+'</b></span><button class="link mag discuss" type="button" data-discuss><span data-i18n="order"></span>'+arrow+'</button></div></article>'}).join('');

  /* contact choice */
  var dialog=$('#contactDialog'),dialogClose=$('#dialogClose'),dialogTg=$('#dialogTelegram'),dialogDc=$('#dialogDiscord');
  dialogTg.href=tgUrl;
  if(discord){dialogDc.href=discord.url}else{dialogDc.hidden=true}
  function openDialog(){if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');document.body.classList.add('dialog-open')}
  function closeDialog(){if(dialog.close)dialog.close();else dialog.removeAttribute('open');document.body.classList.remove('dialog-open')}
  $$('[data-discuss]').forEach(function(b){b.addEventListener('click',openDialog)});
  dialogClose.addEventListener('click',closeDialog);
  dialog.addEventListener('close',function(){document.body.classList.remove('dialog-open')});
  dialog.addEventListener('click',function(e){if(e.target===dialog)closeDialog()});
$('#track').innerHTML=S.projects.map(function(p,i){var bg=p.image?'<img src="'+esc(p.image)+'" alt="" loading="lazy">':'<i style="background:linear-gradient(150deg,hsl('+p.hue+',60%,86%),hsl('+(p.hue+40)+',55%,68%))"></i>';
return'<article class="card"><small>0'+(i+1)+'</small><div class="cl"><div class="pv">'+bg+'</div><div><h3 data-pt="'+p.id+'"></h3><p data-pd="'+p.id+'"></p><p class="tags">'+p.tech.map(esc).join(' / ')+'</p>'+(p.url?'<a class="link" href="'+esc(p.url)+'" target="_blank" rel="noopener noreferrer"><span data-i18n="open"></span>'+arrow+'</a>':'<p class="demo" data-i18n="demo"></p>')+'</div></div></article>'}).join('');
/* i18n */
function split(el){var words=el.textContent.trim().split(/\s+/);el.setAttribute('aria-label',el.textContent.trim());el.innerHTML=words.map(function(w,i){return'<span class="w" aria-hidden="true" style="--i:'+i+'"><span>'+esc(w)+'</span></span> '}).join('')}
function apply(l,first){lang=l;store('lang',l);var d=T[l];document.documentElement.lang=l=='ua'?'uk':l;
 $$('[data-i18n]').forEach(function(e){var v=d[e.dataset.i18n];if(v!=null)e.textContent=v});
 $$('[data-sv]').forEach(function(e){e.textContent=d[e.dataset.sv][1]});$$('[data-sd]').forEach(function(e){e.textContent=d[e.dataset.sd][2]});
 $$('[data-pt]').forEach(function(e){e.textContent=d[e.dataset.pt][0]});$$('[data-pd]').forEach(function(e){e.textContent=d[e.dataset.pd][1]});
 $('#aboutList').innerHTML=d.about.map(function(t,i){return'<li style="--i:'+i+'">'+t+'</li>'}).join('');
 $$('.split').forEach(split);$$('.lang button').forEach(function(b){b.classList.toggle('on',b.dataset.l==l);b.setAttribute('aria-pressed',b.dataset.l==l)});
 document.title=d['hero.title'].toLowerCase().replace(/^./,function(c){return c.toUpperCase()})+' — '+S.brand;
 if(!first)requestAnimationFrame(function(){$$('.split').forEach(function(e){if(inView(e))e.classList.add('in')});$$('.row').forEach(function(e){if(e.classList.contains('in')){e.classList.remove('in');void e.offsetWidth;e.classList.add('in')}})})}
function inView(e){var r=e.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0}
$$('.lang button').forEach(function(b){b.addEventListener('click',function(){if(b.dataset.l==lang)return;document.body.classList.add('swap');setTimeout(function(){apply(b.dataset.l);document.body.classList.remove('swap')},300)})});
apply(detect(),true);
/* loader */
$('#loaderName').innerHTML=Array.from(S.name).map(function(c,i){return'<i style="--i:'+i+'">'+(c==' '?'&nbsp;':esc(c))+'</i>'}).join('');
var welcome=$('#welcomeLanguage'),readyDone=false,languageChosen=store('languageChosen')==='1';
if(languageChosen)welcome.hidden=true;
$$('[data-wl]').forEach(function(b){b.addEventListener('click',function(){apply(b.dataset.wl,true);store('languageChosen','1');languageChosen=true;$$('[data-wl]').forEach(function(x){x.classList.toggle('selected',x===b)});welcome.classList.add('chosen');setTimeout(ready,RM?80:650)})});
function ready(){if(readyDone)return;readyDone=true;document.body.classList.remove('is-loading');io();nm.classList.add('go')}
if(languageChosen)setTimeout(ready,RM?0:1500);
/* reveal */
function io(){var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
 $$('[data-r],.split,.card').forEach(function(e,i){if(e.classList.contains('card'))e.style.transitionDelay=(Array.prototype.indexOf.call(e.parentNode.children,e)*.12)+'s';o.observe(e)})}
/* header, progress */
var hdr=$('.hdr'),bar=$('.bar'),ly=0;
var tickS=false;addEventListener('scroll',function(){if(tickS)return;tickS=true;requestAnimationFrame(function(){tickS=false;var y=scrollY,h=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?y/h:0)+')';hdr.classList.toggle('solid',y>30);hdr.classList.toggle('hide',y>ly&&y>200&&!$('.nav').classList.contains('open'));ly=y})},{passive:true});
/* menu */
var bg=$('.burger'),nv=$('.nav');function setMenu(o){nv.classList.toggle('open',o);bg.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';document.body.classList.toggle('menu-open',o);if(o)hdr.classList.remove('hide')}
bg.addEventListener('click',function(){setMenu(!nv.classList.contains('open'))});
addEventListener('keydown',function(e){if(e.key==='Escape'&&nv.classList.contains('open')){setMenu(false);bg.focus()}});
var mqD=matchMedia('(min-width:861px)');(mqD.addEventListener?mqD.addEventListener.bind(mqD,'change'):mqD.addListener.bind(mqD))(function(e){if(e.matches)setMenu(false)});
/* smooth anchors */
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
$$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(ev){var id=a.getAttribute('href'),t=id=='#top'?document.body:$(id);if(!t)return;ev.preventDefault();setMenu(false);
 var y0=scrollY,y1=id=='#top'?0:t.getBoundingClientRect().top+y0-70,t0=null;if(RM)return scrollTo(0,y1);
 (function st(ts){t0=t0||ts;var p=Math.min((ts-t0)/1100,1);scrollTo(0,y0+(y1-y0)*ease(p));if(p<1)requestAnimationFrame(st)})(performance.now())})});
/* carousel */
var tr=$('#track'),pg=$('#prog'),cards=$$('.card',tr),td=$('#trackDots');
function padL(){return parseFloat(getComputedStyle(tr).paddingLeft)||0}
if(td){td.innerHTML=cards.map(function(_,i){return'<button type="button" aria-label="'+(i+1)+'" data-i="'+i+'"></button>'}).join('');
 td.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;tr.scrollTo({left:cards[+b.dataset.i].offsetLeft-padL(),behavior:RM?'auto':'smooth'})})}
function setDot(){if(!td)return;var best=0,bd=1e9,x=tr.scrollLeft+padL();cards.forEach(function(el,i){var d=Math.abs(el.offsetLeft-x);if(d<bd){bd=d;best=i}});$$('button',td).forEach(function(b,i){b.classList.toggle('on',i===best);b.setAttribute('aria-current',i===best)})}
setDot();$$('.ctrl button').forEach(function(b){b.addEventListener('click',function(){tr.scrollBy({left:+b.dataset.d*Math.min(600,tr.clientWidth*.8),behavior:RM?'auto':'smooth'})})});
tr.addEventListener('scroll',function(){var m=tr.scrollWidth-tr.clientWidth;pg.style.width=(20+(m>0?tr.scrollLeft/m:0)*80)+'%';setDot()},{passive:true});
tr.addEventListener('keydown',function(e){if(e.key=='ArrowRight')tr.scrollBy({left:400,behavior:'smooth'});if(e.key=='ArrowLeft')tr.scrollBy({left:-400,behavior:'smooth'})});
var dn=false,sx=0,sl=0;tr.addEventListener('pointerdown',function(e){if(e.pointerType!='mouse')return;dn=true;sx=e.clientX;sl=tr.scrollLeft;tr.style.scrollSnapType='none'});
addEventListener('pointerup',function(){if(dn){dn=false;tr.style.scrollSnapType=''}});addEventListener('pointermove',function(e){if(dn)tr.scrollLeft=sl-(e.clientX-sx)});
if(RM)return;
/* mouse parallax + magnetic */
var mx=0,my=0,tx=0,ty=0,root=document.documentElement;
addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5});
(function loop(){var dx=tx-mx,dy=ty-my;if(Math.abs(dx)>.0004||Math.abs(dy)>.0004){mx+=dx*.05;my+=dy*.05;root.style.setProperty('--mx',mx.toFixed(3));root.style.setProperty('--my',my.toFixed(3))}requestAnimationFrame(loop)})();
$$('.mag').forEach(function(m){m.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;var r=m.getBoundingClientRect();m.style.transform='translate('+(e.clientX-r.left-r.width/2)*.22+'px,'+(e.clientY-r.top-r.height/2)*.35+'px)'});m.addEventListener('pointerleave',function(){m.style.transform=''})});
/* particles */
var cv=$('#dots'),cx=cv.getContext('2d'),P=[],W,H,vis=true,dpr=Math.min(devicePixelRatio||1,matchMedia("(max-width:700px)").matches?1.5:2);
function size(){var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);P=[];for(var i=0;i<Math.min(W<700?20:55,W/22|0);i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3})}
size();var lastW=innerWidth;addEventListener('resize',function(){if(innerWidth!==lastW){lastW=innerWidth;size()}});new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(cv);
(function draw(){requestAnimationFrame(draw);if(!vis||document.hidden)return;cx.clearRect(0,0,W,H);
 for(var i=0;i<P.length;i++){var p=P[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;cx.fillStyle='rgba(255,140,40,.55)';cx.beginPath();cx.arc(p.x,p.y,1.6,0,6.3);cx.fill();
  for(var j=i+1;j<P.length;j++){var q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<120){cx.strokeStyle='rgba(255,140,40,'+(.2*(1-d/120))+')';cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}}})();
})();
