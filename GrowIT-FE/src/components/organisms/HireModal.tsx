import React from "react";
import Modal from "@/components/organisms/Modal";
import HireCardList from "./HireCardList";

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HireModal({ isOpen, onClose }: HireModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">직원 고용</h2>
      <HireCardList />
    </Modal>
  );
}
