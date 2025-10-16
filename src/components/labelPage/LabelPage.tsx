import { MdArrowBackIos } from "react-icons/md";
import { v4 } from "uuid";
import configPos from "../../utils/configPos.ts";
import { useTexture } from "@react-three/drei";

export const LabelPage = ({ setModal, setLabels, view, modelName }: any) => {
  return (
    <div className="">
      <div className="flex flex-col justify-center  mt-3">
        <p className="text-center font-bold text-[25px] text-white">
          بانک برچسب
        </p>
        <MdArrowBackIos
          className="text-white cursor-pointer text-[25px]"
          onClick={() => {
            history.pushState("بانک برچسب", "", "/builder?model=tsh");
            setModal("");
          }}
        />
      </div>

      {/* content */}
      <div className="">
        <div className="sm:w-full md:w-[80%] m-auto">
          <p className="text-white text-right text-[21px]">جست و جو</p>

          <div className="mt-3" dir="rtl">
            <input
              type="text"
              placeholder="تا بخوای برچسب داریم"
              className="text-white border outline-0 border-indigo-500 rounded-md  p-2 text-right w-full bg-gray-950 transition focus:bg-transparent"
            />
          </div>
        </div>

        <div dir="rtl" className="sm:w-full md:w-[80%] m-auto">
          <div className="mt-5">
            <p className="text-white">تست (20)</p>
            <div>
              <div
                className="cursor-pointer size-52"
                onClick={() => {
                  // console.log(configPos[modelName][view]);
                  setLabels((prev: object[]) => [
                    ...prev,
                    {
                      id: v4(),
                      title: "js",
                      url: "./js.png",
                      pos: view,
                      // @ts-ignore
                      decalX: configPos[modelName].spawnX,
                      // @ts-ignore
                      decalY: configPos[modelName].spawnY,
                      rotateX: 0,
                      rotateY: 0,
                      rotateZ: 0,
                      // @ts-ignore
                      decalZ: configPos[modelName][view] || 0,
                      // @ts-ignore
                      scale: configPos[modelName].scale,
                    },
                  ]);
                  setModal("");
                }}
              >
                <img src="./js.png" alt="" className="w-full" />
                <p className="text-white text-center">جاوااسکریپت</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
