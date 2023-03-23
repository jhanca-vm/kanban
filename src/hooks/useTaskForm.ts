import type { UseFormGetValues } from 'react-hook-form'
import type { Board, TaskFormInputs } from '../types'
import validateExistence from '../utils/validateExistence'
import useActiveBoard from './useActiveBoard'
import useBoardStore from './useBoardStore'

export default function useTaskForm(
  getValues: UseFormGetValues<TaskFormInputs>
) {
  const activeBoard = useActiveBoard() as Board
  const addTask = useBoardStore(({ addTask }) => addTask)
  const updateBoard = useBoardStore(({ updateBoard }) => updateBoard)

  const validateTitle = (title: string) => {
    const { status } = getValues()
    const { tasks } = activeBoard.columns.find(({ name }) => name === status)!

    return validateExistence('title', title, tasks)
  }

  const validateEditedTitle = (title: string, editedTitle: string) => {
    const { status } = getValues()
    const { tasks } = activeBoard.columns.find(({ name }) => name === status)!

    return validateExistence(
      'title',
      editedTitle,
      tasks.filter(task => task.title !== title)
    )
  }

  const validateSubtask = (title: string) => {
    return validateExistence('title', title, getValues().subtasks, true)
  }

  const createTask = (task: TaskFormInputs) => {
    addTask(
      {
        title: task.title.trim(),
        description: task.description.trim(),
        status: task.status,
        subtasks: task.subtasks.map(({ title }) => ({
          title: title.trim(),
          isCompleted: false
        }))
      },
      activeBoard.name
    )
  }

  const saveChanges = (title: string, status: string, task: TaskFormInputs) => {
    const board = { ...activeBoard }
    const columnIndex = board.columns.findIndex(({ name }) => name === status)
    const taskIndex = board.columns[columnIndex].tasks.findIndex(task => {
      return task.title === title
    })
    const [prevState] = board.columns[columnIndex].tasks.splice(taskIndex, 1)
    const newState = {
      title: task.title.trim(),
      description: task.description.trim(),
      status: task.status,
      subtasks: task.subtasks.map(({ title }) => ({
        title,
        isCompleted:
          prevState?.subtasks.find(subtask => subtask.title === title)
            ?.isCompleted ?? false
      }))
    }

    if (status === task.status) {
      board.columns[columnIndex].tasks.splice(taskIndex, 0, newState)
    } else {
      const index = board.columns.findIndex(({ name }) => name === task.status)
      board.columns[index].tasks.push(newState)
    }

    updateBoard(board.name, board)
  }

  return {
    validateTitle,
    validateEditedTitle,
    validateSubtask,
    createTask,
    saveChanges
  }
}
