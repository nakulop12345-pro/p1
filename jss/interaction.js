import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js";

export function createInteraction({canvas,camera,scene,getPickables,onHover,onSelect}){
  const ray=new THREE.Raycaster();
  const pointer=new THREE.Vector2();
  let hovered=null;
  let downAt=0;

  function cast(clientX,clientY){
    const r=canvas.getBoundingClientRect();
    pointer.x=((clientX-r.left)/r.width)*2-1;
    pointer.y=-((clientY-r.top)/r.height)*2+1;
    ray.setFromCamera(pointer,camera);
    const hits=ray.intersectObjects(getPickables(),true);
    for(const h of hits){
      let o=h.object;
      while(o && !o.userData.zoneId) o=o.parent;
      if(o?.userData.zoneId) return o;
    }
    return null;
  }

  canvas.addEventListener("pointerdown",()=>{downAt=performance.now()});
  canvas.addEventListener("pointermove",e=>{
    const hit=cast(e.clientX,e.clientY);
    if(hit!==hovered){
      if(hovered) hovered.scale.setScalar(1);
      hovered=hit;
      if(hovered) hovered.scale.setScalar(1.008);
      canvas.style.cursor=hovered?"pointer":"grab";
      onHover?.(hovered?.userData?.zoneId || null);
    }
  });
  canvas.addEventListener("pointerup",e=>{
    if(performance.now()-downAt>280) return;
    const hit=cast(e.clientX,e.clientY);
    if(hit) onSelect?.(hit.userData.zoneId);
  });

  return {cast};
}
