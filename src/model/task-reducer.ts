import {TaskType} from "../Todolist.tsx";
import {v1} from "uuid";



export const tasksReducer = (state: {[key: string]: TaskType[]}, action: TaskReducerAC): {[key: string]: TaskType[]} => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const {todolistId, taskId} = action.payload;
            return {
                ...state,
                [todolistId]: state[todolistId].filter(t => t.id !== taskId)
            };
        }
        case 'CREATE-TASK': {
            const {todolistId, title} = action.payload;
            const newTask: TaskType = {
                id: v1(),
                title: title,
                isDone: false
            };
            return {
                ...state,
                [todolistId]: [newTask, ...state[todolistId]]
            };
        }
        case 'CHANGE-TASK-STATUS': {
            const {todolistId, taskId, isDone} = action.payload;
            return {
                ...state,
                [todolistId]: state[todolistId].map(t =>
                    t.id === taskId ? {...t, isDone} : t
                )
            };
        }
        case 'CHANGE-TASK-TITLE': {
            const {todolistId, taskId, title} = action.payload;
            return {
                ...state,
                [todolistId]: state[todolistId].map(t =>
                    t.id === taskId ? {...t, title} : t
                )
            };
        }


        default:
            return state;
    }
}

export type TaskReducerAC =
    | RemoveTaskAC
    | CreateTaskAC
    | ChangeTaskStatusAC
    | ChangeTaskTitleAC


type RemoveTaskAC = {
    type: 'REMOVE-TASK',
    payload: {
        todolistId: string
        taskId: string
    }
}

type CreateTaskAC = {
    type: 'CREATE-TASK',
    payload: {
        todolistId: string
        title: string
    }
}

type ChangeTaskStatusAC = {
    type: 'CHANGE-TASK-STATUS',
    payload: {
        todolistId: string
        taskId: string
        isDone: boolean
    }
}

type ChangeTaskTitleAC = {
    type: 'CHANGE-TASK-TITLE',
    payload: {
        todolistId: string
        taskId: string
        title: string
    }
}



export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskAC => ({
    type: 'REMOVE-TASK',
    payload: {
        todolistId,
        taskId
    }
}as const);

export const createTaskAC = (todolistId: string, title: string): CreateTaskAC => ({
    type: 'CREATE-TASK',
    payload: {
        todolistId,
        title
    }
}as const);

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusAC => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {
        todolistId,
        taskId,
        isDone
    }
}as const);

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleAC => ({
    type: 'CHANGE-TASK-TITLE',
    payload: {
        todolistId,
        taskId,
        title
    }
}as const);

