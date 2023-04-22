import React, {useState} from 'react';
import './App.css';
import {ITaskArray, Tasklist} from "./components/Tasklist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

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

function App() {

    //Associate array (or object)
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        const editVal = {
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        }
        setTasks(editVal)
    }

    // Change todolist function
    const editTodo = (todolistID: string, newTask: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTask} : el))
    }

    // Delete function todolist
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }

    // Delete task function
    const removeTask = (todolistID: string, id: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
    }

    // Add a task function
    const addTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    // Filter function tasks
    const filterTasks = (todolistID: string, value: FilterValueType) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    // Checkbox switching function
    const checkedTask = (todolistID: string, id: string, checked: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === id ? {...el, isDone: checked} : el)})
    }

    // Adding a todolist Function
    const addTodolist = (newTitle: string) => {
        const newTodoID = v1()
        const newTodolist: TodolistsType = {id: newTodoID, title: newTitle, filter: 'all'};
        setTodolists([...todolists, newTodolist])
        setTasks({[newTodoID]: [], ...tasks})
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

export default App;
