import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { CardTodo } from '.'

describe('Molecules > CardTodo', () => {
  it('should render correctly', async () => {
    let value = ''
    const todo = {
      id: '1',
      name: 'My todo',
      details: 'My details',
      done: false,
      created_at: new Date().toISOString()
    }
    render(<CardTodo todo={todo} onUpdate={() => value = 'test CardTodo'} onDelete={() => value = 'test CardTodo'} onEdit={() => value = 'test CardTodo'} />)

    const elTitle = screen.getByText(todo.name)
    expect(elTitle).toBeInTheDocument()

    const elSubTitle = screen.getByText(todo.details)
    expect(elSubTitle).toBeInTheDocument()

    const elButtons = screen.getAllByRole('button')
    expect(elButtons.length).toBe(2)
    elButtons.forEach(e => {
      expect(e).toBeInTheDocument()
    })
  })

  it('should render correctly with delete button', async () => {
    let value = ''
    const todo = {
      id: '1',
      name: 'My todo',
      details: 'My details',
      done: true,
      created_at: new Date().toISOString()
    }
    render(<CardTodo todo={todo} onUpdate={() => value = 'test CardTodo'} onDelete={() => value = 'test CardTodo'} onEdit={() => value = 'test CardTodo'} />)

    const elTitle = screen.getByText(todo.name)
    expect(elTitle).toBeInTheDocument()

    const elSubTitle = screen.getByText(todo.details)
    expect(elSubTitle).toBeInTheDocument()

    const elButtons = screen.getAllByRole('button')
    expect(elButtons.length).toBe(3)
    elButtons.forEach(e => {
      expect(e).toBeInTheDocument()
      e.click()
    })
  })

})