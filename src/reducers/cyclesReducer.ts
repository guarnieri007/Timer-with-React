import { ActionTypes } from "./actions"
import { produce } from "immer"

export interface Cycle {
    id: string
    task: string
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date,
}

export interface CycleState {
    cycles: Cycle[]
    activeCycleID: string | null
}



interface ActionPayload {
    type: ActionTypes
    payload?: CyclePayload
}

interface CyclePayload {
    newCycle: Cycle | undefined | null
    activeCycleID: string | undefined | null
}

export function cyclesReducer(state: CycleState, action: ActionPayload) {

    switch (action.type) {

        case ActionTypes.Add_new_cycle:
            //SEM O IMMER
            // return {
            //     ...state,
            //     cycles: [...state.cycles, action.payload.newCycle],
            //     activeCycleID: action.payload.newCycle!.id,
            // }

            {
                return produce(state, draft => {
                    draft.cycles.push(action!.payload!.newCycle!);
                    draft.activeCycleID = action!.payload!.newCycle!.id
                })
            }

        case ActionTypes.Interrupt_current_session:
            // return {
            //     ...state,
            //     cycles: state.cycles.map((cycle) => {
            //         if (cycle.id === state.activeCycleID) {
            //             return {
            //                 ...cycle, interruptedDate: new Date(),
            //             }
            //         } else {
            //             return cycle
            //         }
            //     }),
            //     activeCycleID: null,
            // }
            return (
                produce(state, (draft) => {
                    const currentCycleIndex = state.cycles.findIndex((cycle) => {
                        return cycle.id === state.activeCycleID
                    })

                    if (currentCycleIndex < 0) {
                        return state
                    }
                    draft.activeCycleID = null
                    draft.cycles[currentCycleIndex].interruptedDate = new Date()
                })
            )

        case ActionTypes.Mark_current_session_as_finished:
            // return {
            //     ...state,
            //     cycles: state.cycles.map((cycle) => {
            //         if (cycle.id === state.activeCycleID) {
            //             return {
            //                 ...cycle, finishedDate: new Date(),
            //             }
            //         } else {
            //             return cycle
            //         }
            //     }),
            //     activeCycleID: null,
            // }

            return (
                produce(state, (draft) => {
                    const currentCycleIndex = state.cycles.findIndex((cycle) => {
                        return cycle.id === state.activeCycleID
                    })

                    if (currentCycleIndex < 0) {
                        return state
                    }
                    draft.activeCycleID = null
                    draft.cycles[currentCycleIndex].finishedDate = new Date()
                })
            )

        default:
            return state
    }
}