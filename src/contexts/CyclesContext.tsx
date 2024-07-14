import { createContext, ReactNode, useCallback, useEffect, useReducer, useState, useRef } from "react";
import { Cycle, cyclesReducer } from "../reducers/cyclesReducer";
import { addNewCycleAction, setCycleAsFinishedAction, interruptCurrentCycleAction, Remove_cycle_from_historyAction } from "../reducers/actions";
import { differenceInSeconds } from "date-fns";
import alarmSound from '../assets/tony ann - iPhone alarm as a piano ballad.mp4';



interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleID: string | null;
    setCycleAsFinished: () => void;
    setAlarmeRingOff: () => void;
    alarmeRinging: boolean;
    amountSecondsPassed: number;
    setamountSecondsPassed: React.Dispatch<React.SetStateAction<number>>
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
    RemoveCycleFromHistory: (cycleIndex: number) => void
    cycles: Cycle[]
    minutes: string
    seconds: string
}
interface CyclesContextProviderProps {
    children: ReactNode
}

export const CycleContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer
        , { cycles: [], activeCycleID: null }, (initialState) => {
            const storedStateAsJson = localStorage.getItem("@ignite-timer:cycleStates-1.0.0");
            if (storedStateAsJson) {
                return JSON.parse(storedStateAsJson)
            }

            return initialState
        })

    const { cycles, activeCycleID } = cyclesState
    const [alarmeRinging, setAlarmeRinging] = useState(false)
    const activeCycle = cycles.find(cycles => cycles.id === activeCycleID)
    const audioRef = useRef(new Audio(alarmSound));
    const [amountSecondsPassed, setamountSecondsPassed] = useState(() => {

        if (activeCycle) {

            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0
    })

    useEffect(() => {
        const stateJson = JSON.stringify(cyclesState)

        localStorage.setItem("@ignite-timer:cycleStates-1.0.0", stateJson)
    }, [cyclesState])

    const setCycleAsFinished = useCallback(() => {
        dispatch(setCycleAsFinishedAction())
    }, [dispatch])

    function createNewCycle(data: CreateCycleData) {

        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))
        setamountSecondsPassed(0)
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction())
    }

    function RemoveCycleFromHistory(index: number) {
        dispatch(Remove_cycle_from_historyAction(index))
    }

    function setAlarmeRingOn() {
        setAlarmeRinging(true);
        audioRef.current.loop = true;
        audioRef.current.play();
    }

    function setAlarmeRingOff() {
        setAlarmeRinging(false);
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reinicia o áudio para o início
    }

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
                const secondsDifference = differenceInSeconds(new Date(), new Date(activeCycle.startDate))

                if (secondsDifference >= totalSeconds) {
                    setCycleAsFinished()
                    setamountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                    setAlarmeRingOn()
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
        } else {
            document.title = `Timer: 00:00`
        }
    }, [minutes, seconds, activeCycle])

    return (
        <CycleContext.Provider value={{
            activeCycle,
            activeCycleID,
            setCycleAsFinished,
            amountSecondsPassed,
            setamountSecondsPassed,
            createNewCycle,
            interruptCurrentCycle,
            RemoveCycleFromHistory,
            setAlarmeRingOff,
            cycles,
            minutes,
            seconds,
            alarmeRinging
        }}
        >
            {children}
        </CycleContext.Provider>
    )
}