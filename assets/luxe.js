/* soft light that follows the mouse, or the finger on phones, across every page */
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var g=document.createElement('div');g.className='glow';g.setAttribute('aria-hidden','true');document.body.appendChild(g);
  var tx=60,ty=30,x=60,y=30,touch=matchMedia('(hover: none)').matches,t0=0;
  function set(e){var p=e.touches?e.touches[0]:e;tx=p.clientX/innerWidth*100;ty=p.clientY/innerHeight*100;g.classList.add('on');t0=Date.now()}
  addEventListener('pointermove',set,{passive:true});addEventListener('pointerdown',set,{passive:true});addEventListener('touchmove',set,{passive:true});
  if(touch){g.classList.add('on')}
  (function loop(){
    if(touch&&Date.now()-t0>2500){var s=Date.now()/5200;tx=50+Math.sin(s)*28;ty=40+Math.sin(s*.7)*22}
    x+=(tx-x)*.08;y+=(ty-y)*.08;g.style.setProperty('--gx',x+'%');g.style.setProperty('--gy',y+'%');requestAnimationFrame(loop)})();
})();

/* ---------- inner pages: a Jacobo Azagury painting in 3D, with its own line drawing lit by your finger or mouse ---------- */
(function(){
  var hero=document.querySelector('.page-hero');
  if(!hero||document.querySelector('.a-hero2')||/insight-/.test(location.pathname))return;
  var A=[['az-portrait','street-portrait-green-jacket','Street Portrait in a Green Jacket'],['az-market','tangier-market','Tangier Market with Minaret'],
         ['az-musicians','tavern-musicians','Tavern Musicians, Funchal'],['az-street','stepped-street','Stepped Street with Figures'],
         ['az-tree','market-under-tree','Market under a Great Tree'],['az-houses','gibraltar-houses','Old Houses with a Palm, Gibraltar']];
  var p=location.pathname.split('/').pop()||'index',h=0;
  if(/contact\.html$/.test(location.pathname)){var M=document.createElement('div');M.className='ph-moustache';M.setAttribute('aria-hidden','true');M.innerHTML='<div class="mo base"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 300\" fill=\"none\" stroke=\"#fff\" stroke-linecap=\"round\" stroke-linejoin=\"round\">  <g id=\"half\">    <path stroke-width=\"3\" d=\"M400 176 C366 140 308 136 258 160 C214 181 182 178 164 156 C140 130 116 84 96 4\"/>    <path stroke-width=\"3\" d=\"M400 212 C352 234 290 232 242 204 C206 184 176 180 158 162 C134 138 112 88 96 4\"/>    <path stroke-width=\"1.5\" opacity=\".7\" d=\"M386 188 C352 168 312 166 276 180\"/>    <path stroke-width=\"1.3\" opacity=\".55\" d=\"M372 202 C338 210 300 206 268 190\"/>    <path stroke-width=\"1.3\" opacity=\".55\" d=\"M300 176 C262 192 222 194 192 176\"/>    <path stroke-width=\"1.1\" opacity=\".5\" d=\"M150 132 C132 106 118 70 104 26\"/>  </g>  <use href=\"#half\" transform=\"translate(800 0) scale(-1 1)\"/>  <path stroke-width=\"1.3\" opacity=\".45\" d=\"M400 166 L400 218\"/></svg></div><div class="mo lit"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 300\" fill=\"none\" stroke=\"#fff\" stroke-linecap=\"round\" stroke-linejoin=\"round\">  <g id=\"half\">    <path stroke-width=\"3\" d=\"M400 176 C366 140 308 136 258 160 C214 181 182 178 164 156 C140 130 116 84 96 4\"/>    <path stroke-width=\"3\" d=\"M400 212 C352 234 290 232 242 204 C206 184 176 180 158 162 C134 138 112 88 96 4\"/>    <path stroke-width=\"1.5\" opacity=\".7\" d=\"M386 188 C352 168 312 166 276 180\"/>    <path stroke-width=\"1.3\" opacity=\".55\" d=\"M372 202 C338 210 300 206 268 190\"/>    <path stroke-width=\"1.3\" opacity=\".55\" d=\"M300 176 C262 192 222 194 192 176\"/>    <path stroke-width=\"1.1\" opacity=\".5\" d=\"M150 132 C132 106 118 70 104 26\"/>  </g>  <use href=\"#half\" transform=\"translate(800 0) scale(-1 1)\"/>  <path stroke-width=\"1.3\" opacity=\".45\" d=\"M400 166 L400 218\"/></svg></div>';hero.classList.add('ph','ph-mo');hero.insertBefore(M,hero.firstChild);if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var mv=function(x,y){var r=M.getBoundingClientRect();M.style.setProperty('--mx',((x-r.left)/r.width*100)+'%');M.style.setProperty('--my',((y-r.top)/r.height*100)+'%');M.style.setProperty('--ry',(((x/innerWidth)-.5)*-14)+'deg');M.style.setProperty('--rx',(((y/innerHeight)-.5)*10)+'deg')};hero.addEventListener('pointermove',function(e){mv(e.clientX,e.clientY)});hero.addEventListener('pointerdown',function(e){mv(e.clientX,e.clientY)});if(matchMedia('(hover: none)').matches){var t2=0;(function d2(){t2+=.006;var r=hero.getBoundingClientRect();if(r.bottom>0)mv(r.left+r.width*(.5+Math.sin(t2)*.35),r.top+r.height*(.55+Math.sin(t2*.8)*.2));requestAnimationFrame(d2)})()}}return}for(var i=0;i<p.length;i++)h=(h*31+p.charCodeAt(i))>>>0;var a=A[h%A.length];
  hero.classList.add('ph');
  var L=document.createElement('div');L.className='ph-lines';L.setAttribute('aria-hidden','true');
  L.innerHTML='<div class="ink base"></div><div class="ink lit"></div>';L.style.setProperty('--ink','url(lines/'+a[0]+'.png)');
  var F=document.createElement('figure');F.className='ph-art';
  F.innerHTML='<a href="artist-jacobo-azagury.html#works" class="ph-tilt"><img class="framed" src="assets/artists/jacobo-azagury/'+a[1]+'-800.jpg" alt="Jacobo Azagury, '+a[2]+', private family collection"></a><figcaption>Jacobo Azagury, <i>'+a[2]+'</i>. Private family collection.</figcaption>';
  hero.insertBefore(L,hero.firstChild);hero.appendChild(F);
  var still=matchMedia('(prefers-reduced-motion: reduce)').matches;if(still)return;
  var tl=F.querySelector('.ph-tilt');
  function at(x,y){var r=hero.getBoundingClientRect(),lr=L.getBoundingClientRect(),fx=(x-r.left)/r.width,fy=(y-r.top)/r.height;
    L.style.setProperty('--mx',((x-lr.left)/lr.width*100)+'%');L.style.setProperty('--my',((y-lr.top)/lr.height*100)+'%');
    tl.style.setProperty('--ry',((fx-.6)*-22)+'deg');tl.style.setProperty('--rx',((fy-.5)*12)+'deg');tl.style.setProperty('--sx',(fx*100)+'%');tl.style.setProperty('--sy',(fy*100)+'%')}
  hero.addEventListener('pointermove',function(e){at(e.clientX,e.clientY)});hero.addEventListener('pointerdown',function(e){at(e.clientX,e.clientY)});
  if(matchMedia('(hover: none)').matches){var t=0,last=0;hero.addEventListener('touchstart',function(){last=Date.now()},{passive:true});
    (function drift(){t+=.006;if(Date.now()-last>3000){var r=hero.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)at(r.left+r.width*(.5+Math.sin(t)*.3),r.top+r.height*(.45+Math.sin(t*.7)*.25))}requestAnimationFrame(drift)})()}
})();

