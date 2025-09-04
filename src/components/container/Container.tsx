import type React from "react";

export default function({children}: {children: React.ReactNode}){
    return (
        <div className="w-[90%] m-auto">{children}</div>
    )
}