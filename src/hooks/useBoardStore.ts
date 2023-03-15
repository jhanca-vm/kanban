import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Board } from '../types'

interface Store {
  boards: Board[]
  activeBoard?: Board
  setActiveBoard: (name: string) => void
}

const useBoardStore = create<Store>()(
  persist(
    set => ({
      boards: [],
      setActiveBoard: name => {
        set(({ boards }) => ({
          activeBoard: boards.find(board => board.name === name)
        }))
      }
    }),
    { name: 'boards', partialize: ({ boards }) => ({ boards }) }
  )
)

export const useActiveBoard = (): Board | undefined => {
  const boards = useBoardStore(({ boards }) => boards)
  const activeBoard =
    useBoardStore(({ activeBoard }) => activeBoard) || boards[0]

  return activeBoard
}

export default useBoardStore
