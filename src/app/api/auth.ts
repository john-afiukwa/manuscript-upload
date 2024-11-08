"use server"

import { auth } from "@src/config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { cookies } from "next/headers";
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cache } from "react";
import { z } from 'zod';
import { passwordSchema, userDataSchema } from "@src/app/schema/auth";

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
    await sendEmailVerification(creds.user);

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