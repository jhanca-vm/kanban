interface Task {
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

export type Theme = 'light' | 'dark'
