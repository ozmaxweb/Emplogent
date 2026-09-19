
/* ===== contact constants ===== */
const WA='918808884196', EMAIL='emplogent@gmail.com';
document.getElementById('waFab').href='https://wa.me/'+WA+'?text='+encodeURIComponent("Hi Emplogent! I'd like to know more about your AI services.");
document.getElementById('waDirect').href='https://wa.me/'+WA+'?text='+encodeURIComponent("Hi Emplogent! I'd like to book a demo.");

/* ===== 3D scroll scene ===== */
(function(){
  try{
  const canvas=document.getElementById('bg');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!window.THREE){document.documentElement.classList.add('noWebgl');return;}
  let renderer,scene,camera,field,coreGroup,coreLine,coreGlow,corePts,raf;
  let scrollP=0,mx=0,my=0,tmx=0,tmy=0;
  const DPR=Math.min(window.devicePixelRatio||1,2);
  function dot(){const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.2,'rgba(255,205,140,.95)');g.addColorStop(.55,'rgba(255,140,45,.45)');g.addColorStop(1,'rgba(255,120,30,0)');x.fillStyle=g;x.beginPath();x.arc(32,32,32,0,Math.PI*2);x.fill();const t=new THREE.CanvasTexture(c);t.needsUpdate=true;return t;}
  function init(){
    scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x050506,0.055);
    camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,0.1,100);camera.position.set(0,0,6);
    renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});renderer.setPixelRatio(DPR);renderer.setSize(innerWidth,innerHeight);
    const COUNT=innerWidth<640?1100:2300;
    const pos=new Float32Array(COUNT*3),col=new Float32Array(COUNT*3);
    const cA=new THREE.Color(0xFF6A15),cB=new THREE.Color(0xFFB020),cC=new THREE.Color(0xFFFFFF);
    for(let i=0;i<COUNT;i++){const r=3.2+Math.pow(Math.random(),.6)*7.5;const th=Math.random()*Math.PI*2,ph=Math.acos(2*Math.random()-1);
      pos[i*3]=r*Math.sin(ph)*Math.cos(th);pos[i*3+1]=r*Math.sin(ph)*Math.sin(th)*0.7;pos[i*3+2]=r*Math.cos(ph);
      const t=Math.random();const c=t<0.08?cC:(t<0.55?cA.clone().lerp(cB,Math.random()):cB);col[i*3]=c.r;col[i*3+1]=c.g;col[i*3+2]=c.b;}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));
    field=new THREE.Points(g,new THREE.PointsMaterial({size:0.08,map:dot(),vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,sizeAttenuation:true,opacity:.95}));scene.add(field);
    coreGroup=new THREE.Group();scene.add(coreGroup);
    const ico=new THREE.IcosahedronGeometry(1.25,1);
    coreLine=new THREE.LineSegments(new THREE.EdgesGeometry(ico),new THREE.LineBasicMaterial({color:0xFFAA3A,transparent:true,opacity:.9}));coreGroup.add(coreLine);
    coreGlow=new THREE.Mesh(new THREE.IcosahedronGeometry(0.9,1),new THREE.MeshBasicMaterial({color:0xFF7A20,transparent:true,opacity:.28,blending:THREE.AdditiveBlending}));coreGroup.add(coreGlow);
    const cg=new THREE.BufferGeometry();cg.setAttribute('position',ico.getAttribute('position'));
    corePts=new THREE.Points(cg,new THREE.PointsMaterial({size:0.14,map:dot(),color:0xFFC96B,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));coreGroup.add(corePts);
    addEventListener('resize',onResize);
    addEventListener('pointermove',e=>{tmx=(e.clientX/innerWidth-.5)*2;tmy=(e.clientY/innerHeight-.5)*2;});
    onScroll();if(reduce){renderOnce();}else{raf=requestAnimationFrame(tick);}
  }
  function onResize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);}
  function onScroll(){const h=document.documentElement.scrollHeight-innerHeight;scrollP=h>0?Math.min(1,Math.max(0,scrollY/h)):0;}
  addEventListener('scroll',onScroll,{passive:true});
  const clock=new THREE.Clock();
  function tick(){const t=clock.getElapsedTime();mx+=(tmx-mx)*0.045;my+=(tmy-my)*0.045;
    field.rotation.y=t*0.02+scrollP*Math.PI*0.9;field.rotation.x=Math.sin(t*0.08)*0.06-scrollP*0.25;
    coreGroup.rotation.y=t*0.28;coreGroup.rotation.x=t*0.16;
    const cs=Math.max(0.0001,1-scrollP*1.6);coreGroup.scale.setScalar(cs);
    coreLine.material.opacity=.9*cs;coreGlow.material.opacity=.28*cs;corePts.material.opacity=cs;
    const tz=6-scrollP*2.2;
    camera.position.x+=((mx*0.8)-camera.position.x)*0.05;camera.position.y+=((-my*0.6)-camera.position.y)*0.05;camera.position.z+=(tz-camera.position.z)*0.05;
    camera.lookAt(0,0,0);renderer.render(scene,camera);raf=requestAnimationFrame(tick);}
  function renderOnce(){coreGroup.rotation.set(.3,.5,0);field.rotation.set(.1,.4,0);renderer.render(scene,camera);}
  init();
  document.addEventListener('visibilitychange',()=>{if(reduce)return;if(document.hidden){cancelAnimationFrame(raf);}else{raf=requestAnimationFrame(tick);}});
  }catch(err){document.documentElement.classList.add('noWebgl');}
})();

