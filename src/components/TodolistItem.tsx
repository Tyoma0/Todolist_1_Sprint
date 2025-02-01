import {Button} from "./Button.tsx";
import {FilterValuesType} from "../App.tsx";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}


export const TodolistItem = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>

            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type='checkbox' checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => {
                                props.removeTask(task.id)
                            }}>x
                            </button>
                        </li>
                    );
                })}
            </ul>

            <div>
                <button onClick={()=>{props.changeFilter('all')}}>All</button>
                <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
                <button onClick={()=>{props.changeFilter('active')}}>Active</button>
            </div>
        </div>
    );
};