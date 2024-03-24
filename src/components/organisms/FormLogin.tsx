'use client'

import { Button, ErrorMessage } from "@/components/atoms"
import { TextLabel } from "@/components/molecules"
import { ILoginDto } from "@/entities"
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

  const dispatch = useDispatch<AppDispatch>()

  const onLogin = async () => {
    await dispatch(actions.auth.reset())
    await dispatch(authLogin(payload))
  }

  useEffect(() => {
    if (authState.token) {
      location.reload()
    }
  }, [authState.token])

  return (
    <>
      <div>
        <TextLabel title="Username" id="username" type="text" value={payload.username} onChange={(value) => setPayload({ ...payload, username: value })} />
        <TextLabel title="Password" id="password" type="password" value={payload.password} onChange={(value) => setPayload({ ...payload, password: value })} />

        {authState.message && <ErrorMessage message={authState.message} />}

        <div className="my-3">
          <Button title="Login" onClick={onLogin} />
        </div>
      </div>
    </>
  )
}