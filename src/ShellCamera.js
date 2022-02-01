import { TransformNode, Vector3, UniversalCamera } from "@babylonjs/core";

class Camera {
  #canvas;
  #scene;

  #player;

  camera;
  camRoot;
  camTilt;

  constructor(player) {
    if (player) this.#player = player;
  }

  setPlayer(player) {
    if (player) this.#player = player;
  }

  setCamera(canvas, scene) {
    this.#canvas = canvas;
    this.#scene = scene;

    this.camRoot = new TransformNode("root");
    this.camRoot.position = new Vector3(0, 5, 10);
    this.camRoot.rotation = new Vector3(0, Math.PI, 0);
   
    let yTilt = new TransformNode("ytilt");
    //yTilt.rotation = Player.ORIGINAL_TILT;
    //yTilt.rotation = new Vector3(0.25, 0, 0);
    //yTilt.rotation = new Vector3(0.20, 0, 0);
    yTilt.rotation = new Vector3(0.10, 0, 0);
    this.camTilt = yTilt;
    yTilt.parent = this.camRoot;

    this.camera = new UniversalCamera("cam", new Vector3(0,0,-30), scene);
    this.camera.lockedTarget = this.camRoot.position;
    this.camera.fov = 0.47350045992678597;
    this.camera.parent = yTilt;

    this.#scene.activeCamera = this.camera;
  }

  setCameraOrig(scene, canvas) {
    this.camRoot = new TransformNode("root");
    this.camRoot.position = new Vector3(0, 5, 10);
    this.camRoot.rotation = new Vector3(0, Math.PI, 0);
   
    let yTilt = new TransformNode("ytilt");
    //yTilt.rotation = Player.ORIGINAL_TILT;
    //yTilt.rotation = new Vector3(0.25, 0, 0);
    //yTilt.rotation = new Vector3(0.20, 0, 0);
    yTilt.rotation = new Vector3(0.10, 0, 0);
    this.camTilt = yTilt;
    yTilt.parent = this.camRoot;

    this.camera = new UniversalCamera("cam", new Vector3(0,0,-30), scene);
    this.camera.lockedTarget = this.camRoot.position;
    this.camera.fov = 0.47350045992678597;
    this.camera.parent = yTilt;

    this.scene.activeCamera = this.camera;
    return this.camera;

    //let camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    //camera.setTarget(Vector3.Zero());
    //camera.attachControl(canvas, true);
    //return camera;
  }
}

export default Camera;
