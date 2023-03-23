export interface Task {
  title: string
  description: string
  status: string
  subtasks: Array<{
    title: string
    isCompleted: boolean
  }>
}

export interface Board {
  name: string
  columns: Array<{
    name: string
    tasks: Task[]
  }>
}

export interface BoardFormInputs {
  name: string
  columns: { name: string }[]
}

export interface TaskFormInputs {
  title: string
  description: string
  status: string
  subtasks: { title: string }[]
}

export type Theme = 'light' | 'dark'
