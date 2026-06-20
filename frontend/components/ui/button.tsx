import * as React from "react";

export function Button({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
