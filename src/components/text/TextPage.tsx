import { MdArrowBackIos } from "react-icons/md";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import configPos from "../../utils/configPos.ts";

export const TextPage = ({ setModal, setLabels, view, modelName }: any) => {
  const [text, setText] = useState<string>("");

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [spacing, setSpacing] = useState(0);
  const [textColor, setTextColor] = useState("#ffffff");
  const [strokeColor, setStrokeColor] = useState("#000000");

  const convetTextToPng = () => {
    const canvas = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    ctx!.font = `${isBold ? "bold" : ""} ${
      isItalic ? "italic" : ""
    } 30px Arial`;
    ctx!.fillStyle = textColor;
    ctx!.textAlign = "center";
    ctx!.textBaseline = "middle";

    ctx!.fillText(text, canvas.width / 2, canvas.height / 2);
    const dataUrl = canvas.toDataURL();
    setLabels((prev: object[]) => [
      ...prev,
      {
        id: v4(),
        title: text,
        url: dataUrl,
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
  };
  useEffect(() => {
    const handelText = (e: KeyboardEvent) => {
      setText((prev: string) => {
        if (e.key === "Backspace") {
          return prev.slice(0, -1);
        } else if (
          e.key !== "Alt" &&
          e.key !== "Control" &&
          e.key !== "Enter" &&
          e.key !== "Shift"
        ) {
          return prev + e.key;
        } else {
          return prev;
        }
      });
    };

    window.addEventListener("keydown", handelText);
    return () => window.removeEventListener("keydown", handelText);
  }, []);

  const baseButton =
    "w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 text-lg transition-all duration-200 shadow";

  const getButtonClass = (active: boolean) =>
    `${baseButton} ${
      active
        ? "bg-indigo-600 text-white"
        : "bg-gray-800 text-gray-200 hover:bg-indigo-600"
    }`;

  return (
    <div className="p-6">
      {/* header */}
      <div className="flex flex-row-reverse items-center justify-between mb-6">
        <p className="text-center font-bold text-[25px] text-white flex-1">
          متن
        </p>
        <MdArrowBackIos
          className="text-white cursor-pointer text-[25px]"
          onClick={() => setModal("")}
        />
      </div>

      {/* preview box */}
      <div className="mt-6">
        <div
          className={`border border-indigo-600 rounded-xl sm:w-[85%] md:w-[60%] m-auto h-[120px] flex justify-center items-center text-[28px] text-center`}
          style={{
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: `${isUnderline ? "underline " : ""}${
              isStrike ? " line-through" : ""
            }`,
            letterSpacing: `${spacing}px`,
            color: textColor,
            WebkitTextStroke: `1px ${strokeColor}`,
          }}
        >
          {text || "تایپ کنید"}
        </div>
      </div>

      {/* editor controls */}
      <div className="mt-8 sm:w-[85%] md:w-[60%] m-auto bg-gray-900 rounded-xl p-4 flex flex-wrap gap-4 justify-center items-center shadow-lg">
        <button
          onClick={() => setIsBold(!isBold)}
          className={getButtonClass(isBold)}
        >
          <span className="font-bold">B</span>
        </button>
        <button
          onClick={() => setIsItalic(!isItalic)}
          className={getButtonClass(isItalic)}
        >
          <span className="italic">I</span>
        </button>
        <button
          onClick={() => setIsUnderline(!isUnderline)}
          className={getButtonClass(isUnderline)}
        >
          <span className="underline">U</span>
        </button>
        <button
          onClick={() => setIsStrike(!isStrike)}
          className={getButtonClass(isStrike)}
        >
          <span className="line-through">S</span>
        </button>

        {/* letter spacing */}
        <div className="flex flex-col items-center gap-1">
          <label className="text-white text-xs">فاصله بین حروف</label>
          <input
            type="range"
            min="0"
            max="20"
            value={spacing}
            onChange={(e) => setSpacing(Number(e.target.value))}
            className="w-28 accent-indigo-500"
          />
        </div>

        {/* text color */}
        <div className="flex flex-col items-center gap-1">
          <label className="text-white text-xs">رنگ</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-10 h-8 cursor-pointer rounded-md border"
          />
        </div>

        {/* stroke color */}
        <div className="flex flex-col items-center gap-1">
          <label className="text-white text-xs">حاشیه</label>
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="w-10 h-8 cursor-pointer rounded-md border"
          />
        </div>
      </div>

      <div className="sm:w-[85%] md:w-[60%] m-auto mt-4">
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl shadow-lg transition-all duration-200 cursor-pointer"
          onClick={() => {
            convetTextToPng();
          }}
        >
          افزودن
        </button>
      </div>
    </div>
  );
};
