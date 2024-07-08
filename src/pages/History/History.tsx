import { useContext } from "react";
import { formatDistanceToNow} from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR";
import { HistoryContainer, HistoryList, Status, Button } from "./HistoryStyles";
import { CycleContext } from "../../contexts/CyclesContext";

export function History() {
    const { cycles, RemoveCycleFromHistory, activeCycleID } = useContext(CycleContext)

    function removeItem(index: number) {
        RemoveCycleFromHistory(index)


    }
    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Inicio</th>
                            <th>Status</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map((cycle, index) => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount}</td>
                                    <td>{formatDistanceToNow(cycle.startDate, {
                                        addSuffix: true,
                                        locale: ptBR,
                                    })}</td>
                                    <td>
                                        {cycle.finishedDate && (<Status statuscolor={"green"}>Concluído</Status>)}
                                        {cycle.interruptedDate && (<Status statuscolor={"red"}>Interompido</Status>)}
                                        {(!cycle.finishedDate && !cycle.interruptedDate) && (<Status statuscolor={"yellow"}>Em andamento</Status>)}
                                    </td>
                                    <td>
                                        <Button statuscolor="red" value={index} disabled={cycle.id === activeCycleID} onClick={() => {removeItem(index)}}>Apagar</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}