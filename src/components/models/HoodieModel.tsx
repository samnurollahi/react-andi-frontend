// @ts-ignore
import tsh from "../../assets/models/Hoodie_Revision3.glb";
import { Decal, Html, useGLTF, useTexture } from "@react-three/drei";

import { useEffect, useRef, useState } from "react";
import { IoIosMove, IoIosResize } from "react-icons/io";
import { MdOutlineScreenRotationAlt } from "react-icons/md";

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
      case "leftHand":
        setRotaionY(Math.PI / 2);
        break;
      case "rigthHand":
        setRotaionY(-1.7);
        break;
      default:
        setRotaionY(0);
    }
  }, [view]);

  return (
    <group dispose={null} scale={0.17} rotation={[0, rotaionY, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Group12817.geometry}
        material={materials["Hoodie_Revision_wire_224198087.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />
      </mesh>
      //! astin
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Group18032.geometry}
        material={materials["Hoodie_Revision_wire_006134006_002.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />

        {labels.map((item: any) => {
          return item.pos == "leftHand" && !blakList.includes(item.id) ? (
            <Decal
              key={item.id}
              rotation={[90, 90, item.rotateY]}
              scale={item.scale}
              position={[-7.539999999999983, item.decalZ, -0.6000000000000004]}
              // debug={true}
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
      //! back
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Group32806.geometry}
        material={materials["Hoodie_Revision_Material__25.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />

        {labels.map((item: any) => {
          return item.pos == "back" && !blakList.includes(item.id) ? (
            <Decal
              key={item.id}
              rotation={[45, Math.PI, item.rotateY]}
              scale={item.scale}
              position={[item.decalX, item.decalZ, item.decalY]}
              // debug={true}
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
      //! bag
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Group36658.geometry}
        material={materials["Hoodie_Revision_wire_224086086.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />
        {labels.map((item: any) => {
          return item.pos == "bag" && !blakList.includes(item.id) ? (
            <Decal
              key={item.id}
              rotation={[45, Math.PI, item.rotateY]}
              scale={item.scale}
              position={[0.34000000000000163, item.decalZ, 9.729999999999979]}
              // debug={true}
            >
              <Html
                // scale={0.1}
                style={{ display: idFocos == item.id ? "block" : "none" }}
                position={[0.34000000000000163, item.decalZ, 9.729999999999979]}
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Group43482.geometry}
        material={materials["Hoodie_Revision_wire_143224087.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />
      </mesh>
      //! front
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Group44853.geometry}
        material={materials["Hoodie_Revision_wire_000000000_001.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />

        {labels.map((item: any) => {
          return item.pos == "front" && !blakList.includes(item.id) ? (
            <Decal
              key={item.id}
              rotation={[45, Math.PI, item.rotateY]}
              scale={item.scale}
              position={[item.decalX, item.decalZ, item.decalY]}
              // debug={true}
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Group48969.geometry}
        material={materials["Hoodie_Revision_default.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Group64703.geometry}
        material={materials["Hoodie_Revision_wire_134006006_002.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Group65254.geometry}
        material={materials["Hoodie_Revision_wire_087224198.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={""} />
      </mesh>
      //! astin
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object001.geometry}
        material={materials["Hoodie_Revision_wire_006134006_002.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />
        {labels.map((item: any) => {
          return item.pos == "rigthHand" && !blakList.includes(item.id) ? (
            <Decal
              key={item.id}
              rotation={[180, 45, item.rotateY]}
              scale={item.scale}
              position={[8.570000000000132, item.decalZ, -0.919999999999986]}
              debug={true}
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object002.geometry}
        material={materials["Hoodie_Revision_wire_134006006_002.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object003.geometry}
        material={materials["Hoodie_Revision_wire_224198087.001"]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}
