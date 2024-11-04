import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/funai_Logo.png";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      console.log("User Logged in");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div
        className="h-screen bg-[url('images/labphoto.webp')] bg-no-repeat bg-cover 
        opacity-70 flex items-center justify-center"
      >
        <div className="bg-white w-[80%] sm:w-[70%] md:w-[50%] p-4 rounded-lg shadow-2xl">
          <div className="flex items-center justify-center">
            <img src={Logo} alt="School logo" className="w-[170px] " />
          </div>

          <form className="my-5">
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
          </form>

          <div>
            <button
              className="bg-[#1b9c70] w-full p-2 rounded-md text-white
              font-bold uppercase hover:bg-[#1b9c85]"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>

          <div className="flex gap-2 items-center justify-center mt-2">
            <span>Don't have an account yet?</span>
            <Link
              to={"/signup"}
              className="underline font-bold hover:text-green-600 transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
