import { useRef } from 'react'
import useActiveBoard from '../hooks/useActiveBoard'
import BoardList from './BoardList'
import Switch from './Switch'

export default function BoardsModal() {
  const activeBoard = useActiveBoard()
  const dialogRef = useRef<HTMLDialogElement>(null)

  if (!activeBoard) return null

  return (
    <div className="md:hidden">
      <button
        className="flex items-center gap-x-2 text-lg font-bold"
        onClick={() => dialogRef.current?.showModal()}
      >
        {activeBoard.name}
        <img
          className="w-2.5"
          src="/icons/chevron.svg"
          alt=""
          width={10}
          height={7}
        />
      </button>
      <dialog
        ref={dialogRef}
        className="w-[16.5rem] rounded-lg px-0 py-4 shadow-lg"
      >
        <BoardList />
        <Switch />
      </dialog>
    </div>
  )
}
