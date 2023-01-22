import React, {ChangeEvent, useState} from 'react';
import {FilterValueType} from "../App";

type PropsType = {
    title: string
    tasks: Array<TaskArray>
    removeTask: (id: string) => void
    filterTasks: (value: FilterValueType) => void
    addTask: () => void
}

export type TaskArray = {
    id: string,
    name: string,
    isDone: boolean
}

export const Tasklist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

    }
    const onClickAddTaskHandler = () => {

    }
    const onClickFilterAll = () => {
        props.filterTasks('all')
    }
    const onClickFilterActive = () => {
        props.filterTasks('active')
    }
    const onClickFilterCompleted = () => {
        props.filterTasks('completed')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <input onChange={onChangeHandler} type="text"/>
            <button onClick={onClickAddTaskHandler}>+</button>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <button onClick={() => props.removeTask(el.id)}>Delete</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.name}</span>
                        </li>
                    )
                })}
            </ul>
            <button onClick={onClickFilterAll}>All</button>
            <button onClick={onClickFilterActive}>Active</button>
            <button onClick={onClickFilterCompleted}>Completed</button>
        </div>
    );
};