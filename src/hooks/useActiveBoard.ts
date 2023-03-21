import type { Board } from '../types'
import useBoardStore from './useBoardStore'

export default function useActiveBoard(): Board | undefined {
  const boards = useBoardStore(({ boards }) => boards)
  const activeBoard =
    useBoardStore(({ activeBoard }) => activeBoard) || boards[0]

  return activeBoard
}
