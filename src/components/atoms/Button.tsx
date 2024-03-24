export interface IButtonProps {
  testId?: string
  title: string
  id?: string
  onClick?: () => void
}

export const Button = ({ id, title, onClick, testId }: IButtonProps) => {
  return (
    <button id={id} data-testid={testId} className="py-1 px-3 border rounded-md mb-1" onClick={onClick}>
      {title}
    </button>
  )
}