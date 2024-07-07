import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/CountDown";
import { CycleContext } from "../../contexts/CyclesContext";









export function Home() {
    const {createNewCycle, interruptCurrentCycle, activeCycle} = useContext(CycleContext)

    const newCycleFormValidationSchema = zod.object({
        task: zod.string().min(1, "Informe a tarefa"),
        minutesAmount: zod.number().min(1, "Informe a quantidade de minutos").max(90, "Os minutos devem ser estar entre 1 e 90"),
    })


    // interface NewCycleFormData {
    //     task: string,
    //     minutesAmount: number,
    // }

    type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        }
    })

    const { handleSubmit, watch, reset /*formState*/ } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }


    /*console.log(formState.errors);*/

    const task = watch("task")
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
               
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />

                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                        <HandPalm size={24}></HandPalm>
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24}></Play>
                        Começar
                    </StartCountdownButton>
                )
                }
            </form>
        </HomeContainer>
    )
}