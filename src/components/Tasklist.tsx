import React from 'react';

type PropsType = {
    task: Array<TaskArray>
    removeTask: (id: string) => void
}

type TaskArray = {
    id: string,
    name: string,
    isDone: boolean
}

export const Tasklist = (props: PropsType) => {
    return (
        <div>
            <h3>Tasklist</h3>
            <input type="text"/>
            <button>+</button>
            <ul>
                {props.task.map(el => {
                    return (
                        <li key={el.id}>
                            <button onClick={() => props.removeTask(el.id)}>Delete</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.name}</span>
                        </li>
                    )
                })}
            </ul>
            <button onClick={()=>{}}>All</button>
            <button onClick={()=>{}}>Active</button>
            <button onClick={()=>{}}>Completed</button>
        </div>
    );
};