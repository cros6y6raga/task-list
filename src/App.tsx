import React, {useState} from 'react';
import './App.css';
import {ITaskArray, Tasklist} from "./components/Tasklist";
import {v1} from "uuid";

// Типизация фильтрации тасок
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    // Локальный стейт тасок
    const [tasks, setTasks] = useState<ITaskArray[]>([
        {id: v1(), name: 'Go to the dentist', isDone: false},
        {id: v1(), name: 'Go to the gym', isDone: false},
        {id: v1(), name: 'Learning a programming language', isDone: true},
    ])

    // Локальный стейт фильтрации тасок
    const [filter, setFilter] = useState<FilterValueType>('all')

    // Функция удаления таски
    const removeTask = (id: string) => {
        const remove = tasks.filter(el => el.id !== id)
        setTasks(remove)
    }

    // Функция добавления таски
    const addTask = (title: string) => {
        const task = {id: v1(), name: title, isDone: false}
        const newTask = [task, ...tasks]
        setTasks(newTask)
    }

    // Функция фильтрации тасок
    const filterTasks = (value: FilterValueType) => {
        setFilter(value)
    }

    // Фильтрация тасок
    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(el => el.isDone)
    }

    // Функция переключения чекбоксов
    const checkedTask = (id: string, checked: boolean) => {
        setTasks(tasks.map(el => el.id === id ? {...el, isDone: checked} : el))
    }

    // Возврат JSX элементов
    return (
        <div className="App">
            <Tasklist
                title={'Tasklist'}
                tasks={filteredTasks}
                removeTask={removeTask}
                filterTasks={filterTasks}
                addTask={addTask}
                checkedTask={checkedTask}
                filter={filter}
            />
        </div>
    );
}

export default App;
