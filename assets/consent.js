/* RSAS cookie consent + tracking. Nothing loads until a visitor presses Accept.
   To switch on, fill in the IDs below (Google Analytics "G-..." and Meta Pixel number). */
(function(){
  var CFG = { ga: '', adsConversion: '', metaPixel: '' };
  var on = CFG.ga || CFG.adsConversion || CFG.metaPixel;
  var link = document.querySelectorAll('.cookie-settings');
  if(!on){ return; } /* no cookies in use: the footer link simply opens the Cookie Policy */
  var KEY='rsas-consent';
  function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function put(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
  gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  function load(){
    gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});
    var id=CFG.ga||CFG.adsConversion;
    if(id){var s=document.createElement('script');s.async=1;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(s);gtag('js',new Date());if(CFG.ga)gtag('config',CFG.ga);if(CFG.adsConversion)gtag('config',CFG.adsConversion)}
    if(CFG.metaPixel){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',CFG.metaPixel);fbq('track','PageView')}
  }
  function banner(){
    if(document.getElementById('ck'))return;
    var d=document.createElement('div');d.id='ck';d.setAttribute('role','dialog');d.setAttribute('aria-label','Cookies');
    d.innerHTML='<p>We would like to use cookies to see how visitors use this site and to show our adverts on Google, Facebook and Instagram. You can say no and the site works just the same. <a href="cookie-policy.html">Cookie Policy</a></p><div><button type="button" data-c="no">Reject</button><button type="button" data-c="yes">Accept</button></div>';
    document.body.appendChild(d);
    d.addEventListener('click',function(e){var c=e.target.getAttribute('data-c');if(!c)return;put(c);d.remove();if(c==='yes')load()});
  }
  var c=get();if(c==='yes')load();else if(c!=='no')banner();
  link.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();try{localStorage.removeItem(KEY)}catch(x){}banner()})});
})();
