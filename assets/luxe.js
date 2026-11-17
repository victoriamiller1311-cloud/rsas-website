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
