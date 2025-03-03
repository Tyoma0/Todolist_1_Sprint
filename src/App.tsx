import {useState} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm.tsx";

export type FilterValuesType = "all" | "active" | "completed"

export type todolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

// (C)-(R)-(U1)-(D)
function App() {

    // BLL:
    // const todolistTitle: string = "What to learn"

    // const [tasks, setTasks] = React.useState<Array<TaskType>>([
    //   { id: v1(), title: "HTML", isDone: true },
    //   { id: v1(), title: "CSS", isDone: true },
    //   { id: v1(), title: "REACT", isDone: false },
    // ])
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

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

    const deleteTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskId)})
        // setTasks(tasks.filter(t => t.id !== taskId))
    }

    const createTask = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
        // const newTask: TaskType = {
        //   id: v1(),
        //   title: title,
        //   isDone: false
        // }
        // const nextState: Array<TaskType> = [...tasks, newTask]
        // setTasks(nextState)
    }

    const changeTaskStatus = (todolistID: string, taskId: string, newStatus: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone: newStatus} : t)})

        // const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? { ...t, isDone: newStatus } : t)
        // setTasks(nextState)
    }
    //UI:
    const changeTodolistFilter = (todolistID: string, newFilterValue: FilterValuesType) => {
        setTodolists(todolists.map(filtered => filtered.id === todolistID ? {
            ...filtered,
            filter: newFilterValue
        } : filtered))
        //setFilter(newFilterValue)
    }


    const deleteTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }

    const addTodolist = (title: string) => {
        const id = v1()
        const newTodolist: todolistsType = {id, title: title, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [id]: []})
    };

    return (
        <div className="app">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((mapTodolists) => {
                let tasksForTodolist = tasks[mapTodolists.id]
                if (mapTodolists.filter === "active") {
                    tasksForTodolist = tasks[mapTodolists.id].filter(t => t.isDone === false)
                }
                if (mapTodolists.filter === "completed") {
                    tasksForTodolist = tasks[mapTodolists.id].filter(t => t.isDone === true)
                }
                return (
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
                    />
                )
            })}

        </div>
    )
}

export default App
