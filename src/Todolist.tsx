import { useState, type KeyboardEvent } from "react"
import { FilterValuesType } from "./App"
import { Button } from "./Button"

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (todolistID:string,taskId: string) => void
    changeTodolistFilter: (todolistID:string, newFilterValue: FilterValuesType) => void
    createTask: (todolistID:string,title: string) => void
    changeTaskStatus: (todolistID:string,taskId: string, newStatus: boolean) => void
    filter:FilterValuesType
    todolistID:string
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, deleteTask, createTask, changeTodolistFilter, changeTaskStatus,filter,todolistID}: TodolistPropsType) => {

     const [taskTitle, setTaskTitle] = useState<string>("")
const [error, setError] = useState<boolean>(false)




    const tasksList = tasks.length === 0
        ? <span>Ваш список пуст</span>
        : <ul>
            {tasks.map((task: TaskType) => {
                const deleteTaskHandler = () => deleteTask(todolistID,task.id)
                return (
                    <li key={task.id} className={task.isDone ? 'task-done' : 'task'}>
                        <input type="checkbox" checked={task.isDone} onChange={(e)=>changeTaskStatus(todolistID,task.id,e.currentTarget.checked)}/> <span>{task.title}</span>
                        <Button title="x" onClickHandler={deleteTaskHandler} />
                    </li>
                )
            })}
        </ul>

    const createTaskOnClickHandler = () => {
       const trimmedTitle= taskTitle.trim()
        if (trimmedTitle) {
             createTask(todolistID,trimmedTitle)
        }else{
            setError(true)
        }
        setTaskTitle("")
    }

    const createTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && taskTitle && taskTitle.length <= 15) {
            createTaskOnClickHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    placeholder="max title length is 15 charters"
                    onChange={(e) => {
                        error && setError(false)
                        setTaskTitle(e.currentTarget.value)
                    }}
                    onKeyDown={createTaskOnKeyDownHandler}
                    className={error ? "taskInputError" : ''}
                />
                <Button
                    title="+"
                    isDisabled={!taskTitle || taskTitle.length > 15}
                    onClickHandler={createTaskOnClickHandler}
                />
            </div>

            {taskTitle && taskTitle.length <= 15 && <div>max title length is 15 charters</div>}
            {taskTitle.length > 15 && <div style={{ color: "red" }}>title is too long</div>}
            {error && <div style={{ color: "red" }}>title is required</div>}
            {tasksList}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title="All" onClickHandler={() => changeTodolistFilter(todolistID,"all")} />
                <Button className={filter === 'active' ? 'active-filter' : ''} title="Active" onClickHandler={() => changeTodolistFilter(todolistID,"active")} />
                <Button className={filter === 'completed' ? 'active-filter' : ''} title="Completed" onClickHandler={() => changeTodolistFilter(todolistID,"completed")} />
            </div>
        </div>
    )
}