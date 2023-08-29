import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Rewards() {
  const [copied, setcopied] = useState(false);
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    async function getUser() {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, config)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          setuser(res.data);
        });
    }
    getUser();

    return () => {};
  }, [user.token]);
  // const user = localStorage.getItem("user");
  // const url = "https://tinyurl.com/3wcyvb7x";
  const url = "https://refernearn2022.netlify.app/referal/" + user.id;
  // console.log(typeof user.rewards);
  // console.log(user.rewards);
  return (
    <div>
      <Navbar />
      <section className="pt-24 text-center mx-5 md:mx-auto mb-20">
        <div className="flex flex-col justify-center items-center mb-6">
          <div className="text-center px-[12px] py-0 md:px-5  md:py-2">
            Total rewards
          </div>
          <div className="w-[100px] h-[100px] rounded-full shadow flex items-center justify-center text-3xl m-2">
            {user?.rewards?.length? user?.rewards?.length* 50:0}
            <span className="text-sm">Coins</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center">
          <div className="text-center px-[12px] py-0 md:px-5  md:py-2">
            Share this URL to earn rewards:{" "}
          </div>
          <div className="flex justify-center pt-2 md:pt-0">
            <input
              type="text"
              disabled
              value={url}
              className="text-center px-[12px] py-0  md:px-5 text-ellipsis md:py-2"
            />
            {copied ? (
              <span className="text-center text-green-600 px-[12px] py-0  md:px-5  md:py-2 cursor-pointer hover:text-blue-600">
                copied
              </span>
            ) : (
              <span
                onClick={() => {
                  // navigator.clipboard.writeText(this.state.textToCopy);
                  navigator.clipboard.writeText(url);
                  setcopied(true);
                }}
                className="text-center px-[12px] py-0  md:px-5  md:py-2 cursor-pointer hover:text-blue-600"
              >
                copy
              </span>
            )}
          </div>
        </div>
        <h1 className="my-5 md:my-12 text-2xl">Your Rewards</h1>
        <div>
          <ul className="flex flex-col">
            {user.rewards ? (
              user.rewards.map((reward, index) => {
                const date = new Date(reward.time);
                const year = date.getFullYear();
                const month = date.getMonth();
                const dt = date.getDate();
                const hr = date.getHours();
                const min = date.getMinutes();
                const months = [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ];
                return (
                  <li key={index}>
                    <div className="flex justify-around rounded-sm bg-grey-400 px-[12px] py-0 md:px-5  md:py-2">
                      <p>Recieved from {reward.name}</p>
                      <span>
                        {hr > 12 ? hr - 12 : hr}:{min > 9 ? min : `0` + min}{" "}
                        {hr > 12 ? `PM` : `AM`} - {dt} {months[month]}, {year}
                      </span>
                    </div>
                  </li>
                );
              })
            ) : (
              <li>
                <div className="flex justify-around rounded-sm bg-grey-400 px-[12px] py-0 md:px-5  md:py-2">
                  <p>No rewards recieved yet</p>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div></div>
      </section>
    </div>
  );
}

export default Rewards;
