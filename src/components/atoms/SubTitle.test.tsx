import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { SubTitle } from '.'

describe('Atoms > SubTitle', () => {
  it('should render correctly', async () => {
    const text = 'Hey this is a SubTitle'
    render(<SubTitle text={text} />)

    const p = screen.getByText(text)
    expect(p).toBeInTheDocument()
    expect(p).toHaveTextContent(text)
    expect(p).toHaveClass('text-sm')
  })
})