import * as React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 font-semibold text-lg">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-gray-700">{children}</div>;
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="mt-4 text-right">{children}</div>;
}
