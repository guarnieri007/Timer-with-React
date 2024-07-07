import { FormContainer, MinutesAmountInput, TaskInput } from "./style"
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { CycleContext } from "../..";


export function NewCycleForm() {
    const {activeCycle} = useContext(CycleContext)
    const newCycleFormValidationSchema = zod.object({
        task: zod.string().min(1, "Informe a tarefa"),
        minutesAmount: zod.number().min(1, "Informe a quantidade de minutos").max(90, "Os minutos devem ser estar entre 1 e 90"),
    })
    
    const { register, handleSubmit, watch, reset /*formState*/ } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        }
    })

    
    // interface NewCycleFormData {
    //     task: string,
    //     minutesAmount: number,
    // }
    
    type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
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
                        disabled={!!activeCycle}
                    />
                    <span>minutos.</span>

                </FormContainer>
    )
}