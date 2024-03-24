export interface ILabelProps {
  title: string
  id: string
}

export const Label = ({ id, title }: ILabelProps) => {
  return (
    <label htmlFor={id} className="mb-1 text-sm">{title}</label>
  )
}