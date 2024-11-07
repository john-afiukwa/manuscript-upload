"use client"

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import Logo from "@public/images/funai_Logo.png";
import { signupAction, verifySession } from "@src/app/api/auth";
import { useRouter } from "next/navigation";

export default function Page() {
  // const [fName, setfName] = useState("");
  // const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmitSigup = async (e: React.FormEvent) => {
    e.preventDefault();

    await signupAction(email, password);
    await verifySession();
    router.push("/manuscripts");
  };

  return (
    <>
      <div
        className="h-screen bg-[url('/images/lab2.webp')] bg-no-repeat bg-cover 
        opacity-70 flex items-center justify-center"
      >
        <div className="bg-white w-[80%] sm:w-[70%] md:w-fit p-4 rounded-lg shadow-2xl">
          <Image src={Logo} alt="School logo" className="w-[170px]" />
        </div>

        <form className="my-5" onSubmit={handleSubmitSigup}>
          <div className="sm:flex justify-evenly items-center gap-10">
            <div className="input-containers">
              <label htmlFor="fName">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                className="inputs"
              // onChange={(e) => setfName(e.target.value)}
              />
            </div>

            <div className="input-containers">
              <label htmlFor="lName">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                className="inputs"
              // onChange={(e) => setlName(e.target.value)}
              />
            </div>
          </div>

          <div className="input-containers">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="inputs"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="">
            <div className="input-containers">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="inputs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-containers">
              <label htmlFor="Cpassword">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="inputs"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#1b9c70] w-full p-2 rounded-md text-white
            font-bold uppercase hover:bg-[#1b9c85]"
            >
              Create Account
            </button>
          </div>

          <div className="flex gap-2 items-center justify-center mt-2">
            <span>Already have an account?</span>
            <Link
              href={"/auth/signin"}
              className="underline font-bold hover:text-green-600 transition"
            >
              Log in
            </Link>
          </div>
        </form>


      </div>
    </>
  );
}