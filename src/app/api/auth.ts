"use server"

import { auth, db } from "@src/config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { cookies } from "next/headers";
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cache } from "react";
import { z } from 'zod';
import { passwordSchema, userDataSchema } from "@src/app/schema/auth";
import { FirebaseError } from "firebase/app";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

interface SessionPayload extends JWTPayload {
  email: string
  firstName: string
  lastName: string
  userId: string
  name: string
  role: string
}

export async function signinAction(email: string, password: string): Promise<void> {
  try {
    const creds = await signInWithEmailAndPassword(auth, email, password);
    const user = await getUserRef(email, creds.user.uid);

    if (!user) {
      return Promise.reject("User not found");
    }

    await createUserSession({
      email: email,
      userId: creds.user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`,
      role: "user",
    })

  } catch (error) {
    console.log(error);
    
    if (error instanceof Error) {
      return Promise.reject(error.message);
    } else {
      return Promise.reject(error);
    }
  }
}

export async function getUserRef(email: string, userId: string) {
  const manuscriptsRef = collection(db, "users");
  const q = query(manuscriptsRef, where("id", "==", `${email}:${userId}`));
  const querySnapshot = (await getDocs(q));

  if (querySnapshot.empty) {
    return null;
  }

  return querySnapshot.docs[0].data();
}

export async function createUserRef(user: { email: string, firstName: string, lastName: string, userId: string }) {
  await setDoc(doc(db, "users", `${user.email}:${user.userId}`), {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userId: user.userId,
    createdAt: new Date()
  });
}

export async function signupAction(email: string, password: string, firstName: string, lastName: string): Promise<void> {
  try {
    const userData = validateUserData(email, firstName, lastName);
    if (!userData.isValid) {
      return Promise.reject(userData.errors);
    }

    const passwordStrength = validatePasswordStrength(password);
    if (!passwordStrength.isValid) {
      return Promise.reject(passwordStrength.errors);
    }

    const creds = await createUserWithEmailAndPassword(auth, email, password);
    // Store the file reference in Firestore

    await createUserRef({
      email: email,
      firstName: firstName,
      lastName: lastName,
      userId: creds.user.uid,
    })
    await sendEmailVerification(creds.user);

    await createUserSession({
      email: email,
      firstName: firstName,
      lastName: lastName,
      userId: creds.user.uid,
      name: `${firstName} ${lastName}`,
      role: "user",
    })
  } catch (error) {
    console.log(error);
    
    if (error instanceof FirebaseError) {
      if (error.code === "auth/email-already-in-use") {
        return Promise.reject("Email already in use");
      }
    }

    if (error instanceof Error) {
      return Promise.reject(error.message);
    }

    return Promise.reject(error);
  }
}

export async function signoutAction(): Promise<void> {
  try {
    await auth.signOut();
    (await cookies()).delete("session");
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser(): Promise<null | SessionPayload> {
  try {
    const user = await verifySession();
    if (user && user.isAuth) {
      return {
        email: user.email as string,
        firstName: user.firstName as string,
        lastName: user.lastName as string,
        userId: user.userId as string,
        name: user.name as string,
        role: user.role as string,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  return {
    isAuth: true,
    userId: session?.userId,
    email: session?.email,
    firstName: session?.firstName,
    lastName: session?.lastName,
    name: session?.name,
    role: session?.role,
  }
})

const secretKey = process.env.APP_SESSION_SECRET_KEY
const encodedKey = new TextEncoder().encode(secretKey)

async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session', error)
  }
}

export async function createUserSession(payload: SessionPayload) {
  const sessionString = await encrypt({
    email: payload.email ?? "",
    firstName: payload.firstName ?? "",
    lastName: payload.lastName ?? "",
    userId: payload.userId ?? "",
    name: payload.name ?? "",
    role: payload.role ?? "",
  });

  (await cookies()).set("session", sessionString, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    sameSite: 'lax',
    path: '/',
  });
}

function validatePasswordStrength(password: string): { isValid: boolean; errors: string[] | null } {
  try {
    passwordSchema.parse(password);
    return {
      isValid: true,
      errors: null,
    };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return {
        isValid: false,
        errors: e.errors.map((error) => error.message),
      }
    }
    return {
      isValid: false,
      errors: ["An error occurred while validating the password"],
    };
  }
}

function validateUserData(email: string, firstName: string, lastName: string): { isValid: boolean; errors: string[] | null } {
  try {
    userDataSchema.parse({ email, firstName, lastName });
    return {
      isValid: true,
      errors: null,
    };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return {
        isValid: false,
        errors: e.errors.map((error) => error.message),
      }
    }
    return {
      isValid: false,
      errors: ["An error occurred while validating the user data"],
    };
  }
}