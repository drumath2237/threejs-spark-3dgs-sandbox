import "./style.css";

import {
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function main() {
  const renderCanvas = document.querySelector<HTMLCanvasElement>(
    "#renderCanvas",
  );
  if (!renderCanvas) {
    return;
  }

  const scene = new Scene();
  const camera = new PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.01,
    20,
  );
  camera.position.set(0, 0, -1);
  const renderer = new WebGLRenderer({ antialias: true, canvas: renderCanvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new BoxGeometry(0.2, 0.2, 0.2);
  const material = new MeshStandardMaterial({ color: 0xffffff });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  const light = new DirectionalLight();
  light.position.set(1, 2, -1);
  light.target = mesh;
  scene.add(light);

  const controls = new OrbitControls(camera, renderCanvas);

  renderer.setAnimationLoop((time) => {
    renderer.render(scene, camera);
    controls.update(time);
    mesh.rotateY(0.01);
  });
}

main();
