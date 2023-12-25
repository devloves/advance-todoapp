// Main file.

"use client";
import { useSession } from "next-auth/react";
import Index from "./components/Index"; 
import Loader from "./components/Loading";
import Dashboard from "./components/Dashboard";

export default function Home() {
  // Saving the session and status as a variable
  const { data: session, status } = useSession();
  
  // Show Loading component if status is loading
  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      {/* If session is running render the dashboard */}
      {session && (
        <>
          <Dashboard />
        </>
      )}
      {/* If session is not running render the Index */}
      {!session && (
        <>
          <Index />
        </>
      )}
    </>
  );
}
