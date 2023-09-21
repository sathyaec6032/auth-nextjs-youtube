import React from "react";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page{" "}
        <span className="ml-2 rounded bg-orange-500 p-2  text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}
