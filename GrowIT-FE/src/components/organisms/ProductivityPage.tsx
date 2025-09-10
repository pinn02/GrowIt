// 생산성 랭킹 텍스트
const ProductivityPage = () => {
    const mockProductivityData = [
        { rank: 1, company: "GrowIT Inc.", value: 95 },
        { rank: 2, company: "NextGen Corp.", value: 87 },
        { rank: 3, company: "TechWave", value: 80 },
        { rank: 4, company: "InnoSoft", value: 75 },
        { rank: 5, company: "DataForge", value: 72 },
    ]

    return (
     <div>
        {mockProductivityData.map((item)=> (
            <section key={item.rank} className="flex">
                <p className="mr-2">{item.rank}등</p>
                <p className="mr-2">{item.company}</p>
                <p className="mr-2">{item.value}</p>
            </section>
        ))}
    </div>
    )
}
export default ProductivityPage