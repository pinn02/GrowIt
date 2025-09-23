// // 탭 버튼 바(집합)
// import TabButton from "../molecules/TabButton";

// interface RankingTabBarProps {
//   activeTab: "corporate" | "productivity";
//   onTabChange: (tab: "corporate" | "productivity") => void;
// }

// function RankingTabBar({ activeTab, onTabChange }: RankingTabBarProps) {
//   return (
//     <div className="flex border-b">
//       <TabButton
//         isActive={activeTab === "corporate"}
//         onClick={() => onTabChange("corporate")}
//       >
//         기업 가치 순
//       </TabButton>
//       <TabButton
//         isActive={activeTab === "productivity"}
//         onClick={() => onTabChange("productivity")}
//       >
//         생산 순
//       </TabButton>
//     </div>
//   );
// }

// export default RankingTabBar;
