// @ts-ignore
import tsh from "../../assets/models/OptimizedBlender.glb";
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

    window.addEventListener("touchmove", (e: TouchEvent) => {
      if (isDragging.current) {
        setLabels((prev: any[]) => {
          prev = prev.map((item) => {
            if (item.id == textchurFocosed.current.id) {
              const SCALE = 0.0005;
              item.decalX =
                item.decalX +
                (e.touches[0].clientX - dataMouse.current.clientX) * SCALE;
              item.decalY =
                item.decalY +
                -(dataMouse.current.clientY - e.touches[0].clientY) * SCALE;
              console.log([item.decalX, item.decalZ, item.decalY]);
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

              const deltaX = dataMouse.current.clientX - e.touches[0].clientX;
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
              const delta = dataMouse.current.clientX - e.touches[0].clientX;
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
      dataMouse.current = {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      };
    });
    window.addEventListener("touchend", () => {
      console.log("touchend");
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
      case "rigthHand":
        setRotaionY(Math.PI / 2);
        break;
      case "leftHand":
        setRotaionY(-Math.PI / 2);
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
            return item.pos == "front" && !blakList.includes(item.id) ? (
              <Decal
                key={item.id}
                rotation={[90, item.rotateZ, item.rotateY]}
                scale={item.scale}
                position={[item.decalX, item.decalZ, item.decalY]}
                // debug={true}
              >
                <Html
                  scale={0.1}
                  position={[item.decalX, item.decalZ, item.decalY]}
                  rotation={[1.5, 0, 0]}
                  occlude
                  style={{ display: idFocos == item.id ? "block" : "none" }}
                >
                  <IoIosMove
                    className="text-white text-[30px]"
                    onTouchStart={() => {
                      handelChangePos(item);
                    }}
                    onMouseDown={() => {
                      handelChangePos(item);
                    }}
                  />

                  <MdOutlineScreenRotationAlt
                    className="text-white ml-2 text-[30px]"
                    onTouchStart={() => {
                      handelChangeRotation(item);
                    }}
                    onMouseDown={() => {
                      handelChangeRotation(item);
                    }}
                  />

                  <IoIosResize
                    className="text-white text-[30px]"
                    onTouchStart={() => {
                      handelChangeScale(item);
                    }}
                    onMouseDown={() => {
                      handelChangeScale(item);
                    }}
                  />
                </Html>

                <meshBasicMaterial
                  map={useTexture<string>(item.url)}
                  transparent
                  // polygonOffset
                  // polygonOffsetFactor={-2}
                />
              </Decal>
            ) : (
              <Decal
                key={item.id}
                rotation={[90, item.rotateZ, item.rotateY]}
                scale={0}
                position={[item.decalX, item.decalZ, item.decalY]}
                // debug={true}
              >
                <Html
                  // scale={0.1}
                  position={[item.decalX, item.decalZ, item.decalY]}
                  rotation={[1.5, 0, 0]}
                  occlude
                  style={{ display: "none" }}
                >
                  <IoIosMove
                    className="text-white"
                    onTouchStart={() => {
                      handelChangePos(item);
                    }}
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
                  map={useTexture<string>(item.url)}
                  transparent
                  // polygonOffset
                  // polygonOffsetFactor={-2}
                />
              </Decal>
            );
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

          {labels.map((item: any) => {
            return item.pos == "leftHand" && !blakList.includes(item.id) ? (
              <Decal
                key={item.id}
                rotation={[90, 90, item.rotateY]}
                rotateY={item.rotateY}
                scale={item.scale}
                // @ts-ignore
                position={configPos["tshirt"].leftHandFullPos ?? [0, 0, 0]}
                // debug={true}
              >
                <Html
                  // scale={0.1}
                  style={{ display: idFocos == item.id ? "block" : "none" }}
                  // @ts-ignore
                  position={configPos["tshirt"].leftHandFullPos ?? [0, 0, 0]}
                  // rotation={[1.5, 0, 0]}
                  // occlude
                >
                  {/* <IoIosMove
                      className="text-white"
                      onMouseDown={() => {
                        handelChangePos(item);
                      }}
                    /> */}

                  <MdOutlineScreenRotationAlt
                    className="text-white"
                    onTouchStart={() => {
                      handelChangeRotation(item);
                    }}
                    onMouseDown={() => {
                      handelChangeRotation(item);
                    }}
                  />

                  <IoIosResize
                    className="text-white"
                    onTouchStart={() => {
                      handelChangeScale(item);
                    }}
                    onMouseDown={() => {
                      handelChangeScale(item);
                    }}
                  />
                </Html>

                <meshBasicMaterial
                  polygonOffset
                  polygonOffsetFactor={-1}
                  map={useTexture<string>(item.url)}
                  transparent
                />
              </Decal>
            ) : (
              <Decal
                key={item.id}
                rotation={[90, 90, item.rotateY]}
                rotateY={item.rotateY}
                scale={0}
                // @ts-ignore
                position={configPos["tshirt"].leftHandFullPos ?? [0, 0, 0]}
                // debug={true}
              >
                <Html
                  // scale={0.1}
                  style={{ display: "none" }}
                  // @ts-ignore
                  position={configPos["tshirt"].leftHandFullPos ?? [0, 0, 0]}
                  // rotation={[1.5, 0, 0]}
                  // occlude
                >
                  {/* <IoIosMove
                      className="text-white"
                      onMouseDown={() => {
                        handelChangePos(item);
                      }}
                    /> */}

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
                  map={useTexture<string>(item.url)}
                  transparent
                />
              </Decal>
            );
          })}
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

          {labels.map((item: any) => {
            return item.pos == "rigthHand" && !blakList.includes(item.id) ? (
              <Decal
                key={item.id}
                rotation={[180, 180, item.rotateY]}
                scale={item.scale}
                // @ts-ignore
                position={configPos["tshirt"].rigthHandFullPos ?? [0, 0, 0]}
                // debug={true}
              >
                <Html
                  // scale={0.1}
                  style={{ display: idFocos == item.id ? "block" : "none" }}
                  // @ts-ignore
                  position={configPos["tshirt"].rigthHandFullPos ?? [0, 0, 0]}
                  // rotation={[1.5, 0, 0]}
                  // occlude
                >
                  {/* <IoIosMove
                      className="text-white"
                      onMouseDown={() => {
                        handelChangePos(item);
                      }}
                    /> */}

                  <MdOutlineScreenRotationAlt
                    className="text-white"
                    onTouchStart={() => {
                      handelChangeRotation(item);
                    }}
                    onMouseDown={() => {
                      handelChangeRotation(item);
                    }}
                  />

                  <IoIosResize
                    className="text-white"
                    onTouchStart={() => {
                      handelChangeScale(item);
                    }}
                    onMouseDown={() => {
                      handelChangeScale(item);
                    }}
                  />
                </Html>

                <meshBasicMaterial
                  // polygonOffset
                  // polygonOffsetFactor={-1}
                  map={useTexture<string>(item.url)}
                  transparent
                />
              </Decal>
            ) : (
              <Decal
                key={item.id}
                rotation={[180, 180, item.rotateY]}
                scale={0}
                // @ts-ignore
                position={configPos["tshirt"].rigthHandFullPos ?? [0, 0, 0]}
                // debug={true}
              >
                <Html
                  // scale={0.1}
                  style={{ display: "none" }}
                  // @ts-ignore
                  position={configPos["tshirt"].rigthHandFullPos ?? [0, 0, 0]}
                  // rotation={[1.5, 0, 0]}
                  // occlude
                >
                  {/* <IoIosMove
                      className="text-white"
                      onMouseDown={() => {
                        handelChangePos(item);
                      }}
                    /> */}

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
                  map={useTexture<string>(item.url)}
                  transparent
                />
              </Decal>
            );
          })}
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
            return item.pos == "back" && !blakList.includes(item.id) ? (
              <Decal
                key={item.id}
                rotation={[45, Math.PI, item.rotateY]}
                scale={item.scale}
                position={[item.decalX, item.decalZ, item.decalY]}
              >
                <Html
                  // scale={0.1}
                  style={{ display: idFocos == item.id ? "block" : "none" }}
                  // position={[0.0, -0.2, 0]}
                  // rotation={[1.5, 0, 0]}
                  // occlude
                >
                  <IoIosMove
                    className="text-white"
                    onTouchStart={() => {
                      handelChangePos(item);
                    }}
                    onMouseDown={() => {
                      handelChangePos(item);
                    }}
                  />

                  <MdOutlineScreenRotationAlt
                    className="text-white"
                    onTouchStart={() => {
                      handelChangeRotation(item);
                    }}
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
                  map={useTexture<string>(item.url)}
                  transparent
                />
              </Decal>
            ) : (
              <Decal
                key={item.id}
                rotation={[45, Math.PI, item.rotateY]}
                scale={0}
                position={[item.decalX, item.decalZ, item.decalY]}
              >
                <Html
                  // scale={0.1}
                  style={{ display: "none" }}
                  // position={[0.0, -0.2, 0]}
                  // rotation={[1.5, 0, 0]}
                  // occlude
                >
                  <IoIosMove
                    className="text-white"
                    onTouchStart={() => {
                      handelChangePos(item);
                    }}
                    onMouseDown={() => {
                      handelChangePos(item);
                    }}
                  />

                  <MdOutlineScreenRotationAlt
                    className="text-white"
                    onTouchStart={() => {
                      handelChangeRotation(item);
                    }}
                    onMouseDown={() => {
                      handelChangeRotation(item);
                    }}
                  />

                  <IoIosResize
                    className="text-white"
                    onTouchStart={() => {
                      handelChangeScale(item);
                    }}
                    onMouseDown={() => {
                      handelChangeScale(item);
                    }}
                  />
                </Html>

                <meshBasicMaterial
                  polygonOffset
                  polygonOffsetFactor={-1}
                  map={useTexture<string>(item.url)}
                  transparent
                />
              </Decal>
            );
          })}
        </mesh>
      </group>
    </group>
  );
}
