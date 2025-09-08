// 카드 안에 들어갈 개별 옵션 버튼

import React from "react";
import Card from "@/components/atoms/Card";

type Props = {
  label: string;
  onSelect: () => void;
};

export default function CardOption({ label, onSelect }: Props) {
  return (
    <Card>
      <button
        onClick={onSelect}
        className="w-full text-center text-gray-800 font-medium"
      >
        {label}
      </button>
    </Card>
  );
}
