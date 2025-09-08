// 아이콘 + 텍스트 버튼
import React from "react";
import Button from "@/components/atoms/Button";

type Props = {
  label: string;
  onClick: () => void;
};

export default function MenuButton({ label, onClick }: Props) {
  return <Button onClick={onClick}>{label}</Button>;
}
