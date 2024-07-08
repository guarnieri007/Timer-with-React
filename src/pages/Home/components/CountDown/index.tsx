import { useContext } from "react"
import { CountdownContainer, Separator } from "./style"
import { CycleContext } from "../../../../contexts/CyclesContext"


export function Countdown() {
    const {minutes, seconds} = useContext(CycleContext)

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