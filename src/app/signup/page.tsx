"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      router.push("/login");
      toast.success("Signup success");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-xl">{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="boder mb-4 rounded-lg border-gray-300 p-2 text-black focus:border-gray-600 focus:outline-none"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />
      <label htmlFor="email">Email</label>
      <input
        className="boder mb-4 rounded-lg border-gray-300 p-2 text-black focus:border-gray-600 focus:outline-none"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="boder mb-4 rounded-lg border-gray-300 p-2 text-black focus:border-gray-600 focus:outline-none"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        onClick={onSignup}
        className="mb-4 rounded-lg border border-gray-200 p-2 focus:border-gray-600 focus:outline-none"
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}
