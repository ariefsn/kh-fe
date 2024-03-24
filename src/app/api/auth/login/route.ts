import { ILoginDto, IResponse } from '@/entities'
import { cookies } from 'next/headers'

export const POST = async (req: Request) => {
  const body: ILoginDto = await req.json()

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(body.username + ':' + body.password)
    },
  })
  const loginRes = await response.json() as IResponse<string>
  if (loginRes.data) {
    // Set cookie
    cookies().set('token', loginRes.data, { path: '/', maxAge: 60 * 60 * 24 })
  }

  return Response.json(loginRes, { status: 200 })
}