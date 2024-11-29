"use client";

import Image from "next/image";
import Logo from "@public/images/funai_Logo.png";
import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <>
      <div className="relative h-screen bg-[url('/images/labphoto.webp')] bg-no-repeat bg-cover flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-100 opacity-40"></div>
        <div className="bg-white sm:w-[80%] md:w-[500px] max-w-[500px] p-4 rounded-lg shadow-2xl z-10 text-gray-600">
          <div className="flex item-center justify-center">
            <Image src={Logo} alt="School logo" width={170} height={170} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-containers mt-5">
              <label htmlFor="email">Input your Email</label>
              <input
                type="email"
                placeholder="Email"
                className="inputs"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center">
              <button type="submit" className="primary-btns mt-5 p-3">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
