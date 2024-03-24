export interface ITodo {
  id: string
  name: string
  details: string
  done: boolean
  created_at: string
}

export interface ITodoDto {
  id?: string
  name: string
  details: string
  done: boolean
}