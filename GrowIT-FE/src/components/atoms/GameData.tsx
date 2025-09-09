type GameDataProps = {
	dataName: string
	dataValue: number
	// children: React.ReactNode
}

function GameDataInformation({ dataName, dataValue }: GameDataProps) {
	return (
		<p className="mx-3 whitespace-nowrap">
			{ dataName }: { dataValue }
		</p>
	)
}

export default GameDataInformation