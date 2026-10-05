import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/controls/OrbitControls.js";
import { buildCampus } from "./campus.js";
import { buildEnvironment } from "./environment.js";

export function createScene(canvas, quality = "high") {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x071019);
  scene.fog = new THREE.FogExp2(0x071019, quality === "low" ? 0.014 : quality === "medium" ? 0.010 : 0.007);

  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 1000);
  camera.position.set(58, 44, 63);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: quality !== "low", alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality === "low" ? 1.15 : quality === "medium" ? 1.45 : 1.8));
  renderer.shadowMap.enabled = quality !== "low";
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.minDistance = 9;
  controls.maxDistance = 120;
  controls.maxPolarAngle = Math.PI * 0.47;
  controls.target.set(0, 0, 0);

  const hemi = new THREE.HemisphereLight(0xc8dcff, 0x12171b, 2.2);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xffffff, 3.4);
  sun.position.set(38, 65, 30);
  sun.castShadow = quality !== "low";
  sun.shadow.mapSize.set(quality === "high" ? 2048 : 1024, quality === "high" ? 2048 : 1024);
  sun.shadow.camera.left = -70;
  sun.shadow.camera.right = 70;
  sun.shadow.camera.top = 70;
  sun.shadow.camera.bottom = -70;
  scene.add(sun);

  const environment = buildEnvironment(scene, quality);
  const campus = buildCampus(scene, quality);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  return { THREE, scene, camera, renderer, controls, sun, hemi, environment, campus, resize };
}
