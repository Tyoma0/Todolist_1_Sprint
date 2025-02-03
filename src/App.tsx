import './App.css'
import {TaskType, TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";

export type FilterValuesType = 'all' | 'active' | 'completed'


export const App = () => {


    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')


    function removeTask(id: number) {
        let filterTasks = tasks.filter(t => t.id !== id);
        setTasks(filterTasks)
    }

    function changeFilter(value:FilterValuesType) {
        setFilter(value)
    }
    

    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="app">
            <TodolistItem changeFilter={changeFilter} title="What to learn" tasks={tasksForTodolist} removeTask={removeTask}/>
        </div>
    );
}


