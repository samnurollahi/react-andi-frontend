import { useEffect, useRef } from "react";
import styled from "./notif.module.css";

interface Props {
  type: "info" | "success" | "error";
  msg: string;
  setNotif: any
}
const icons = {
    info: "ℹ️",
    error: "❌",
    success: "✅"
}

export default function Notif({ type, msg, setNotif }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setNotif(false)
      ref.current!.remove();
    }, 2_400);
  }, []);

  return (
    <div className={styled.toastContainer}>
      <div className={`${styled.toast} ${styled[type]} font-vazir`} ref={ref}>
        {icons[type]}{msg}
      </div>
    </div>
  );
}
