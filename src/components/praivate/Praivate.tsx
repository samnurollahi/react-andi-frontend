import type { ReactNode } from "react";
import { useAuth } from "../../context/Auth";
import { Navigate } from "react-router-dom";

const Praivate = ({children}: {children: ReactNode}) => {
    return useAuth() ? children : <Navigate to={"/login"} />
};

export default Praivate;
