import { IResponse } from '@/entities'
import { renderWithProviders } from '@/store/StoreProviderTest'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { delay, http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { FormLogin } from '.'

const appAddress = process.env.NEXT_PUBLIC_APP_ADDRESS

const handlers = [
  http.get(appAddress + '/api/auth/login', async () => {
    delay(250)
    return HttpResponse.json<IResponse<string>>({ string: 'ok', data: 'test' })
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Organisms > FormLogin', () => {
  it('should render correctly', async () => {
    renderWithProviders(<FormLogin />)

    const el = screen.getByRole('textbox')
    expect(el).toBeInTheDocument()

    const elBtn = screen.getByRole('button')
    expect(elBtn).toBeInTheDocument()

    elBtn.click()
  })
})