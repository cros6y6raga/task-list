import React, {useState} from 'react';
import './App.css';
import {ITaskArray, Tasklist} from "./components/Tasklist";
import {v1} from "uuid";

// Типизация фильтрации тасок
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    // Локальный стейт тасок
    // const [tasks, setTasks] = useState<ITaskArray[]>([
    //     {id: v1(), name: 'Go to the dentist', isDone: false},
    //     {id: v1(), name: 'Go to the gym', isDone: false},
    //     {id: v1(), name: 'Learning a programming language', isDone: true},
    // ])

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

    // Локальный стейт фильтрации тасок
    const [filter, setFilter] = useState<FilterValueType>('all')

    // Функция удаления таски
    const removeTask = (todolistID: string, id: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
        // const remove = tasks.filter(el => el.id !== id)
        // setTasks(remove)
    }

    // Функция добавления таски
    const addTask = (title: string) => {
        // const task = {id: v1(), name: title, isDone: false}
        // const newTask = [task, ...tasks]
        // setTasks(newTask)
    }

    // Функция фильтрации тасок
    const filterTasks = (todolistID: string, value: FilterValueType) => {
        setTodolists(todolists.map(f => f.id === todolistID ? {...f, filter: value} : f))
        // setFilter(value)
    }

    // Фильтрация тасок
    // let filteredTasks = tasks

    // Функция переключения чекбоксов
    const checkedTask = (id: string, checked: boolean) => {
        // setTasks(tasks.map(el => el.id === id ? {...el, isDone: checked} : el))
    }

    // Возврат JSX элементов
    return (
        <div className="App">
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