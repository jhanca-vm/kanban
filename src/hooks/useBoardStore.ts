import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Board } from '../types'

interface Store {
  boards: Board[]
  activeBoard?: Board
  addBoard: (board: Board) => void
  setActiveBoard: (name: string) => void
  updateBoard: (index: number, board: Board) => void
  deleteBoard: (name: string) => void
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
      updateBoard(index, board) {
        set(({ boards }) => {
          const newState = [...boards]

          newState.splice(index, 1, board)

          return { boards: newState, activeBoard: board }
        })
      },
      deleteBoard(name) {
        set(state => {
          const boards = state.boards.filter(board => board.name !== name)

          return { boards, activeBoard: boards[0] }
        })
      }
    }),
    { name: 'boards', partialize: ({ boards }) => ({ boards }) }
  )
)

export default useBoardStore
