import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import MenuBar from "@/components/organisms/MenuBar";
import CardList from "@/components/organisms/CardList";
import HireCardList from "@/components/organisms/HireCardList";
import Modal from "@/components/organisms/Modal";
import { useUIStore } from "@/store/Store";
import office from "@/assets/office.png";


export default function MainPage() {
  const openMenu = useUIStore((state) => state.openMenu);
  const setOpenMenu = useUIStore((state) => state.setOpenMenu);

  return (
    <MainLayout>
      <img src={office} alt="배경사진" className="mb-6" />
      <MenuBar />
      <CardList />

      <Modal isOpen={openMenu === "hire"} onClose={() => setOpenMenu(null)}>
        <HireCardList />
      </Modal>
    </MainLayout>
  );
}
