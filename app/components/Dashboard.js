import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import TaskContainer from "./TaskContainer";
import Loading from "./Loading";
import DragnDrop from "./DragnDrop";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Dashboard = ({ session, signOut, status }) => {
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
        <div className="lg:flex items-center justify-start flex-1 bg-white text-black">
          <DragnDrop userId={userId} />
        </div>
        <div className="w-1/5 bg-gray-100 lg:w-1/5 flex items-start justify-start">
          <div className="max-w-md w-full p-6">
            <div
              aria-label="header"
              className="flex space-x-4 items-center p-4"
            >
              <div
                aria-label="avatar"
                className="flex mr-auto items-center space-x-4"
              >
                <img
                  src={session.user.image}
                  alt="avatar Evan You"
                  className="w-16 h-16 shrink-0 rounded-full"
                />
                <div className="space-y-2 flex flex-col flex-1 truncate">
                  <div className="font-medium relative text-xl leading-tight text-gray-900">
                    <span className="flex">
                      <span className="truncate relative pr-8">
                        {session.user.name}
                      </span>
                    </span>
                  </div>
                  <p className="font-normal text-base leading-tight text-gray-500 truncate">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div aria-label="navigation" className="py-2">
              <nav className="grid gap-1">
                <a
                  href="/settings"
                  className="flex hover:bg-gray-200 items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
                >
                  <Icon.Settings className="w-6 h-6" />
                  <span>Settings</span>
                </a>
                <button
                  onClick={() => signOut()}
                  className="flex hover:bg-gray-200 items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-red-400 focus:outline-none hover:bg-gray-100 rounded-md"
                >
                  <Icon.LogOut className="w-6 h-6" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  ) 
  );
};

export default Dashboard;
