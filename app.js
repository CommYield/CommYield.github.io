// Join form (MailerLite endpoint and form ID unchanged from the live site)
function handleJoinSubmit(e){
  e.preventDefault();
  var name=document.getElementById('join-name').value.trim();
  var email=document.getElementById('join-email').value.trim();
  if(!name||!email)return;
  var btn=document.getElementById('join-btn');
  var status=document.getElementById('join-status');
  btn.textContent='Joining...';btn.disabled=true;status.textContent='';
  var done=false,timer=null;
  function track(){try{gtag('event','generate_lead',{method:'email_join',page:location.pathname});}catch(x){}}
  function showSuccess(unconfirmed){
    if(done)return;done=true;clearTimeout(timer);track();
    btn.textContent='Check your email';btn.disabled=true;
    status.textContent=unconfirmed?'Almost done. Check your email to confirm your signup. If it does not arrive within a few minutes, check your spam folder.':'Almost done. Check your email to confirm your signup.';
  }
  function showUnconfirmedOrError(){
    if(done)return;
    if(navigator.onLine===false){done=true;clearTimeout(timer);btn.textContent='Join CommYield';btn.disabled=false;status.textContent='Something went wrong. Please try again in a moment.';return;}
    showSuccess(true);
  }
  var cb='ml_callback_'+Date.now();
  window[cb]=function(){showSuccess(false);var s=document.getElementById('ml-jsonp-script');if(s)s.remove();};
  var params=new URLSearchParams({'fields[name]':name,'fields[email]':email,'ml-submit':'1','anticsrf':'true','callback':cb});
  var script=document.createElement('script');
  script.id='ml-jsonp-script';
  script.src='https://assets.mailerlite.com/jsonp/2222999/forms/182979314445190291/subscribe?'+params.toString();
  script.onerror=showUnconfirmedOrError;
  timer=setTimeout(showUnconfirmedOrError,8000);
  document.body.appendChild(script);
}
// Click tracking for key links (data-evt)
document.addEventListener('click',function(ev){
  var a=ev.target.closest&&ev.target.closest('a[data-evt]');
  if(!a)return;
  try{gtag('event','cta_click',{cta:a.getAttribute('data-evt'),link_url:a.href});}catch(x){}
});
