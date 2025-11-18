import "./style.css";

import { SplatMesh } from "@sparkjsdev/spark";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import pizza from "../assets/pizza.sog?url";
import sushi from "../assets/sushi.sog?url";

async function main() {
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

  const controls = new OrbitControls(camera, renderCanvas);

  const sushiSplat = new SplatMesh({ url: sushi });
  sushiSplat.rotateX(Math.PI);
  sushiSplat.position.set(0.1, 0.02, -0.1);
  scene.add(sushiSplat);

  const sushiSplat2 = new SplatMesh({ packedSplats: sushiSplat.packedSplats });
  sushiSplat2.rotateX(Math.PI);
  sushiSplat2.position.set(-0.3, 0.02, -0.1);
  scene.add(sushiSplat2);

  const pizzaSplat = new SplatMesh({ url: pizza });
  pizzaSplat.rotateX(Math.PI);
  pizzaSplat.position.set(-0.1, 0, 0);
  scene.add(pizzaSplat);

  renderer.setAnimationLoop((time) => {
    renderer.render(scene, camera);
    controls.update(time);
  });
}

main();
