'use client'

import { Button, ErrorMessage } from "@/components/atoms"
import { TextLabel } from "@/components/molecules"
import { ITodoDto, SchemaTodoDto } from "@/entities"
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

  const [errors, setErrors] = useState({
    name: '',
    details: '',
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
    setErrors({ name: '', details: '' })
    const valid = SchemaTodoDto.safeParse(payload)
    if (valid.success) {
      if (valid.data.id) {
        await updateTodo({ id: valid.data.id, body: valid.data })
      } else {
        await addTodo(valid.data)
      }
      onReset()
    } else {
      const errs = valid.error.flatten().fieldErrors
      setErrors({
        name: errs.name ? errs.name[0] : '',
        details: errs.details ? errs.details[0] : ''
      })
    }
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
        <TextLabel title="Name" testId="inputName" id="name" type="text" value={payload.name} message={errors.name} onChange={(value) => setPayload({ ...payload, name: value })} />
        <TextLabel title="Details" testId="inputDetails" id="details" type="text" textarea value={payload.details} message={errors.details} onChange={(value) => setPayload({ ...payload, details: value })} />

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