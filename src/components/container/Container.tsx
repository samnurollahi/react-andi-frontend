import type React from "react";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:w-[60%] m-auto overflow-x-hidden h-[100vh]">
      {children}
    </div>
  );
}
