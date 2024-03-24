import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Button } from '.'

describe('Atoms > Button', () => {
  it('should render correctly', async () => {
    const text = 'My button'
    let click = 0
    render(<Button title={text} onClick={() => click++} />)

    const el = screen.getByRole('button')
    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent(text)
    expect(el).toHaveClass('border rounded-md')

    el.click()
    el.click()

    expect(click).toBe(2)
  })
})