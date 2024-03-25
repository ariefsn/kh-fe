import { renderWithProviders } from '@/store/StoreProviderTest'
import '@/store/todo'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'
import { TodosView } from '.'

describe('Templates > TodoView', () => {
  it('should render loading', async () => {
    const instance = renderWithProviders(<TodosView />)
    waitFor(() => expect(instance).toBeTruthy())

    const el = screen.getByText('Loading...')
    expect(el).toBeInTheDocument()
  })

  it('should render error', async () => {
    const instance = renderWithProviders(<TodosView />)
    waitFor(() => expect(instance).toBeTruthy())

    const el = await screen.findByText('Error')
    expect(el).toBeInTheDocument()
  })

  it('should have the button logout', async () => {
    const instance = renderWithProviders(<TodosView />)
    waitFor(() => expect(instance).toBeTruthy())

    const el = await screen.findByTestId('btnLogout')
    expect(el).toBeInTheDocument()
  })

})