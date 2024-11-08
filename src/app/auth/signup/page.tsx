"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import Image from "next/image";

import Logo from "@public/images/funai_Logo.png";
import { signupAction, verifySession } from "@src/app/api/auth";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { passwordSchema } from "@src/app/schema/auth";

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Page() {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<SignUpData>>({});
  const [signUpErr, setSignUpErr] = useState<string | null>(null);
  const router = useRouter();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
    validateFormInput(name as keyof SignUpData, value);
  }

  const isValid = useCallback(() => {
    const { email, password, firstName, lastName } = signUpData;
    if (!email || !password || !firstName || !lastName) {
      return false;
    }

    if (Object.keys(errors).length > 0) {
      return false;
    }

    return true;
  }, [signUpData, errors]);

  const getFormInputSchema = (field: keyof SignUpData) => {
    switch (field) {
      case "firstName":
        return z.string().min(2, {
          message: "First name must be at least 2 characters long",
        }).max(50, {
          message: "First name must not be more than 50 characters"
        });
      case "lastName":
        return z.string().min(2, {
          message: "Last name must be at least 2 characters long",
        }).max(50, {
          message: "Last name must not be more than 50 characters"
        });
      case "email":
        return z.string().email();
      case "password":
        return passwordSchema;
      default:
        return z.string();
    }
  };

  const validateFormInput = (field: keyof SignUpData, value: string) => {
    const schema = getFormInputSchema(field);
    try {
      schema.parse(value);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
      if (field === "confirmPassword" && value !== signUpData.password) {
        setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          setErrors((prev) => ({ ...prev, [field]: err.message }));
        });
        return;
      }
    }
  }

  const handleSubmitSigup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) {
      return;
    }
    setLoading(true);

    const { email, password, firstName, lastName } = signUpData;

    try {
      await signupAction(email, password, firstName, lastName);
      await verifySession();
      router.push("/manuscripts");
    } catch (error) {
      console.error("Error signing up:", error);
      if (error instanceof Error) {
        setSignUpErr(error.message);
      } else {
        setSignUpErr("An error occurred. Please try again later");
      }
      setLoading(false);
    }
  };

  const InputError = (props: { field: keyof SignUpData }) => {
    if (errors[props.field]) {
      return (
        <p className="text-red-500 text-sm">
          {errors[props.field]}
        </p>
      );
    }
  }

  return (
    <div
      className="h-screen bg-[url('/images/labphoto.webp')] bg-no-repeat bg-cover 
        opacity-70 flex items-center justify-center"
    >
      <div className="bg-white sm:w-[70%] md:w-[500px] max-w-[500px] p-4 rounded-lg shadow-2xl">
        <div className="flex item-center justify-center">
          <Image src={Logo} alt="School logo" className="w-[170px]" />
        </div>

        <form className="my-5" onSubmit={handleSubmitSigup}>
          <h1 className="text-2xl font-bold text-center">Sign up</h1>
          {signUpErr && <p className="text-red-500 text-center">{signUpErr}</p>}
            <div className="input-containers">
            <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                className="inputs"
              name="firstName"
              value={signUpData.firstName}
              onChange={handleFormChange}
              />
            <InputError field="firstName" />
            </div>

            <div className="input-containers">
            <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                className="inputs"
              name="lastName"
              value={signUpData.lastName}
              onChange={handleFormChange}
            />
            <InputError field="lastName" />
          </div>

          <div className="input-containers">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="inputs"
              name="email"
              value={signUpData.email}
              onChange={handleFormChange}
            />
            <InputError field="email" />
          </div>

          <div className="">
            <div className="input-containers">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="inputs"
                name="password"
                value={signUpData.password}
                onChange={handleFormChange}
              />
              <InputError field="password" />
            </div>
            <div className="input-containers">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="inputs"
                name="confirmPassword"
                value={signUpData.confirmPassword}
                onChange={handleFormChange}
              />
              <InputError field="confirmPassword" />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid() || loading}
            style={{ cursor: !isValid() || loading ? "not-allowed" : "pointer" }}
            className={`w-full mt-4 p-2 rounded-md text-white font-bold uppercase mt-2 ${loading ? "bg-[#1b9c85]" : "bg-[#1b9c70] hover:bg-[#1b9c85]"
              }`}
          >
            {loading ? "Creating your account..." : "Sign up"}
          </button>

          <div className="flex gap-2 items-center justify-center mt-2">
            <span>Already have an account?</span>
            <Link
              href={"/auth/signin"}
              className="underline font-bold hover:text-green-600 transition"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>

    </div>
  );
}
