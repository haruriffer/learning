import { Engine, Scene } from "@babylonjs/core";
import React, { useEffect, useRef } from "react";

//function Kanvas(props) {
//  const refKanvas = useRef(null);
//  const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;
//
//  useEffect(() => {
//    if (refKanvas.current) {
//      const engine = new Engine(refKanvas.current, antialias, engineOptions, adaptToDeviceRatio);
//      const scene = new Scene(engine, sceneOptions);
//      if (scene.isReady()) {
//        props.onSceneReady(scene);
//      } else {
//        scene.onReadyObservable.addOnce(scene => props.onSceneReady(scene));
//      }
//
//      engine.runRenderLoop(() => {
//        if (typeof onRender === "function") {
//          onRender(scene);
//        }
//        scene.render();
//      });
//
//      const resize = () => {
//        console.log(`---- resize ${new Date()}`);
//        refKanvas.current.width = window.innerWidth;
//        refKanvas.current.height = window.innerHeight;
//        scene.getEngine().resize();
//      }
//
//      if (window) {
//        window.addEventListener("resize", resize);
//      }
//
//      return () => {
//        scene.getEngine().dispose();
//
//        if (window) {
//          window.removeEventListener("resize", resize);
//        }
//      };
//    }
//  }, [refKanvas]);
//
//  return <canvas ref={refKanvas} {...rest} />;
//};

function Kanvas(props) {
  const refKanvas = useRef(null);
  const { objects, antialias, engineOptions, adaptToDeviceRatio, sceneOptions, ...rest } = props;

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

export default Kanvas;
