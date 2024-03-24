import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Label } from '.'

describe('Atoms > Label', () => {
  it('should render correctly', async () => {
    const text = 'Hey this is a label title'
    render(<Label title={text} id='idLabel' />)

    const p = screen.getByText(text)
    expect(p).toBeInTheDocument()
    expect(p).toHaveTextContent(text)
    expect(p).toHaveAttribute('for', 'idLabel')
  })
})