import { useState } from "react";
import { Link } from "react-router-dom";

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className={`mx-4 text-base lg:text-lg  font-normal pb-[14px] md:pb-0`}
    >
      {children}
    </Link>
  );
}

function MobileNav({ open, setOpen }) {
  return (
    <div
      className={`absolute top-0 left-0  w-screen bg-white transform z-50 ${
        open ? "translate-y-16" : "-translate-y-full"
      } transition-transform duration-300 ease-in-out filter drop-shadow-md rounded-[4px] shadow-lg`}
    >
      <div className="flex flex-col ml-4">
        <Link
          to="/rewards"
          className="text-base lg:text-lg font-normal my-4"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Rewards
        </Link>
        <Link
          to="/profile"
          className="text-base lg:text-lg  font-normal my-4"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Profile
        </Link>
        <Link
          to="/"
          className="text-base lg:text-lg  font-normal my-4"
          onClick={() => {
            localStorage.removeItem("user");
            setTimeout(() => {
              setOpen(!open);
            }, 100);
          }}
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex justify-center fixedscreen w- mx-auto bg-white px-5 md:px-20 z-50  py-[23px] h-20 items-center">
      <div className="flex w-screen max-w-[1440px]">
        <MobileNav open={open} setOpen={setOpen} />
        <div className="w-3/12 flex items-center">
          <Link to="/" className="text-2xl font-semibold">
            Refer&Earn
          </Link>
        </div>
        <div className="w-9/12 flex justify-end items-center">
          <div
            className="flex relative w-5 h-5 flex-col justify-between items-center md:hidden"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {/* hamburger button */}
            <span
              className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${
                open ? "w-0" : "w-full"
              }`}
            />
            <span
              className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>

          <div className="hidden md:flex">
            <NavLink to="/rewards">Rewards</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/">
              <div
                onClick={() => {
                  localStorage.removeItem("user");
                }}
              >
                Logout
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
