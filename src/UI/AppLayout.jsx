import React from "react";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function AppLayout() {
  const navigate = useNavigate();
  const isloading = navigate.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isloading && <Loader />}
      <header>
        <Header />
      </header>
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl bg-red-100">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
