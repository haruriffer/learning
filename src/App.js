import './App.css';

//import Kanvas from './Kanvas';
import MeSh from './MeSh';

//import TestBox from './TestBox';
//import TestGoldberg from './TestGoldberg';
import TestScene from './TestScene';

//let box;
//
//const onSceneReady = (scene) => {
//  let camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
//  camera.setTarget(Vector3.Zero());
//  const canvas = scene.getEngine().getRenderingCanvas();
//  camera.attachControl(canvas, true);
//  let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
//  light.intensity = 0.7;
//  box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
//  box.position.y = 1;
//  MeshBuilder.CreateGround("ground", { width: 16, height: 16 }, scene);
//};
//
//const onRender = (scene) => {
//  if (box !== undefined) {
//    let deltaTimeInMillis = scene.getEngine().getDeltaTime();
//    const rpm = 10;
//    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
//  }
//};

function App() {
  return (
    <div className="App">
        {/* <Kanvas antialias objects={TestScene} id="appkanvas" /> */}
        <MeSh antialias objects={TestScene} id="appkanvas" />
    </div>
  );
}

//<div id="kontainer" className="App-header"></div>
//<Kanvas antialias onSceneReady={testBox.onSceneReady} onRender={testBox.onRender} id="appkanvas" />

export default App;
