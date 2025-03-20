import {FilterValuesType, todolistsType} from "../App";
import {v1} from "uuid";

const initialState: Array<todolistsType> = []

export type DeleteTodolistAT = ReturnType<typeof DeleteTodolistAC>


export type CreateTodolistListAT = ReturnType<typeof CreateTodolistAC>


export type ChangeTodolistListFilterAt = ReturnType<typeof changeTodolistFilterAC>

export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>

export type ActionType = DeleteTodolistAT | CreateTodolistListAT | ChangeTodolistListFilterAt | ChangeTodolistTitleAT


export const todolistsReducer =
    (todolists: Array<todolistsType> = initialState, action: ActionType): Array<todolistsType> => {
        switch (action.type) {
            case "delete_todolist":
            {
                const { id } = action.payload
                return todolists.filter(tl => tl.id !== id)
            }

            case "create_todolist":
            {
                const newTodolistId=v1()
                const {title} = action.payload
                return [...todolists, {id: newTodolistId, title: title, filter: 'all'}]
            }

            case "change_todolist_title":
            {
                const {id,title} = action.payload
                return todolists.map(t=>t.id ===id ?{...t,title}:t)
            }
            case "change_todolist_filter":{

                const {id,filter} = action.payload
                return todolists.map(t=>t.id ===id ?{...t,filter}:t)
            }


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


export  const changeTodolistTitleAC =({id,title}:{id: string, title:string})=>({
    type:"change_todolist_title",
    payload:{id,title}
} as const)

export  const changeTodolistFilterAC =({id,filter}:{id: string, filter:FilterValuesType})=>({
    type:"change_todolist_filter",
    payload:{id,filter}
} as const)
