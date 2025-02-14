import './App.css'
import {TaskType, TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'


export const App = () => {


    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},

    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')




    function removeTask(id: string) {
        let filterTasks = tasks.filter(t => t.id !== id);
        setTasks(filterTasks)
    }

    function changeFilter(value:FilterValuesType) {
        setFilter(value)
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        };
        setTasks([newTask, ...tasks]);
    }


    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    const title_1 = "What to learn"

    return (
        <div className="app">
            <TodolistItem addTask={addTask} changeFilter={changeFilter} text={title_1} tasks={tasksForTodolist} removeTask={removeTask}/>
        </div>
    );
}


