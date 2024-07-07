import { differenceInSeconds } from "date-fns"
import { useEffect, useContext } from "react"
import { CountdownContainer, Separator } from "./style"
import { CycleContext } from "../../../../contexts/CyclesContext"


export function Countdown() {
    const {activeCycle, activeCycleID, setCycleAsFinished, amountSecondsPassed, setamountSecondsPassed} = useContext(CycleContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, "0")
    const seconds = String(secondsAmount).padStart(2, "0")

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

                if (secondsDifference >= totalSeconds) {
                    setCycleAsFinished()
                    setamountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setamountSecondsPassed(secondsDifference)
                }

            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleID, setCycleAsFinished, setamountSecondsPassed])

    useEffect(() => {
        if (activeCycle) {

            document.title = `Timer: ${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])
    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}