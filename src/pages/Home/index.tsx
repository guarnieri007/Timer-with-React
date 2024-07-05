import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useState } from "react";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod.number().min(1, "Informe a quantidade de minutos").max(90, "Os minutos devem ser estar entre 1 e 90"),
})

// interface NewCycleFormData {
//     task: string,
//     minutesAmount: number,
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
interface Cycle {
    id: string
    task: string
    minutesAmount: number
}

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleID, setActiveCycleID] = useState<string | null>(null)
    const [amountSecondsPassed, setamountSecondsPassed] = useState(0)

    const { register, handleSubmit, watch, reset /*formState*/ } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        }
    })

    /*console.log(formState.errors);*/

    function handleCreateNewCycle(data: NewCycleFormData) {

        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
        }

        setCycles((state) => [...state, newCycle])
        setActiveCycleID(newCycle.id)
        reset();
    }
    
    const activeCycle = cycles.find(cycles => cycles.id === activeCycleID)
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, "0")
    const seconds = String(secondsAmount).padStart(2, "0")

    const task = watch("task")
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>

                    <label htmlFor="task">
                        Vou trabalhar em
                    </label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggestions"
                        {...register("task")}
                    />

                    <datalist id="task-suggestions">
                        <option value={"Foco no trabalho"} />
                        <option value={"Fazer pesquisa"} />
                        <option value={"Comer"} />
                    </datalist>

                    <label htmlFor="minutsAmount">
                        durante
                    </label>
                    <MinutesAmountInput
                        id="minutsAmount"
                        type="number"
                        placeholder="00"
                        step={1}
                        {...register("minutesAmount", { valueAsNumber: true })}
                    />
                    <span>minutos.</span>

                </FormContainer>
                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>
                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}></Play>
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}