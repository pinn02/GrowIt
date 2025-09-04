import Button from '../atoms/Button'
import Header from '../organisms/Header'

type Props = {
  money: number
  companyValue: number
  onChangeMoney: (delta: number) => void
}

export default function HomeTemplate({ money, companyValue, onChangeMoney }: Props) {
  return (
    <div>
      <Header />
      <main className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold">회사 현황</h2>
        <p>자금: {money}</p>
        <p>가치: {companyValue}</p>

        <div className="flex gap-2">
          <Button onClick={() => onChangeMoney(+30)}>SNS 성공 (+30)</Button>
          <Button onClick={() => onChangeMoney(-30)}>세무조사 (-30)</Button>
        </div>
      </main>
    </div>
  )
}
