import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js";
import { createScene } from "./scene.js";
import { setEnvironmentMode } from "./environment.js";
import { zones, details, campusFacts } from "./data.js";
import { flyTo, cancelCameraFlight } from "./camera.js";
import { createInteraction } from "./interaction.js";
import { createNavigation } from "./navigation.js";
import { createTour } from "./tour.js";
import { mountAcademics } from "./academics.js";
import { mountAchievementHall } from "./achievements.js";

const qs = s => document.querySelector(s);
const loading = qs("#loading");
const loadingBar = qs("#loading-bar");
const loadingStatus = qs("#loading-status");
const intro = qs("#intro");
const topbar = qs("#topbar");
const info = qs("#hud-info");
const panelKicker = qs("#panel-kicker");
const panelTitle = qs("#panel-title");
const panelCopy = qs("#panel-copy");
const panelStats = qs("#panel-stats");
const zoneTag = qs("#zone-tag");
const zoneName = qs("#zone-name");
const detailsOverlay = qs("#details");
const detailsBody = qs("#details-body");
const detailsTitle = qs("#details-title");
const detailsKicker = qs("#details-kicker");
const detailsCopy = qs("#details-copy");
const detailsSource = qs("#details-source");
const toast = qs("#toast");
const tourProgress = qs("#tour-progress");
const tourCount = qs("#tour-count");
const tourName = qs("#tour-name");

let quality = "high";
let evening = false;
let soundOn = true;
let state = "intro";
let currentRoute = "explore";
let audioCtx = null;

function showToast(message){
  toast.textContent=message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer=setTimeout(()=>toast.classList.remove("show"),1900);
}

function sfx(type="tick"){
  if(!soundOn) return;
  try{
    audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
    const o=audioCtx.createOscillator(), g=audioCtx.createGain();
    const now=audioCtx.currentTime;
    o.type="sine";
    o.frequency.setValueAtTime(type==="open"?280:type==="select"?410:220,now);
    o.frequency.exponentialRampToValueAtTime(type==="open"?640:type==="select"?760:320,now+.15);
    g.gain.setValueAtTime(.0001,now);
    g.gain.exponentialRampToValueAtTime(.045,now+.015);
    g.gain.exponentialRampToValueAtTime(.0001,now+.2);
    o.connect(g).connect(audioCtx.destination);
    o.start(now);o.stop(now+.22);
  }catch{}
}

const app = createScene(qs("#webgl"),quality);
const academicsOverlay = mountAcademics(app.scene,THREE);
const achievementHall = mountAchievementHall(app.scene,THREE);

function setLoading(v,status){
  loadingBar.style.width=v+"%";
  loadingStatus.textContent=status;
}
async function boot(){
  const steps=[
    [12,"INITIALIZING 3D ENGINE"],
    [30,"BUILDING CAMPUS GEOMETRY"],
    [48,"LOADING ENVIRONMENT"],
    [65,"CALIBRATING CAMERA"],
    [82,"LOADING VERIFIED SCHOOL DATA"],
    [100,"DIGITAL CAMPUS READY"]
  ];
  for(const [v,t] of steps){
    await new Promise(r=>setTimeout(r,260));
    setLoading(v,t);
  }
  loading.classList.add("hidden");
  intro.classList.remove("hidden");
}

function updateInfo(route){
  currentRoute=route;
  const d=details[route]||details.explore;
  panelKicker.textContent=d.kicker;
  panelTitle.textContent=d.title;
  panelCopy.textContent=d.copy;
  const stats=(route==="campus"?campusFacts.slice(0,4):
    route==="facilities"?campusFacts.slice(4):
    route==="academics"?[["CBSE","BOARD"],["XII","SENIOR SECONDARY"],["JEE","PATHWAY"],["NEET","PATHWAY"]]:
    route==="achievements"?[["JEE","SELECTIONS"],["NEET","SELECTIONS"],["NDA","SELECTIONS"],["2025","KALA KUMBH"]]:
    [["2015","FOUNDATION"],["XII","LEVEL"],["531312","CBSE"],["41300","SCHOOL"]]);
  panelStats.innerHTML=stats.map(([a,b])=>`<div class="stat"><strong>${a}</strong><span>${b}</span></div>`).join("");
  info.classList.remove("hidden");
  academicsOverlay.visible=route==="academics";
  achievementHall.visible=route==="achievements";
}

function openDetails(route=currentRoute){
  const d=details[route]||details.explore;
  detailsKicker.textContent=d.kicker;
  detailsTitle.textContent=d.title;
  detailsCopy.textContent=d.copy;
  detailsBody.innerHTML=d.sections.map(([heading,items])=>`
    <div class="detail-section">
      <h3>${heading}</h3>
      <div class="detail-list">
        ${items.map(([a,b])=>`<div class="detail-item"><strong>${a}</strong><span>${b}</span></div>`).join("")}
      </div>
    </div>`).join("");
  detailsSource.innerHTML=d.sources.map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener">${label} ↗</a>`).join("");
  detailsOverlay.classList.remove("hidden");
  sfx("open");
}

