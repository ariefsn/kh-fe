import { ILabelProps, ITextFieldProps, Label, TextField } from "../atoms";

export type ITextLabelProps = ILabelProps & ITextFieldProps

export const TextLabel = (props: ITextLabelProps) => {
  return (
    <div className="flex flex-col my-2">
      <Label {...props} />
      <TextField {...props} />
    </div>
  )
}