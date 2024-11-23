"use client";

import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import { useState } from "react";

export default function Profile() {
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center">
        <FaCircleUser className="text-[10rem] text-[#1b9c85]" />

        <div className=" w-full p-3 flex flex-col float-right">
          <div className="w-full flex items-center justify-between">
            <h3 className="font-bold text-lg text-[#0f172a]">My Profile</h3>
            <button
              className="bg-[#1b9c85] text-white font-semibold p-2 px-5 rounded-lg
              hover:bg-[#178e79] duration-300"
              onClick={() => setActive(!active)}
            >
              {active ? "Done" : "Edit"}
            </button>
          </div>

          <div className="mt-10">
            <form>
              <div className="double-inputs-container">
                <div className="profile-inputs-container">
                  <label>First Name</label>
                  <input
                    type="text"
                    className={`profile-inputs ${active ? "border" : ""}`}
                    disabled={!active}
                  />
                </div>

                <div className="profile-inputs-container">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className={`profile-inputs ${active ? "border" : ""}`}
                    disabled={!active}
                  />
                </div>
              </div>

              <div className="single-inputs-container">
                <label>Email</label>
                <input
                  type="email"
                  className={`profile-inputs ${active ? "border" : ""}`}
                  disabled={!active}
                />
              </div>

              <div className="single-inputs-container">
                <label>Address</label>
                <input
                  type="text"
                  className={`profile-inputs ${active ? "border" : ""}`}
                  disabled={!active}
                />
              </div>

              <div className="single-inputs-container">
                <label>Mobile Number</label>
                <input
                  type="number"
                  className={`profile-inputs ${active ? "border" : ""}`}
                  disabled={!active}
                />
              </div>

              <div className="double-inputs-container">
                <div className="profile-inputs-container">
                  <label>City</label>
                  <select
                    className={`profile-inputs ${active ? "border" : ""}`}
                    disabled={!active}
                  >
                    {/* cities options array map */}
                  </select>
                </div>

                <div className="profile-inputs-container">
                  <label>State</label>
                  <select
                    className={`profile-inputs ${active ? "border" : ""}`}
                    disabled={!active}
                  >
                    {/* states options array map */}
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>

        <Link href={"/change-password"} className="global-btns">
          Change Password
        </Link>
      </div>
    </>
  );
}
