import { Suspense, useEffect, useRef, useState } from "react";
import SelectSize from "../../components/selectSize/selectSize";
// @ts-ignore
import tsh from "../../assets/models/OptimizedBlender.glb";
import { Canvas, useThree } from "@react-three/fiber";
import { Center, OrbitControls, Preload } from "@react-three/drei";
import { LabelPage } from "../../components/labelPage/LabelPage";
import { useSearchParams } from "react-router-dom";
import TshirtModel from "../../components/models/TshirtModel";
import HoodieModel from "../../components/models/HoodieModel";

const Builder = () => {
  const [size, setSize] = useState<
    null | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
  >(null);
  const [color, setColor] = useState("#fff");
  const [statusChangeColor, setStatusCahngeColor] = useState(false);
  const [modal, setModal] = useState("");
  const [labels, setLabels] = useState<[]>([]);
  const [enabelModelController, setEnabelModelController] = useState(true);
  const [view, setView] = useState("front");
  const [cameraZ, setCameraZ] = useState(5);

  const controllerRef = useRef<any>(null);

  const [searchParams] = useSearchParams();
  const modelName = searchParams.get("model");
  const modelHanldeler = () => {
    switch (modelName) {
      case "tshirt":
        return (
          <TshirtModel
            color={color}
            labels={labels}
            setLabels={setLabels}
            setEnabelModelController={setEnabelModelController}
            view={view}
            controllerRef={controllerRef}
          />
        );
        break;

      case "hoodie":
        return (
          <HoodieModel
            color={color}
            labels={labels}
            setLabels={setLabels}
            setEnabelModelController={setEnabelModelController}
            view={view}
            controllerRef={controllerRef}
          />
        );
      default:
        break;
    }
  };

  if (!size) {
    return <SelectSize setSize={setSize} size={size} />;
  } else if (modal == "label") {
    return <LabelPage setModal={setModal} setLabels={setLabels} view={view} />;
  } else {
    return (
      <div className="flex flex-col justify-between h-[98vh]">
        <div className="flex flex-row-reverse items-center">
          <button className="text-black bg-white rounded-sm p-2 cursor-pointer transition active:bg-stone-300 mt-3">
            مشاهده قیمت
          </button>
        </div>
        <div className="w-full h-[60vh] mt-2">
          <Canvas dpr={[0, 0]} camera={{ position: [0, 0, cameraZ] }}>
            <Suspense>
              <Center>{modelHanldeler()}</Center>
              <ambientLight intensity={0.4} />
              <directionalLight
                position={[2, 4, 2]}
                intensity={1.2}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
              />
              <spotLight
                position={[0, 2, 3]}
                angle={0.25}
                penumbra={0.5}
                intensity={0.8}
                castShadow
              />
              <pointLight position={[-2, -1, -2]} intensity={0.3} />
              <OrbitControls
                ref={controllerRef}
                enablePan={false}
                enabled={enabelModelController}
              />
            </Suspense>
            <Preload all />
          </Canvas>
        </div>

        {/* controller navbar */}
        <div>
          <div>
            <div className="flex flex-row-reverse mb-3">
              <div className="w-[100px]  mx-3">
                <button
                  className={`text-white ${
                    view != "front" ? "bg-black" : "bg-neutral-500"
                  } w-[100%] py-2  rounded-sm cursor-pointer`}
                  onClick={() => {
                    setView("front");
                  }}
                >
                  جلو لباس
                </button>
              </div>

              <div className="w-[100px] mx-3">
                <button
                  className={`text-white ${
                    view != "back" ? "bg-black" : "bg-neutral-500"
                  } w-[100%] py-2  rounded-sm cursor-pointer`}
                  onClick={() => {
                    setView("back");
                  }}
                >
                  پشت لباس
                </button>
              </div>
              <div className="w-[100px] mx-3">
                <button
                  className="text-white bg-black w-[100%] py-2  rounded-sm cursor-pointer"
                  onClick={() => {}}
                >
                  استین چپ
                </button>
              </div>
              <div className="w-[100px] mx-3">
                <button
                  className="text-white bg-black w-[100%] py-2  rounded-sm cursor-pointer"
                  onClick={() => {}}
                >
                  استین راست
                </button>
              </div>
            </div>
          </div>
          <div
            className="w-[100%] rounded-[25px] p-5"
            style={{ background: "#d7d3d412" }}
          >
            <div className="flex flex-row-reverse justify-between">
              <div className="flex flex-row-reverse">
                <div className="w-[100px] relative mx-3">
                  <div
                    className={`text-white text-center py-2 bg-neutral-900 absolute w-[100px] bottom-0 rounded-lg ${
                      statusChangeColor ? "block" : "hidden"
                    }`}
                  >
                    <p
                      className="m-1 cursor-pointer"
                      onClick={() => {
                        setColor("red");
                        setStatusCahngeColor(false);
                      }}
                    >
                      قرمز
                    </p>
                    <p
                      className="m-1 cursor-pointer"
                      onClick={() => {
                        setColor("#155dfc");
                        setStatusCahngeColor(false);
                      }}
                    >
                      آبی
                    </p>
                    <p
                      className="m-1 cursor-pointer"
                      onClick={() => {
                        setColor("yellow");
                        setStatusCahngeColor(false);
                      }}
                    >
                      زرد
                    </p>
                    <p
                      className="m-1 cursor-pointer"
                      onClick={() => {
                        setColor("#000");
                        setStatusCahngeColor(false);
                      }}
                    >
                      سیاه
                    </p>
                  </div>
                  <button
                    className="text-white bg-neutral-900 w-[100%] py-2  rounded-lg cursor-pointer"
                    onClick={() => setStatusCahngeColor(!statusChangeColor)}
                  >
                    تغییر رنگ
                  </button>
                </div>

                <div className="w-[100px]  mx-3">
                  <button
                    className="text-white bg-neutral-900 w-[100%] py-2  rounded-lg cursor-pointer"
                    onClick={() => {
                      history.pushState(
                        "بانک برچسب",
                        "",
                        "/builder?model=tsh/#bank"
                      );
                      setModal("label");
                    }}
                  >
                    بانک برچسب
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Builder;
