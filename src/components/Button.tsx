type Props = {
    title?: string
    onClick?: () => void
}

export const Button = ({ title }: Props) => {
    return <button >{title}</button>
}