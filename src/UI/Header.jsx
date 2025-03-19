import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import User from "../features/users/User";

export default function Header() {
  return (
    <header className="bg-yellow-500 uppercase px-4 py-3 border-b border-stone-200 flex items-center justify-between font-mono">
      <Link to="/" className="tracking-widest">
        Fast React Co.
      </Link>
      <SearchOrder />
      <User />
    </header>
  );
}
