import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { SkyGroundGeometry } from "./SkyGroundGeometry.js";

export const makeMeshSkyGround = (url, radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength) => {
  const degToRad = (deg) => deg ? THREE.MathUtils.degToRad(deg) : undefined;
  const geometry = new SkyGroundGeometry(
    radius,
    segmentsWidth, segmentsHeight,
    degToRad(phiStart), degToRad(phiLength),
    degToRad(thetaStart), degToRad(thetaLength)
  );
  const map = THREE.ImageUtils.loadTexture(url);
  const material = new THREE.MeshBasicMaterial({ map });
  //const material = new THREE.MeshPhongMaterial({ wireframe: true });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};
