import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const getCookie = (name: string) => {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1];

  return cookieValue
}

export const buildBaseQuery = (path: string) => fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_APP_ADDRESS}/api/${path}`, prepareHeaders: (headers) => {
    const token = getCookie('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  }
})