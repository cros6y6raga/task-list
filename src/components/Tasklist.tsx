import React from 'react';

type PropsType = {
    task: Array<TaskArray>
}

type TaskArray = {
    id: string,
    name: string,
    isDone: boolean
}

export const Tasklist = (props: PropsType) => {
    return (
        <div>
            <h3>main</h3>
            <input type="text"/>
            <button>+</button>
            <ul>
                <li>
                    <input type="checkbox" checked={false}/>
                    <span>main</span>
                </li>
            </ul>
        </div>
    );
};