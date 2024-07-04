import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    
                    <label htmlFor="task">
                        Vou trabalhar em
                    </label>
                    <TaskInput 
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggestions"
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
                        step={5}
                        min={5}
                        max={90}
                    />
                    <span>minutos.</span>

                </FormContainer>
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>
                <StartCountdownButton type="submit">
                    <Play size={24}></Play>
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}