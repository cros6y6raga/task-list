import React from 'react';
import {FilterValueType} from "../App";

type PropsType = {
    title: string
    tasks: Array<TaskArray>
    removeTask: (id: string) => void
    filterTask: (value: FilterValueType) => void
}

export type TaskArray = {
    id: string,
    name: string,
    isDone: boolean
}

export const Tasklist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <input type="text"/>
            <button>+</button>
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
            <button onClick={() => props.filterTask('all')}>All</button>
            <button onClick={() => props.filterTask('active')}>Active</button>
            <button onClick={() => props.filterTask('completed')}>Completed</button>
        </div>
    );
};