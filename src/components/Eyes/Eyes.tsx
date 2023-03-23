import { useRef, useEffect } from "react";
import * as THREE from "three";
import { styled } from "@mui/system";
import { getTexture } from "assets/texture";
import { EYE_SIZE } from "utils";
import { useWindowSize } from "hooks";

import "assets/index.css";

interface Eye {
  eyes: THREE.Mesh[];
  speed: number;
  delay: number;
}

const EyeWrapper = styled("div")`
  height: 100%;
  width: 100%;
`;

export const Eyes = () => {
  const eyeWrapper = useRef<HTMLDivElement>(document.createElement("div"));
  const { windowWidth } = useWindowSize();

  useEffect(() => {
    const eyeWrapperCurrent = eyeWrapper.current;
    let width = eyeWrapperCurrent.clientWidth;
    let height = eyeWrapperCurrent.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      width / -64,
      width / 64,
      height / 64,
      height / -64,
      10,
      10000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    const materials = [
      new THREE.MeshBasicMaterial({ map: getTexture("66B5D2") }),
      new THREE.MeshBasicMaterial({ map: getTexture("2C9131") }),
      new THREE.MeshBasicMaterial({ map: getTexture("aab840") }),
      new THREE.MeshBasicMaterial({ map: getTexture("704c2a") }),
      new THREE.MeshBasicMaterial({ map: getTexture("b7bdcf") }),
    ];

    camera.position.z = 80;

    renderer.setClearColor("#eee");
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    let xTotal = Math.ceil(width / 80);
    const yTotal = Math.ceil(height / 80);

    xTotal = xTotal % 2 !== 0 ? xTotal + 1 : xTotal; // Ensure pairs of eyes

    const eyePairs: Eye[] = [];

    let eyeColor = materials[Math.floor(Math.random() * materials.length)];
    for (let y = -yTotal / 2; y < yTotal / 2; y++) {
      for (let x = -xTotal / 2; x < xTotal / 2; x = x + 2) {
        eyeColor = materials[Math.floor(Math.random() * materials.length)];

        const leftEye = new THREE.Mesh(geometry, eyeColor);
        leftEye.position.x = x * EYE_SIZE + EYE_SIZE / 2;
        leftEye.position.y = y * EYE_SIZE + EYE_SIZE / 2;
        leftEye.rotation.x = -Math.PI / 2;

        const rightEye = new THREE.Mesh(geometry, eyeColor);
        rightEye.position.x = (x + 1) * EYE_SIZE + EYE_SIZE / 2;
        rightEye.position.y = y * EYE_SIZE + EYE_SIZE / 2;
        rightEye.rotation.x = -Math.PI / 2;

        eyePairs.push({
          speed: 0,
          delay: 0,
          eyes: [leftEye, rightEye],
        });

        scene.add(leftEye);
        scene.add(rightEye);
      }
    }

    const renderScene = () => {
      renderer.render(scene, camera);
    };

    const handleAnimation = (x: number, y: number) => {
      requestAnimationFrame(() => {
        let pos = new THREE.Vector3();

        for (let i = 0; i < eyePairs.length; i++) {
          const eyePair = eyePairs[i];

          pos = pos.setFromMatrixPosition(eyePair.eyes[0].matrixWorld);
          pos.project(camera);
          pos.x = pos.x * (width / 2) + width / 2;
          pos.y = -(pos.y * (height / 2)) + height / 2;
          pos.z = 0;

          eyePair.eyes[0].rotation.z = ((Math.PI * 0.5) / width) * (x - pos.x);
          eyePair.eyes[0].rotation.x =
            -Math.PI / 2 + ((Math.PI * 0.5) / height) * (y - pos.y);

          eyePair.eyes[1].rotation.z = ((Math.PI * 0.5) / width) * (x - pos.x);
          eyePair.eyes[1].rotation.x =
            -Math.PI / 2 + ((Math.PI * 0.5) / height) * (y - pos.y);
        }

        renderScene();
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleAnimation(e.screenX - 80, e.screenY - 80);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleAnimation(e.touches[0].pageX - 60, e.touches[0].pageY);
      }
    };

    renderScene();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    eyeWrapperCurrent.appendChild(renderer.domElement);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      eyeWrapperCurrent.removeChild(renderer.domElement);
      geometry.dispose();

      for (let i = 0; i < eyePairs.length; i++) {
        scene.remove(eyePairs[i].eyes[0]);
        scene.remove(eyePairs[i].eyes[1]);
      }

      for (let i = 0; i < materials.length; i++) {
        materials[i].dispose();
      }
    };
  }, [windowWidth]);

  return <EyeWrapper ref={eyeWrapper} />;
};
