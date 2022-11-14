export interface Todo {
  name: string,
  description: string[],
  _id: string,
  created_date: string,
  status: 'todo' | 'progress' | 'done' | 'deleted'
}

export interface TodoResponse {
  todo: Todo[],
}
