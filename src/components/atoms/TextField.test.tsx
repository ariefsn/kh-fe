import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { TextField } from '.'

describe('Atoms > TextField', () => {
  it('should render correctly', async () => {
    let value = ''
    render(<TextField value={value} onChange={(v) => value = v} />)

    const el = screen.getByRole('textbox')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('border rounded-sm text-sm')

    fireEvent.change(el, { target: { value: 'test TextField' } })

    expect(value).toEqual('test TextField')
  })

  it('should render correctly with textarea mode', async () => {
    let value = ''
    render(<TextField type='text' value={value} onChange={(v) => value = v} textarea />)

    const el = screen.getByRole('textbox')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('border rounded-sm text-sm')

    fireEvent.change(el, { target: { value: 'test TextField' } })

    expect(value).toEqual('test TextField')
  })
})