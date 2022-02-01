import Camera from './ShellCamera';
import Player from './ShellPlayer';

class ShellB {
  #scene;
  #canvas;

  player;
  camera;

  throwIfNull(obj) {
    throw new Error(`${obj} is null`);
  }

  constructor(scene = this.throwIfNull("scene")) {
    this.#scene = scene;
    this.#canvas = this.#scene.getEngine().getRenderingCanvas();
  }

  init() {
    this.initPlayer();
    this.initCamera();
  }

  setCanvas(canvas) {
    if (canvas) {
      this.#canvas = canvas;
    }
  }
  
  setScene(scene) {
    if (scene) {
      this.#scene = scene;
    }
  }
  
  initPlayer() {
    this.player = new Player();
  }

  initCamera() {
    this.camera = new Camera();
    this.camera.setPlayer(this.player);
  }

}

export default ShellB;
