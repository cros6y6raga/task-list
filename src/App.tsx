import React, {useState} from 'react';
import './App.css';
import {Tasklist} from "./components/Tasklist";
import {v1} from "uuid";

function App() {
    const [task, setTask] = useState([
        {id: v1(), name: 'Go to the dentist', isDone: false},
        {id: v1(), name: 'Go to the gym', isDone: false},
        {id: v1(), name: 'Learning a programming language', isDone: true},
    ])
    return (
        <div className="App">
            <Tasklist task={task}/>
        </div>
    );
}

export default App;