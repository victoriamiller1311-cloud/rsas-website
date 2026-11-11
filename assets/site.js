(function(){
  var head=document.querySelector('.site-head'),tg=document.querySelector('.nav-toggle');
  if(tg)tg.addEventListener('click',function(){var o=head.classList.toggle('open');tg.setAttribute('aria-expanded',o)});
  document.querySelectorAll('.has-dd').forEach(function(d){var b=d.querySelector('button.dd');
    b.addEventListener('click',function(e){e.stopPropagation();var o=!d.classList.contains('open');document.querySelectorAll('.has-dd.open').forEach(function(x){x.classList.remove('open');x.querySelector('button.dd').setAttribute('aria-expanded','false')});d.classList.toggle('open',o);b.setAttribute('aria-expanded',o)})});
  document.addEventListener('click',function(){document.querySelectorAll('.has-dd.open').forEach(function(x){x.classList.remove('open');x.querySelector('button.dd').setAttribute('aria-expanded','false')})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')document.querySelectorAll('.has-dd.open').forEach(function(x){x.classList.remove('open')})});
  var still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // 3D gallery
  document.querySelectorAll('.stage').forEach(function(st){
    var ring=st.querySelector('.ring'),fr=[].slice.call(st.querySelectorAll('.frame')),n=fr.length,cur=0,mx=0,my=0,sc=0;
    var span=+(st.getAttribute('data-span')||2);var box=st.closest('[data-gallery]'),count=box&&box.querySelector('[data-count]');
    function lay(){fr.forEach(function(f,i){var d=((i-cur)%n+n)%n;if(d>n/2)d-=n;var a=Math.abs(d);
      f.style.transform='translateX('+(d*72)+'%) translateZ('+(-a*190)+'px) rotateY('+(-d*28)+'deg)';
      f.style.opacity=a>span?0:1;f.style.pointerEvents=a>span?'none':'';f.style.zIndex=10-a;f.setAttribute('aria-hidden',d!==0)});
      if(count)count.textContent=('0'+(cur+1)).slice(-2)+' / '+('0'+n).slice(-2)}
    function tilt(){ring.style.transform='translateZ('+sc+'px) rotateY('+(mx*9)+'deg) rotateX('+(-my*6)+'deg)'}
    lay();
    if(!still){st.addEventListener('pointermove',function(e){var r=st.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5;tilt()});
      st.addEventListener('pointerleave',function(){mx=my=0;tilt()});
      if(st.hasAttribute('data-scroll'))window.addEventListener('scroll',function(){sc=Math.min(160,window.scrollY*.28);tilt()},{passive:true});
      if(st.hasAttribute('data-auto'))setInterval(function(){if(!document.hidden){cur=(cur+1)%n;lay()}},4200)}
    if(box){var p=box.querySelector('[data-prev]'),q=box.querySelector('[data-next]');
      if(p)p.addEventListener('click',function(){cur=(cur-1+n)%n;lay()});if(q)q.addEventListener('click',function(){cur=(cur+1)%n;lay()})}
    var x0=null;st.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
    st.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40){cur=(cur+(dx<0?1:-1)+n)%n;lay()}x0=null});
  });
  // rental calculator
  var cf=document.querySelector('form.calc'),co=document.getElementById('calc-out');
  if(cf&&co){var gbp=function(n){return '\u00a3'+Math.round(n).toLocaleString('en-GB')};
    var run=function(){var p=parseFloat(String(cf.elements.price.value).replace(/[^0-9.]/g,''))||0,t=+cf.elements.term.value,a=p*0.1,h='<tr><th>Rental fee per year (10%)</th><td>'+gbp(a)+'</td></tr><tr><th>Paid quarterly in advance</th><td>'+gbp(a/4)+' a quarter</td></tr>';
      for(var y=1;y<=t;y++)h+='<tr><th>To buy the work after year '+y+'</th><td>'+gbp(p-a*y)+' left to pay</td></tr>';co.innerHTML=h};
    cf.addEventListener('input',run);run()}
  // reveal
  var els=document.querySelectorAll('.reveal');
  if(still||!('IntersectionObserver' in window))els.forEach(function(e){e.classList.add('in')});
  else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});els.forEach(function(e){io.observe(e)})}
  // forms open the visitor's own email app; nothing is stored on this website
  document.querySelectorAll('form[data-mail]').forEach(function(f){
    var q=new URLSearchParams(location.search).get('about');if(q&&f.elements.work)f.elements.work.value=q;
    f.addEventListener('submit',function(e){e.preventDefault();var to=f.getAttribute('data-mail'),L=[],fd=new FormData(f);
      fd.forEach(function(v,k){if(v&&k!=='privacy')L.push(k.charAt(0).toUpperCase()+k.slice(1).replace(/_/g,' ')+': '+v)});
      location.href='mailto:'+to+'?subject='+encodeURIComponent(f.getAttribute('data-subject')||'Website enquiry')+'&body='+encodeURIComponent(L.join('\n'));
      var m=f.querySelector('.form-msg');if(m)m.textContent='Your email app should now open with your message ready to send. If it does not, please write to '+to+'.'})});
})();
