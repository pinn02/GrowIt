// 기업 가치 랭킹 텍스트
const CorporateValuePage = () => {
    const mockCorporateValueData = [
        { rank: 1, company: "GrowIT Inc.", value: "₩300억" },
        { rank: 2, company: "NextGen Corp.", value: "₩250억" },
        { rank: 3, company: "TechWave", value: "₩220억" },
        { rank: 4, company: "InnoSoft", value: "₩200억" },
        { rank: 5, company: "DataForge", value: "₩180억" },
    ]
    return (
    <div>
        {mockCorporateValueData.map((item)=> (
            <section key={item.rank} className="flex">
                <p className="mr-2">{item.rank}등</p>
                <p className="mr-2">{item.company}</p>
                <p className="mr-2">{item.value}</p>
            </section>
        ))}
    </div>
    )
}
export default CorporateValuePage