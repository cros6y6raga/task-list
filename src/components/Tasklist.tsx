import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "../App";
import {AddItemForm} from "./AddItemForm";

// Типизация пропсов
interface IPropsType {
    title: string
    tasks: ITaskArray[]
    removeTask: (todolistID: string, id: string) => void
    filterTasks: (todolistID: string, value: FilterValueType) => void
    addTask: (todolistID: string, title: string) => void
    checkedTask: (todolistID: string, id: string, checked: boolean) => void
    filter: FilterValueType
    todolistID: string
}

// Типизация массива tasks
export interface ITaskArray {
    id: string
    title: string
    isDone: boolean
}

// Отрисовка компаненты, указал в типизации что она функциональная
export const Tasklist: React.FC<IPropsType> = (props) => {

    // Локальный стейт для инпута и баттона
    // const [title, setTitle] = useState('')
    // const [error, setError] = useState<string | null>(null)

    // // Функция для инпута
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    // // Функция для баттона
    // const onClickAddTaskHandler = () => {
    //     if (title.trim() !== '') {
    //         props.addTask(props.todolistID, title.trim())
    //         setTitle('')
    //     } else {
    //         setError('Title is required')
    //     }
    // }

    // // Функция для добавления таски через Enter
    // const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null)
    //     if (e.key === 'Enter') {
    //         onClickAddTaskHandler()
    //     }
    // }

    // Функция для фильтрации всех тасок
    const onClickFilterAll = () => {
        props.filterTasks(props.todolistID, 'all')
    }

    // Функция для фильтрации активных тасок
    const onClickFilterActive = () => {
        props.filterTasks(props.todolistID, 'active')
    }

    // Функция для фильтрации выполненных тасок
    const onClickFilterCompleted = () => {
        props.filterTasks(props.todolistID, 'completed')
    }

    // Возврат JSX элементов
    return (
        <div>
            <h3>{props.title}</h3>
            <AddItemForm callBack={props.addTask} todolistID={props.todolistID}/>
            {/*<input className={error ? 'error' : ''}*/}
            {/*       value={title} onChange={onChangeHandler}*/}
            {/*       onKeyDown={onKeyDownHandler}*/}
            {/*       type="text"/>*/}
            {/*<button className={'button-plus'} onClick={onClickAddTaskHandler}>+</button>*/}
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
            <ul>
                {props.tasks.map(el => {
                    const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDone = e.currentTarget.checked
                        props.checkedTask(props.todolistID, el.id, newIsDone)
                    }
                    const removeTaskHandler = () => {
                        props.removeTask(props.todolistID, el.id)
                    }
                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <button className={'delete'} onClick={removeTaskHandler}>Delete</button>
                            <input className={'checkbox'} type="checkbox" checked={el.isDone}
                                   onChange={onChangeChecked}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickFilterAll}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onClickFilterActive}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onClickFilterCompleted}>Completed
            </button>
        </div>
    );
};