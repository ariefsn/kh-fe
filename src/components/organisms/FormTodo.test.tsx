import { renderWithProviders } from '@/store/StoreProviderTest'
import '@testing-library/jest-dom'
import { act, fireEvent, screen } from '@testing-library/react'
import { FormTodo } from '.'

describe('Organisms > FormTodo', () => {
  it('should render correctly', async () => {
    await act(async () => renderWithProviders(<FormTodo />))

    const els = screen.getAllByRole('textbox')
    expect(els).toHaveLength(2)
    els.forEach(el => {
      expect(el).toBeInTheDocument()
      fireEvent.change(el, { target: { value: 'new val' } })
    })

    const elBtn = screen.getByRole('button')
    act(() => fireEvent.click(elBtn))
  })

  it('should render the error message', async () => {
    await act(async () => renderWithProviders(<FormTodo />))

    const el = screen.getByTestId('inputName')
    expect(el).toBeInTheDocument()
    fireEvent.change(el, { target: { value: 'test' } })

    const elBtn = screen.getByRole('button')
    expect(elBtn).toBeInTheDocument()

    elBtn.click()
  })

  it('should render valid form when submit', async () => {
    await act(async () => renderWithProviders(<FormTodo onClear={() => { }} />))

    const elInputName = screen.getByTestId('inputName')
    expect(elInputName).toBeInTheDocument()
    act(() => fireEvent.change(elInputName, { target: { value: 'this is valid name' } }))

    const elInputDetails = screen.getByTestId('inputDetails')
    expect(elInputDetails).toBeInTheDocument()
    act(() => fireEvent.change(elInputDetails, { target: { value: 'this is valid details' } }))

    const elBtn = screen.getByRole('button')
    expect(elBtn).toBeInTheDocument()

    elBtn.click()
  })
})