function setRoute(route){
  updateInfo(route);
  const zone =
    route==="academics" ? zones[1] :
    route==="achievements" ? {name:"ACHIEVEMENT HALL",position:[0,18,-52],target:[0,1,-58]} :
    route==="facilities" ? zones[2] :
    zones[6];

  zoneTag.classList.remove("hidden");
  zoneName.textContent=zone.name;
  cancelCameraFlight();
  flyTo(app.camera,app.controls,zone.position,zone.target,1450);
  showToast(route.toUpperCase());
  sfx("select");
}

const interaction=createInteraction({
  canvas:qs("#webgl"),
  camera:app.camera,
  scene:app.scene,
  getPickables:()=>app.campus.clickable,
  onHover:(zoneId)=>{
    if(zoneId){
      const z=zones.find(x=>x.id===zoneId);
      zoneTag.classList.remove("hidden");
      zoneName.textContent=z?.name||zoneId.toUpperCase();
    }
  },
  onSelect:(zoneId)=>{
    const z=zones.find(x=>x.id===zoneId);
    if(!z) return;
    currentRoute=z.route;
    updateInfo(currentRoute);
    const target=z.target;
    flyTo(app.camera,app.controls,z.position,target,1200);
    zoneTag.classList.remove("hidden");
    zoneName.textContent=z.name;
    showToast(z.title.toUpperCase());
    sfx("select");
  }
});

const tour=createTour({
  camera:app.camera,
  controls:app.controls,
  onStep:(z,index,total)=>{
    tourProgress.classList.remove("hidden");
    tourCount.textContent=String(index+1).padStart(2,"0")+" / "+String(total).padStart(2,"0");
    tourName.textContent=z.name;
    zoneName.textContent=z.name;
    zoneTag.classList.remove("hidden");
  },
  onEnd:()=>{
    tourProgress.classList.add("hidden");
    showToast("TOUR COMPLETE");
  }
});

createNavigation({onRoute:setRoute});

qs("#enter-campus").addEventListener("click",async()=>{
  intro.classList.add("hidden");
  topbar.classList.remove("hidden");
  qs("#footer").classList.remove("hidden");
  updateInfo("explore");
  state="exploring";
  await flyTo(app.camera,app.controls,[20,18,27],[0,2,0],2100);
  showToast("WELCOME TO RPS DHARUHERA");
  sfx("open");
});

qs("#brand-home").addEventListener("click",e=>{e.preventDefault();setRoute("explore")});
qs("#panel-action").addEventListener("click",()=>openDetails());
qs("#details-close").addEventListener("click",()=>detailsOverlay.classList.add("hidden"));
qs("#details-backdrop").addEventListener("click",()=>detailsOverlay.classList.add("hidden"));
qs("#tour-btn").addEventListener("click",()=>{tour.play();sfx("open")});
qs("#tour-stop").addEventListener("click",()=>tour.stop());

qs("#time-btn").addEventListener("click",()=>{
  evening=!evening;
  qs("#time-btn").textContent=evening?"EVE":"DAY";
  setEnvironmentMode(app.environment,app.sun,app.hemi,evening);
  showToast(evening?"EVENING MODE":"DAY MODE");
  sfx("tick");
});
qs("#quality-btn").addEventListener("click",()=>{
  quality=quality==="high"?"medium":quality==="medium"?"low":"high";
  qs("#quality-btn").textContent=quality.toUpperCase();
  app.renderer.setPixelRatio(Math.min(devicePixelRatio,quality==="low"?1.15:quality==="medium"?1.45:1.8));
  app.renderer.shadowMap.enabled=quality!=="low";
  showToast("QUALITY · "+quality.toUpperCase());
});
qs("#sound-btn").addEventListener("click",()=>{
  soundOn=!soundOn;
  qs("#sound-btn").textContent=soundOn?"SFX":"MUTE";
  showToast(soundOn?"SOUND ON":"SOUND OFF");
});
qs("#mobile-menu").addEventListener("click",()=>{
  const menu=qs("#mobile-nav");
  const open=!menu.classList.contains("hidden");
  menu.classList.toggle("hidden",open);
  qs("#mobile-menu").setAttribute("aria-expanded",String(!open));
});

window.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    detailsOverlay.classList.add("hidden");
    tour.stop();
  }else if(e.key.toLowerCase()==="f"){
    document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.();
  }else if(e.key.toLowerCase()==="t"){
    tour.play();
  }else if(e.key.toLowerCase()==="d"){
    evening=false;setEnvironmentMode(app.environment,app.sun,app.hemi,false);qs("#time-btn").textContent="DAY";
  }else if(e.key.toLowerCase()==="e"){
    evening=true;setEnvironmentMode(app.environment,app.sun,app.hemi,true);qs("#time-btn").textContent="EVE";
  }
});

let clock=new THREE.Clock();
function animate(){
  requestAnimationFrame(animate);
  const dt=Math.min(.05,clock.getDelta());
  app.controls.update();
  app.environment.points.rotation.y += dt*.012;
  academicsOverlay.rotation.y += dt*.18;
  achievementHall.rotation.y += dt*.05;
  app.renderer.render(app.scene,app.camera);
}
animate();
boot();
