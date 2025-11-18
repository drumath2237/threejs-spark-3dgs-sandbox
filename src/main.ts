import "./style.css";

import { SplatMesh } from "@sparkjsdev/spark";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import gsAssetPath from "../assets/pizza.sog?url";

function main() {
  const renderCanvas =
    document.querySelector<HTMLCanvasElement>("#renderCanvas");
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
  camera.position.set(0, 0.2, -0.4);
  const renderer = new WebGLRenderer({ antialias: true, canvas: renderCanvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const splat = new SplatMesh({ url: gsAssetPath });
  splat.rotateX(Math.PI);
  scene.add(splat);

  const controls = new OrbitControls(camera, renderCanvas);

  renderer.setAnimationLoop((time) => {
    renderer.render(scene, camera);
    controls.update(time);
  });
}

main();
