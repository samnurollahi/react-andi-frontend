// @ts-ignore
import tsh from "../../assets/models/Hoodie_Resize(2).glb";
import { Decal, Html, useGLTF, useTexture } from "@react-three/drei";

import { useEffect, useRef, useState } from "react";
import { IoIosMove, IoIosResize } from "react-icons/io";
import { MdOutlineScreenRotationAlt } from "react-icons/md";
import { MeshBasicNodeMaterial } from "three/webgpu";

export default function ({
  color,
  labels,
  setEnabelModelController,
  setLabels,
  view,
  controllerRef,
  idFocos,
  blakList,
}: any) {
  const [rotaionY, setRotaionY] = useState<number>(0);

  const isDragging = useRef(false);
  const isRotation = useRef(false);
  const isScaling = useRef(false);
  const meshBack = useRef<any>(null);
  const textchurFocosed = useRef<any>({});
  const dataMouse = useRef({ clientX: 0, clientY: 0 });

  const { nodes, materials } = useGLTF(tsh);

  const handelChangePos = (item: any) => {
    textchurFocosed.current = item;
    isDragging.current = true;
    setEnabelModelController(false);
  };
  const handelChangeRotation = (item: any) => {
    textchurFocosed.current = item;
    isRotation.current = true;
    setEnabelModelController(false);
  };
  const handelChangeScale = (item: any) => {
    textchurFocosed.current = item;
    isScaling.current = true;
    setEnabelModelController(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", (e: MouseEvent) => {
      console.log(isDragging.current);
      if (isDragging.current) {
        setLabels((prev: any[]) => {
          prev = prev.map((item) => {
            if (item.id == textchurFocosed.current.id) {
              const SCALE = 0.0005;
              item.decalX = item.decalX + e.movementX * SCALE;
              item.decalY = item.decalY + -e.movementY * SCALE;
              console.log([item.decalX, item.decalZ, item.decalY]);
              return item;
            } else {
              return item;
            }
          });

          return [...prev];
        });
      } else if (isRotation.current) {
        setLabels((prev: any[]) => {
          prev = prev.map((item) => {
            if (item.id == textchurFocosed.current.id) {
              const oldRotation = item.rotateY || 0;

              const deltaX = e.movementX;
              const newRotation = oldRotation + deltaX * 0.005;
              item.rotateY = newRotation;
              return item;
            } else {
              return item;
            }
          });
          return [...prev];
        });
      } else if (isScaling.current) {
        setLabels((prev: any[]) => {
          prev = prev.map((item) => {
            if (item.id == textchurFocosed.current.id) {
              const oldScale = item.scale ?? 1;
              const delta = e.movementY ?? 0;
              const sensitivity = 0.005;
              let newScale = oldScale + delta * sensitivity;

              newScale = Math.max(0.1, Math.min(5, newScale));
              item.scale = newScale;
              return item;
            } else {
              return item;
            }
          });
          return [...prev];
        });
      }
      dataMouse.current = { clientX: e.clientX, clientY: e.clientY };
    });
    window.addEventListener("mouseup", () => {
      isDragging.current = false;
      isRotation.current = false;
      isScaling.current = false;
      setEnabelModelController(true);
    });
    window.addEventListener("touchmove", (e: any) => {
      if (isDragging.current) {
        setLabels((prev: any[]) => {
          prev = prev.map((item) => {
            if (item.id == textchurFocosed.current.id) {
              const SCALE = 0.0005;
              item.decalX = item.decalX + e.movementX * SCALE;
              item.decalY = item.decalY + -e.movementY * SCALE;
              console.log([item.decalX, item.decalZ, item.decalY]);
              return item;
            } else {
              return item;
            }
          });

          return [...prev];
        });
      } else if (isRotation.current) {
        setLabels((prev: any[]) => {
          prev = prev.map((item) => {
            if (item.id == textchurFocosed.current.id) {
              const oldRotation = item.rotateY || 0;

              const deltaX = e.movementX;
              const newRotation = oldRotation + deltaX * 0.005;
              item.rotateY = newRotation;
              return item;
            } else {
              return item;
            }
          });
          return [...prev];
        });
      } else if (isScaling.current) {
        setLabels((prev: any[]) => {
          prev = prev.map((item) => {
            if (item.id == textchurFocosed.current.id) {
              const oldScale = item.scale ?? 1;
              const delta = e.movementY ?? 0;
              const sensitivity = 0.005;
              let newScale = oldScale + delta * sensitivity;

              newScale = Math.max(0.1, Math.min(5, newScale));
              item.scale = newScale;
              return item;
            } else {
              return item;
            }
          });
          return [...prev];
        });
      }
      dataMouse.current = { clientX: e.clientX, clientY: e.clientY };
    });
    window.addEventListener("touchend", () => {
      isDragging.current = false;
      isRotation.current = false;
      isScaling.current = false;
      setEnabelModelController(true);
    });
  }, []);
  useEffect(() => {
    controllerRef.current.reset();

    switch (view) {
      case "front":
        setRotaionY(-Math.PI / 2);
        break;
      case "back":
        setRotaionY(Math.PI / 2);
        break;
      case "leftHand":
        setRotaionY(Math.PI);
        break;
      case "rigthHand":
        setRotaionY(0);
        break;
    }
  }, [view]);

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FrontLow.geometry}
        material={materials["wire_224198087.001"]}
        position={[0, -0.013, 0.003]}
        rotation={[Math.PI / 2, 0, 1.578]}
        scale={0.036}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RightHand.geometry}
        material={materials["wire_006134006.001"]}
        position={[-0.007, -0.003, 0]}
        rotation={[Math.PI / 2, 0, 1.578]}
        scale={0.036}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Back.geometry}
        material={materials["wire_177028149.001"]}
        position={[0, -0.001, -0.003]}
        rotation={[Math.PI / 2, 0, 1.578]}
        scale={0.036}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FrontBAG.geometry}
        material={materials["wire_224086086.001"]}
        position={[0, -0.008, 0.003]}
        rotation={[Math.PI / 2, 0, 1.578]}
        scale={0.036}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Head.geometry}
        material={materials["wire_143224087.001"]}
        position={[0, 0.013, -0.001]}
        rotation={[Math.PI / 2, 0, 1.578]}
        scale={0.036}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Front.geometry}
        material={materials["wire_028089177.001"]}
        position={[0, -0.001, 0.002]}
        rotation={[Math.PI / 2, 0, 1.578]}
        scale={0.036}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RightHandDown.geometry}
        material={materials["wire_134006006.001"]}
        position={[-0.009, -0.014, 0.001]}
        rotation={[Math.PI / 2, 0, 1.578]}
        scale={0.036}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.HeadBand.geometry}
        material={materials["wire_087224198.001"]}
        position={[0, 0.005, 0.003]}
        rotation={[Math.PI / 2, 0, 1.578]}
        scale={0.036}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LeftHand.geometry}
        material={materials["wire_006134006.001"]}
        position={[0.007, -0.003, 0]}
        rotation={[Math.PI / 2, 0, 1.578]}
        scale={0.036}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LeftHandDown.geometry}
        material={materials["wire_134006006.001"]}
        position={[0.009, -0.015, 0.001]}
        rotation={[Math.PI / 2, 0, 1.578]}
        scale={0.036}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BackDown.geometry}
        material={materials["wire_224198087.001"]}
        position={[0, -0.013, -0.003]}
        rotation={[Math.PI / 2, 0, 1.578]}
        scale={0.036}
      />
    </group>
  );
}
