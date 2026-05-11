# primitive3d

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A collection of fundamental 3D graphics experiments using Three.js, raw WebGL, and the WebXR API.

## Demos

| Demo | Description |
| --- | --- |
| [Simple Triangle](https://code4fukui.github.io/primitive3d/simple-triangle.html) | Renders a single triangle using Three.js `BufferGeometry`. |
| [Simple Polygon](https://code4fukui.github.io/primitive3d/simple-polygon.html) | Renders a four-sided polygon from two triangles. |
| [Skeletal Animation (old)](https://code4fukui.github.io/primitive3d/bone-old.html) | A `SkinnedMesh` demo showing bone-based animation. (Based on [hystking/three-bone-demo](https://github.com/hystking/three-bone-demo/blob/master/step_4.html)) |
| [1M Particle Shader](https://code4fukui.github.io/primitive3d/simple-shader.html) | A high-performance particle system rendering 1 million particles using raw WebGL shaders. |
| [Custom Sphere Geometry](https://code4fukui.github.io/primitive3d/simple-sphere.html) | A textured sphere created with a custom `SphereGeometry2` class. |
| [Sky & Ground](https://code4fukui.github.io/primitive3d/simple-skyground.html) | A 360° photo viewer using a custom geometry that combines a sky hemisphere with a flat ground plane. |
| [Sky & Ground (VR)](https://code4fukui.github.io/primitive3d/simple-skyground-vr.html) | The Sky & Ground demo with WebXR support for immersive viewing and controller input. |

## Features

-   **Custom Geometries**: Includes `SkyGroundGeometry.js` for creating 360° environments with a flat ground and `SphereGeometry2.js`, a custom sphere implementation.
-   **WebXR Integration**: A reusable helper (`createWebXRButton.js`) to add VR/AR session support to a scene, with optional hand-tracking.
-   **High-Performance WebGL**: A standalone shader example (`simple-shader.html`) that renders over one million particles in real-time without using a 3D library.
-   **Minimalist Examples**: Demonstrates core Three.js concepts like `BufferGeometry` from scratch for creating simple shapes.

## Getting Started

1.  Clone this repository.
2.  Open any of the `.html` files (e.g., `simple-polygon.html`) directly in a modern web browser. No build step is required.
3.  (Optional) To enable VR controller input logging for the `simple-skyground-vr.html` demo, run the local server:
    ```bash
    deno run --allow-net logserver.js
    ```

## Key Components

-   `SkyGroundGeometry.js`: Creates a mesh with a hemispherical top and a flat circular bottom, perfect for displaying 360° panoramic images with a distinct ground.
-   `createWebXRButton.js`: A standalone module to generate a button that handles entering and exiting an "immersive-vr" or "immersive-ar" WebXR session.
-   `logserver.js`: A simple Deno-based API server that listens on `/api` and logs any received JSON data, used for debugging VR controller inputs.

## License

This project is available under the MIT License.