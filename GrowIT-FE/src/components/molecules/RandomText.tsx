const RandomText = () => {
    return (
    <div className="flex flex-col items-center justify-center text-white text-2xl font-bold gap-8">
        <section>
            <p>직원 파업</p>
        </section>

        <section className="flex flex-col gap-3">
            <div className="flex justify-between w-64">
                <p>기업 가치</p>
                <p className="text-red-500 flicker-v3">13</p>
            </div>

            <div className="flex justify-between w-64">
                <p>생산성</p>
                <p className="text-red-500 flicker-v3">13</p>
            </div>
            
            <div className="flex justify-between w-64">
                <p>자본</p>
                <p className="text-red-500 flicker-v3">13</p>
            </div>
        </section>
    </div>
    )
}

export default RandomText