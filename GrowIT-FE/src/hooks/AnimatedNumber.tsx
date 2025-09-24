import { useEffect, useRef, useState } from "react"

type AnimatedNumberProps = {
  value: number
  duration?: number
}

function AnimatedNumber({ value, duration = 500 }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [color, setColor] = useState<string>("")
  const startValue = useRef(value)

  useEffect(() => {
    const start = startValue.current
    const end = value
    const isIncrease = end > start
    setColor(isIncrease ? "text-green-500" : end < start ? "text-red-500" : "")

    const startTime = performance.now()

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1)
      const current = Math.floor(start + (end - start) * progress)
      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        startValue.current = end
        setTimeout(() => setColor(""), 200)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration])

  return (
    <span className={`${color} transition-colors duration-300`}>
      {displayValue.toLocaleString()}
    </span>
  )
}

export default AnimatedNumber