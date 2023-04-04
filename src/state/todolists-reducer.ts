import {FilterValueType, TodolistsType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistsType>, action: MainType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            const newTodoID = v1()
            const newTodolist: TodolistsType = {
                id: action.payload.todolistID,
                title: action.payload.title,
                filter: 'all'
            };
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
};

export type MainType = removeTodolistACType | addTodolistACType | editTodoACType | filterTasksACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type editTodoACType = ReturnType<typeof editTodoAC>
export type filterTasksACType = ReturnType<typeof filterTasksAC>

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
            title,
            todolistID: v1()
        }
    } as const
}

export const editTodoAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
}

export const filterTasksAC = (id: string, filter: FilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}