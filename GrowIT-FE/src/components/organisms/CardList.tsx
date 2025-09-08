// 선택된 메뉴에 따라 카드 여러 개 렌더링

import React from "react";
import { useUIStore } from "@/store/Store";
import CardOption from "@/components/molecules/CardOption";

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-6 shadow-lg relative w-[400px]">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default function CardList() {
  const { activeMenu, isModalOpen, closeMenu } = useUIStore();

  if (!isModalOpen || !activeMenu) return null;

  const options: Record<string, string[]> = {
    hire: ["인턴 채용", "개발자 채용", "디자이너 채용"],
    marketing: ["광고 집행", "SNS 홍보", "이벤트 진행"],
    investment: ["주식 투자", "벤처 투자", "기술 투자"],
    project: ["신규 앱 개발", "웹사이트 리뉴얼", "AI 연구"],
    mypage: ["프로필 수정", "스탯 확인", "아이템 관리"],
  };

  function handleSelect(opt: string) {
    console.log(opt + " 선택됨");
    closeMenu();
  }

  return (
    <Modal onClose={closeMenu}>
      <div className="grid gap-4">
        {options[activeMenu].map((opt) => (
          <CardOption key={opt} label={opt} onSelect={() => handleSelect(opt)} />
        ))}
      </div>
    </Modal>
  );
}
