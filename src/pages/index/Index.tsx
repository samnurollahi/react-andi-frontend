import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Notif from "../../components/notif/Notif";
import configPos from "../../utils/configPos";
import { useNavigate } from "react-router-dom";
import "../../anim.css";

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
        th: configPos[k].th || "url",
      });
    }
    setModels(dataT);

    setNotif(isNotif);
  }, []);

  return (
    <>
      <div className="animate__animated animate__fadeInRight animate__faster">
        <Navbar />
        {notif && (
          <Notif msg={"وارد شدید"} type={"success"} setNotif={setNotif} />
        )}
        <p className="text-white text-center mt-6 text-[15px]">
          رایگان و سریع لباس مخصوص خودتو طراحی کن🚀😉
        </p>

        <div className="flex flex-wrap items-center justify-center" dir="rtl">
          {models.map((model) => (
            <div className="flex flex-col p-3">
              <div
                onClick={() => {
                  navi(`/builder?model=${model.name}`);
                }}
                className="w-[150px] h-[150px] border-2 rounded-4xl bg-amber-100 cursor-pointer flex items-center justify-center"
              >
                <img src={`${model.th}`} alt="" className="w-[50%]" />
              </div>
              <p className="text-white text-center">{model.nameFa}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
