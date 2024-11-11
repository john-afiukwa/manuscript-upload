import { useCallback } from "react";
import { signoutAction } from "../app/api/auth";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter()

  const signout = useCallback(async () => {
    await signoutAction();
    router.push("/auth/signin");
  }, [router]);

  return { signout };
};