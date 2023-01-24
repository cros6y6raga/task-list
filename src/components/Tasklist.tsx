import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "../App";

// Типизация пропсов
interface IPropsType {
    title: string
    tasks: ITaskArray[]
    removeTask: (id: string) => void
    filterTasks: (value: FilterValueType) => void
    addTask: (title: string) => void
    checkedTask: (id: string, checked: boolean) => void
}

// Типизация массива tasks
export interface ITaskArray {
    id: string
    name: string
    isDone: boolean
}

// Отрисовка компаненты, указал в типизации что она функциональная
export const Tasklist: React.FC<IPropsType> = (props) => {
    // Локальный стейт для инпута и баттона
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    // Функция для инпута
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    // Функция для баттона
    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    // Функция для добавления таски через Enter
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            onClickAddTaskHandler()
        }
    }
    // Функция для фильтрации всех тасок
    const onClickFilterAll = () => {
        props.filterTasks('all')
    }
    // Функция для фильтрации активных тасок
    const onClickFilterActive = () => {
        props.filterTasks('active')
    }
    // Функция для фильтрации выполненных тасок
    const onClickFilterCompleted = () => {
        props.filterTasks('completed')
    }
    // Возврат JSX элементов
    return (
        <div>
            <h3>{props.title}</h3>
            <input className={error ? 'error' : ''}
                   value={title} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   type="text"/>
            <button onClick={onClickAddTaskHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
            <ul>
                {props.tasks.map(el => {
                    const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDone = e.currentTarget.checked
                        props.checkedTask(el.id, newIsDone)
                    }
                    return (
                        <li key={el.id}>
                            <button onClick={() => props.removeTask(el.id)}>Delete</button>
                            <input type="checkbox" checked={el.isDone} onChange={onChangeChecked}/>
                            <span>{el.name}</span>
                        </li>
                    )
                })}
            </ul>
            <button onClick={onClickFilterAll}>All</button>
            <button onClick={onClickFilterActive}>Active</button>
            <button onClick={onClickFilterCompleted}>Completed</button>
        </div>
    );
};