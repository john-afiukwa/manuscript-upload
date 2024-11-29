"use client";

import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      `Current: ${currentPassword} New:${newPassword} Confirm: ${confirmNewPassword}`
    );
  };
  return (
    <>
      <div className=" flex flex-col items-center md:mt-[5rem]">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-10">
          <FaCircleUser className="text-[6rem] md:text-[12rem] text-[#1b9c85]" />

          <div className="w-80">
            <form onSubmit={handleSubmit}>
              <div className="jbsmr-inputs-container pb-3">
                <label>Current Password</label>
                <input
                  type="password"
                  className="jbsmr-inputs"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="jbsmr-inputs-container pb-3">
                <label>New Password</label>
                <input
                  type="password"
                  className="jbsmr-inputs"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="jbsmr-inputs-container">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  className="jbsmr-inputs"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>

              <button className="primary-btns mt-10 p-3" type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
