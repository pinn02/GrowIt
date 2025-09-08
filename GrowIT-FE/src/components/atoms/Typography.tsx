// 버튼에 들어갈 텍스트

import React from "react";

type Props = {
  variant?: "title" | "subtitle" | "body";
  children: React.ReactNode;
};

export default function Typography({ variant = "body", children }: Props) {
  const styles = {
    title: "text-xl font-bold",
    subtitle: "text-lg font-semibold text-gray-700",
    body: "text-base text-gray-600",
  };

  return <p className={styles[variant]}>{children}</p>;
}
