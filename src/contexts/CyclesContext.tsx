import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cyclesReducer";
import { addNewCycleAction, setCycleAsFinishedAction, interruptCurrentCycleAction } from "../reducers/actions";
import { differenceInSeconds } from "date-fns";



interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleID: string | null;
    setCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setamountSecondsPassed: React.Dispatch<React.SetStateAction<number>>
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
    cycles: Cycle[]
}
interface CyclesContextProviderProps {
    children: ReactNode
}

export const CycleContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer
    , { cycles: [], activeCycleID: null }, (initialState) => {
        const storedStateAsJson = localStorage.getItem("@ignite-timer:cycleStates-1.0.0");
        if(storedStateAsJson) {
            return JSON.parse(storedStateAsJson)
        }

        return initialState
    })

    const { cycles, activeCycleID } = cyclesState
    const activeCycle = cycles.find(cycles => cycles.id === activeCycleID)
    const [amountSecondsPassed, setamountSecondsPassed] = useState(() => {

        if(activeCycle) {

            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0
    })

    useEffect(() => {
        const stateJson = JSON.stringify(cyclesState)

        localStorage.setItem("@ignite-timer:cycleStates-1.0.0", stateJson)
    }, [cyclesState])

    function setCycleAsFinished() {

        dispatch(setCycleAsFinishedAction())
    }

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

    return (
        <CycleContext.Provider value={{
            activeCycle,
            activeCycleID,
            setCycleAsFinished,
            amountSecondsPassed,
            setamountSecondsPassed,
            createNewCycle,
            interruptCurrentCycle,
            cycles
        }}
        >
            {children}
        </CycleContext.Provider>
    )
}