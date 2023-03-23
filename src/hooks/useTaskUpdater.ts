import type { ChangeEvent } from 'react'
import type { Board } from '../types'
import useActiveBoard from './useActiveBoard'
import useBoardStore from './useBoardStore'

export default function useTaskUpdater() {
  const activeBoard = useActiveBoard() as Board
  const updateBoard = useBoardStore(({ updateBoard }) => updateBoard)

  const getColumnIndex = (status: string) => {
    return activeBoard.columns.findIndex(({ name }) => name === status)
  }

  const toggleSubtask = (
    status: string,
    task: string,
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const board = { ...activeBoard }
    const columnIndex = getColumnIndex(status)
    const taskIndex = board.columns[columnIndex].tasks.findIndex(
      ({ title }) => title === task
    )

    board.columns[columnIndex].tasks[taskIndex].subtasks[index].isCompleted =
      event.target.checked

    updateBoard(activeBoard.name, board)
  }

  const setCurrentStatus = (
    title: string,
    prevStatus: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const status = event.target.value
    const board = { ...activeBoard }
    const columnIndex = getColumnIndex(status)
    const prevColumnIndex = board.columns.findIndex(({ name }) => {
      return name === prevStatus
    })
    const taskIndex = board.columns[prevColumnIndex].tasks.findIndex(
      task => task.title === title
    )
    const [task] = board.columns[prevColumnIndex].tasks.splice(taskIndex, 1)

    task.status = status

    board.columns[columnIndex].tasks.push(task)

    updateBoard(activeBoard.name, board)
  }

  const deleteTask = (status: string, title: string) => {
    const board = { ...activeBoard }
    const columnIndex = getColumnIndex(status)

    board.columns[columnIndex].tasks = board.columns[columnIndex].tasks.filter(
      task => task.title !== title
    )

    updateBoard(activeBoard.name, board)
  }

  return { setCurrentStatus, toggleSubtask, deleteTask }
}
