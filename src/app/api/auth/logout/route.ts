import { IResponse } from '@/entities'
import { cookies } from 'next/headers'

export const GET = async (req: Request) => {
  const res: IResponse<string> = {
    string: 'ok',
  }
  const token = cookies().get('token')?.value

  if (token) {
    // Remove cookie
    cookies().delete('token')

    res.data = 'logout success'
    return Response.json(res, { status: 200 })
  }

  res.error_message = 'logout failed. token not found'
  return Response.json(res, { status: 401 })
}