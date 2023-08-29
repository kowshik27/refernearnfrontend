import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { deviceDetect } from "react-device-detect";
import axios from "axios";

function Otp() {
  const navigate = useNavigate();
  const formData = {};
  async function handleOnSubmit(e) {
    e.preventDefault();
    Array.from(e.currentTarget.elements).forEach((field) => {
      if (!field.value && field.name) {
        toast.error("Invalid " + field.name);
        return;
      } else if (field.name) formData[field.name] = field.value;
    });
    const deviceType = deviceDetect().isMobile
      ? deviceDetect().os
      : deviceDetect().osName;
    formData["deviceType"] = deviceType;
    formData["referalFrom"] = localStorage.getItem("referalFrom")
      ? localStorage.getItem("referalFrom")
      : "";
    // const config = {
    //   header : {
    //     Authorization : `Bearer ${token}`
    //   }
    // }
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/otp/${localStorage.getItem(
          "otpToken"
        )}`,
        formData
      )
      .then((res) => {
        localStorage.setItem("otpToken", res.data.token);
        toast.success("Logged in successfully");
        localStorage.setItem("user", JSON.stringify(res.data));
        setTimeout(() => {
          navigate("/rewards");
        }, 6000);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }
  return (
    <div className="shadow rounded-sm px-12 py-8 sm:w-[600px] md:w-[600px] flex flex-col mx-4">
      <ToastContainer position="top-center" autoClose={5000} />

      <h1 className="pb-4 text-center">Two Factor Authentication</h1>
      <p className="pb-8 md:pb-16 text-center">
        An OTP has been sent to your registered email ID. Please check
      </p>

      <form
        method="post"
        onSubmit={handleOnSubmit}
        className="flex flex-col items-center justify-start w-full"
      >
        <div className="flex flex-col w-full mb-2 max-w-[1200px] md:pl-5 text-left self-end">
          <label htmlFor="otp">Enter OTP</label>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP here"
            className="mt-2 w-full px-[12px] py-0 md:px-5 h-[48px] text-ellipsis md:py-2 rounded-md border-[1px] border-grey-600"
          />
        </div>
        <div className="flex flex-col md:flex-row md:justify-end w-full">
          <button
            onClick={(e) => {
              //   e.preventDefault();
              //   navigate("/rewards");
            }}
            className="order-1 md:order-2 w-full md:max-w-[200px] mt-2 h-[48px] px-[10px] py-[5px] rounded-[4px] text-[12px] lg:text-[18px] font-bold bg-[#B1EAC1] hover:bg-[#58d17a]"
          >
            {/* <Link to="/signup">Verify OTP</Link> */}
            Verify OTP
          </button>
        </div>
      </form>
    </div>
  );
}

export default Otp;
