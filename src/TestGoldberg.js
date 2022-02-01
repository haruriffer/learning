import { FreeCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";

class TestGoldberg {
  #scene;
  #goldberg;

  constructor(scene) {
    this.#scene = scene;
  }

  onSceneReady() {
    let scene = this.#scene;
    let camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);
    let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    //this.#goldberg = MeshBuilder.CreateGoldberg("goldberg", { }, scene);
    //this.#goldberg = MeshBuilder.CreateBox("goldberg", { size: 2 }, scene);
    //this.#goldberg = MeshBuilder.CreateSphere("goldberg", { }, scene);
    this.#goldberg = MeshBuilder.CreatePlane("goldberg", { size: 2 }, scene);
    this.#goldberg.position.y = 1;
    MeshBuilder.CreateGround("ground", { width: 16, height: 16 }, scene);
  };

  onRender() {
    if (this.#goldberg !== undefined) {
      let deltaTimeInMillis = this.#scene.getEngine().getDeltaTime();
      const rpm = 10;
      this.#goldberg.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  };


}

export default TestGoldberg;
