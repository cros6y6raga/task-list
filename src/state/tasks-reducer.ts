import {FilterValueType, TasksStateType, TodolistsType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TasksStateType, action: MainType) => {
    switch (action.type) {
        case "":
            return state
        case "":
            return state
        default:
            throw new Error('I dont understand this type')
    }
};

type MainType = RemoveTaskActionType | SecondActionType

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type SecondActionType = ReturnType<typeof secondAC>

export const removeTaskAC = (taskId: string,todolistId:string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId
    } as const
}

export const secondAC = (title: string) => {
    return {
        type: '',
    } as const
}