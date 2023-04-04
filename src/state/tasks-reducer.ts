import {FilterValueType, TasksStateType, TodolistsType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksStateType, action: MainType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return state
        default:
            throw new Error('I dont understand this type')
    }
};

type MainType = RemoveTaskActionType | AddTaskActionType

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId
    } as const
}

export const addTaskAC = (title: string, todolistId:string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    } as const
}