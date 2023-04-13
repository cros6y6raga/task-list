import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValueType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "../Task";

// Typing of props
export interface IPropsType {
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
    // Function to filter all tasks
    const onClickFilterAll = useCallback(() => {
        props.filterTasks(props.todolistID, 'all')
    }, [props.filterTasks, props.todolistID])

    // Function to filter active tasks
    const onClickFilterActive = useCallback(() => {
        props.filterTasks(props.todolistID, 'active')
    }, [props.filterTasks, props.todolistID])

    // Function for filtering completed tasks
    const onClickFilterCompleted = useCallback(() => {
        props.filterTasks(props.todolistID, 'completed')
    }, [props.filterTasks, props.todolistID])

    // Function for adding tasks
    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todolistID, title)
    }, [props.addTask, props.todolistID])

    // Function for changing tasks
    const editTaskHandler = (tID: string, newTitle: string) => {
        props.editTask(props.todolistID, tID, newTitle)
    }

    // Function for changing todolist
    const editTodoHandler = useCallback((newTitle: string) => {
        props.editTodo(props.todolistID, newTitle)
    }, [props.editTodo, props.todolistID])

    // Function to remove todolist
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    let tasks = props.tasks
    if (props.filter === 'active') {
        tasks = tasks.filter(el => !el.isDone)
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(el => el.isDone)
    }

    const checkedTask = useCallback((taskId: string, newIsDone: boolean) => {
        props.checkedTask(props.todolistID, taskId, newIsDone)
    }, [props.todolistID, props.checkedTask])
    const removeTask = useCallback((taskId: string) => {
        props.removeTask(props.todolistID, taskId)
    }, [props.todolistID, props.removeTask])
    const editTask = useCallback((taskId: string, newTitle: string) => {
        props.editTask(props.todolistID, taskId, newTitle)
    }, [props.todolistID, props.editTask])

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
                {tasks.map(el => {

                    return (
                        <Task
                            key={el.id}
                            task={el}
                            checkedTask={checkedTask}
                            editTask={editTask}
                            removeTask={removeTask}/>
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