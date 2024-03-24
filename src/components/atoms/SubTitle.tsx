export interface ISubTitleProps {
  text: string
}

export const SubTitle = ({ text }: ISubTitleProps) => {
  return (
    <p className="text-sm mt-1">{text}</p>
  )
}