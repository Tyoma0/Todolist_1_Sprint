
import {KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'


type Props = {

    addItem: (title: string) => void
maxTitleLength: number

};
export const AddItemForm = ({addItem,maxTitleLength}: Props) => {

    const [itemTitle, setItemTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const createItemOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && itemTitle && itemTitle.length <= 15) {
            createItemOnClickHandler()
        }
    }
    const createItemOnClickHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setItemTitle("")
    }


    return (
        <div>


            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       value={itemTitle}
                       size={'small'}
                       error={error}
                       helperText={error && 'Title is required'}
                       onChange={(e) => {
                           error && setError(false)
                           setItemTitle(e.currentTarget.value)
                       }}
                       onKeyDown={createItemOnKeyDownHandler}/>

            <IconButton disabled={!itemTitle || itemTitle.length > 15} onClick={createItemOnClickHandler} color={'primary'}>
                <AddBoxIcon />
            </IconButton>
            {itemTitle && itemTitle.length <= maxTitleLength && <div>{`max title length is ${maxTitleLength} charters`}</div>}
            {itemTitle.length > maxTitleLength && <div style={{color: "red"}}>title is too long</div>}



        </div>
    );
};

