import { SceneLoader, Matrix, Quaternion, UniversalCamera, TransformNode, Vector3, HemisphericLight, MeshBuilder, SpriteManager, Sprite } from "@babylonjs/core";
import "@babylonjs/loaders";

import ShellB from './ShellB';

class TestScene {
  #scene;
  #box;

  #camera;
  #camRoot;
  #camTilt;

  #shellB;

  constructor(scene) {
    this.#scene = scene;
    this.#shellB = new ShellB(this.#scene);
  }

  setScene() {

  }

  setCamera(scene, canvas) {
    this.#camRoot = new TransformNode("root");
    this.#camRoot.position = new Vector3(0, 5, 10);
    this.#camRoot.rotation = new Vector3(0, Math.PI, 0);
   
    let yTilt = new TransformNode("ytilt");
    //yTilt.rotation = Player.ORIGINAL_TILT;
    //yTilt.rotation = new Vector3(0.25, 0, 0);
    //yTilt.rotation = new Vector3(0.20, 0, 0);
    yTilt.rotation = new Vector3(0.10, 0, 0);
    this.#camTilt = yTilt;
    yTilt.parent = this.#camRoot;

    this.#camera = new UniversalCamera("cam", new Vector3(0,0,-30), scene);
    this.#camera.lockedTarget = this.#camRoot.position;
    this.#camera.fov = 0.47350045992678597;
    this.#camera.parent = yTilt;

    this.#scene.activeCamera = this.#camera;
    return this.#camera;

    //let camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    //camera.setTarget(Vector3.Zero());
    //camera.attachControl(canvas, true);
    //return camera;
  }

  loadCharacter() {
    //collision mesh
    const outer = MeshBuilder.CreateBox("outer", { width: 2, depth: 1, height: 3 }, this.#scene);
    outer.isVisible = false;
    outer.isPickable = false;
    outer.checkCollisions = true;

    outer.bakeTransformIntoVertices(Matrix.Translation(0, 1.5, 0));

    outer.ellipsoid = new Vector3(1, 1.5, 1);
    outer.ellipsoidOffset = new Vector3(0, 1.5, 0);

    outer.rotationQuaternion = new Quaternion(0, 1, 0, 0);
    
    return SceneLoader.ImportMeshAsync(null, "/models/", "player.glb", this.#scene)
    .then(res => {
      const root = res.meshes[0];
      const body = root;
      body.parent = outer;
      body.isPickable = false;
      body.getChildMeshes().forEach(m => {
        m.isPickable = false;
      });

      return {
        mesh: outer,
        animationGroups: res.animationGroups
      }
    });

  }
  
  onSceneReady() {
    let scene = this.#scene;
    const canvas = scene.getEngine().getRenderingCanvas();
   
    let player = this.loadCharacter();
    let camera = this.setCamera(scene, canvas);

    let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    this.#box = MeshBuilder.CreateBox("box", { size: 1 }, scene);
    //this.#box.position.y = 6;
    this.#box.position.y = 4.5;
    //MeshBuilder.CreateGround("ground", { width: 16, height: 16 }, scene);
    //let g = MeshBuilder.CreateGround("ground", { width: 25, height: 25 }, scene);
    //let g = MeshBuilder.CreateGround("ground", { width: 30, height: 400 }, scene);
    let g = MeshBuilder.CreateGround("ground", { width: 25, height: 50 }, scene);
    //g.position.y = 6;
    g.position.y = 3;
    //g.position.z = 16;
    //g.position.x = 1;

    const sceneBGManager = new SpriteManager("sceneBGManager", "/sprites/desert-3-guys.jpg", 1, {width: 2560, height: 650}, scene);
    const sceneBG = new Sprite("sceneBG", sceneBGManager);
    sceneBG.width = 2560;
    sceneBG.height = 650;
    sceneBG.position.x = 0;
    //sceneBG.position.z = -1200;
    //sceneBG.position.y = -160;

    //sceneBG.position.z = -1200;
    //sceneBG.position.y = -105; 
    
    sceneBG.position.z = -1100;
    sceneBG.position.y = 0; 
  };

  onRender() {
    if (this.#box !== undefined) {
      let deltaTimeInMillis = this.#scene.getEngine().getDeltaTime();
      const rpm = 10;
      this.#box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  };


}

export default TestScene;
