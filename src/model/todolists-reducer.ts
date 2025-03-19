import { todolistsType } from "../App";
import {v1} from "uuid";

const initialState: Array<todolistsType> = []

export type DeleteTodolistAT = ReturnType<typeof DeleteTodolistAC>


export type CreateTodolistListAT = ReturnType<typeof CreateTodolistAC>


export type ChangeTodolistListFilterAt = {

}
export type ChangeTodolistTitleAT = {

}

export type ActionType = DeleteTodolistAT | CreateTodolistListAT


export const todolistsReducer =
    (todolists: Array<todolistsType> = initialState, action: ActionType): Array<todolistsType> => {
        switch (action.type) {
            case "delete_todolist":
                const { id } = action.payload
                return todolists.filter(tl => tl.id !== id)
            case "create_todolist":
                const newTodolistId=v1()
                const {title} = action.payload
                return [...todolists, {id: newTodolistId, title: title, filter: 'all'}]

            default:
                return todolists;
        }

    }
export const DeleteTodolistAC =(id:string) =>({
    type: "delete_todolist",
    payload: {id}
} as const)


export  const CreateTodolistAC =(title:string)=>({
    type:"create_todolist",
    payload:{title}
} as const)
