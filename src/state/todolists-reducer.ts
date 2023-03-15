import {TodolistsType} from "../App";
import {v1} from "uuid";

// type ActionType = {
//     type: string
//     [key: string]: any
// }

export const todolistsReducer = (state: Array<TodolistsType>, action: MainType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            const newTodoID = v1()
            const newTodolist: TodolistsType = {id: newTodoID, title: action.payload.title, filter: 'all'};
            // setTodolists([...todolists, newTodolist])
            // setTasks({[newTodoID]: [], ...tasks})
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        default:
            //throw new Error('I don\'t understand this type')
            return state
    }
};

type MainType = removeTodolistACType | addTodolistACType | editTodoACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>
type editTodoACType = ReturnType<typeof editTodoAC>

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

export const editTodoAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
}