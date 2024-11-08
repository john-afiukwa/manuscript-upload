"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import Logo from "@public/images/funai_Logo.png";
import { signinAction, verifySession } from "@src/app/api/auth";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signinAction(email, password);
      await verifySession();
      await router.push("/manuscripts");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <>
      <div
        className="h-screen bg-[url('/images/labphoto.webp')] bg-no-repeat bg-cover 
        opacity-70 flex items-center justify-center"
      >
        <div className="bg-white w-[80%] sm:w-[70%] md:w-[40%] p-4 rounded-lg shadow-2xl">
          <div className="flex item-center justify-center">
            <Image src={Logo} alt="School logo" width={170} height={170} />
          </div>

          <form className="my-5" onSubmit={handleLogin}>
            <div className="input-containers">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="inputs"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-containers">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="inputs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                role="submit"
                className="bg-[#1b9c70] w-full p-2 rounded-md text-white
              font-bold uppercase hover:bg-[#1b9c85]"
              >
                Log In
              </button>
            </div>
            <div className="flex gap-2 items-center justify-center mt-2">
              <span>Don&apos;t have an account yet?</span>
              <Link
                href={"/auth/signup"}
                className="underline font-bold hover:text-green-600 transition"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}