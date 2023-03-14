import {TodolistsType} from "../App";

// type ActionType = {
//     type: string
//     [key: string]: any
// }

export const todolistsReducer = (state: Array<TodolistsType>, action: MainType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":{
            return state.filter(el => el.id !== action.payload.id)
        }
        default:
            //throw new Error('I don\'t understand this type')
            return state
    }
};

type MainType=removeTodolistACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}