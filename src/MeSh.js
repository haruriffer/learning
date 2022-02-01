import { Engine, Scene } from "@babylonjs/core";
import React, { useEffect, useRef } from "react";

function MeSh(props) {
  const refKanvas = useRef(null);
  const { scene, objects, antialias, engineOptions, adaptToDeviceRatio, sceneOptions, ...rest } = props;

  useEffect(() => {
    if (refKanvas.current) {
      let obj;
      const engine = new Engine(refKanvas.current, antialias, engineOptions, adaptToDeviceRatio);
      const scene = new Scene(engine, sceneOptions);

      refKanvas.current.style.width = "100%";
      refKanvas.current.style.height = "100%";

      const resize = () => {
        console.log(`---- resize ${new Date()}`);
        refKanvas.current.width = window.innerWidth;
        refKanvas.current.height = window.innerHeight;
        scene.getEngine().resize();
      }
      
      if (scene.isReady()) {
        obj = new objects(scene);
        obj.onSceneReady();
      } else {
        scene.onReadyObservable.addOnce(scene => obj.onSceneReady(scene));
      }

      resize();

      engine.runRenderLoop(() => {
        obj.onRender();
        scene.render();
      });


      if (window) {
        window.addEventListener("resize", resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener("resize", resize);
        }
      };
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refKanvas]);

  return <canvas ref={refKanvas} {...rest} />;
};

export default MeSh;
