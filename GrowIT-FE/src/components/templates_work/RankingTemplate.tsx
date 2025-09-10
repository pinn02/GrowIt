// 랭킹 탭바
import RankingTabBar from "../organisms/RankingTabBar"

function RankingTemplate({ activeTab, onTabChange, children }) {
  return (
    <div className="flex flex-col h-full">
      <RankingTabBar activeTab={activeTab} onTabChange={onTabChange} />
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  );
}

export default RankingTemplate;
