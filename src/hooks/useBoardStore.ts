import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Board, Task } from '../types'

interface Store {
  boards: Board[]
  activeBoard?: Board
  addBoard: (board: Board) => void
  setActiveBoard: (name: string) => void
  updateBoard: (name: string, board: Board) => void
  deleteBoard: (name: string) => void
  addTask: (task: Task, boardName: string) => void
}

const useBoardStore = create<Store>()(
  persist(
    set => ({
      boards: [],
      addBoard(board) {
        set(({ boards }) => ({
          boards: boards.concat(board),
          activeBoard: board
        }))
      },
      setActiveBoard(name) {
        set(({ boards }) => ({
          activeBoard: boards.find(board => board.name === name)
        }))
      },
      updateBoard(name, board) {
        set(({ boards }) => {
          const index = boards.findIndex(board => board.name === name)
          const newState = [...boards]

          newState[index] = board

          return { boards: newState, activeBoard: board }
        })
      },
      deleteBoard(name) {
        set(state => {
          const boards = state.boards.filter(board => board.name !== name)

          return { boards, activeBoard: boards[0] }
        })
      },
      addTask(task, boardName) {
        set(state => {
          const boards = [...state.boards]
          const boardIndex = boards.findIndex(({ name }) => name === boardName)
          const columnIndex = boards[boardIndex].columns.findIndex(
            ({ name }) => name === task.status
          )

          boards[boardIndex].columns[columnIndex].tasks.push(task)

          return { boards }
        })
      }
    }),
    { name: 'boards', partialize: ({ boards }) => ({ boards }) }
  )
)

export default useBoardStore
