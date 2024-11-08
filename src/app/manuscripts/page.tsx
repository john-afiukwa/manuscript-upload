"use client";

import Icons from "@src/components/icons";
import { sideNavItems } from "@src/contents/constants";
import Link from "next/link";
import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { RiLogoutCircleLine } from "react-icons/ri";

import FunaiLogo from "@public/images/funai_Logo.png";
import Logo from "@public/images/FUNAI-logoSm.png";
import Image from "next/image";
import NewManuscriptModal from "@src/components/newManuscriptModal";
import { FaTimes } from "react-icons/fa";

export default function Page() {
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenuBar = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <div className="flex">
        <section
          className={`md:block h-screen ${open ? "w-72" : "w-[80px]"
            } duration-300 md:relative absolute ${openMenu ? "left-0" : "left-[-20rem] md:left-0"
            }`}
        >
          <BsArrowLeftShort
            className={`hidden md:block bg-white text-2xl rounded-full absolute -right-3 
            top-9 border border-slate-400 cursor-pointer ${!open && "rotate-180"
              } duration-500`}
            onClick={() => setOpen(!open)}
          />

          <div
            className="bg-[#1b9c85] text-white h-full flex
          flex-col justify-between px-2 py-4"
          >
            <div>
              <div className="m-2 flex items-center justify-between gap-4">
                {open ? (
                  <Image src={FunaiLogo} alt="Funai Logo" className="w-40" />
                ) : (
                  <Image src={Logo} alt="Logo" className="w-40" />
                )}

                <button>
                  <FaTimes
                    className="text-lg md:hidden"
                    onClick={toggleMenuBar}
                  />
                </button>
              </div>

              <div className="mt-7 flex flex-col gap-2">
                {sideNavItems.map(({ title, path, icon }, index) => {
                  return (
                    <div key={index}>
                      <Link
                        href={path}
                        className={`sidebar-tags ${!open && "justify-center"}`}
                      >
                        {Icons[icon]}
                        <span
                          className={`${!open && "hidden"
                            } font-semibold text-sm origin-left duration-200`}
                        >
                          {title}
                        </span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            <button className={`sidebar-tags ${!open && "justify-center"}`}>
              <RiLogoutCircleLine />
              <span className={`${open ? "font-semibold text-sm" : "hidden"}`}>
                Log out
              </span>
            </button>
          </div>
        </section>

        <section className="w-full px-10 md:px-[5rem] py-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 md:gap-5">
              <button className="md:hidden">
                <FaBarsStaggered className="text-lg" onClick={toggleMenuBar} />
              </button>

              <h2 className="md:text-2xl text-[#0f172a] font-bold">Manuscripts</h2>
            </div>
            <button
              className="bg-[#1b9c85] text-white text-sm p-2 md:p-3 rounded font-bold 
            hover:bg-[#178e79] duration-300"
              onClick={() => setOpenModal(true)}
            >
              Upload Manuscript
            </button>
          </div>

          <div className="bg-slate-200 flex items-center justify-center rounded-lg">
            <input
              type="search"
              className="bg-transparent w-full text-lg outline-none px-3 py-2"
              placeholder="Search"
            />
            <button
              className="py-[.8rem] px-4 cursor-pointer text-black 
            hover:bg-violet-500 hover:text-white transition rounded-r-lg"
            >
              <FiSearch className="text-xl" />
            </button>
          </div>

          <div>{/* Uploaded Manuscripts */}</div>

          <NewManuscriptModal
            open={openModal}
            onClose={() => setOpenModal(!openModal)}
          />
        </section>
      </div>
    </>
  );
}
