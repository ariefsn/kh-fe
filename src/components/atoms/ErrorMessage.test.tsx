import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ErrorMessage } from '.'

describe('Atoms > ErrorMessage', () => {
  it('should render correctly', async () => {
    const text = 'Unknown error'
    render(<ErrorMessage message={text} />)

    const p = screen.getByText(text)
    expect(p).toBeInTheDocument()
    expect(p).toHaveTextContent(text)
    expect(p).toHaveClass('text-red-500 text-sm')
  })
})