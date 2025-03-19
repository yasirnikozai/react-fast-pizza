import React from "react";
import { useSelector } from "react-redux";

export default function User() {
  const username = useSelector((state) => state.user.username);
  if (!username) return;
  return (
    <div>
      <p className="text-sm font-semibold hidden md:block">{username}</p>
    </div>
  );
}
