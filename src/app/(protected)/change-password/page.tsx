"use client";

import { FaCircleUser } from "react-icons/fa6";

export default function ChangePassword() {
  return (
    <>
      <div className=" flex flex-col items-center md:mt-[5rem]">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-10">
          <FaCircleUser className="text-[6rem] md:text-[12rem] text-[#1b9c85]" />

          <div className="w-80">
            <form>
              <div className="profile-inputs-container">
                <label>Current Password</label>
                <input type="password" className="profile-inputs" />
              </div>

              <div className="profile-inputs-container">
                <label>New Password</label>
                <input type="password" className="profile-inputs" />
              </div>

              <div className="profile-inputs-container">
                <label>Confirm New Password</label>
                <input type="password" className="profile-inputs" />
              </div>
            </form>
          </div>
        </div>

        <div>
          <button className="global-btns">Save Changes</button>
        </div>
      </div>
    </>
  );
}
