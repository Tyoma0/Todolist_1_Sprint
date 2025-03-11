
import {FilterValuesType} from "./App"
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import {containerSx, getListItemSx} from './TodolistItem.styles'

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
        : <List>
            {tasks.map((task: TaskType) => {
                const deleteTaskHandler = () => deleteTask(todolistID, task.id)
                const changeTitleCallback=(title:string) => {
                    changeTaskTitle(todolistID,task.id,title)
                }
                return (
                <ListItem key={task.id}
                          sx={getListItemSx(task.isDone)}>
                    <div>
                        <Checkbox checked={task.isDone} onChange={(e) => changeTaskStatus(todolistID, task.id, e.currentTarget.checked)} />
                        <EditableSpan value={task.title} changeTitle={changeTitleCallback} />
                    </div>
                    <IconButton onClick={deleteTaskHandler}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
                )
            })}
        </List>



    const createTaskHandler=(title: string)=>{
        createTask(todolistID,title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolistID, title)
    }
    return (
        <div>

            <h3><EditableSpan value={title}  changeTitle={changeTodolistTitleHandler} />

                <IconButton onClick={()=>deleteTodolist(todolistID)}>
                    <DeleteIcon />
                </IconButton>
            </h3>

            <AddItemForm maxTitleLength={20}  addItem={createTaskHandler}/>
            {tasksList}
            <Box sx={containerSx}>


                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeTodolistFilter(todolistID, "all")}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeTodolistFilter(todolistID, "active")}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeTodolistFilter(todolistID, "completed")}>
                    Completed
                </Button>
            </Box>
        </div>
    )
}