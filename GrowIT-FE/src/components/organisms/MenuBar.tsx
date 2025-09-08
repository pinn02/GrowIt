import React from "react";
import MenuButton from "@/components/molecules/MenuButton";
import { useUIStore } from "@/store/Store";

const menuItems = [
  { key: "hire", label: "고용" },
  { key: "marketing", label: "마케팅" },
  { key: "investment", label: "투자" },
  { key: "project", label: "프로젝트" },
  { key: "mypage", label: "마이페이지" },
] as const;

export default function MenuBar() {
  const setOpenMenu = useUIStore((state) => state.setOpenMenu);

  return (
    <div className="flex gap-2 mt-4">
      {menuItems.map((menu) => (
        <MenuButton
          key={menu.key}
          label={menu.label}
          onClick={() => setOpenMenu(menu.key)}
        />
      ))}
    </div>
  );
}
