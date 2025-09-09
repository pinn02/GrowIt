const BankruptcyText = () => {
    return (
    <div className="flex flex-col items-center justify-center h-full text-white text-2xl font-bold gap-4">
        <section>
            <p>파산 ㅠㅠ</p>
        </section>
        
        <section>
            <p>최종 결과</p>
        </section>

        <section>
            <div className="flex">
                <p className="mr-4">기업 가치</p>
                <p className="mr-4">13</p>
            </div>

            <div className="flex">
                <p className="mr-4">생산성</p>
                <p className="mr-4">13</p>
            </div>
            
            <div className="flex">
                <p className="mr-4">자본</p>
                <p className="mr-4">13</p>
            </div>
            
            <div className="flex">
                <p className="mr-4">직원 수</p>
                <p className="mr-4">13</p>
            </div>
        </section>
    </div>
    )
}

export default BankruptcyText
