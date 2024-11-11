"use client";

import SideBar from "@src/app/components/SideBar";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { verifySession } from "@src/app/api/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- HOC
function AuthHOC(Component: React.ComponentType<any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- HOC
  return function IsAuth(props: any) {
    const [authenticated, setAuthenticated] = useState(false);


    useEffect(() => {
      const validateAuth = async () => {
        const response = await verifySession();
        if (response.isAuth) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          return redirect("/auth/signin");
        }
      };

      validateAuth();
    }, [authenticated]);


    if (!authenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="flex flex-col md:flex-row w-full md:gap-4">
    <SideBar />
    <section className="my-4 md:my-10 mx-4 flex-1">
      {children}
    </section>
  </section>;
}

export default AuthHOC(ProtectedLayout);