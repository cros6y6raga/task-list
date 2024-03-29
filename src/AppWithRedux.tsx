import React, {Reducer, useCallback, useReducer, useState} from 'react';
import './App.css';
import {ITaskArray, Tasklist} from "./components/Tasklist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    editTodoAC,
    filterTasksAC,
    filterTasksACType,
    MainTypeTodolists, removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    MainTypeTasks,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

// Typing of filtering tasks
export type FilterValueType = 'all' | 'active' | 'completed'

// Typing an associative array
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

// Typing an associative arrays
export type TasksStateType = {
    [key: string]: Array<ITaskArray>
}

function AppWithRedux() {

    //Associate array (or object)
    let todolistID1 = v1();
    let todolistID2 = v1();

    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>((state) => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)

    const dispatch = useDispatch()

    // Change task function
    const editTask = useCallback((todolistID: string, taskId: string, newTitle: string) => {
        let action = changeTaskTitleAC(todolistID, newTitle, todolistID)
        dispatch(action)
    }, [dispatch])

    // Change todolist function
    const editTodo = useCallback((todolistID: string, newTask: string) => {
        dispatch(editTodoAC(todolistID, newTask))
    }, [dispatch])

    // Delete function todolist
    const removeTodolist = useCallback((todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    }, [dispatch])

    // Delete task function
    const removeTask = useCallback((todolistID: string, id: string) => {
        let action = removeTaskAC(id, todolistID)
        dispatch(action)
    }, [dispatch])

    // Add a task function
    const addTask = useCallback((todolistID: string, title: string) => {
        let action = addTaskAC(title, todolistID)
        dispatch(action)
    }, [dispatch])

    // Filter function tasks
    const filterTasks = useCallback((todolistID: string, value: FilterValueType) => {
        dispatch(filterTasksAC(todolistID, value))
    }, [dispatch])

    // Checkbox switching function
    const checkedTask = useCallback((todolistID: string, id: string, checked: boolean) => {
        let action = changeTaskStatusAC(id, checked, todolistID)
        dispatch(action)
    }, [dispatch])

    // Adding a todolist Function
    const addTodolist = useCallback((newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }, [dispatch])

    // Return JSX elements
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton size={'large'} edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component={'div'} sx={{flexGrow: 1}}>
                        Tasklist
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((t) => {

                        return (<Grid key={t.id} item>
                                <Paper style={{padding: '10px'}}>
                                    <Tasklist
                                        key={t.id}
                                        todolistID={t.id}
                                        title={t.title}
                                        tasks={tasks[t.id]}
                                        removeTask={removeTask}
                                        filterTasks={filterTasks}
                                        addTask={addTask}
                                        checkedTask={checkedTask}
                                        filter={t.filter}
                                        editTask={editTask}
                                        editTodo={editTodo}
                                        removeTodolist={removeTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;