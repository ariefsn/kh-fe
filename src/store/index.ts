import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { authSlice } from './auth'
import { todoApi, todoSlice } from "./todo"

export const makeStore = () => {
  return configureStore({
    reducer: {
      [todoApi.reducerPath]: todoApi.reducer,
      [authSlice.name]: authSlice.reducer,
      [todoSlice.name]: todoSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware)
  })
}

export const actions = {
  auth: authSlice.actions
}

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, AppState, unknown, Action>