import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { TextLabel } from '.'

describe('Molecules > TextLabel', () => {
  it('should render correctly', async () => {
    let value = ''
    render(<TextLabel title='My input' id='myInput' value={value} onChange={(v) => value = v} />)

    const el = screen.getByRole('textbox')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('border rounded-sm text-sm')

    fireEvent.change(el, { target: { value: 'test TextLabel' } })

    expect(value).toEqual('test TextLabel')
  })
})