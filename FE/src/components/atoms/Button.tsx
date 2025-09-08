// 파란 버튼

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 active:scale-95 transition ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
};
