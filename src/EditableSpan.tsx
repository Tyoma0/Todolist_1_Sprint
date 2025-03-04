import {ChangeEvent, useState} from "react";

type props ={
    value:string
    changeTitle: ( title: string) => void
}
export const EditableSpan = ({value,changeTitle}:props) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [title, setTitle] = useState(value)
    const turnOnEditMode = () => {
        setIsEditMode(true)
    }
    const turnOffEditMode = () => {
        setIsEditMode(false)
        changeTitle(title)

    }
    const changeTitleStatus = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    return (
        <>
            {isEditMode ? (
                <input onBlur={turnOffEditMode} value={title} onChange={changeTitleStatus} autoFocus />
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    );
};

