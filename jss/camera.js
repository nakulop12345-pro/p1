import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js";

let activeTween = null;

function easeInOutCubic(t){
  return t < .5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;
}

export function flyTo(camera, controls, position, target, duration=1500){
  const fromP=camera.position.clone();
  const fromT=controls.target.clone();
  const toP=new THREE.Vector3(...position);
  const toT=new THREE.Vector3(...target);
  const start=performance.now();
  activeTween={cancelled:false};

  return new Promise(resolve=>{
    const my=activeTween;
    function step(now){
      if(my.cancelled){resolve(false);return;}
      const p=Math.min(1,(now-start)/duration);
      const e=easeInOutCubic(p);
      camera.position.lerpVectors(fromP,toP,e);
      controls.target.lerpVectors(fromT,toT,e);
      controls.update();
      if(p<1) requestAnimationFrame(step);
      else {activeTween=null;resolve(true);}
    }
    requestAnimationFrame(step);
  });
}

export function cancelCameraFlight(){
  if(activeTween) activeTween.cancelled=true;
}
