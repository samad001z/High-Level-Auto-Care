// three.js hero car. Dynamically imported after load, so it never blocks first paint / LCP.
// Model: "lamborghini huracan green" by 0dede0 (Sketchfab), CC BY 4.0. Credit is in the footer.
// Source in assets/model/, optimised with: gltf-transform optimize --compress meshopt --texture-compress webp --texture-size 1024 --palette false
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

export const MODEL_URL = "/models/huracan.glb";
const PAINT = "#0c7a26"; // matched to their gloss green Huracán wrap

/** Soft radial contact shadow, drawn once to a canvas. */
function contactShadow(len: number, wid: number) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 8, 64, 64, 64);
  grad.addColorStop(0, "rgba(0,0,0,.85)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(wid * 1.9, len * 1.35),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }),
  );
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.005;
  return m;
}

export async function mountCar(host: HTMLElement, mobile: boolean) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%";

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.6;
  const key = new THREE.DirectionalLight(0xfff4ea, 2.2);
  key.position.set(4, 7, 5);
  const rim = new THREE.DirectionalLight(0xff2a3c, 2.4); // brand red kiss on the far edge
  rim.position.set(-5, 2.5, -6);
  scene.add(key, rim);

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);

  const gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(MODEL_URL);
  const car = gltf.scene;

  car.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    for (const mat of [mesh.material].flat() as THREE.MeshStandardMaterial[]) {
      if (mat.name === "CSR2_CarPaint") {
        mat.color.set(PAINT);
        mat.metalness = 0.55;
        mat.roughness = 0.22;
        if ("clearcoat" in mat) Object.assign(mat, { clearcoat: 1, clearcoatRoughness: 0.03 });
      }
      // Transmission needs an extra render pass; plain transparency is plenty on phones.
      if (mobile && "transmission" in mat && (mat as THREE.MeshPhysicalMaterial).transmission > 0) {
        Object.assign(mat, { transmission: 0, transparent: true, opacity: 0.4 });
      }
    }
  });

  // Normalise: 4.5 units long, centred, wheels on y = 0. The model's nose points +Z (towards the camera at p = 0).
  const box = new THREE.Box3().setFromObject(car);
  const size = box.getSize(new THREE.Vector3());
  car.scale.setScalar(4.5 / Math.max(size.x, size.z));
  box.setFromObject(car);
  box.getSize(size);
  const c = box.getCenter(new THREE.Vector3());
  car.position.set(-c.x, -box.min.y, -c.z);
  const L = size.z, W = size.x, H = size.y;
  scene.add(car, contactShadow(L, W));

  host.appendChild(renderer.domElement);

  let aspect = 1;
  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    aspect = w / h;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  };
  resize();

  const vHalf = THREE.MathUtils.degToRad(camera.fov / 2);
  const ease = (t: number) => t * t * (3 - 2 * t);

  /** p: 0..1 scroll progress. Head-on -> side profile -> rear three quarter, framed to fit at every angle. */
  const render = (p: number) => {
    const a = ease(Math.min(1, Math.max(0, p)));
    const yaw = THREE.MathUtils.degToRad(a * 205);
    const sy = Math.abs(Math.sin(yaw)), cy = Math.abs(Math.cos(yaw));
    const projW = sy * L + cy * W; // silhouette width seen from this angle
    const nearHalf = (cy * L + sy * W) / 2; // how far the closest face sticks out towards the camera
    const hHalf = Math.atan(Math.tan(vHalf) * aspect);
    const fill = mobile ? 0.96 : 0.6;
    const dist =
      Math.max((projW / 2 / fill) / Math.tan(hHalf), (H / 2 / 0.62) / Math.tan(vHalf)) + nearHalf;
    const elev = THREE.MathUtils.degToRad(9 + Math.sin(a * Math.PI) * 7);
    const d = dist * (1 - Math.sin(a * Math.PI) * 0.06);
    camera.position.set(Math.sin(yaw) * d * Math.cos(elev), H * 0.42 + Math.sin(elev) * d, Math.cos(yaw) * d * Math.cos(elev));
    camera.lookAt(0, H * 0.42, 0);
    renderer.render(scene, camera);
  };

  return {
    render,
    resize,
    dispose() {
      renderer.dispose();
      pmrem.dispose();
      renderer.domElement.remove();
    },
  };
}
