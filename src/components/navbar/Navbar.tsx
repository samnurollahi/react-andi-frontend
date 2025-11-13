import { Link } from "react-router-dom";

export default function () {
  return (
    <>
      <div className="flex mt-[20px] items-center flex-row-reverse justify-between">
        <span className="fa fa-bars text-[30px] text-white cursor-pointer opacity-0"></span>

        <div>
          <Link to={"/"} className="text-white font-bold text-[22px]">
            ANDI :)
          </Link>
        </div>

        <div className="  rounded-full p-2 cursor-pointer">
          <Link to={"/about"} className="fa fa-question text-white "></Link>
        </div>
      </div>
    </>
  );
}
