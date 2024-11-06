"use client"

import { permanentRedirect } from "next/navigation";
import {  useEffect } from "react";

export default function Home() {
  useEffect(() => {
    permanentRedirect("/manuscripts");
   });
  return <></>;
}
