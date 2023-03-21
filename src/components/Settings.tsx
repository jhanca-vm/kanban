import { useRef } from 'react'
import { useEditBoardRef } from '../context/FormRefsContext'
import useActiveBoard from '../hooks/useActiveBoard'
import useBoardStore from '../hooks/useBoardStore'
import type { Board } from '../types'
import DeleteModal from './DeleteModal'

export default function Settings() {
  const editBoardRef = useEditBoardRef()
  const settingsRef = useRef<HTMLDialogElement>(null)
  const deleteRef = useRef<HTMLDialogElement>(null)
  const { name } = useActiveBoard() as Board
  const deleteBoard = useBoardStore(({ deleteBoard }) => deleteBoard)

  const showHideSettings = () => {
    settingsRef.current?.open
      ? settingsRef.current.close()
      : settingsRef.current?.show()
  }

  const onDelete = () => {
    deleteBoard(name)
    deleteRef.current?.close()
  }

  return (
    <>
      <div className="relative flex">
        <button onClick={showHideSettings}>
          <img
            className="w-1 md:w-[0.3125rem]"
            src="/icons/ellipsis.svg"
            alt="Settings"
            width={5}
            height={20}
          />
        </button>
        <dialog
          ref={settingsRef}
          className={
            'top-full left-auto mt-5 w-48 rounded-lg p-4 shadow-lg ' +
            'dark:bg-[#20212c] md:mt-6 lg:mt-9'
          }
        >
          <form
            method="dialog"
            className="grid gap-y-4 text-sm font-medium leading-6"
          >
            <button
              className="w-fit text-[#828fa3]"
              onClick={() => editBoardRef?.current?.showModal()}
            >
              Edit Board
            </button>
            <button
              className="w-fit text-[#ea5555]"
              onClick={() => deleteRef.current?.showModal()}
            >
              Delete Board
            </button>
          </form>
        </dialog>
      </div>
      <DeleteModal ref={deleteRef} item="board" handleClick={onDelete}>
        Are you sure you want to delete the ‘{name}’ board? This action will
        remove all columns and tasks and cannot be reversed.
      </DeleteModal>
    </>
  )
}
