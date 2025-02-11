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
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void;
}


export const TodolistItem = (props: PropsType) => {
    let [title, setTitle] = useState('')




    const onClickButtonHandler = () => {
        if (title.trim()) {
            props.addTask(title);
        }
        setTitle('1')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <Input setTitle={setTitle} title={title}/>
                <Button onClick={onClickButtonHandler} title={'+'}/>
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
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
            </div>
        </div>
    );
};