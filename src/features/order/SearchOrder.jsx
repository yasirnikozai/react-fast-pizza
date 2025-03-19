import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter Id ......"
        className="rounded-full bg-yellow-100 px-4 py-2 sm:text placeholder:text-stone-700 focus:w-72 sm-w-64
        focus:outline-none focus:ring focus:ring-opacity-50 focus:bg-yellow-500 sm:w-72"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