/* ===== nav + reveal ===== */
const nav=document.getElementById('nav'),menuBtn=document.getElementById('menuBtn'),navLinks=document.getElementById('navLinks');
const onScrollNav=()=>nav.classList.toggle('solid',scrollY>40);onScrollNav();addEventListener('scroll',onScrollNav,{passive:true});
menuBtn.addEventListener('click',()=>{const o=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',o)});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuBtn.setAttribute('aria-expanded',false)}));
if(matchMedia('(prefers-reduced-motion: no-preference)').matches){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'))}

/* ===== Obi chat ===== */
const body=document.getElementById('chatBody'),input=document.getElementById('chatInput'),send=document.getElementById('chatSend'),chips=document.getElementById('chatChips');
const waLink='https://wa.me/'+WA;
const KB=[
  {k:['hi','hello','hey','namaste'],a:"Hi! I'm Obi, Emplogent's AI assistant. I can explain what we build and help you get started. What kind of business do you run?"},
  {k:['what','do you do','who are you','about','emplogent','services'],a:"Emplogent helps businesses build with AI and automate repetitive work. We build AI agents, AI automations, AI-powered websites and apps, and custom AI solutions. What kind of business do you run?"},
  {k:['agent','chatbot','bot','assistant'],a:"We build AI agents that answer questions, qualify leads, collect info, book appointments and hand off to your team — on WhatsApp, your website, or inside an app. What would you want yours to handle?"},
  {k:['whatsapp'],a:"Yes — we build WhatsApp AI agents that answer customers, qualify leads, collect details and trigger connected workflows. What do most of your WhatsApp enquiries ask about?"},
  {k:['automat','workflow','crm','follow up','follow-up','lead','spreadsheet'],a:"We can automate the repetitive parts — lead capture, CRM updates, follow-ups, onboarding and notifications. Where are those leads or tasks coming from right now?"},
  {k:['website','site','web','landing'],a:"We build modern, AI-assisted websites — from landing pages to e-commerce — and can add an AI assistant to capture leads. What's the site's main goal?"},
  {k:['app','application','mobile'],a:"We build custom web and mobile apps shaped around your workflow, with AI where it helps. What would customers or staff do inside the app?"},
  {k:['gym','fitness'],a:"For a gym, an AI agent can handle timings, membership plans, trial requests, lead qualification and renewal follow-ups — often over WhatsApp. What do you get asked about most?"},
  {k:['restaurant','cafe','café','food','menu'],a:"For a restaurant or café, agents handle menu FAQs, hours, location, reservations and route enquiries to your staff. Want it on WhatsApp or your website?"},
  {k:['clinic','doctor','hospital','medical','dental'],a:"For a clinic, an agent can handle appointment enquiries, timings, service info and reminders. It won't give medical advice — that stays with your professionals. Shall I take your details for a demo?"},
  {k:['real estate','property','realtor','broker'],a:"For real estate, an agent can capture property enquiries, collect budget and requirements, qualify leads and update your CRM. What kind of properties do you handle?"},
  {k:['coaching','institute','course','education','student','tuition'],a:"For coaching, an agent can answer course, batch, timing and fee FAQs, handle admission enquiries and qualify student leads. Want to see a demo?"},
  {k:['price','cost','pricing','charge','how much','fee','budget','package'],a:"Pricing depends on what you're building — complexity, integrations and usage. Our model is a one-time setup fee plus a simple monthly plan covering hosting, AI usage and maintenance. Tell me what you'd like to build and I'll help you get an exact quote."},
  {k:['how long','timeline','deliver','time take','when ready'],a:"Timelines depend on complexity, integrations and customisation. Share what you need and we can give you an exact estimate. Want to book a quick demo?"},
  {k:['hindi','hinglish','language','bhasha'],a:"Haan, bilkul! Obi English, Hindi aur Hinglish — teeno mein baat kar sakta hai. Aapka business kis baare mein hai?"},
  {k:['contact','email','phone','number','reach','mobile','call'],a:'You can reach Emplogent on WhatsApp at <a href="'+waLink+'" target="_blank" rel="noopener">+91 88088 84196</a> or email <a href="mailto:'+EMAIL+'">'+EMAIL+'</a>. Want me to help you book a demo?'},
  {k:['human','team','someone','talk to'],a:'Of course — I can connect you with the Emplogent team. Message us on <a href="'+waLink+'" target="_blank" rel="noopener">WhatsApp</a> or share your name and business and I\'ll pass it along.'},
  {k:['demo','consult','book','get started','start','sign up'],a:'Great! The quickest way is the "Book a demo" form just below — it opens WhatsApp with your details ready to send. Or message us directly on <a href="'+waLink+'" target="_blank" rel="noopener">WhatsApp</a>.'},
  {k:['secure','security','data','privacy','safe'],a:"Your data is handled with secure credentials, access controls and authentication, and isn't shared with other customers. Anything you'd like me to pass to the team?"},
  {k:['founder','obaid','owner','who made','who built','ceo'],a:"Emplogent was founded by Obaid Sheikh, an entrepreneur and AI enthusiast on a mission to make powerful AI accessible to businesses of every size. You can read more in the About section above."},
  {k:['thank','thanks','great','cool','awesome','nice'],a:"Happy to help! Whenever you're ready, tell me about your business and I'll point you to the right solution — or book a quick demo below."}
];
const FALLBACK="Good question. I can help with AI agents, automation, websites, apps and custom AI. Tell me a little about your business and what you'd like to improve, and I'll suggest the best fit — or you can message the team on WhatsApp.";
function addMsg(text,who,asHtml){const d=document.createElement('div');d.className='msg '+who;if(asHtml){d.innerHTML=text;}else{d.textContent=text;}body.appendChild(d);body.scrollTop=body.scrollHeight;}
function match(q){const s=q.toLowerCase();for(const it of KB){if(it.k.some(k=>s.includes(k)))return it.a;}return FALLBACK;}
const OBI_ENDPOINT='/api/chat'; // Obi backend. For n8n: set to your webhook URL, e.g. 'https://n8n.emplogent.com/webhook/obi'
const history=[];
function showTyping(){const t=document.createElement('div');t.className='typing';t.innerHTML='<span></span><span></span><span></span>';body.appendChild(t);body.scrollTop=body.scrollHeight;return t;}
async function botReply(q){const t=showTyping();try{const res=await fetch(OBI_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history.slice(-8)})});const data=await res.json().catch(()=>({}));t.remove();if(res.ok&&data.reply){addMsg(data.reply,'bot');history.push({role:'assistant',content:data.reply});}else{addMsg((data&&data.error)||match(q).replace(/<[^>]+>/g,''),'bot');}}catch(e){t.remove();addMsg(match(q).replace(/<[^>]+>/g,''),'bot');}}
function ask(q){if(!q.trim())return;addMsg(q,'user');history.push({role:'user',content:q});input.value='';botReply(q);}
send.addEventListener('click',()=>ask(input.value));
input.addEventListener('keydown',e=>{if(e.key==='Enter')ask(input.value)});
chips.addEventListener('click',e=>{const b=e.target.closest('.chip');if(b)ask(b.dataset.q)});
setTimeout(()=>addMsg("Hi! I'm Obi 👋 Emplogent's AI assistant. Ask me what we build, or tap a question below.",'bot',true),400);

/* ===== demo form -> WhatsApp ===== */
const form=document.getElementById('demoForm'),success=document.getElementById('demoSuccess');
form.addEventListener('submit',e=>{
  e.preventDefault();
  const name=document.getElementById('f-name').value.trim(),biz=document.getElementById('f-biz').value.trim();
  const does=document.getElementById('f-does').value.trim(),need=document.getElementById('f-need').value.trim();
  if(!name||!biz){[['f-name',name],['f-biz',biz]].forEach(([id,v])=>{if(!v)document.getElementById(id).style.borderColor='rgba(255,90,60,.75)';});return;}
  const msg="Hi Emplogent! I'd like to book a demo.\n\nName: "+name+"\nBusiness: "+biz+(does?("\nWhat we do: "+does):"")+(need?("\nLooking to build/automate: "+need):"");
  window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank');
  form.style.display='none';success.classList.add('show');
});
