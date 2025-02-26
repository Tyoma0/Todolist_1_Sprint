import {Button} from "./Button.tsx";
import {KeyboardEvent, useState} from "react";


type Props = {

    addItem: (title: string) => void

};
export const AddItemForm = ({addItem}: Props) => {

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
            <input
                value={itemTitle}
                placeholder="max title length is 15 charters"
                onChange={(e) => {
                    error && setError(false)
                    setItemTitle(e.currentTarget.value)
                }}
                onKeyDown={createItemOnKeyDownHandler}
                className={error ? "taskInputError" : ''}
            />
            <Button
                title="+"
                isDisabled={!itemTitle || itemTitle.length > 15}
                onClickHandler={createItemOnClickHandler}
            />
            {itemTitle && itemTitle.length <= 15 && <div>max title length is 15 charters</div>}
            {itemTitle.length > 15 && <div style={{color: "red"}}>title is too long</div>}
            {error && <div style={{color: "red"}}>title is required</div>}


        </div>
    );
};

