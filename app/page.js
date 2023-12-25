"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Index from "./components/Index";
import Loader from "./components/Loading";
import Dashboard from "./components/Dashboard";

export default function Home({ pageProps }) {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <Loader />;
  }
  return (
    <>
      {session && (
        <>
          <Dashboard signOut={signOut} status={status} session={session} />
        </>
      )}
      {!session && (
        <>
          <Index signIn={signIn} />
        </>
      )}
    </>
  );
}
