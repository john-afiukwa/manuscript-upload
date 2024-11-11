"use client";

import { MouseEvent as ReactMouseEvent } from "react";
import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { sideNavItems } from "@src/contents/constants";
import Link from "next/link";
import Icons from "./icons";
import { RiLogoutCircleLine } from "react-icons/ri";
import FunaiLogo from "@public/images/funai_Logo.png";
import Logo from "@public/images/FUNAI-logoSm.png";
import { FaBarsStaggered } from "react-icons/fa6";
import { useAuth } from "@src/hooks/useAuth";

export default function SideBar() {
  const [open, setOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const { signout } = useAuth();

  const toggleMenuBar = () => {
    setOpenMenu(!openMenu);
  };

  const handleSignout = async (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signout();
  }

  return (<div className="relative">
    <button className="mt-10 ml-4 p-2 md:hidden">
      <FaBarsStaggered className="text-lg" onClick={toggleMenuBar} />
    </button>

    <section
      className={`absolute md:block h-screen top-0 ${open ? "w-72" : "w-[80px]"} duration-300 md:relative absolute ${openMenu ? "left-0" : "left-[-20rem] md:left-0"}`}
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

        <button className={`sidebar-tags ${!open && "justify-center"}`} onClick={handleSignout}>
          <RiLogoutCircleLine />
          <span className={`${open ? "font-semibold text-sm" : "hidden"}`}>
            Log out
          </span>
        </button>
      </div>
    </section>
  </div>
  )
}