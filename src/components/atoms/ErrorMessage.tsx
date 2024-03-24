export interface IErrorMessageProps {
  message: string
}

export const ErrorMessage = ({ message }: IErrorMessageProps) => {
  return (
    <span className="text-red-500 text-sm">{message}</span>
  )
}