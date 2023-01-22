import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "../App";

type PropsType = {
    title: string
    tasks: Array<TaskArray>
    removeTask: (id: string) => void
    filterTasks: (value: FilterValueType) => void
    addTask: (title: string) => void
}

export type TaskArray = {
    id: string,
    name: string,
    isDone: boolean
}

export const Tasklist: React.FC<PropsType> = (props) => {

    const [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickAddTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTaskHandler()
        }
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
            <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} type="text"/>
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