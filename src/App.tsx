
import React from 'react'
import './App.css'
import { TaskType, Todolist } from './Todolist'
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed"



// (C)-(R)-(U1)-(D)
function App() {
  console.log(typeof v1()); "2cab5250-e7ca-11ef-a274-0b1757d973bf"

  // BLL:
  const todolistTitle: string = "Whatа to learn"

  const [tasks, setTasks] = React.useState<Array<TaskType>>([
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "REACT", isDone: false },
  ])

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }

  const createTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    const nextState: Array<TaskType> = [...tasks, newTask]
    setTasks(nextState)
  }

  const changeTaskStatus = (taskId: string, newStatus: boolean) => {
    const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? { ...t, isDone: newStatus } : t)
    setTasks(nextState)
  }

  //UI:

 const [filter, setFilter] = React.useState<FilterValuesType>("all")

  const changeTodolistFilter = (newFilterValue: FilterValuesType) => {
    setFilter(newFilterValue)
  }

  let tasksForTodolist = tasks
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false)
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone === true)
  }



  return (
    <div className="app">
      <Todolist
          filter={filter}
        title={todolistTitle}
        tasks={tasksForTodolist}
        deleteTask={deleteTask}
        createTask={createTask}
        changeTodolistFilter={changeTodolistFilter}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  )
}

export default App
