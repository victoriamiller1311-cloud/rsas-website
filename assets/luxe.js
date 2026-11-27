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
  var MAP={'research':['research','Vincent van Gogh, Sunflowers',''],'buying':['buying','Gustav Klimt, The Kiss',''],
    'selling':['selling','Wassily Kandinsky, Composition 8',''],'current-works':['current-works','Rich Simmons','artist-rich-simmons.html'],
    'artists-we-follow':['artists','Philippe de Kraan','artist-philippe-de-kraan.html'],'corporate-and-hospitality':['corporate','Henri Matisse, The Dessert: Harmony in Red',''],
    'insights':['insights','Holly Mingo','artist-holly-mingo.html'],'about':['about','Rich Simmons','artist-rich-simmons.html'],
    'contact':['contact','Rich Simmons','artist-rich-simmons.html'],'why-contemporary-art':['why','Holly Mingo','artist-holly-mingo.html'],
    'how-we-select-emerging-artists':['select','Holly Mingo','artist-holly-mingo.html'],'collecting-emerging-art':['collecting','Philippe de Kraan','artist-philippe-de-kraan.html'],
    'testimonials':['testimonials','Rich Simmons','artist-rich-simmons.html']};
  var m=MAP[p];if(!m)return;
  var M=document.createElement('div');M.className='ph-pop';M.setAttribute('aria-hidden','true');
  M.style.setProperty('--pl','url(lines/pop-'+m[0]+'-lines.png?v=4)');M.style.setProperty('--pc','url(lines/pop-'+m[0]+'.jpg?v=4)');
  M.innerHTML='<div class="pl base"></div><div class="pl colour"></div><div class="pl lit"></div>';
  hero.classList.add('ph','ph-popart');hero.insertBefore(M,hero.firstChild);
  var cap=document.createElement('p');cap.className='pop-cap';cap.innerHTML=m[2]?'Detail, after a work by <a href="'+m[2]+'">'+m[1]+'</a>.':'Detail: '+m[1]+'.';
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

/* Current Works: three tabs instead of one very long page */
(function(){
  var nav=document.querySelector('.cw-tabs');if(!nav)return;
  var secs=[].slice.call(document.querySelectorAll('[data-tab]')),btns=[].slice.call(nav.querySelectorAll('button'));
  function show(t,scroll){secs.forEach(function(s){s.hidden=s.getAttribute('data-tab')!==t;if(!s.hidden)s.classList.add('in')});
    btns.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-show')===t?'true':'false')});
    if(scroll)nav.scrollIntoView({behavior:'smooth',block:'start'});try{history.replaceState(null,'','#'+t)}catch(e){}}
  btns.forEach(function(b){b.addEventListener('click',function(){show(b.getAttribute('data-show'),true)})});
  var h=(location.hash||'').slice(1);show(['private','hook','contemporary'].indexOf(h)>-1?h:'private',false);
})();

