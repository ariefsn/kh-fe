import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Title } from '.'

describe('Atom > Typography > Title', () => {
  it('should render correctly', async () => {
    const text = 'Hey this is a Title'
    render(<Title text={text} />)

    const p = screen.getByText(text)
    expect(p).toBeInTheDocument()
    expect(p).toHaveTextContent(text)
    expect(p).toHaveClass('text-md font-bold')
  })
})