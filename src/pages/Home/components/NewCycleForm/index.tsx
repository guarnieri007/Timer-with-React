import { FormContainer, MinutesAmountInput, TaskInput } from "./style"
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { CycleContext } from "../../../../contexts/CyclesContext";


export function NewCycleForm() {
    const { activeCycle, cycles } = useContext(CycleContext)
    const { register } = useFormContext()

    const optionsToSelect: string[] = cycles.map((cycle) => {
        return cycle.task;
    })

    return (
        <FormContainer>

            <label htmlFor="task">
                Vou trabalhar em
            </label>
            <TaskInput
                id="task"
                placeholder="Dê um nome para o seu projeto"
                list="task-suggestions"
                {...register("task")}
                disabled={!!activeCycle}
            />

            <datalist id="task-suggestions">
                {optionsToSelect != null ? (
                    optionsToSelect.map((option) => {
                        return <option value={option} />
                    })
                ) : ("")}
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
                disabled={!!activeCycle}
            />
            <span>minutos.</span>

        </FormContainer>
    )
}