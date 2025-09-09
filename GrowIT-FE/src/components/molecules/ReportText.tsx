const ReportText = ({ isModal = false }) => {
    return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
        <section className="flex">
            <p className="mr-4">기업 가치</p>
            <p>12 → 13</p>
        </section>
        
        <section className="flex">
            <p className="mr-4">생산성</p>
            <p>11 → 13</p>
        </section>
        
        <section className="flex">
            <p className="mr-4">자본</p>
            <p className="mr-1">7 → 10</p>
            <p>G</p>
        </section>
        
        <section className="flex">
            <p className="mr-4">직원 수</p>
            <p className="mr-1">11 → 13</p>
            <p>명</p>
        </section>
        
    </div>
    )
}

export default ReportText
