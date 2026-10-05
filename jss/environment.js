import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js";

function material(color, roughness = .8, metalness = .05) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

export function buildEnvironment(scene, quality) {
  const root = new THREE.Group();
  root.name = "Environment";
  scene.add(root);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(220, 220), material(0x17211c, .96));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  root.add(ground);

  const plaza = new THREE.Mesh(new THREE.CircleGeometry(18, 64), material(0x7a8285, .86));
  plaza.rotation.x = -Math.PI / 2;
  plaza.position.y = .02;
  root.add(plaza);

  const road = new THREE.Mesh(new THREE.PlaneGeometry(170, 13), material(0x252a2d, .92));
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, .03, 53);
  root.add(road);

  const road2 = road.clone();
  road2.rotation.z = Math.PI / 2;
  road2.scale.set(.17, 1.05, 1);
  road2.position.set(55, .04, 0);
  root.add(road2);

  const parking = new THREE.Group();
  const parkingMat = material(0x2e3438, .9);
  for (let i = -5; i <= 5; i++) {
    const slot = new THREE.Mesh(new THREE.PlaneGeometry(4.3, 9), parkingMat);
    slot.rotation.x = -Math.PI / 2;
    slot.position.set(i * 5.5, .055, 50);
    parking.add(slot);
  }
  root.add(parking);

  const trees = new THREE.Group();
  const count = quality === "low" ? 22 : quality === "medium" ? 38 : 56;
  const trunkGeo = new THREE.CylinderGeometry(.14, .2, 2.1, 7);
  const crownGeo = new THREE.IcosahedronGeometry(1.25, 1);
  const trunkMat = material(0x4a3628, .95);
  const crownMat = material(0x294f39, .9);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 28 + Math.random() * 62;
    let x = Math.cos(angle) * radius;
    let z = Math.sin(angle) * radius;
    if (Math.abs(x) < 22 && Math.abs(z) < 32) { i--; continue; }

    const t = new THREE.Mesh(trunkGeo, trunkMat);
    t.position.set(x, 1.05, z);
    if (quality !== "low") t.castShadow = true;
    trees.add(t);

    const c = new THREE.Mesh(crownGeo, crownMat);
    c.position.set(x, 2.7 + Math.random() * .7, z);
    c.scale.setScalar(.72 + Math.random() * .45);
    if (quality !== "low") c.castShadow = true;
    trees.add(c);
  }
  root.add(trees);

  const ambient = new THREE.Group();
  const particleCount = quality === "low" ? 150 : quality === "medium" ? 260 : 420;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i*3] = (Math.random() - .5) * 150;
    positions[i*3+1] = 2 + Math.random() * 38;
    positions[i*3+2] = (Math.random() - .5) * 150;
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const points = new THREE.Points(pg, new THREE.PointsMaterial({
    color: 0xd8e9ff, size: quality === "high" ? .08 : .06, transparent: true, opacity: .28, depthWrite: false
  }));
  ambient.add(points);
  root.add(ambient);

  return { root, trees, points, plaza };
}

export function setEnvironmentMode(env, sun, hemi, evening) {
  if (evening) {
    sun.color.set(0xffd8b0);
    sun.intensity = 1.8;
    hemi.color.set(0x8aa8d8);
    hemi.groundColor.set(0x0f1216);
    env.root.getObjectByName("night-bloom")?.visible && (env.root.getObjectByName("night-bloom").visible = true);
  } else {
    sun.color.set(0xffffff);
    sun.intensity = 3.4;
    hemi.color.set(0xc8dcff);
    hemi.groundColor.set(0x12171b);
    const bloom = env.root.getObjectByName("night-bloom");
    if (bloom) bloom.visible = false;
  }
}