/* Creative pass: art lights up as it comes into view; open folded detail from links */
(function(){
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
    var sel='.aw img,.avail-grid .work img,.listing img,.aud-strip img,.ifeature .art img,.icard .im img,.awork img,.works img';
    var els=[].slice.call(document.querySelectorAll(sel)).filter(function(e){return !e.closest('.hero2,.ph-pop,.museum,.stage,.fh-pic,.founder-pic')});
    if(els.length){document.documentElement.classList.add('lu');
      var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('lu-on');io.unobserve(e.target)}})},{threshold:.35});
      els.forEach(function(e){e.classList.add('lu-t');io.observe(e)})}
  }
  function openHash(){var id=location.hash.slice(1);if(!id)return;var d=document.getElementById(id);if(d&&d.tagName==='DETAILS'){d.open=true;setTimeout(function(){d.scrollIntoView({block:'start'})},50)}}
  openHash();addEventListener('hashchange',openHash);
})();
(function(){if(!('IntersectionObserver' in window))return;var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add(e.target.classList.contains('art-band')?'in':'lu-on');io.unobserve(e.target)}})},{threshold:.4});document.querySelectorAll('.art-band,.do-grid a').forEach(function(e){io.observe(e)})})();
/* The Gathering: the close-up outline comes into colour where you point, or drifts on phones */
(function(){var s=document.querySelector('.gather'),L=s&&s.querySelector('.g-lines');if(!L||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  function set(x,y){L.style.setProperty('--mx',x+'%');L.style.setProperty('--my',y+'%')}
  s.addEventListener('pointermove',function(e){var r=L.getBoundingClientRect();set((e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100)});
  if(matchMedia('(hover: none)').matches){var t=0;(function d(){t+=.006;set(55+30*Math.sin(t),45+25*Math.sin(t*1.3));requestAnimationFrame(d)})()}})();
/* Insights share bar: phone share sheet (Instagram, WhatsApp, Messages...) and copy link */
(function(){var b=document.querySelector('.share');if(!b)return;
  if(navigator.share){document.documentElement.classList.add('can-share');b.querySelector('.share-native').addEventListener('click',function(){navigator.share({title:b.getAttribute('data-title'),url:location.href.split('#')[0]}).catch(function(){})})}
  var c=b.querySelector('.share-copy');c.addEventListener('click',function(){var u=c.getAttribute('data-url');(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){c.textContent='Link copied'},function(){prompt('Copy this link',u)});setTimeout(function(){c.textContent='Copy link'},2500)})})();
/* Long lists (Insights, Research Papers): filter with counts, search, sort, 12 per page */
(function(){[].forEach.call(document.querySelectorAll('[data-list]'),function(root){
  var grid=root.querySelector('.lst-grid'),items=[].slice.call(grid.querySelectorAll('.lst-item')),bs=[].slice.call(root.querySelectorAll('.lst-filter button')),
      inp=root.querySelector('.lst-search'),sel=root.querySelector('.lst-sort'),pager=root.querySelector('.lst-pager'),count=root.querySelector('.lst-count'),
      per=12,page=1,cat='all',q='',sort='new';
  root.classList.add('lst-on');
  function btn(t,p,lab,cur,dis){return '<button type="button" data-p="'+p+'"'+(cur?' aria-current="page" class="on"':'')+(dis?' disabled':'')+(lab?' aria-label="'+lab+'"':'')+'>'+t+'</button>'}
  function render(scroll){
    var words=q.split(/\s+/).filter(Boolean);
    var list=items.filter(function(i){if(cat!=='all'&&i.getAttribute('data-cat')!==cat)return false;
      if(cat==='all'&&!words.length&&i.getAttribute('data-feat'))return false;
      var t=i.getAttribute('data-text');return words.every(function(w){return t.indexOf(w)>=0})});
    list.sort(function(a,b){var x=+a.getAttribute('data-n'),y=+b.getAttribute('data-n');return sort==='new'?y-x:x-y});
    items.forEach(function(i){i.hidden=true});list.forEach(function(i){grid.appendChild(i)});
    var pages=Math.max(1,Math.ceil(list.length/per));if(page>pages)page=pages;
    list.slice((page-1)*per,page*per).forEach(function(i){i.hidden=false});
    count.textContent=list.length?('Showing '+((page-1)*per+1)+' to '+Math.min(page*per,list.length)+' of '+list.length):'Nothing matches. Try another word or category.';
    var h='';if(pages>1){h+=btn('Previous',page-1,'Previous page',false,page===1);for(var k=1;k<=pages;k++)h+=btn(k,k,'Page '+k,k===page);h+=btn('Next',page+1,'Next page',false,page===pages)}
    pager.innerHTML=h;
    if(scroll){var y=root.getBoundingClientRect().top+scrollY-90;scrollTo({top:y,behavior:'smooth'})}}
  bs.forEach(function(b){b.addEventListener('click',function(){cat=b.getAttribute('data-f');page=1;
    bs.forEach(function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)});render()})});
  var tm;inp&&inp.addEventListener('input',function(){clearTimeout(tm);tm=setTimeout(function(){q=inp.value.toLowerCase().trim();page=1;render()},150)});
  sel&&sel.addEventListener('change',function(){sort=sel.value;page=1;render()});
  pager.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||b.disabled)return;page=+b.getAttribute('data-p');render(true)});
  render()})})();
