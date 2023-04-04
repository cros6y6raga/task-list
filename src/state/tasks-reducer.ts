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

type MainType = FirstActionType | SecondActionType

type FirstActionType = ReturnType<typeof firstAC>
type SecondActionType = ReturnType<typeof secondAC>

export const firstAC = (id: string) => {
    return {
        type: '',
    } as const
}

export const secondAC = (title: string) => {
    return {
        type: '',
    } as const
}