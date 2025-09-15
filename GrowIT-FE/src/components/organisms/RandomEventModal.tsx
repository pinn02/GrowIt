import CloseButton from "../atoms/Button"
import { useEffect, useState } from "react"
import randomEventsData from "../../assets/data/randomEvents.json"

type RandomEvent = {
  title: string
  content: string
  finance: number
  enterpriseValue: number
  productivity: number
  image: string
}

type RandomEventModalProps = {
  onClose: () => void
}

function RandomEventModal({ onClose }: RandomEventModalProps) {
  const [eventIndex, setEventIndex] = useState(0)

  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * randomEventsData.length)
    setEventIndex(randomIdx)
  }, [])

  const event:RandomEvent = randomEventsData[eventIndex]
  
  return (
    <>
      <div
        className="fixed inset-0 flex justify-center items-center z-50"
      >
        <div
          className="
            bg-white
            rounded-2xl
            w-[50%]
            h-auto
          "
        >
          <div className="w-full flex justify-end">
            <CloseButton
              onClick={onClose}
              className="bg-red-300 text-black px-2 py-2 my-3 rounded hover:bg-red-400 transition-colors m-3"
            >
              X
            </CloseButton>
          </div>
          <div>
            <img
              // src={imagePath}
              src={event.image}
              alt={event.title}
              className="mx-auto w-[50%] h-auto"
            />
            <div className="text-center gap-3 p-3">
              <p className="font-bold text-xl">{event.title}</p>
              <p>{event.content}</p>
              <br />
              <p>자금: {event.finance >= 0 ? `+${event.finance}` : event.finance}</p>
              <p>기업 가치: {event.enterpriseValue >= 0 ? `+${event.enterpriseValue}` : event.enterpriseValue}</p>
              <p>생산성: {event.productivity >= 0 ? `+${event.productivity}` : event.productivity}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RandomEventModal