// 직원 정보 카드

import React from "react";
import Button from "@/components/atoms/Button";
import HireCharacter from "@/components/molecules/HireCharacter";

interface HireCardProps {
  name: string;
  role: string;
  cost: number;
  productivity: string;
  characterImg: string;
  onHire: () => void;
}

export default function HireCard({
  name,
  role,
  cost,
  productivity,
  characterImg,
  onHire,
}: HireCardProps) {
  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 w-48 text-center bg-white shadow">
      <HireCharacter src={characterImg} alt={name} />
      <h3 className="font-bold mt-2">{name}</h3>
      <p className="text-sm text-gray-500">{role}</p>
      <p className="text-sm">급여: {cost}G</p>
      <p className="text-sm">생산성: {productivity}</p>
      <Button onClick={onHire} className="mt-2 bg-orange-500 text-white w-full">
        고용
      </Button>
    </div>
  );
}
