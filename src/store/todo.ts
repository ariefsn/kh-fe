import { IResponse, ITodo, ITodoDto } from "@/entities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi } from '@reduxjs/toolkit/query/react';
import { buildBaseQuery } from "./utils";

const initialState = {
  items: [] as ITodo[],
  skip: 0,
  limit: 10,
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoResults: (state, action: PayloadAction<typeof initialState>) => {
      state = { ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(todoApi.endpoints.getTodos.matchFulfilled, (state, action) => {
        state.items = action.payload.data ?? []
        state.skip = action.meta?.arg?.originalArgs?.skip ?? 0
        state.limit = action.meta?.arg?.originalArgs?.limit ?? 0
      })
  }
});

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: buildBaseQuery('todo'),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<IResponse<ITodo[]>, { skip?: number, limit?: number }>({
      query: ({ limit, skip }) => `?skip=${skip || 0}&limit=${limit || 10}`,
      providesTags: ['Todos']
    }),
    addTodo: builder.mutation<IResponse<ITodo[]>, ITodoDto>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Todos']
    }),
    updateTodo: builder.mutation<IResponse<ITodo[]>, { id: string, body: ITodoDto }>({
      query: ({ id, body }) => ({
        url: `${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Todos']
    }),
    deleteTodo: builder.mutation<IResponse<ITodo[]>, string>({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos']
    }),
  }),
})

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useLazyGetTodosQuery, useUpdateTodoMutation } = todoApi