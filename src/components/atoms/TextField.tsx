'use client'

import { useEffect, useState } from "react"

export interface ITextFieldProps {
  type?: 'text' | 'number' | 'password'
  placeholder?: string
  value?: string | number
  textarea?: boolean
  onChange?: (value: string) => void
}

export const TextField = ({ type, placeholder, value, onChange, textarea }: ITextFieldProps) => {
  const [localVal, setLocalVal] = useState(value || '')

  useEffect(() => {
    setLocalVal(localVal || '')
    if (onChange) {
      onChange((localVal || '').toString())
    }
  }, [localVal])

  useEffect(() => {
    setLocalVal(value || '')
  }, [value])

  return (
    textarea ? <textarea
      placeholder={placeholder}
      className="py-2 px-2 border rounded-sm text-sm text-gray-700 focus:bg-green-100"
      value={localVal}
      onChange={(e) => setLocalVal(e.target.value)}>
    </textarea> :
      <input
        type={type || 'text'}
        placeholder={placeholder}
        className="py-2 px-2 border rounded-sm text-sm text-gray-700 focus:bg-green-100"
        value={localVal}
        onChange={(e) => setLocalVal(e.target.value)}>
      </input>
  )
}