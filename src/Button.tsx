
type Props = {
    title: string
    onClickHandler?: () => void
    isDisabled?: boolean
    className?: string
}


export const Button = ({ title, onClickHandler,isDisabled,className  }: Props) => {
    return (
        <button className={className} disabled={isDisabled} onClick={onClickHandler}>{title}</button>
    )
}