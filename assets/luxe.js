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

/* ---------- main pages: a zoomed-in detail of a colourful work, drawn in light; touch brings it to colour ---------- */
(function(){
  var hero=document.querySelector('.page-hero');
  if(!hero||document.body.classList.contains('doc')||document.querySelector('.a-hero2')||/insight-/.test(location.pathname))return;
  var p=(location.pathname.split('/').pop()||'').replace('.html','');
  var MAP={'research':['research','Rich Simmons','artist-rich-simmons.html'],'buying':['buying','Rich Simmons','artist-rich-simmons.html'],
    'selling':['selling','Philippe de Kraan','artist-philippe-de-kraan.html'],'current-works':['current-works','Rich Simmons','artist-rich-simmons.html'],
    'artists-we-follow':['artists','Philippe de Kraan','artist-philippe-de-kraan.html'],'corporate-and-hospitality':['corporate','Philippe de Kraan','artist-philippe-de-kraan.html'],
    'insights':['insights','Holly Mingo','artist-holly-mingo.html'],'about':['about','Rich Simmons','artist-rich-simmons.html'],
    'contact':['contact','Rich Simmons','artist-rich-simmons.html'],'why-contemporary-art':['why','Holly Mingo','artist-holly-mingo.html'],
    'how-we-select-emerging-artists':['select','Holly Mingo','artist-holly-mingo.html'],'collecting-emerging-art':['collecting','Philippe de Kraan','artist-philippe-de-kraan.html'],
    'testimonials':['testimonials','Rich Simmons','artist-rich-simmons.html']};
  var m=MAP[p];if(!m)return;
  var M=document.createElement('div');M.className='ph-pop';M.setAttribute('aria-hidden','true');
  M.style.setProperty('--pl','url(lines/pop-'+m[0]+'-lines.png)');M.style.setProperty('--pc','url(lines/pop-'+m[0]+'.jpg)');
  M.innerHTML='<div class="pl base"></div><div class="pl colour"></div><div class="pl lit"></div>';
  hero.classList.add('ph','ph-popart');hero.insertBefore(M,hero.firstChild);
  var cap=document.createElement('p');cap.className='pop-cap';cap.innerHTML='Detail, after a work by <a href="'+m[2]+'">'+m[1]+'</a>. Touch to bring it to colour.';
  var w=hero.querySelector('.wrap');if(w)w.appendChild(cap);
  var mv=function(x,y){var r=M.getBoundingClientRect();M.style.setProperty('--mx',((x-r.left)/r.width*100)+'%');M.style.setProperty('--my',((y-r.top)/r.height*100)+'%');M.style.setProperty('--ry',(((x/innerWidth)-.5)*-10)+'deg');M.style.setProperty('--rx',(((y/innerHeight)-.5)*8)+'deg')};
  hero.addEventListener('pointermove',function(e){mv(e.clientX,e.clientY)});hero.addEventListener('pointerdown',function(e){mv(e.clientX,e.clientY)});
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var t2=0,last=0,touch=matchMedia('(hover: none)').matches;
  hero.addEventListener('touchstart',function(){last=Date.now()},{passive:true});
  hero.addEventListener('touchmove',function(e){last=Date.now();mv(e.touches[0].clientX,e.touches[0].clientY)},{passive:true});
  hero.addEventListener('pointerenter',function(){last=Date.now()+1e9});hero.addEventListener('pointerleave',function(){last=Date.now()});
  (function d2(){t2+=.005;if(Date.now()-last>3000){var r=M.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)mv(r.left+r.width*(.5+Math.sin(t2)*.32),r.top+r.height*(.45+Math.sin(t2*.8)*.3))}requestAnimationFrame(d2)})();
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

/* gold reading line */
(function(){
  var p=document.createElement('div');p.className='progress';p.setAttribute('aria-hidden','true');document.body.appendChild(p);
  function sp(){var h=document.documentElement.scrollHeight-innerHeight;p.style.setProperty('--p',h>0?Math.min(1,scrollY/h):0)}
  addEventListener('scroll',sp,{passive:true});sp();
})();
