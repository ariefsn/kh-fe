'use client'

import { Button, ErrorMessage } from "@/components/atoms"
import { TextLabel } from "@/components/molecules"
import { ITodoDto } from "@/entities"
import { AppState } from "@/store"
import { useAddTodoMutation, useUpdateTodoMutation } from "@/store/todo"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

interface ITodoFormProps {
  todo?: ITodoDto
  onChange?: (todo?: ITodoDto) => void
  onClear?: () => void
}

export const FormTodo = ({ todo, onChange, onClear }: ITodoFormProps) => {
  const authState = useSelector((state: AppState) => state.auth)

  const [payload, setPayload] = useState<ITodoDto>({
    name: '',
    details: '',
    done: false
  })

  const onReset = () => {
    setPayload({
      name: '',
      details: '',
      done: false
    })
    if (onClear) {
      onClear()
    }
  }

  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()

  const onSubmit = async () => {
    if (payload.id) {
      await updateTodo({ id: payload.id, body: payload })
    } else {
      await addTodo(payload)
    }
    onReset()
  }

  useEffect(() => {
    if (todo) {
      setPayload(todo)
    }
  }, [todo])

  return (
    <>
      <h3>{payload?.id ? 'Update' : 'Add'} Todo</h3>
      <div>
        <TextLabel title="Name" id="name" type="text" value={payload.name} onChange={(value) => setPayload({ ...payload, name: value })} />
        <TextLabel title="Details" id="details" type="text" textarea value={payload.details} onChange={(value) => setPayload({ ...payload, details: value })} />

        {authState.message && <ErrorMessage message={authState.message} />}

        <div className="my-3">
          <Button title={payload?.id ? 'Update' : 'Save'} onClick={onSubmit} />

          {
            payload.id && <span className="ml-4"><Button title="Cancel" onClick={onReset} /></span>
          }
        </div>
      </div>
    </>
  )
}