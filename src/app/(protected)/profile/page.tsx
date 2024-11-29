"use client";

import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import { useState } from "react";
import { states } from "@src/contents/constants";

export default function Profile() {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [active, setActive] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      `Name: ${fName} ${lName}
      Email: ${email}
      Address: ${address}
      Mobile: ${mobileNumber}
      City: ${city}
      State: ${state}
      `
    );
    setActive(!active);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <FaCircleUser className="text-[10rem] text-[#1b9c85]" />

        <div className=" w-full p-3 flex flex-col float-right">
          <div className="w-full flex items-center justify-between mt-5">
            <h3 className="font-bold text-lg text-[#0f172a]">My Profile</h3>
            <button
              className="primary-btns p-2 px-5"
              onClick={() => setActive(true)}
              disabled={active}
            >
              Edit Profile
            </button>
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit}>
              <div className="md:flex items-center justify-between gap-10 md:pb-3">
                <div className="jbsmr-inputs-container">
                  <label>First Name</label>
                  <input
                    type="text"
                    className={`jbsmr-inputs ${active ? "border" : ""}`}
                    onChange={(e) => setFname(e.target.value)}
                    disabled={!active}
                  />
                </div>

                <div className="jbsmr-inputs-container">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className={`jbsmr-inputs ${active ? "border" : ""}`}
                    onChange={(e) => setLname(e.target.value)}
                    disabled={!active}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 pb-3">
                <label>Email</label>
                <input
                  type="email"
                  className={`jbsmr-inputs ${active ? "border" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!active}
                />
              </div>

              <div className="flex flex-col gap-3 pb-3">
                <label>Address</label>
                <input
                  type="text"
                  className={`jbsmr-inputs ${active ? "border" : ""}`}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!active}
                />
              </div>

              <div className="flex flex-col gap-3 pb-3">
                <label>Mobile Number</label>
                <input
                  type="number"
                  className={`jbsmr-inputs ${active ? "border" : ""}`}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  disabled={!active}
                />
              </div>

              <div className="md:flex items-center justify-between gap-10 md:pb-3">
                <div className="jbsmr-inputs-container">
                  <label>City</label>
                  <select
                    className={`jbsmr-inputs ${active ? "border" : ""}`}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!active}
                  >
                    {/* cities options array map */}
                  </select>
                </div>

                <div className="jbsmr-inputs-container">
                  <label>State</label>
                  <select
                    className={`jbsmr-inputs ${active ? "border" : ""}`}
                    onChange={(e) => setState(e.target.value)}
                    disabled={!active}
                  >
                    {states.map((item, index) => {
                      return <option key={index}>{item}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="primary-btns mt-10 p-3"
                  type="submit"
                  hidden={!active}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Link
        href={"/change-password"}
        className="primary-btns mt-10 p-3 float-right mr-4"
      >
        Change Password
      </Link>
    </>
  );
}
