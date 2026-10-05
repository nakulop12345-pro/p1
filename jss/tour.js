import { zones } from "./data.js";
import { flyTo } from "./camera.js";

export function createTour({camera,controls,onStep,onEnd}){
  let running=false;
  let index=0;
  let token=0;

  async function play(){
    if(running) return;
    running=true; index=0; token++;
    const my=token;
    while(running && my===token && index<zones.length){
      const z=zones[index];
      onStep?.(z,index,zones.length);
      await flyTo(camera,controls,z.position,z.target,1800);
      if(!running) break;
      await new Promise(r=>setTimeout(r,1500));
      index++;
    }
    if(my===token){running=false;onEnd?.();}
  }
  function stop(){running=false;token++}
  return {play,stop,isRunning:()=>running};
}