/* ---------- every framed artwork tilts in 3D and catches the light; works rise into place as you scroll ---------- */
(function(){
  var still=matchMedia('(prefers-reduced-motion: reduce)').matches,touch=matchMedia('(hover: none)').matches;
  var imgs=[].slice.call(document.querySelectorAll('.aw:not(.photo) img, .ifeature .art img, .icard .im img'));
  imgs.forEach(function(img){var w=document.createElement('span');w.className='tilt';img.parentNode.insertBefore(w,img);w.appendChild(img);
    if(img.closest('picture')){var pc=img.closest('picture');if(pc.parentNode!==w){pc.parentNode.insertBefore(w,pc);w.appendChild(pc)}}});
  var T=[].slice.call(document.querySelectorAll('.tilt'));
  if(still)return;
  T.forEach(function(w){w.addEventListener('pointermove',function(e){var r=w.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      w.style.setProperty('--ry',((x-.5)*16)+'deg');w.style.setProperty('--rx',((.5-y)*12)+'deg');w.style.setProperty('--sx',x*100+'%');w.style.setProperty('--sy',y*100+'%');w.classList.add('lit')});
    w.addEventListener('pointerleave',function(){w.style.setProperty('--ry','0deg');w.style.setProperty('--rx','0deg');w.classList.remove('lit')})});
  if(touch){var tick=false;function onScroll(){if(tick)return;tick=true;requestAnimationFrame(function(){tick=false;var c=innerHeight/2;
      T.forEach(function(w){var r=w.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;var d=(r.top+r.height/2-c)/innerHeight;
        w.style.setProperty('--rx',(d*-14)+'deg');w.style.setProperty('--sy',(50+d*90)+'%');w.style.setProperty('--sx','60%');w.classList.toggle('lit',Math.abs(d)<.35)})})}
    addEventListener('scroll',onScroll,{passive:true});onScroll()}
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('up');io.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px'});
    T.forEach(function(w){w.classList.add('rise');io.observe(w)})}
})();

/* gold reading line and pointer ring */
(function(){
  var p=document.createElement('div');p.className='progress';p.setAttribute('aria-hidden','true');document.body.appendChild(p);
  function sp(){var h=document.documentElement.scrollHeight-innerHeight;p.style.setProperty('--p',h>0?Math.min(1,scrollY/h):0)}
  addEventListener('scroll',sp,{passive:true});sp();
  if(matchMedia('(hover: none)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var c=document.createElement('div');c.className='cur';c.setAttribute('aria-hidden','true');document.body.appendChild(c);
  var x=-100,y=-100,tx=-100,ty=-100;
  addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;var t=e.target.closest&&e.target.closest('a,button,summary,.tilt,label');c.classList.toggle('big',!!t)},{passive:true});
  (function f(){x+=(tx-x)*.2;y+=(ty-y)*.2;c.style.transform='translate('+x+'px,'+y+'px)';requestAnimationFrame(f)})();
})();
