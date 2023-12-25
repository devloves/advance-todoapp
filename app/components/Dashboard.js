import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import DragnDrop from "./DragnDrop";
import Sidenav from "./sidenav";
import { PrismaClient } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
const prisma = new PrismaClient();

const Dashboard = () => {
  // Saving the session and status as a variable
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState();
  const [statLoad, setStatLoad] = useState(false);

  useEffect(() => {
    if (session.user && status === "authenticated") {
      fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        }),
      })
        .then((response) => {
          return response.json()
        }).then((data) => {
          console.log(data.message.id)
          setUserId(data.message.id)
          setStatLoad(true) // Access the user data here
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, []);

  return ( statLoad ? (
    <>
      <div className="font-sans flex h-screen">
        <DragnDrop userId={userId} />
        <Sidenav session={session}/>
      </div>
    </>
  ) : (
    <Loading />
  ) 
  );
};

export default Dashboard;
