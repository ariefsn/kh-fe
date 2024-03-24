'use client'

import { SubTitle, TextField, Title } from "@/components/atoms"
import { CardTodo } from "@/components/molecules"
import { FormTodo } from "@/components/organisms"
import { ITodo } from "@/entities"
import { AppState } from "@/store"
import { useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from "@/store/todo"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"

export const TodosView = () => {
  const [search, setSearch] = useState('')
  const [todo, setTodo] = useState<ITodo | undefined>()
  const { isError, isLoading, isSuccess } = useGetTodosQuery({ skip: 0, limit: 10 })
  const todos = useSelector((state: AppState) => state.todo.items)
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  const onUpdate = async (payload: ITodo) => {
    await updateTodo({ id: payload.id, body: { ...payload, done: !payload.done } })
  }

  const filtered = useMemo(() => {
    if (!search) return todos
    return todos.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
  }, [todos, search])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  if (isSuccess) {
    return <div className="grid grid-cols-12 grid-flow-row gap-12 p-8">
      <div className="col-span-3">
        <FormTodo todo={todo} onClear={() => setTodo(undefined)} />
      </div>
      <div className="col-span-9">
        {
          !filtered?.length && !search ? <SubTitle text="No data, create one!" /> : <>
            <Title text="Todos" />

            <div className="my-2">
              <TextField type={"text"} placeholder="Search" value={search} onChange={setSearch} />
            </div>

            {
              !filtered?.length && search && <SubTitle text="No results" />
            }

            <div className="grid grid-cols-12 grid-flow-row gap-4 py-8">
              {filtered!.map((e) => (
                <CardTodo
                  key={e.id}
                  todo={e}
                  onEdit={setTodo}
                  onUpdate={onUpdate}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          </>
        }
      </div>
    </div>
  }

  return null
}
