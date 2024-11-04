import React, { useState } from "react";
import { Link } from "react-router-dom";

import FunaiLogo from "../images/funai_Logo.png";
import Logo from "../images/FUNAI-logoSm.png";

import * as IoIcons from "react-icons/io5";
import { BsArrowLeftShort } from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as RiIcons from "react-icons/ri";
import { navigations } from "../contents/constants";
import Icons from "../components/icons";
{
  /* <RiIcons.RiLogoutCircleLine />; */
}

const Manuscript = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="flex ">
        <section
          className={`bg-indigo-300 h-screen p-5 ${
            open ? "w-64" : "w-20"
          } duration-300 relative`}
        >
          {open ? (
            <img src={FunaiLogo} className="w-40" />
          ) : (
            <img src={Logo} className="w-30" />
          )}

          <BsArrowLeftShort
            className={`bg-white text-2xl rounded-full absolute -right-3 
            top-9 border border-slate-400 cursor-pointer ${
              !open && "rotate-180"
            } duration-500`}
            onClick={() => setOpen(!open)}
          />

          <div className="bg-cyan-300 flex flex-col justify-between">
            {navigations.map(({ title, path, icon }, index) => {
              return (
                <div key={index}>
                  <Link to={path} className="flex items-center gap-2 text-xl">
                    {Icons[icon]}
                    <span>{title}</span>
                  </Link>
                </div>
              );
            })}

            {/* <div>
              <Link className="flex items-center gap-2 text-xl">
                <IoIcons.IoDocuments />
                <span>Manuscripts</span>
              </Link>

              <div className="flex items-center gap-2 text-xl">
                <FaIcons.FaUserCircle />
                <span>Profile</span>
              </div>
            </div> */}

            <div className="flex items-center gap-2 text-xl">
              <RiIcons.RiLogoutCircleLine />
              <span>Log out</span>
            </div>
          </div>
        </section>

        <section className="bg-violet-300 w-full px-[5rem] py-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold">Manuscripts</h2>
            <button
              className="bg-purple-500 text-white p-3 rounded font-bold 
            hover:bg-purple-700 transition"
            >
              Upload Manuscript
            </button>
          </div>

          <div className="bg-white flex items-center justify-center rounded-lg">
            <input
              type="search"
              className="bg-transparent w-full text-lg outline-none px-3 py-2"
              placeholder="Search"
            />
            <button
              className="py-[.8rem] px-4 cursor-pointer text-black 
            hover:bg-purple-500 hover:text-white transition rounded-r-lg"
            >
              <FiIcons.FiSearch className="text-xl" />
            </button>
          </div>

          <div>{/* Uploaded Manuscripts */}</div>
        </section>
      </div>
    </>
  );
};

export default Manuscript;
