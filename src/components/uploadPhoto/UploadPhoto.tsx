import { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import Notif from "../notif/Notif";

interface Props {
  setModal: (value: string) => void;
}

export default ({ setModal }: Props) => {
  const [label, setLabel] = useState("اپلود فایل");
  const [notif, setNotif] = useState<any>({});

  const changeFile = (e: any) => {
    setLabel(e.target.value.split("\\")[2]);
  };
  const uploadFile = (e: any) => {
    if (label == "اپلود فایل") {
      return setNotif({ msg: "تصویری انتخاب نشده است", type: "error" });
    }
  };

  return (
    <div className="">
      {notif && <Notif msg={notif.msg} type={notif.type} setNotif={setNotif} />}

      <div className="flex flex-col justify-center  mt-3">
        <p className="text-center font-bold text-[25px] text-white">
          تصویر دلخواه
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
        <div
          dir="rtl"
          className="sm:w-full md:w-[80%] m-auto flex items-center justify-center h-[90vh]"
        >
          <input
            type="file"
            name="photoUpload"
            id="photoUpload"
            className="hidden"
            onChange={changeFile}
            accept="image/*"
          />

          <div className="w-[80%]">
            <label
              htmlFor="photoUpload"
              className="bg-[#00000038] active:bg-[#000000a1] transition border-dotted border-white border-4 m-auto w-full p-5 flex items-center justify-center text-center text-white h-[200px] cursor-pointer"
            >
              {label}
            </label>
            <button
              onClick={uploadFile}
              className="w-full mt-3 bg-blue-600 m-auto text-white rounded-lg transition hover:bg-blue-400 py-3 cursor-pointer"
            >
              اپلود
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
