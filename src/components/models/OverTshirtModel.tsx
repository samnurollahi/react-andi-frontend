// @ts-ignore
import tsh from "../../assets/models/OverSize_Revision2.glb";
import { Decal, Html, useGLTF, useTexture } from "@react-three/drei";

import { IoIosMove, IoIosResize } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { MdOutlineScreenRotationAlt } from "react-icons/md";
import configPos from "../../utils/configPos";

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
        setRotaionY(0);
        break;
      case "back":
        setRotaionY(Math.PI);
        break;
    }
  }, [view]);

  return (
    <group dispose={null} scale={0.17}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Back.geometry}
        material={materials.OverSize_wire_177028149_001}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Front.geometry}
        material={materials.OverSize_wire_134006006_001}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LeftHand.geometry}
        material={materials.OverSize_wire_006134006_001}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RightHand.geometry}
        material={materials.OverSize_wire_028089177_001}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}
