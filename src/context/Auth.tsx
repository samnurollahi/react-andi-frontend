import { createContext, useContext, type ReactNode } from "react";
import jsCookie from "js-cookie"

const contextAuth = createContext<boolean | null>(null);

export default function ({ children }: { children: ReactNode }) {
    return <contextAuth.Provider value={jsCookie.get("auth") ? true : false}>{children}</contextAuth.Provider>;
}

export const useAuth = () => useContext(contextAuth)