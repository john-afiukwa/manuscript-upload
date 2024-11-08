"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import Image from "next/image";

import Logo from "@public/images/funai_Logo.png";
import { signinAction, verifySession } from "@src/app/api/auth";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpErr, setSignUpErr] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signinAction(email, password);
      await verifySession();
      router.push("/manuscripts");
    } catch {
      setSignUpErr("Invalid email or password");
      setLoading(false);
    }
  };

  const isValid = useCallback(() => {
    if (!email || !password) {
      return false;
    }

    return true;
  }, [email, password]);

  return (
    <>
      <div
        className="h-screen bg-[url('/images/labphoto.webp')] bg-no-repeat bg-cover 
        opacity-70 flex items-center justify-center"
      >
        <div className="bg-white sm:w-[70%] md:w-[500px] max-w-[500px] p-4 rounded-lg shadow-2xl">
          <div className="flex item-center justify-center">
            <Image src={Logo} alt="School logo" width={170} height={170} />
          </div>

          <form className="my-5" onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold text-center">Sign In</h2>
            {signUpErr && <p className="text-red-500 text-center">{signUpErr}</p>}
            <div className="input-containers">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="inputs"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-containers">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="inputs"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={!isValid() || loading}
                style={{ cursor: !isValid() || loading ? "not-allowed" : "pointer" }}
                className={`w-full mt-4 p-2 rounded-md text-white font-bold uppercase mt-2 ${loading ? "bg-[#1b9c85]" : "bg-[#1b9c70] hover:bg-[#1b9c85]"
                  }`}
              >
                {loading ? "Loading..." : "Sign In"}
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
