import { Cycle } from "./cyclesReducer";

export enum ActionTypes {
    Add_new_cycle = "Add_new_cycle",
    Interrupt_current_session = "Interrupt_current_session",
    Mark_current_session_as_finished = "Mark_current_session_as_finished",
    Remove_cycle_from_history = "Remove_cycle_from_history"
}

export function addNewCycleAction(newCycle: Cycle) {
    return {
        type: ActionTypes.Add_new_cycle,
        payload: {
            newCycle: newCycle,
            activeCycleID: null,
            removeCycleIndex: null
            
        }
    }
}

export function setCycleAsFinishedAction() {
    return {
        type: ActionTypes.Mark_current_session_as_finished,
    }
}

export function interruptCurrentCycleAction() {
    return {
        type: ActionTypes.Interrupt_current_session,
    }
}

export function Remove_cycle_from_historyAction(index: number) {
    return {
        type: ActionTypes.Remove_cycle_from_history,
        payload: {
            newCycle: null,
            activeCycleID: null,
            removeCycleIndex: index
            
        }
    }
}