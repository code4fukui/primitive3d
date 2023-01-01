import * as THREE from "https://cdn.skypack.dev/three@0.136.0";

const BufferGeometry = THREE.BufferGeometry;
const Vector3 = THREE.Vector3;
const Float32BufferAttribute = THREE.Float32BufferAttribute;

class SkyGroundGeometry extends BufferGeometry {
	constructor(radius = 800, widthSegments = 256, heightSegments = 32, phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI, ground = 0) {
		super();
		this.type = 'SkyGroundGeometry';

		this.parameters = {
			radius,
			widthSegments,
			heightSegments,
			phiStart,
			phiLength,
			thetaStart,
			thetaLength
		};

		widthSegments = Math.max(3, Math.floor(widthSegments));
		heightSegments = Math.max(2, Math.floor(heightSegments));
		const heightSegments2 = heightSegments / 2;

		const thetaEnd = Math.min(thetaStart + thetaLength, Math.PI);

		let index = 0;
		const grid = [];

		const vertex = new Vector3();
		const normal = new Vector3();

		// buffers
		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		const reverseTexture = true;

		// generate vertices, normals and uvs
		for (let iy = 0; iy <= heightSegments; iy++) {
			const verticesRow = [];
			const v = iy / heightSegments;

			// special case for the poles
			let uOffset = 0;
			if (iy == 0 && thetaStart == 0) {
				uOffset = 0.5 / widthSegments;
			} else if (iy == heightSegments && thetaEnd == Math.PI) {
				uOffset = - 0.5 / widthSegments;
			}

			for (let ix = 0; ix <= widthSegments; ix++) {
				const u = ix / widthSegments;

				// vertex
				if (iy > heightSegments2) { // iy 18-36
				//if (false) {
					vertex.y = 0;
					//vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
					const x = Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
					const z = Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
					//const d = Math.sqrt(x * x + z * z);
					//const r = radius * Math.pow(1 - (iy - heightSegments2) / heightSegments2, 4);
					//const r = radius * Math.pow(d, 0);
					//console.log(r, d);
					//vertex.x = -r * x;
					//vertex.z = r * z;
					vertex.x = -radius * x;
					vertex.z = radius * z;
				} else {
					vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
					vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
					vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
				}
				vertices.push(vertex.x, vertex.y, vertex.z);

				// normal
				normal.copy(vertex).normalize();
				normals.push(normal.x, normal.y, normal.z);

				// uv
				if (reverseTexture) {
					uvs.push(1 - (u + uOffset), 1 - v);
				} else {
					uvs.push(1 - (u + uOffset), 1 - v);
				}
				verticesRow.push(index++);
			}
			grid.push(verticesRow);
		}

		// indices
		for (let iy = 0; iy < heightSegments; iy++) {
			for (let ix = 0; ix < widthSegments; ix++) {
				const a = grid[iy][ix + 1];
				const b = grid[iy][ix];
				const c = grid[iy + 1][ix];
				const d = grid[iy + 1][ix + 1];
				if (iy !== 0 || thetaStart > 0) {
					if (reverseTexture) {
						indices.push(a, d, b);
					} else {
						indices.push(a, b, d);
					}
				}
				if (iy !== heightSegments - 1 || thetaEnd < Math.PI) {
					if (reverseTexture) {
						indices.push(b, d, c);
					} else {
						indices.push(b, c, d);
					}
				}
			}
		}

		// build geometry
		this.setIndex(indices);
		this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
	}

	static fromJSON(data) {
		return new SkyGroundGeometry(data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength);
	}
}

export { SkyGroundGeometry };
