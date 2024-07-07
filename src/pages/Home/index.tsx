import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/CountDown";


interface Cycle {
    id: string
    task: string
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date,
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleID: string | null;
    setCycleAsFinished: () => void;
}

export const CycleContext = createContext({} as CyclesContextType)


export function Home() {
    
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleID, setActiveCycleID] = useState<string | null>(null)
    
    
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
    



    /*console.log(formState.errors);*/

    // function handleCreateNewCycle(data: NewCycleFormData) {

    //     const newCycle: Cycle = {
    //         id: String(new Date().getTime()),
    //         task: data.task,
    //         minutesAmount: data.minutesAmount,
    //         startDate: new Date(),

    //     }

    //     setCycles((state) => [...state, newCycle])
    //     setActiveCycleID(newCycle.id)
    //     setamountSecondsPassed(0)
    //     reset();
    // }

    function handleInterruptCycle() {
        setCycles((state) => state.map(cycle => {
            if (cycle.id === activeCycleID) {
                return { ...cycle, interruptedDate: new Date() }
            } else {
                return cycle
            }
        }))
        setActiveCycleID(null)
    }

    const activeCycle = cycles.find(cycles => cycles.id === activeCycleID)
    

    // const task = watch("task")
    // const isSubmitDisabled = !task

   

    // useEffect(() => {
    //     if (activeCycle) {

    //         document.title = `Timer: ${minutes}:${seconds}`
    //     }
    // }, [minutes, seconds, activeCycle])

    console.log(cycles)

    return (
        <HomeContainer>
            <form action="" /*onSubmit={handleSubmit(handleCreateNewCycle)}*/>
                <CycleContext.Provider value={{activeCycle, activeCycleID, setCycleAsFinished}} >
                    {/* <NewCycleForm/> */}
                    <Countdown/>
                </CycleContext.Provider>
                
                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24}></HandPalm>
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton /*disabled={isSubmitDisabled}*/ type="submit">
                        <Play size={24}></Play>
                        Começar
                    </StartCountdownButton>
                )
                }
            </form>
        </HomeContainer>
    )
}