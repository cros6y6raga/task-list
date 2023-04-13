import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValueType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

// Typing of props
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

// Typing an array of tasks
export interface ITaskArray {
    id: string
    title: string
    isDone: boolean
}

// Drawing a component, I indicated in the typing that it is functional
export const Tasklist: React.FC<IPropsType> = memo((props) => {
    console.log('13')
    // Function to filter all tasks
    const onClickFilterAll = () => {
        props.filterTasks(props.todolistID, 'all')
    }

    // Function to filter active tasks
    const onClickFilterActive = () => {
        props.filterTasks(props.todolistID, 'active')
    }

    // Function for filtering completed tasks
    const onClickFilterCompleted = () => {
        props.filterTasks(props.todolistID, 'completed')
    }

    // Function for adding tasks
    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todolistID, title)
    },[props.addTask,props.todolistID])

    // Function for changing tasks
    const editTaskHandler = (tID: string, newTitle: string) => {
        props.editTask(props.todolistID, tID, newTitle)
    }

    // Function for changing todolist
    const editTodoHandler = (newTitle: string) => {
        props.editTodo(props.todolistID, newTitle)
    }

    // Function to remove todolist
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    // Return JSX elements
    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} callBack={editTodoHandler}/>
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
                            <IconButton onClick={removeTaskHandler} size={'small'} color={'error'}>
                                <Delete/>
                            </IconButton>
                            <Checkbox checked={el.isDone} color={'primary'} onChange={onChangeChecked} size={'small'}/>
                            <EditableSpan oldTitle={el.title}
                                          callBack={(newTitle) => editTaskHandler(el.id, newTitle)}/>
                        </li>
                    )
                })}
            </ul>
            <Button disableElevation size={'small'} variant={'contained'} sx={{mr: '2px'}}
                    color={props.filter === 'all' ? 'success' : 'error'} onClick={onClickFilterAll}>All</Button>
            <Button disableElevation size={'small'} variant={'contained'} sx={{mr: '2px'}}
                    color={props.filter === 'active' ? 'success' : 'error'}
                    onClick={onClickFilterActive}>Active</Button>
            <Button disableElevation size={'small'} variant={'contained'}
                    color={props.filter === 'completed' ? 'success' : 'error'}
                    onClick={onClickFilterCompleted}>Completed</Button>
        </div>
    );
});