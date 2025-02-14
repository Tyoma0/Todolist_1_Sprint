type Props = {
    title: string
    onClick: () => void
}


export const Button = ({title,onClick}: Props) => {
    const onClickButtonHandler = () => {
        onClick()
    }
    return <button onClick={onClickButtonHandler}>{title}</button>
}