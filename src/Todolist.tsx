// import {useState, type KeyboardEvent} from "react"
import {FilterValuesType} from "./App"
import {Button} from "./Button"
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (todolistID: string, taskId: string) => void
    changeTodolistFilter: (todolistID: string, newFilterValue: FilterValuesType) => void
    createTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, newStatus: boolean) => void
    filter: FilterValuesType
    todolistID: string
    deleteTodolist:(todolistID: string) => void
    changeTaskTitle:(todolistID: string,taskId: string,title:string)=>void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({
                             title,
                             deleteTodolist,
                             tasks,
                             deleteTask,
                             createTask,
                             changeTodolistFilter,
                             changeTaskStatus,
                             filter,
                             todolistID,
                             changeTaskTitle,
                             changeTodolistTitle
                         }: TodolistPropsType) => {



    const tasksList = tasks.length === 0
        ? <span>Ваш список пуст</span>
        : <ul>
            {tasks.map((task: TaskType) => {
                const deleteTaskHandler = () => deleteTask(todolistID, task.id)
                const changeTitleCallback=(title:string) => {
                    changeTaskTitle(todolistID,task.id,title)
                }
                return (
                    <li key={task.id} className={task.isDone ? 'task-done' : 'task'}>
                        <input type="checkbox" checked={task.isDone}
                               onChange={(e) => changeTaskStatus(todolistID, task.id, e.currentTarget.checked)}/>
                        {/*<span>{task.title}</span>*/}
                        <EditableSpan changeTitle={changeTitleCallback}  value={task.title} />
                        <Button title="x" onClickHandler={deleteTaskHandler}/>
                    </li>
                )
            })}
        </ul>



    const createTaskHandler=(title: string)=>{
        createTask(todolistID,title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolistID, title)
    }
    return (
        <div>

            <h3><EditableSpan value={title}  changeTitle={changeTodolistTitleHandler} /> <Button title={'Delete Todolist'} onClickHandler={()=>deleteTodolist(todolistID)}/></h3>

            <AddItemForm maxTitleLength={20}  addItem={createTaskHandler}/>
            {tasksList}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} title="All"
                        onClickHandler={() => changeTodolistFilter(todolistID, "all")}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title="Active"
                        onClickHandler={() => changeTodolistFilter(todolistID, "active")}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title="Completed"
                        onClickHandler={() => changeTodolistFilter(todolistID, "completed")}/>
            </div>
        </div>
    )
}