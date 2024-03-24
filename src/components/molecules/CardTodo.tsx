import { ITodo } from "@/entities"
import { Button, SubTitle, Title } from "../atoms"

export interface ICardTodoProps {
  todo: ITodo
  onUpdate: (todo: ITodo) => void
  onDelete: (id: string) => void
  onEdit: (todo: ITodo) => void
}

export const CardTodo = ({ todo, onDelete, onEdit, onUpdate }: ICardTodoProps) => {
  return <div key={todo.name} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 border border-white p-2 rounded-md cursor-pointer">
    <Title text={todo.name} />
    <SubTitle text={todo.details} />
    <div className="mt-2">
      <Button title="Edit" onClick={() => { onEdit(todo) }} />
      <div className="px-1 inline-block"></div>
      <Button title={todo.done ? 'Undo' : 'Done'} onClick={() => { onUpdate(todo) }} />
      <div className="px-1 inline-block"></div>
      {todo.done && <Button title="Delete" onClick={() => { onDelete(todo.id) }} />}
    </div>
  </div>
}