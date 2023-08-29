import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Verifyemail() {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    async function verify() {
      await axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/confirmation/` + id
        )
        .then((res) => {
          toast.info("Verifying email...", {
            toastId: "verifyemail",
          });
          setTimeout(() => {
            toast.success("Redirecting to login page", {
              toastId: "redirecting",
            });
          }, 1000);

          setTimeout(() => {
            navigate("/login");
          }, 7000);
        });
    }
    verify();
    return () => {};
  }, [id, navigate]);

  return (
    <div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Verifyemail;
