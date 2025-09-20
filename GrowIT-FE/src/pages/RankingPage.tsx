import { useState } from "react"
import RankingTemplate from "../components/templates_work/RankingTemplate"
import CorporateValuePage from "../components/organisms/CorporateValuePage"
import ProductivityPage from "../components/organisms/ProductivityPage"
import LoginButton from "../components/atoms/LoginButton"
import { useNavigate } from "react-router-dom"

function RankingPage() {
  const [activeTab, setActiveTab] = useState<"corporate" | "productivity">("corporate")
  const navigate = useNavigate()

  return (
    <div>
      <RankingTemplate activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === "corporate" && <CorporateValuePage />}
        {activeTab === "productivity" && <ProductivityPage />}
      </RankingTemplate>

       <LoginButton onClick={() => navigate("/")}>
          확인
      </LoginButton>
    </div>
  )
}

export default RankingPage
