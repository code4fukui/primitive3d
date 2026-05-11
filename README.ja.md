# primitive3d

Three.js、生のWebGL、およびWebXR APIを使用した、基本的な3Dグラフィックスの実験的実装のコレクションです。

## デモ

| デモ | 説明 |
| --- | --- |
| [シンプルな三角形](https://code4fukui.github.io/primitive3d/simple-triangle.html) | Three.jsの `BufferGeometry` を使用して単一の三角形をレンダリングします。 |
| [シンプルなポリゴン](https://code4fukui.github.io/primitive3d/simple-polygon.html) | 2つの三角形から四角形ポリゴンをレンダリングします。 |
| [スケルタルアニメーション (旧版)](https://code4fukui.github.io/primitive3d/bone-old.html) | `SkinnedMesh` を使用したボーンベースのアニメーションデモ。（[hystking/three-bone-demo](https://github.com/hystking/three-bone-demo/blob/master/step_4.html) をベースにしています） |
| [100万パーティクルシェーダー](https://code4fukui.github.io/primitive3d/simple-shader.html) | 生のWebGLシェーダーを使用して100万のパーティクルをレンダリングする高性能パーティクルシステムです。 |
| [カスタム球体ジオメトリ](https://code4fukui.github.io/primitive3d/simple-sphere.html) | カスタムの `SphereGeometry2` クラスで作成されたテクスチャ付きの球体です。 |
| [空と地面](https://code4fukui.github.io/primitive3d/simple-skyground.html) | 空の半球と平面の地面を組み合わせたカスタムジオメトリを使用した360°写真ビューアです。 |
| [空と地面 (VR)](https://code4fukui.github.io/primitive3d/simple-skyground-vr.html) | 没入型ビューとコントローラー入力のためのWebXRサポートを追加した「空と地面」のデモです。 |

## 特徴

- **カスタムジオメトリ**: 平らな地面を持つ360°環境を作成するための `SkyGroundGeometry.js` や、カスタム球体実装である `SphereGeometry2.js` を含みます。
- **WebXR統合**: VR/ARセッションのサポートをシーンに追加する再利用可能なヘルパー (`createWebXRButton.js`) を提供し、オプションでハンドトラッキングも可能です。
- **高性能WebGL**: 3Dライブラリを使用せずにリアルタイムで100万のパーティクルをレンダリングするスタンドアロンのシェーダー例 (`simple-shader.html`) を提供します。
- **ミニマリストな例**: シンプルな形状を作成するために、`BufferGeometry` のような Three.js のコアコンセプトをゼロから実演します。

## はじめに

1. このリポジトリをクローンします。
2. 任意の `.html` ファイル（例: `simple-polygon.html`）をモダンWebブラウザで直接開きます。ビルドステップは必要ありません。
3. （オプション）`simple-skyground-vr.html` デモのVRコントローラーの入力ログを有効にするには、ローカルサーバーを起動します:
    ```bash
    deno run --allow-net logserver.js
    ```

## 主なコンポーネント

- `SkyGroundGeometry.js`: 上部が半球、下部が平らな円形となるメッシュを作成します。明確な地面を持つ360°パノラマ画像の表示に最適です。
- `createWebXRButton.js`: "immersive-vr" または "immersive-ar" WebXRセッションの開始と終了を処理するボタンを生成するスタンドアロンモジュールです。
- `logserver.js`: `/api` でリッスンし、受信したJSONデータをログに記録するシンプルなDenoベースのAPIサーバーで、VRコントローラー入力のデバッグに使用します。

## ライセンス

このプロジェクトは MIT License のもとで公開されています。
