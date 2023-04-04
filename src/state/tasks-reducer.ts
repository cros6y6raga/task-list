import {FilterValueType, TodolistsType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistsType>, action: MainType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            const newTodoID = v1()
            const newTodolist: TodolistsType = {id: newTodoID, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist]
        }
        default:
            return state
    }
};

type MainType = removeTodolistACType | addTodolistACType | editTodoACType | filterTasksACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}