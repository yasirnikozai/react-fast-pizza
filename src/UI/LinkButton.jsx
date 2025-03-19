import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function LinkButton({ children, to }) {
  const className = "text-sm hover:text-blue-500 text-blue-900 hover:underline";
  const navigate = useNavigate();
  if (to === "-1")
    return <button onClick={() => navigate(-1)}>{children}</button>;

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
