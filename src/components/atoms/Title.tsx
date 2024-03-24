export interface ITitleProps {
  text: string
}

export const Title = ({ text }: ITitleProps) => {
  return (
    <p className="text-md font-bold">{text}</p>
  )
}