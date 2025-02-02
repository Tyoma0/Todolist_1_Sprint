type Props = {
    title: string
    onClick: () => void
}


export const Button = (props: Props) => {
    const onClickButtonHandler = () => {
        props.onClick()
    }
    return <button onClick={onClickButtonHandler}>{props.title}</button>
}