import React, {useState} from 'react';
import './App.css';
import {TaskArray, Tasklist} from "./components/Tasklist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskArray[]>([
        {id: v1(), name: 'Go to the dentist', isDone: false},
        {id: v1(), name: 'Go to the gym', isDone: false},
        {id: v1(), name: 'Learning a programming language', isDone: true},
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')
    const removeTask = (id: string) => {
        const remove = tasks.filter(el => el.id !== id)
        setTasks(remove)
    }
    let filteredTask = tasks
    if (filter === 'active') {
        filteredTask = tasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        filteredTask = tasks.filter(el => el.isDone)
    }
    const filterTask = (value: FilterValueType) => {
        setFilter(value)
    }
    return (
        <div className="App">
            <Tasklist
                title={'Tasklist'}
                tasks={filteredTask}
                removeTask={removeTask}
                filterTask={filterTask}
            />
        </div>
    );
}

export default App;