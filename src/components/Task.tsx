

type Props = {
title: string;
isDone: boolean;
id: string;
removeTask: (taskId: string) => void;
}


export const Task = ({title,isDone,id,removeTask}:Props) => {
    return (
        <li key={id}>
            <input type='checkbox' checked={isDone}/>
            <span>{title}</span>
            <button onClick={() => {
                removeTask(id)
            }}>x
            </button>
        </li>
    );
};

