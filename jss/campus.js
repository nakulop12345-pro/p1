import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js";

const clickable = [];

function std(c, r=.58, m=.12) { return new THREE.MeshStandardMaterial({color:c, roughness:r, metalness:m}); }

function addWindowRow(group, x, y, z, count, width, depth, color=0x7694a8) {
  const g = new THREE.Group();
  const mat = std(color,.22,.45);
  for(let i=0;i<count;i++){
    const w = new THREE.Mesh(new THREE.BoxGeometry(width,.78,depth), mat);
    w.position.set(x+i*(width+0.95),y,z);
    w.userData.ignoreSelect = true;
    g.add(w);
  }
  group.add(g);
}

function building({id,name,x,z,w,d,h,body=0xc8c7bd,roof=0x56606a,accent=0x9aa5ad,windows=6}) {
  const g = new THREE.Group();
  g.name = name;
  g.userData.zoneId = id;

  const shell = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), std(body,.68,.08));
  shell.position.y = h/2;
  shell.castShadow = true;
  shell.receiveShadow = true;
  g.add(shell);

  const roofMesh = new THREE.Mesh(new THREE.BoxGeometry(w+.7,.42,d+.7), std(roof,.35,.28));
  roofMesh.position.y = h+.22;
  roofMesh.castShadow = true;
  g.add(roofMesh);

  const slab = new THREE.Mesh(new THREE.BoxGeometry(w+.24,.22,d+.24), std(accent,.45,.18));
  slab.position.y = .14;
  g.add(slab);

  const side = new THREE.Mesh(new THREE.BoxGeometry(.28,h*.76,d*.78), std(accent,.55,.1));
  side.position.set(w/2+.12,h*.43,0);
  g.add(side);

  const frontZ = d/2 + .045;
  const usable = Math.max(3, w - 3);
  const spacing = usable / Math.max(1, windows-1);
  for(let row=0;row<2;row++){
    for(let i=0;i<windows;i++){
      const wx = -usable/2 + i*spacing;
      const win = new THREE.Mesh(new THREE.BoxGeometry(.8,.72,.055), std(0x7897ac,.22,.48));
      win.position.set(wx, h*.61 - row*1.55, frontZ);
      g.add(win);
    }
  }

  const door = new THREE.Mesh(new THREE.BoxGeometry(1.5,2.2,.12), std(0x28333a,.45,.35));
  door.position.set(0,1.1,frontZ+.04);
  g.add(door);

  const canopy = new THREE.Mesh(new THREE.BoxGeometry(Math.min(7,w*.6),.22,1.6), std(0xe0e1de,.5,.18));
  canopy.position.set(0,2.55,frontZ+.5);
  g.add(canopy);

  const sign = new THREE.Mesh(new THREE.BoxGeometry(Math.min(8,w*.55),.65,.08), std(0x1b2730,.42,.32));
  sign.position.set(0,h*.8,frontZ+.08);
  g.add(sign);

  const path = new THREE.Mesh(new THREE.BoxGeometry(Math.min(8,w*.52),.08,6), std(0x747a7d,.95,.02));
  path.position.set(0,.05,frontZ+3.3);
  path.rotation.x = 0;
  g.add(path);

  g.position.set(x,0,z);
  clickable.push(g);
  return g;
}

function addEntrance(root){
  const g = new THREE.Group();
  g.name="Main Entrance";
  g.userData.zoneId="entrance";

  const pillarMat=std(0xd8d6d0,.62,.12);
  const dark=std(0x24303a,.38,.24);
  for(const x of [-9,9]){
    const p=new THREE.Mesh(new THREE.BoxGeometry(1.8,8,1.8),pillarMat);
    p.position.set(x,4,40);
    p.castShadow=true;
    g.add(p);
  }
  const beam=new THREE.Mesh(new THREE.BoxGeometry(19,2.2,2.1),dark);
  beam.position.set(0,7.1,40);
  beam.castShadow=true;
  g.add(beam);

  const schoolName=new THREE.Mesh(new THREE.BoxGeometry(12,.8,.12),std(0xf3f5f6,.36,.25));
  schoolName.position.set(0,7.2,41.1);
  g.add(schoolName);

  root.add(g);
  clickable.push(g);
}

