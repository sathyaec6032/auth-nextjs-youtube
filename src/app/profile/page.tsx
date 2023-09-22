"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="rounded bg-green-500 p-3">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="mt-4 rounded bg-blue-500 px-2 py-2 font-bold text-white hover:bg-blue-700"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="mt-4 rounded bg-green-800 px-2 py-2 font-bold text-white hover:bg-purple-700"
      >
        Get User Details
      </button>
    </div>
  );
}
