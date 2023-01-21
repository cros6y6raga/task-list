import React, {useState} from 'react';
import './App.css';
import {Tasklist} from "./components/Tasklist";
import {v1} from "uuid";

type FilterValueType= 'all' | 'active' | 'completed'

function App() {
    const [task, setTask] = useState([
        {id: v1(), name: 'Go to the dentist', isDone: false},
        {id: v1(), name: 'Go to the gym', isDone: false},
        {id: v1(), name: 'Learning a programming language', isDone: true},
    ])
    const removeTask = (id: string) => {
        const remove = task.filter(el => el.id !== id)
        setTask(remove)
    }
    const filterTask = (value:FilterValueType) => {

    }
    return (
        <div className="App">
            <Tasklist task={task}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;