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
            <button onClick={() => props.filterTasks('all')}>All</button>
            <button onClick={() => props.filterTasks('active')}>Active</button>
            <button onClick={() => props.filterTasks('completed')}>Completed</button>
        </div>
    );
};