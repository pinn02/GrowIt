// 카드 UI

import React from "react";

type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow hover:shadow-lg cursor-pointer transition">
      {children}
    </div>
  );
}
