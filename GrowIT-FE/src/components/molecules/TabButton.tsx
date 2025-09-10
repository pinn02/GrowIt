function TabButton({ children, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      // 액션 상태에 따라 클릭된 버튼은 파란 밑줄, 그렇지 않으면 회색으로 흐리게
      className={`px-4 py-2 ${
        isActive ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"
      }`}
    >
      {children}
    </button>
  );
}

export default TabButton;
