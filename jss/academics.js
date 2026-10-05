export const academicSubjects = [
  {name:"PHYSICS",x:-18,z:14},
  {name:"CHEMISTRY",x:-6,z:14},
  {name:"BIOLOGY",x:6,z:14},
  {name:"MATHEMATICS",x:18,z:14},
  {name:"COMPUTER SCIENCE",x:28,z:14}
];

export function mountAcademics(scene, THREE){
  const group=new THREE.Group();
  group.name="Academic Overlay";
  group.visible=false;
  const mat=new THREE.MeshBasicMaterial({color:0xd8eaff,transparent:true,opacity:.65});
  academicSubjects.forEach((s,i)=>{
    const ring=new THREE.Mesh(new THREE.RingGeometry(1.15,1.22,40),mat.clone());
    ring.rotation.x=-Math.PI/2;
    ring.position.set(s.x,.45,s.z);
    group.add(ring);
  });
  scene.add(group);
  return group;
}
