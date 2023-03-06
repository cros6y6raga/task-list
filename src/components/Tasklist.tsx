import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    removeTodolist:(todolistID: string)=>void
    editTask: (todolistID: string, taskId: string, newTitle: string) => void
    editTodo: (todolistID: string, newTitle: string) => void
}

// Типизация массива tasks
export interface ITaskArray {
    id: string
    title: string
    isDone: boolean
}

// Отрисовка компаненты, указал в типизации что она функциональная
export const Tasklist: React.FC<IPropsType> = (props) => {

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

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    const editTaskHandler = (tID: string, newTitle: string) => {
        props.editTask(props.todolistID, tID, newTitle)
    }

    const editTodoHandler = (newTitle: string) => {
        props.editTodo(props.todolistID, newTitle)
    }

    const removeTodolistHandler = () => {
      props.removeTodolist(props.todolistID)
    }
    
    // Возврат JSX элементов
    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan oldTitle={props.title} callBack={editTodoHandler}/>
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>
            <ul>
                {props.tasks.map(el => {
                    const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDone = e.currentTarget.checked
                        props.checkedTask(props.todolistID, el.id, newIsDone)
                    }
                    const removeTaskHandler = () => {
                        props.removeTask(props.todolistID, el.id)
                    }
                    // const editTaskHandler = (newTitle:string) => {
                    //     props.editTask(props.todolistID,el.id,newTitle)
                    // }
                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <button className={'delete'} onClick={removeTaskHandler}>Delete</button>
                            <input className={'checkbox'} type="checkbox" checked={el.isDone}
                                   onChange={onChangeChecked}/>
                            {/*<span>{el.title}</span>*/}
                            <EditableSpan oldTitle={el.title}
                                          callBack={(newTitle) => editTaskHandler(el.id, newTitle)}/>
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