"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast/headless";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");

      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-xl">{loading ? "Processing" : "Login"}</h1>
      <hr />

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
        onClick={onLogin}
        className="mb-4 rounded-lg border border-gray-200 p-2 focus:border-gray-600 focus:outline-none"
      >
        Login here
      </button>
      <Link href="/signup">Visit Signup page</Link>
    </div>
  );
}
