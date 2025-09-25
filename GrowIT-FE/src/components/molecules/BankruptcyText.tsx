import { useGameDataStore } from "../../stores/gameDataStore"

const BankruptcyText = () => {
  const gameDataStore = useGameDataStore()

  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-2xl font-bold gap-8">
      <section className="text-center">
        <p>파산</p>
      </section>
      <section className="flex flex-col gap-2">
        <div className="flex justify-between w-64">
          <p>기업가치</p>
          <p>{ gameDataStore.enterpriseValue }</p>
        </div>
        <div className="flex justify-between w-64">
          <p>생산성</p>
          <p>{ gameDataStore.productivity }</p>
        </div>
        <div className="flex justify-between w-64">
          <p>자본</p>
          <p>{ gameDataStore.finance }</p>
        </div>
        <div className="flex justify-between w-64">
          <p>직원 수</p>
          <p>{ gameDataStore.hiredPerson.length }</p>
        </div>
      </section>
    </div>
  )
}

export default BankruptcyText