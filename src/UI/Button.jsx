import React from "react";
import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type, onClick }) {
  const className =
    "transition-colors focus:outline-none focus:ring-stone-950  inline-block  tracking-widest p-3 uppercase rounded-full font-semibold duration-300 text-stone-600 hover:bg-yellow-300 disabled:cursor-not-allowed  mb-4";
  const styles = {
    secondary: className + "px-2 bg-stone-400",
    primary: className + "px-4 sm:px-6 sm:py-3  bg-yellow-400",
    small: className + "py-2 md:px-5 px-4 text-xs  bg-yellow-400",
    round: className + "px-2.5 py-1 md:px-3.5 md:py-2 text:sm",
  };
  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
