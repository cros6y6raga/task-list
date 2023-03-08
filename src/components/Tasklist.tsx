import React, {ChangeEvent} from 'react';
import {FilterValueType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
    removeTodolist: (todolistID: string) => void
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

    // Функция для добавления тасок
    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    // Функция для изменения тасок
    const editTaskHandler = (tID: string, newTitle: string) => {
        props.editTask(props.todolistID, tID, newTitle)
    }

    // Функция для изменения тудулиста
    const editTodoHandler = (newTitle: string) => {
        props.editTodo(props.todolistID, newTitle)
    }

    // Функция для удаления тудулиста
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    // Возврат JSX элементов
    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} callBack={editTodoHandler}/>
                {/*<button onClick={removeTodolistHandler}>x</button>*/}
                <IconButton onClick={removeTodolistHandler} size={'small'} color={'error'}>
                    <Delete/>
                </IconButton>
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
                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            {/*<button className={'delete'} onClick={removeTaskHandler}>Delete</button>*/}
                            <IconButton onClick={removeTaskHandler} size={'small'} color={'error'}>
                                <Delete/>
                            </IconButton>
                            <input className={'checkbox'} type="checkbox" checked={el.isDone}
                                   onChange={onChangeChecked}/>
                            <EditableSpan oldTitle={el.title}
                                          callBack={(newTitle) => editTaskHandler(el.id, newTitle)}/>
                        </li>
                    )
                })}
            </ul>

            <Button disableElevation size={'small'} variant={'contained'} sx={{mr: '2px'}}
                    color={props.filter === 'all' ? 'success' : 'error'} onClick={onClickFilterAll}>All</Button>
            <Button  disableElevation size={'small'} variant={'contained'} sx={{mr: '2px'}}
                    color={props.filter === 'active' ? 'success' : 'error'}
                    onClick={onClickFilterActive}>Active</Button>
            <Button disableElevation size={'small'} variant={'contained'}
                    color={props.filter === 'completed' ? 'success' : 'error'}
                    onClick={onClickFilterCompleted}>Completed</Button>

        </div>
    );
};