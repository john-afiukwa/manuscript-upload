"use server"

import { auth } from "@src/config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

export async function signinAction(email: string, password: string): Promise<{ error?: string } | UserCredential> {
  try {
    const creds = await signInWithEmailAndPassword(auth, email, password);
    return creds;
  } catch (error) {
    console.log(error);
    
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred" };
    }
  }
}

export async function signupAction(email: string, password: string): Promise<{ error?: string } | UserCredential> {
  try {
    const creds = await createUserWithEmailAndPassword(auth, email, password);
    return creds;
  } catch (error) {
    console.log(error);
    
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred" };
    }
  }
}