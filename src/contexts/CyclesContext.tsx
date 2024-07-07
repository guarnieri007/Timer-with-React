import { createContext, ReactNode, useState } from "react";


interface Cycle {
    id: string
    task: string
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date,
}
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

export function CyclesContextProvider({children} : CyclesContextProviderProps) {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleID, setActiveCycleID] = useState<string | null>(null)
    const [amountSecondsPassed, setamountSecondsPassed] = useState(0)
    const activeCycle = cycles.find(cycles => cycles.id === activeCycleID)

    function setCycleAsFinished() {
        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleID) {
                return { ...cycle, finishedDate: new Date() }
            } else {
                return cycle
            }
        })
        )
    }

    function createNewCycle(data: CreateCycleData) {

        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),

        }

        setCycles((state) => [...state, newCycle])
        setActiveCycleID(newCycle.id)
        setamountSecondsPassed(0)
    }

    function interruptCurrentCycle() {
        setCycles((state) => state.map(cycle => {
            if (cycle.id === activeCycleID) {
                return { ...cycle, interruptedDate: new Date() }
            } else {
                return cycle
            }
        }))
        setActiveCycleID(null)
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