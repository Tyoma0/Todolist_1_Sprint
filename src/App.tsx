import {useReducer, useState} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import {MaterialUISwitch, NavButton} from './NavButton'
import {containerSx} from "./TodolistItem.styles.ts";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {FormControlLabel} from "@mui/material";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, CreateTodolistAC,
    DeleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";

export type FilterValuesType = "all" | "active" | "completed"

type ThemeMode = 'dark' | 'light'

export type todolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TaskListType ={
    [todolistId:string]:Array<todolistsType>
}



// (C)-(R)-(U1)-(D)
function App() {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })
    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
    // BLL:
    // const todolistTitle: string = "What to learn"

    // const [tasks, setTasks] = React.useState<Array<TaskType>>([
    //   { id: v1(), title: "HTML", isDone: true },
    //   { id: v1(), title: "CSS", isDone: true },
    //   { id: v1(), title: "REACT", isDone: false },
    // ])
    let todolistID1 = v1();
    let todolistID2 = v1();

    // let [todolists, setTodolists] = useState<Array<todolistsType>>([
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])
const initState:Array<todolistsType>=[
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]
//

    const [todolists, dispachTodolist] = useReducer(todolistsReducer,initState)

    let [tasks, setTasks] = useState({
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
    //UI
    const deleteTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskId)})
        // setTasks(tasks.filter(t => t.id !== taskId))
    }

    const createTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    const changeTaskStatus = (todolistID: string, taskId: string, newStatus: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone: newStatus} : t)})
    }

    const changeTodolistFilter = (todolistID: string, newFilterValue: FilterValuesType) => {
        // setTodolists(todolists.map(filtered => filtered.id === todolistID ? {...filtered, filter: newFilterValue} : filtered))
    dispachTodolist(changeTodolistFilterAC({id:todolistID, filter:newFilterValue}))
    }

    const changeTaskTitle =(todolistID: string,taskId: string,title:string)=>{
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(t=>t.id===taskId ? {...t,title}:t)})

    }

    const deleteTodolist = (todolistID: string) => {
        // setTodolists(todolists.filter(tl => tl.id !== todolistID))
        // delete tasks[todolistID]
        dispachTodolist(DeleteTodolistAC(todolistID))
    }

    const addTodolist = (title: string) => {
        const id = v1()
        dispachTodolist(CreateTodolistAC({id:id,title:title}))
        // const newTodolist: todolistsType = {id, title: title, filter: 'all'}
        // setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [id]: []})
    };

    const changeTodolistTitle =(todolistID:string,title:string)=>{
// setTodolists(todolists.map(t=>t.id ===todolistID ?{...t,title}:t))
        dispachTodolist(changeTodolistTitleAC({id:todolistID,title:title}))
    }
//
    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline />
            <AppBar position="static" sx={{ mb: '30px' }}>
                <Toolbar>
                    <Container maxWidth={'lg'} sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <div>
                            <NavButton>Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                            <FormControlLabel
                                control={<MaterialUISwitch sx={{ m: 1 }}   onChange={changeMode}/>}
                                label=""
                            />
                        </div>

                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container sx={{ mb: '30px' }}>
                    <AddItemForm addItem={addTodolist} maxTitleLength={10}/>
                </Grid>
                <Grid container spacing={4}>
            {todolists.map((mapTodolists) => {
                let tasksForTodolist = tasks[mapTodolists.id]
                if (mapTodolists.filter === "active") {
                    tasksForTodolist = tasks[mapTodolists.id].filter(t => t.isDone === false)
                }
                if (mapTodolists.filter === "completed") {
                    tasksForTodolist = tasks[mapTodolists.id].filter(t => t.isDone === true)
                }
                return (
                    <Grid key={mapTodolists.id}>
                        <Paper elevation={8} sx={{p:'15px'}}>
                    <Todolist
                        deleteTodolist={deleteTodolist}
                        key={mapTodolists.id}
                        todolistID={mapTodolists.id}
                        title={mapTodolists.title}
                        tasks={tasksForTodolist}
                        deleteTask={deleteTask}
                        createTask={createTask}
                        changeTodolistFilter={changeTodolistFilter}
                        changeTaskStatus={changeTaskStatus}
                        filter={mapTodolists.filter}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}

                    />
                        </Paper>
                    </Grid>
                )
            })}
                </Grid>
            </Container>
            </ThemeProvider>
        </div>
    )
}

export default App