function addSports(root){
  const g=new THREE.Group();
  g.name="Sports Grounds";
  g.userData.zoneId="sports";
  const grass=std(0x28523a,.94);
  const field=new THREE.Mesh(new THREE.BoxGeometry(26,.15,42),grass);
  field.position.set(5,.08,-23);
  g.add(field);

  const lineMat=new THREE.MeshBasicMaterial({color:0xe7eee8});
  for(const x of [-8,18]){
    const l=new THREE.Mesh(new THREE.BoxGeometry(.08,.02,38),lineMat);
    l.position.set(x,.17,-23); g.add(l);
  }
  for(const z of [-42,-23,-4]){
    const l=new THREE.Mesh(new THREE.BoxGeometry(25,.02,.08),lineMat);
    l.position.set(5,.17,z); g.add(l);
  }

  const pitch=new THREE.Mesh(new THREE.BoxGeometry(2, .17, 20), std(0xc4a773,.92));
  pitch.position.set(5,.18,-23); g.add(pitch);

  for(const x of [8,11,14]){
    const pole=new THREE.Mesh(new THREE.CylinderGeometry(.05,.07,7,8),std(0x707a80,.45,.25));
    pole.position.set(x,3.5,-49);
    g.add(pole);
  }
  root.add(g);
  clickable.push(g);
}

export function buildCampus(scene){
  const root=new THREE.Group();
  root.name="RPS Digital Campus";
  scene.add(root);

  addEntrance(root);
  building({id:"academic",name:"Academic Quad",x:-10,z:2,w:24,d:13,h:9,body:0xc8c8c1,roof:0x4e5c68,accent:0x9da8af,windows:7});
  building({id:"science",name:"Science & Technology",x:18,z:1,w:17,d:12,h:8,body:0xbcc2c0,roof:0x44525d,accent:0xaab1ae,windows:5});
  building({id:"activity",name:"Activity Centre",x:-16,z:-12,w:17,d:10,h:6,body:0xd2cec4,roof:0x51565a,accent:0xbab1aa,windows:5});
  building({id:"library",name:"Library",x:13,z:-11,w:14,d:10,h:5.5,body:0xd9d4ca,roof:0x3d4b55,accent:0xa3a9ad,windows:5});
  building({id:"central",name:"Central Hall",x:0,z:-1,w:11,d:10,h:4.8,body:0xbfc4c2,roof:0x4c5a64,accent:0xadb5ba,windows:3});
  addSports(root);

  const walk=std(0x777d81,.96,.02);
  const paths=[
    [0,.07,20,5,38],[0,.07,6,60,3],[-12,.07,-5,3,22],[15,.07,-5,3,22],
    [4,.07,-23,3,31],[-16,.07,-9,18,3]
  ];
  for(const [x,y,z,w,d] of paths){
    const p=new THREE.Mesh(new THREE.BoxGeometry(w,.10,d),walk);
    p.position.set(x,y,z);root.add(p);
  }

  const fountain=new THREE.Mesh(new THREE.CylinderGeometry(3.2,.25,.28,48),std(0x89949a,.33,.25));
  fountain.position.set(0,.2,17);root.add(fountain);
  const water=new THREE.Mesh(new THREE.CylinderGeometry(2.8,.12,.10,48),new THREE.MeshStandardMaterial({color:0x4f88a8,roughness:.15,metalness:.1,transparent:true,opacity:.78}));
  water.position.set(0,.39,17);root.add(water);

  return {root, clickable};
}

export function getPickables(){ return clickable; }
