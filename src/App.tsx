import React, {useState} from 'react';
import './App.css';
import {Tasklist} from "./components/Tasklist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

// Типизация фильтрации тасок
export type FilterValueType = 'all' | 'active' | 'completed'

// Типизация ассоциативного массива
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    //Ассоциативный массив (или объект)
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    // Функция удаления таски
    const removeTask = (todolistID: string, id: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
    }

    // Функция добавления таски
    const addTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    // Функция фильтрации тасок
    const filterTasks = (todolistID: string, value: FilterValueType) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    // Функция переключения чекбоксов
    const checkedTask = (todolistID: string, id: string, checked: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === id ? {...el, isDone: checked} : el)})
    }

    const addTodolist = (newTitle: string) => {
        const newTodoID = v1()
        const newTodolist: TodolistsType = {id: newTodoID, title: newTitle, filter: 'all'};
        setTodolists([...todolists, newTodolist])
        setTasks({[newTodoID]: [], ...tasks})
    }

    // Возврат JSX элементов
    return (
        <div className="App">
            <AddItemForm callBack={addTodolist}/>
            {todolists.map((t) => {
                let filteredTasks = tasks[t.id]
                if (t.filter === 'active') {
                    filteredTasks = tasks[t.id].filter(el => !el.isDone)
                }
                if (t.filter === 'completed') {
                    filteredTasks = tasks[t.id].filter(el => el.isDone)
                }
                return (
                    <Tasklist
                        key={t.id}
                        todolistID={t.id}
                        title={t.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        filterTasks={filterTasks}
                        addTask={addTask}
                        checkedTask={checkedTask}
                        filter={t.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;