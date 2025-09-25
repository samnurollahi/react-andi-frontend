import { useState } from "react";

export default function ({
  setSize,
  size,
}: {
  setSize: any
  size: any;
}) {

    const [select, setSelected] = useState<null | string>(null)

  return (
    <>
    <div className="flex h-[98vh] w-full justify-center items-center flex-col">
      <div className="text-white text-center text-2xl p-5">انتخاب سایز</div>
      <div className="flex flex-row-reverse justify-center">
        <span
          className={`bg-black rounded-md text-white m-1 p-4 cursor-pointer ${
            select == "s" ? "bg-indigo-800" : ""
          }`}
          onClick={() => {
            setSelected("s")
          }}
        >
          s
        </span>
        <span
          className={`bg-black rounded-md text-white m-1 p-4 cursor-pointer ${
            select == "m" ? "bg-indigo-800" : ""
          }`}
          onClick={() => {
            setSelected("m")
          }}
        >
          m
        </span>
        <span
          className={`bg-black rounded-md text-white m-1 p-4 cursor-pointer ${
            select == "l" ? "bg-indigo-800" : ""
          }`}
          onClick={() => {
            setSelected("l")
          }}
        >
          l
        </span>
        <span
          className={`bg-black rounded-md text-white m-1 p-4 cursor-pointer ${
            select == "xl" ? "bg-indigo-800" : ""
          }`}
          onClick={() => {
            setSelected("xl")
          }}
        >
          xl
        </span>
        <span
          className={`bg-black rounded-md text-white m-1 p-4 cursor-pointer ${
            select == "2xl" ? "bg-indigo-800" : ""
          }`}
          onClick={() => {
            setSelected("2xl")
          }}
        >
          2xl
        </span>
        <span
          className={`bg-black rounded-md text-white m-1 p-4 cursor-pointer ${
            select == "3xl" ? "bg-indigo-800" : ""
          }`}
          onClick={() => {
            setSelected("3xl")
          }}
        >
          3xl
        </span>
        <span
          className={`bg-black rounded-md text-white m-1 p-4 cursor-pointer ${
            select == "4xl" ? "bg-indigo-800" : ""
          }`}
          onClick={() => {
            setSelected("4xl")
          }}
        >
          4xl
        </span>
        <span
          className={`bg-black rounded-md text-white m-1 p-4 cursor-pointer ${
            select == "5xl" ? "bg-indigo-800" : ""
          }`}
          onClick={() => {
            setSelected("5xl")
          }}
        >
          5xl
        </span>
      </div>
      <div className="text-center">
      <button className="cursor-pointer transition bg-indigo-600 active:bg-indigo-500 text-white rounded-sm px-5 py-2 mt-5" onClick={() => {
        setSize(select)
      }}>مرحله بعد</button>
      </div>
    </div>
    </>
  );
}
