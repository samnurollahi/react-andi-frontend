import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Notif from "../../components/notif/Notif";
import configPos from "../../utils/configPos";
import { useNavigate } from "react-router-dom";

// @ts-ignore
import tsh from "../../assets/models/tsh.glb";

interface props {
  isNotif?: boolean;
}

export default function ({ isNotif = false }: props) {
  const [notif, setNotif] = useState(false);
  const [models, setModels] = useState<any[]>([]);

  const navi = useNavigate();

  useEffect(() => {
    let dataT = [];
    for (let key in configPos) {
      const k = key as keyof typeof configPos;
      dataT.push({
        nameFa: configPos[k].nameFa || "مدل",
        name: k,
      });
    }
    setModels(dataT);

    setNotif(isNotif);
  }, []);

  return (
    <>
      <Navbar />
      {notif && (
        <Notif msg={"وارد شدید"} type={"success"} setNotif={setNotif} />
      )}
      <p className="text-white text-center mt-6 text-[15px]">
        رایگان و سریع لباس مخصوص خودتو طراحی کن🚀😉
      </p>

      <div className="flex" dir="rtl">
        {models.map((model) => (
          <div className="flex flex-col p-10">
            <div
              onClick={() => {
                navi(`/builder?model=${model.name}`);
              }}
              className="w-[150px] h-[150px] border-2 rounded-4xl bg-amber-100 cursor-pointer"
            ></div>
            <p className="text-white text-center">{model.nameFa}</p>
          </div>
        ))}
      </div>
    </>
  );
}
