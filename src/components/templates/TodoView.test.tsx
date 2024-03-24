import { IResponse, ITodo } from '@/entities'
import { renderWithProviders } from '@/store/StoreProviderTest'
import '@/store/todo'
import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'
import { TodosView } from '.'

import { delay, http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const appAddress = process.env.NEXT_PUBLIC_APP_ADDRESS

const mockData: ITodo[] = [{
  id: '1',
  name: 'name 1',
  details: 'details 1',
  done: false,
  created_at: new Date().toISOString()
}, {
  id: '2',
  name: 'name 2',
  details: 'details 2',
  done: false,
  created_at: new Date().toISOString()
}]

const handlers = [
  http.get(appAddress + '/api/todo'.toString(), async () => {
    await delay(10)
    return HttpResponse.json<IResponse<ITodo[]>>({
      string: 'ok',
      data: mockData
    }, { status: 200 })
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

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
})