'use client'

import { Button, ErrorMessage } from "@/components/atoms"
import { TextLabel } from "@/components/molecules"
import { ILoginDto, SchemaLoginDto } from "@/entities"
import { actions, AppDispatch, AppState } from "@/store"
import { authLogin } from "@/store/auth"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const FormLogin = () => {
  const authState = useSelector((state: AppState) => state.auth)

  const [payload, setPayload] = useState<ILoginDto>({
    username: '',
    password: ''
  })

  const [errors, setErrors] = useState<ILoginDto>({
    username: '',
    password: ''
  })

  const dispatch = useDispatch<AppDispatch>()

  const onLogin = async () => {
    setErrors({ password: '', username: '' })
    const valid = SchemaLoginDto.safeParse(payload)
    if (valid.success) {
      dispatch(actions.auth.reset())
      dispatch(authLogin(valid.data))
    } else {
      const errs = valid.error.flatten().fieldErrors
      setErrors({
        username: errs.username ? errs.username[0] : '',
        password: errs.password ? errs.password[0] : ''
      })
    }
  }

  useEffect(() => {
    if (authState.token) {
      location.reload()
    }
  }, [authState.token])

  return (
    <>
      <div>
        <TextLabel title="Username" testId="inputUsername" id="username" type="text" value={payload.username} message={errors.username} onChange={(value) => setPayload({ ...payload, username: value })} />
        <TextLabel title="Password" testId="inputPassword" id="password" type="password" value={payload.password} message={errors.password} onChange={(value) => setPayload({ ...payload, password: value })} />

        {authState.message && <ErrorMessage message={authState.message} />}

        <div className="my-3">
          <Button title="Login" onClick={onLogin} />
        </div>
      </div>
    </>
  )
}