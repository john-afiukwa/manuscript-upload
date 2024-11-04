import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/funai_Logo.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
// import { toast } from "react-toastify";

const Signup = () => {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmitSigup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fName,
          lastName: lName,
        });
      }
      console.log(user);
      //   toast.success("Registeration Successful!", {
      //     position: "top-center",
      //   });

      navigate("/signin");
    } catch (error) {
      console.log(error.message);
      //   toast.error(error.message, {
      //     position: "bottom-right",
      //   });
    }
  };

  return (
    <>
      <div
        className="h-screen bg-[url('images/lab2.webp')] bg-no-repeat bg-cover 
        opacity-70 flex items-center justify-center"
      >
        <div className="bg-white w-[80%] sm:w-[70%] md:w-fit p-4 rounded-lg shadow-2xl">
          <div className="flex items-center justify-center">
            <img src={Logo} alt="School logo" className="w-[170px] " />
          </div>

          <form className="my-5">
            <div className="sm:flex justify-evenly items-center gap-10">
              <div className="input-containers">
                <label htmlFor="fName">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="inputs"
                  onChange={(e) => setfName(e.target.value)}
                />
              </div>

              <div className="input-containers">
                <label htmlFor="lName">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="inputs"
                  onChange={(e) => setlName(e.target.value)}
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
          </form>

          <div>
            <button
              className="bg-[#1b9c70] w-full p-2 rounded-md text-white
            font-bold uppercase hover:bg-[#1b9c85]"
              onClick={handleSubmitSigup}
            >
              Create Account
            </button>
          </div>

          <div className="flex gap-2 items-center justify-center mt-2">
            <span>Already have an account?</span>
            <Link
              to={"/signin"}
              className="underline font-bold hover:text-green-600 transition"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
