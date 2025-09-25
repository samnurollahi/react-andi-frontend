// @ts-ignore
import tsh from "../../assets/models/OptimizedBlender.glb";
import { Decal, Html, useGLTF, useTexture } from "@react-three/drei";

import jsLogo from "../../../public/js.png";
import { IoIosMove, IoIosResize } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { MdOutlineScreenRotationAlt } from "react-icons/md";

export default function ({
  color,
  labels,
  setEnabelModelController,
  setLabels,
  view,
  controllerRef,
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

              return item;
            } else {
              return item;
            }
          });
          console.log("prev", prev);

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
          console.log("prev", prev);
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
          console.log("prev", prev);
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
  }, []);
  useEffect(() => {
    console.log("new label:", labels);
  }, [labels]);
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
    <group dispose={null} rotation={[0, rotaionY, 0]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Front.geometry}
          material={materials.FrontMTL}
          scale={3.5}
        >
          <meshStandardMaterial color={color} />
          {labels.map((item: any) => {
            if (item.pos == "front") {
              return (
                <Decal
                  rotation={[90, item.rotateZ, item.rotateY]}
                  scale={item.scale}
                  position={[item.decalX, item.decalZ, item.decalY]}
                >
                  <Html
                    scale={0.1}
                    position={[item.decalX, item.decalZ, item.decalY]}
                    rotation={[1.5, 0, 0]}
                    occlude
                  >
                    <IoIosMove
                      className="text-white"
                      onMouseDown={() => {
                        handelChangePos(item);
                      }}
                    />

                    <MdOutlineScreenRotationAlt
                      className="text-white ml-2"
                      onMouseDown={() => {
                        handelChangeRotation(item);
                      }}
                    />

                    <IoIosResize
                      className="text-white"
                      onMouseDown={() => {
                        handelChangeScale(item);
                      }}
                    />
                  </Html>

                  <meshBasicMaterial
                    map={useTexture(jsLogo)}
                    transparent
                    depthTest={true}
                    depthWrite={false}
                    polygonOffset
                    polygonOffsetFactor={-2}
                  />
                </Decal>
              );
            }
          })}
        </mesh>
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LeftHand.geometry}
          material={materials.LeftMTL}
          scale={3.5}
        >
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RightHand.geometry}
          material={materials.RightMTL}
          scale={3.5}
        >
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Back.geometry}
          material={materials.BackMTL}
          scale={3.5}
          ref={meshBack}
        >
          <meshStandardMaterial color={color} />

          {labels.map((item: any) => {
            if (item.pos == "back") {
              return (
                <Decal
                  rotation={[45, Math.PI, item.rotateY]}
                  scale={item.scale}
                  position={[item.decalX, item.decalZ, item.decalY]}
                >
                  <Html
                    scale={0.1}
                    // position={[0.0, -0.2, 0]}
                    // rotation={[1.5, 0, 0]}
                    // occlude
                  >
                    <IoIosMove
                      className="text-white"
                      onMouseDown={() => {
                        handelChangePos(item);
                      }}
                    />

                    <MdOutlineScreenRotationAlt
                      className="text-white"
                      onMouseDown={() => {
                        handelChangeRotation(item);
                      }}
                    />

                    <IoIosResize
                      className="text-white"
                      onMouseDown={() => {
                        handelChangeScale(item);
                      }}
                    />
                  </Html>

                  <meshBasicMaterial
                    polygonOffset
                    polygonOffsetFactor={-1}
                    map={useTexture(jsLogo)}
                    transparent
                  />
                </Decal>
              );
            }
          })}
        </mesh>
      </group>
    </group>
  );
}
