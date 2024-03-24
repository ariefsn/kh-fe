export interface IResponse<T> {
  string: string
  data?: T
  error_message?: string
}