import React from "react";
import HireCard from "@/components/molecules/HireCard";
import { useEmployeeStore } from "@/store/employeeStore";

const dummyEmployees = [
  { name: "김프론트", role: "프론트엔드 개발자", cost: 1000, productivity: "⭐️⭐️", characterImg: "/assets/char1.png" },
  { name: "이마케", role: "마케팅 매니저", cost: 800, productivity: "⭐️⭐️⭐️", characterImg: "/assets/char2.png" },
  { name: "박재무", role: "재무 분석가", cost: 1200, productivity: "⭐️⭐️⭐️⭐️", characterImg: "/assets/char3.png" },
];

export default function HireCardList() {
  const hireEmployee = useEmployeeStore((state) => state.hireEmployee);

  return (
    <div className="flex gap-4">
      {dummyEmployees.map((emp) => (
        <HireCard
          key={emp.name}
          {...emp}
          onHire={() => hireEmployee(emp)}
        />
      ))}
    </div>
  );
}
