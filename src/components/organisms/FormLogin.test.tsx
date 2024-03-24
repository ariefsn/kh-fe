import { renderWithProviders } from '@/store/StoreProviderTest'
import '@testing-library/jest-dom'
import { act, fireEvent, screen } from '@testing-library/react'
import { FormLogin } from '.'

describe('Organisms > FormLogin', () => {
  it('should render correctly', async () => {
    renderWithProviders(<FormLogin />)

    const el = screen.getByRole('textbox')
    expect(el).toBeInTheDocument()

    const elBtn = screen.getByRole('button')
    expect(elBtn).toBeInTheDocument()

    elBtn.click()
  })

  it('should render the error message', async () => {
    renderWithProviders(<FormLogin />)

    const el = screen.getByRole('textbox')
    expect(el).toBeInTheDocument()
    fireEvent.change(el, { target: { value: 'test' } })

    const elBtn = screen.getByRole('button')
    expect(elBtn).toBeInTheDocument()

    elBtn.click()
  })

  it('should render valid form when submit', async () => {
    renderWithProviders(<FormLogin />)

    const elInputUsername = screen.getByTestId('inputUsername')
    expect(elInputUsername).toBeInTheDocument()
    act(() => fireEvent.change(elInputUsername, { target: { value: 'this is valid username' } }))

    const elInputPassword = screen.getByTestId('inputPassword')
    expect(elInputPassword).toBeInTheDocument()
    act(() => fireEvent.change(elInputPassword, { target: { value: 'this is valid password' } }))

    const elBtn = screen.getByRole('button')
    expect(elBtn).toBeInTheDocument()

    elBtn.click()
  })

})