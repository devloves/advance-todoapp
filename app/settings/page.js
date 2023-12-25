"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { cache, use } from "react";

export default function Profile() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        <div style={{ border: "1px solid #ccc", textAlign: "center" }}>
          <img
            src={session.user.image}
            alt="user img"
            style={{ height: 180, width: 180 }}
          />
          <h3>{session.user.name}</h3>
        </div>
      </div>
    </main>
  );
}
