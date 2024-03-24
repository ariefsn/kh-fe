import { ILoginDto, IResponse } from "@/entities";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const authLogin = createAsyncThunk<IResponse<string>, ILoginDto>('auth/login', async ({ username, password }) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  const json = await response.json() as IResponse<string>
  return json
})

const initialState = {
  token: '',
  message: ''
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    reset: (state) => {
      state.message = ''
      state.token = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.message = action.payload.error_message ?? ''

      if (action.payload.data) {
        state.token = action.payload.data
      }
    })
  }
});
