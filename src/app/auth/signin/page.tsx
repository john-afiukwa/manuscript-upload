"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import Image from "next/image";

import Logo from "@public/images/funai_Logo.png";
import { createUserSession, signinAction, verifySession } from "@src/app/api/auth";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "@src/config/firebase";

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

  const signInWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const creds = await signInWithPopup(auth, googleAuthProvider);

      await createUserSession({
        email: creds.user.email ?? "",
        userId: creds.user.uid,
        role: "user",
      })
      await verifySession();
      router.push("/manuscripts");
    } catch (error) {
      console.error("Error signing in with Google:", error);
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
        className="relative h-screen bg-[url('/images/labphoto.webp')] bg-no-repeat bg-cover flex items-center justify-center z-10"
      >
        <div className="absolute inset-0 bg-gray-100 opacity-40 -z-10"></div>
        <div className="p-8 flex-auto sm:flex-none">
          <div className="flex flex-col bg-white sm:w-[500px] md:w-[500px] max-w-[500px] p-4 rounded-lg shadow-2xl z-10 text-gray-600">
            <div className="self-center">
              <Image src={Logo} alt="School logo" width={170} priority />
            </div>

            <form className="my-5 flex flex-col gap-2" onSubmit={handleLogin}>
              <h1 className="text-xl font-bold text-center uppercase">Sign in</h1>
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
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={!isValid() || loading}
                  style={{ cursor: !isValid() || loading ? "not-allowed" : "pointer" }}
                  className={`w-full mt-4 p-2 rounded-md text-white font-bold uppercase mt-2 ${loading ? "bg-[#1b9c85]" : "bg-[#1b9c70] hover:bg-[#1b9c85]"
                    }`}
                >
                  {loading ? "Loading..." : "Sign In"}
                </button>
                <div className="relative py-4 w-1/2 self-center">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
                <button className="gsi-material-button" disabled={loading} onClick={signInWithGoogle}>
                  <div className="gsi-material-button-state"></div>
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: "block" }}>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">Sign in with Google</span>
                    <span style={{ display: "none" }}>Sign in with Google</span>
                  </div>
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

      </div>
    </>
  );
}
