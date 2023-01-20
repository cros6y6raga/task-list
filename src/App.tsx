import React, {useState} from 'react';
import './App.css';
import {Tasklist} from "./components/Tasklist";

function App() {
    const [task, setTask] = useState([
        {id: 1, name: 'Go to the dentist', isDone: false},
        {id: 2, name: 'Go to the gym', isDone: false},
        {id: 3, name: 'Learning a programming language', isDone: true},
    ])
    return (
        <div className="App">
            <Tasklist/>
        </div>
    );
}

export default App;