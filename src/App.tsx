import React, {useState} from 'react';
import './App.css';
import {ITaskArray, Tasklist} from "./components/Tasklist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<ITaskArray[]>([
        {id: v1(), name: 'Go to the dentist', isDone: false},
        {id: v1(), name: 'Go to the gym', isDone: false},
        {id: v1(), name: 'Learning a programming language', isDone: true},
    ])

    const [filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (id: string) => {
        const remove = tasks.filter(el => el.id !== id)
        setTasks(remove)
    }

    const addTask = (title: string) => {
        const task = {id: v1(), name: title, isDone: false}
        const newTask = [task, ...tasks]
        setTasks(newTask)
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(el => el.isDone)
    }
    const filterTasks = (value: FilterValueType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Tasklist
                title={'Tasklist'}
                tasks={filteredTasks}
                removeTask={removeTask}
                filterTasks={filterTasks}
                addTask={addTask}
            />
        </div>
    );
}

export default App;