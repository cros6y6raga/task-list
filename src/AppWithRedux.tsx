import React, {Reducer, useReducer, useState} from 'react';
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

    let [todolists, dispatchToTodolists] = useReducer<Reducer<Array<TodolistsType>, MainTypeTodolists>>(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer<Reducer<TasksStateType, MainTypeTasks>>(tasksReducer,{
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

    // Change task function
    const editTask = (todolistID: string, taskId: string, newTitle: string) => {
        let action = changeTaskTitleAC(todolistID, newTitle,todolistID)
        dispatchToTasks(action)
    }

    // Change todolist function
    const editTodo = (todolistID: string, newTask: string) => {
        dispatchToTodolists(editTodoAC(todolistID,newTask))
    }

    // Delete function todolist
    const removeTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    // Delete task function
    const removeTask = (todolistID: string, id: string) => {
        let action = removeTaskAC(id,todolistID)
        dispatchToTasks(action)
    }

    // Add a task function
    const addTask = (todolistID: string, title: string) => {
        let action = addTaskAC(title,todolistID)
        dispatchToTasks(action)
    }

    // Filter function tasks
    const filterTasks = (todolistID: string, value: FilterValueType) => {
        dispatchToTodolists(filterTasksAC(todolistID,value))
    }

    // Checkbox switching function
    const checkedTask = (todolistID: string, id: string, checked: boolean) => {
        let action = changeTaskStatusAC(id, checked,todolistID)
        dispatchToTasks(action)
    }

    // Adding a todolist Function
    const addTodolist = (newTitle: string) => {
        const action =addTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

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
                        let filteredTasks = tasks[t.id]
                        if (t.filter === 'active') {
                            filteredTasks = tasks[t.id].filter(el => !el.isDone)
                        }
                        if (t.filter === 'completed') {
                            filteredTasks = tasks[t.id].filter(el => el.isDone)
                        }
                        return (<Grid key={t.id} item>
                                <Paper style={{padding: '10px'}}>
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