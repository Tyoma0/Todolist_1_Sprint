import {Button} from "./Button.tsx";
import {FilterValuesType} from "../App.tsx";
import {Input} from "./Input.tsx";
import {useState} from "react";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

 type PropsType = {
    text: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void;
}


export const TodolistItem = ({text,tasks,removeTask,changeFilter,addTask}: PropsType) => {
    let [title, setTitle] = useState('')




    const onClickButtonHandler = () => {
        if (title.trim()) {
            addTask(title);
        }
        setTitle('')
    }

    return (
        <div>
            <h3>{text}</h3>
            <div>
                <Input setTitle={setTitle} title={title}/>
                <Button onClick={onClickButtonHandler} title={'+'}/>
            </div>

            <ul>
                {tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type='checkbox' checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => {
                                removeTask(task.id)
                            }}>x
                            </button>
                        </li>
                    );
                })}
            </ul>

            <div>
                <button onClick={() => {
                    changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    changeFilter('completed')
                }}>Completed
                </button>
                <button onClick={() => {
                    changeFilter('active')
                }}>Active
                </button>
            </div>
        </div>
    );
};