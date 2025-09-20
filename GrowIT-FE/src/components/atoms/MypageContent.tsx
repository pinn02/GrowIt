// import MypageButtonClicked from "../../assets/buttons/button.png"
// import MypageButtonNotClicked from "../../assets/buttons/button_disabled.png"

const MypageContent = () => {

  return (
    <div className="absolute left-[10%] top-[20%]">
      <section className="flex">
        <p className="mr-2">직원 수</p>
        <p className="mr-2">00 명</p>
      </section>

       <section className="flex">
        <p className="mr-2">월간 지출 급여</p>
        <p className="mr-2">000,000 G</p>
      </section>

       <section className="flex">
        <p className="mr-2">진행 상황</p>
        <p className="mr-2">00 프로젝트</p>
        <p className="mr-2">00 / 00 턴 째</p>
      </section>
      
    </div>
  )
}

export default MypageContent
