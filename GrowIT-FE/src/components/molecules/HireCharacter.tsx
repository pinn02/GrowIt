// 직원 이미지
import React from "react";
import Character from "@/assets/member1.png";

interface HireCharacterProps {
  src: string;   // 직원 이미지 파일 경로
  alt: string;
}

export default function HireCharacter({}: HireCharacterProps) {
  return (
    <img src={Character} alt="직원 이미지" className="w-16 h-16 mx-auto" />
  );
}
