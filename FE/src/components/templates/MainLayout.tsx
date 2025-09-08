import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <header className="w-full bg-gray-200 px-4 py-2 flex justify-between text-sm">
        <span>GrowIT</span>
        <div>생산성: 000,000P | 자금: 000,000G</div>
      </header>
      <main className="flex-1 flex flex-col items-center p-4">{children}</main>
    </div>
  );
}
