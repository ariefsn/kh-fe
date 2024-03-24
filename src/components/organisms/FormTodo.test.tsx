import { IResponse, ITodo } from '@/entities'
import { renderWithProviders } from '@/store/StoreProviderTest'
import '@testing-library/jest-dom'
import { act, fireEvent, screen } from '@testing-library/react'
import { delay, http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { FormTodo } from '.'

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
  http.get(appAddress + '/api/todox', async () => {
    delay(250)
    return HttpResponse.json<IResponse<ITodo[]>>({
      string: 'ok', data: mockData
    })
  }),
  http.post(appAddress + '/api/todo', async () => {
    delay(250)
    return HttpResponse.json<IResponse<ITodo[]>>({
      string: 'ok', data: mockData
    })
  }),
  http.delete(appAddress + '/api/todo/1', async () => {
    delay(250)
    return HttpResponse.json<IResponse<ITodo[]>>({
      string: 'ok', data: mockData
    })
  }),
  http.put(appAddress + '/api/todo/1', async () => {
    delay(250)
    return HttpResponse.json<IResponse<ITodo[]>>({
      string: 'ok', data: mockData
    })
  }),
]

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  })
  server.events.on('request:match', (req) => {
    console.log(`[${req.request.method}] ${req.request.url}`)
  })
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

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
})