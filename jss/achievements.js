export const achievementHighlights = [
  ["JEE", "Published academic selection and result pages"],
  ["NEET", "Published academic selection and result pages"],
  ["NDA", "Published competitive-exam selection information"],
  ["KALA KUMBH 2025", "1st position · Live Kathak Duet · Junior category"],
  ["SPORTS 2026–27", "Current sports-achievement page published by the school"]
];

export function mountAchievementHall(scene, THREE){
  const group=new THREE.Group();
  group.name="Achievement Hall";
  group.visible=false;
  const floor=new THREE.Mesh(new THREE.CircleGeometry(12,64),new THREE.MeshStandardMaterial({color:0x10161c,roughness:.9}));
  floor.rotation.x=-Math.PI/2;
  floor.position.y=.06;
  group.add(floor);
  for(let i=0;i<achievementHighlights.length;i++){
    const a=(i/achievementHighlights.length)*Math.PI*2;
    const p=new THREE.Mesh(new THREE.BoxGeometry(5,.12,2.7),new THREE.MeshStandardMaterial({color:0x23303a,roughness:.5,metalness:.3}));
    p.position.set(Math.cos(a)*7,1.8,Math.sin(a)*7);
    p.lookAt(0,1.8,0);
    group.add(p);
  }
  group.position.set(0,.2,-58);
  scene.add(group);
  return group;
}
