import { ErrorMessage, ILabelProps, ITextFieldProps, Label, TextField } from "../atoms";

export type ITextLabelProps = ILabelProps & ITextFieldProps & { message?: string }

export const TextLabel = (props: ITextLabelProps) => {
  return (
    <div className="flex flex-col my-2">
      <Label {...props} />
      <TextField {...props} />
      {props.message && <ErrorMessage message={props.message} />}
    </div>
  )
}