/* Menu drop-downs: the arrow opens the list on touch and keyboard; hover also opens it on desktop */
(function(){function close(o){o.classList.remove('open');o.querySelector('.dd-t').setAttribute('aria-expanded','false')}
  [].forEach.call(document.querySelectorAll('.dd-t'),function(b){b.addEventListener('click',function(){
  var li=b.parentNode,open=!li.classList.contains('open');[].forEach.call(document.querySelectorAll('.dd.open'),close);
  if(open){li.classList.add('open');b.setAttribute('aria-expanded','true')}})});
  document.addEventListener('click',function(e){if(!e.target.closest('.dd'))[].forEach.call(document.querySelectorAll('.dd.open'),close)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')[].forEach.call(document.querySelectorAll('.dd.open'),close)})})();
/* Language button: English, Español, Arabic, Mandarin (Google Translate behind RSAS's own button) */
(function(){
  function cur(){var m=document.cookie.match(/googtrans=\/en\/([^;]+)/);return m?decodeURIComponent(m[1]):'en'}
  function setCk(v){var d=location.hostname,e=v?'':';expires=Thu, 01 Jan 1970 00:00:00 GMT',val=v?'/en/'+v:'';
    document.cookie='googtrans='+val+';path=/'+e;if(d.indexOf('.')>0){document.cookie='googtrans='+val+';path=/;domain='+d+e;document.cookie='googtrans='+val+';path=/;domain=.'+d.replace(/^www\./,'')+e}}
  var c=cur(),code={en:'EN',es:'ES',fr:'FR',de:'DE',it:'IT',ar:'AR','zh-CN':'中文'}[c]||'EN';
  [].forEach.call(document.querySelectorAll('.lang'),function(box){
    box.querySelector('.lang-c').textContent=code;var fl={en:'gb',es:'es',fr:'fr',de:'de',it:'it',ar:'ae','zh-CN':'cn'}[c]||'gb',fi=box.querySelector('.lang-f');if(fi)fi.src='assets/flags/'+fl+'.svg';
    var b=box.querySelector('.lang-b');
    b.addEventListener('click',function(e){e.stopPropagation();var o=box.classList.toggle('open');b.setAttribute('aria-expanded',o)});
    [].forEach.call(box.querySelectorAll('[data-l]'),function(x){if(x.getAttribute('data-l')===c)x.setAttribute('aria-current','true');
      x.addEventListener('click',function(){var l=x.getAttribute('data-l');setCk(l==='en'?'':l);location.reload()})})});
  document.addEventListener('click',function(){[].forEach.call(document.querySelectorAll('.lang.open'),function(o){o.classList.remove('open');o.querySelector('.lang-b').setAttribute('aria-expanded','false')})});
  if(c!=='en'){
    if(c==='ar')document.documentElement.classList.add('rtl');
    window.gtInit=function(){new google.translate.TranslateElement({pageLanguage:'en',includedLanguages:'en,es,fr,de,it,ar,zh-CN',autoDisplay:false},'gt-el')};
    var s=document.createElement('script');s.src='https://translate.google.com/translate_a/element.js?cb=gtInit';s.async=true;document.body.appendChild(s);
  }
})();
/* Checked translations for the menu, buttons and labels, so these never depend on Google (27 Nov 2026) */
(function(){
  var m=document.cookie.match(/googtrans=\/en\/([^;]+)/);if(!m)return;var L=decodeURIComponent(m[1]);
  var D={
  'Buy':{es:'Comprar',fr:'Acheter',de:'Kaufen',it:'Acquistare',ar:'شراء','zh-CN':'购买'},
  'Sell':{es:'Vender',fr:'Vendre',de:'Verkaufen',it:'Vendere',ar:'بيع','zh-CN':'出售'},
  'Artists':{es:'Artistas',fr:'Artistes',de:'Künstler',it:'Artisti',ar:'الفنانون','zh-CN':'艺术家'},
  'Current Works':{es:'Obras disponibles',fr:'Œuvres disponibles',de:'Aktuelle Werke',it:'Opere disponibili',ar:'الأعمال المتاحة','zh-CN':'在售作品'},
  'Research Papers':{es:'Estudios de investigación',fr:'Études de recherche',de:'Forschungsstudien',it:'Studi di ricerca',ar:'الأوراق البحثية','zh-CN':'研究报告'},
  'Insights':{es:'Análisis',fr:'Analyses',de:'Einblicke',it:'Approfondimenti',ar:'رؤى','zh-CN':'洞见'},
  'Research':{es:'Investigación',fr:'Recherche',de:'Recherche',it:'Ricerca',ar:'الأبحاث','zh-CN':'研究'},
  'About':{es:'Quiénes somos',fr:'À propos',de:'Über uns',it:'Chi siamo',ar:'من نحن','zh-CN':'关于我们'},
  'Contact':{es:'Contacto',fr:'Contact',de:'Kontakt',it:'Contatti',ar:'اتصل بنا','zh-CN':'联系我们'},
  'Menu':{es:'Menú',fr:'Menu',de:'Menü',it:'Menu',ar:'القائمة','zh-CN':'导航'},
  'Close':{es:'Cerrar',fr:'Fermer',de:'Schließen',it:'Chiudi',ar:'إغلاق','zh-CN':'关闭'},
  'Arrange a private viewing':{es:'Concertar una visita privada',fr:'Organiser une visite privée',de:'Private Besichtigung vereinbaren',it:'Organizza una visita privata',ar:'ترتيب معاينة خاصة','zh-CN':'预约私人看展'},
  'View current works':{es:'Ver obras disponibles',fr:'Voir les œuvres disponibles',de:'Aktuelle Werke ansehen',it:'Vedi le opere disponibili',ar:'عرض الأعمال المتاحة','zh-CN':'查看在售作品'},
  'Enquire':{es:'Consultar',fr:'Se renseigner',de:'Anfragen',it:'Richiedi informazioni',ar:'استفسر','zh-CN':'咨询'},
  'Enquire about this work':{es:'Consultar sobre esta obra',fr:'Se renseigner sur cette œuvre',de:'Zu diesem Werk anfragen',it:'Richiedi informazioni su quest’opera',ar:'استفسر عن هذا العمل','zh-CN':'咨询此作品'},
  'Price on application':{es:'Precio a consultar',fr:'Prix sur demande',de:'Preis auf Anfrage',it:'Prezzo su richiesta',ar:'السعر عند الطلب','zh-CN':'价格面议'},
  'Available':{es:'Disponible',fr:'Disponible',de:'Verfügbar',it:'Disponibile',ar:'متاح','zh-CN':'可售'},
  'Featured work':{es:'Obra destacada',fr:'Œuvre à la une',de:'Ausgewähltes Werk',it:'Opera in evidenza',ar:'عمل مميز','zh-CN':'精选作品'},
  'Read the article':{es:'Leer el artículo',fr:'Lire l’article',de:'Artikel lesen',it:'Leggi l’articolo',ar:'اقرأ المقال','zh-CN':'阅读文章'},
  'Read the paper (PDF)':{es:'Leer el estudio (PDF)',fr:'Lire l’étude (PDF)',de:'Studie lesen (PDF)',it:'Leggi lo studio (PDF)',ar:'اقرأ الورقة البحثية (PDF)','zh-CN':'阅读报告（PDF）'},
  'Read all articles':{es:'Leer todos los artículos',fr:'Lire tous les articles',de:'Alle Artikel lesen',it:'Leggi tutti gli articoli',ar:'اقرأ جميع المقالات','zh-CN':'阅读全部文章'},
  'All Insights':{es:'Todos los análisis',fr:'Toutes les analyses',de:'Alle Einblicke',it:'Tutti gli approfondimenti',ar:'جميع الرؤى','zh-CN':'全部洞见'},
  'Newest first':{es:'Más recientes',fr:'Plus récents',de:'Neueste zuerst',it:'Più recenti',ar:'الأحدث أولاً','zh-CN':'最新优先'},
  'By number':{es:'Por número',fr:'Par numéro',de:'Nach Nummer',it:'Per numero',ar:'حسب الرقم','zh-CN':'按编号'},
  'Sort':{es:'Ordenar',fr:'Trier',de:'Sortieren',it:'Ordina',ar:'ترتيب','zh-CN':'排序'},
  'Previous':{es:'Anterior',fr:'Précédent',de:'Zurück',it:'Precedente',ar:'السابق','zh-CN':'上一页'},
  'Next':{es:'Siguiente',fr:'Suivant',de:'Weiter',it:'Successivo',ar:'التالي','zh-CN':'下一页'}};
  function run(root){var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n,list=[];while(n=w.nextNode())list.push(n);
    list.forEach(function(t){var k=t.nodeValue.trim();var e=D[k]&&D[k][L];if(!e||!t.parentElement||t.parentElement.closest('.lang'))return;
      t.nodeValue=t.nodeValue.replace(k,e);var p=t.parentElement;p.classList.add('notranslate');p.setAttribute('translate','no')})}
  run(document.body);
  /* the Menu/Close label changes when the menu opens: translate it again */
  [].forEach.call(document.querySelectorAll('.nav-toggle,.burger'),function(b){new MutationObserver(function(){var k=b.textContent.trim();if(D[k]&&D[k][L])b.textContent=D[k][L]}).observe(b,{childList:true,characterData:true,subtree:true})});
  [].forEach.call(document.querySelectorAll('.lst-pager'),function(p){new MutationObserver(function(){run(p)}).observe(p,{childList:true})});
})();
