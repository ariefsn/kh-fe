export interface IButtonProps {
  title: string
  id?: string
  onClick?: () => void
}

export const Button = ({ id, title, onClick }: IButtonProps) => {
  return (
    <button id={id} className="py-1 px-3 border rounded-md" onClick={onClick}>
      {title}
    </button>
  )
}