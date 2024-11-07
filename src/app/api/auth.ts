"use server"

import { auth } from "@src/config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cache } from "react";

interface SessionPayload extends JWTPayload {
  email: string
  userId: string
  role: string
}

export async function signinAction(email: string, password: string): Promise<void> {
  try {
    const creds = await signInWithEmailAndPassword(auth, email, password);

    await createUserSession({
      email: email,
      userId: creds.user.uid,
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

export async function signupAction(email: string, password: string): Promise<void> {
  try {
    const creds = await createUserWithEmailAndPassword(auth, email, password);
    await createUserSession({
      email: email,
      userId: creds.user.uid,
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

export async function signoutAction(): Promise<void> {
  try {
    await auth.signOut();
    (await cookies()).delete("session");
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser(): Promise<null | { email: string; id: string }> {
  try {
    const user = auth.currentUser;
    if (user && user.email) {
      return { email: user.email, id: user.uid };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- middleware handler can take any arguments
export async function authMiddleware(handler: (...args: any[]) => Promise<any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- middleware handler can take any arguments
  return async function (...args: any[]) {
    const user = auth.currentUser;
    if (user && user.email) {
      return handler(...args);
    } else {
      throw new Error("User is not authenticated");
    }
  };
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  return { isAuth: true, userId: session?.userId }
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

async function createUserSession(payload: SessionPayload) {
  const sessionString = await encrypt({
    email: payload.email ?? "",
    userId: payload.userId ?? "",
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
