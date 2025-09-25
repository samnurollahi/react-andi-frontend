import { useMemo, useState } from "react";
import Regex from "../../utils/regexs";
import Loader from "../../components/loader/loader";
import AuthService from "../../service/auth.service";
import Notif from "../../components/notif/Notif";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState<any | string | null>();
  const [isMath, setIsMath] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [notif, setNotif] = useState<null | any>(null);
  const [codeSended, setCodeSended] = useState<boolean>(false);
  const [otp, setOtp] = useState<null | number | string | any>(null);

  const navi = useNavigate()

  const sendOtp = () => {
    setLoaded(true);
    AuthService.sendOTP(phoneNumber)
      .then(() => {
        setNotif({ msg: "کد با موفقیت ارسال شد", type: "success" });
        setLoaded(false);
        setCodeSended(true);
      })
      .catch(() => {
        setNotif({
          msg: "خطایی از سمت سرور رخ داده است بعدا امتحان کنید",
          type: "error",
        });
        setLoaded(false);
      });
  };
  const verifyOtp = () => {
    setLoaded(true)
    AuthService.verifyOTP(phoneNumber, otp).then((result) => {   
      Cookies.set("auth", result.data.auth)
      setNotif({msg: "وارد شدید", type: "success"})
      setLoaded(false)
      setTimeout(() => {
        navi("/")
      }, 1100);
    }).catch(() => {
      setNotif({msg: "کد وارد شده اشتباه است", type: "error"})
      setLoaded(false)
    })
  }

  useMemo(() => {
    if (phoneNumber != null) {
      setIsMath(Regex.phoneNumber.test(phoneNumber));
    }
  }, [phoneNumber]);
  return (
    <>
      <div className="flex items-center justify-center h-[98vh]">
        {notif && (
          <Notif msg={notif.msg} type={notif.type} setNotif={setNotif} />
        )}
        {codeSended ? (
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                ورود به ولو
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-100 text-right"
                  >
                    کد
                  </label>
                  <div className="mt-2 text-center">
                    <OTPInput
                      containerStyle={{
                        justifyContent: "space-between",
                      }}
                      value={otp}
                      onChange={setOtp}
                      numInputs={4}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => (
                        <input
                          {...props}
                          className="block !w-[20%] rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                      )}
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={isMath == false || loaded}
                    onClick={verifyOtp}
                    type="submit"
                    className={`cursor-pointer flex w-full justify-center rounded-md ${
                      loaded ? "bg-indigo-400" : "bg-indigo-500"
                    } px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
                  >
                    {loaded ? <Loader /> : "ورود"}
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm/6 text-gray-400">
                <a
                  href="#"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  پلتفرم انلاین طراحی و سفارش لباس
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                ورود به ولو
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-100 text-right"
                  >
                    شماره موبایل
                  </label>
                  <div className="mt-2">
                    <input
                      autoFocus
                      onChange={({ target }) => {
                        setPhoneNumber(target.value);
                      }}
                      value={phoneNumber}
                      id="phonenumber"
                      maxLength={11}
                      type="tel"
                      className={`${
                        isMath ? "" : "!outline-red-700"
                      } block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`}
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={isMath == false || loaded}
                    onClick={sendOtp}
                    type="submit"
                    className={`cursor-pointer flex w-full justify-center rounded-md ${
                      loaded ? "bg-indigo-400" : "bg-indigo-500"
                    } px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
                  >
                    {loaded ? <Loader /> : "ارسال کد"}
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm/6 text-gray-400">
                <a
                  href="#"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  پلتفرم انلاین طراحی و سفارش لباس
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
