import { useRef } from 'react'
import { useEditTaskRef, useTaskRef } from '../../context/FormRefsContext'
import useTaskUpdater from '../../hooks/useTaskUpdater'
import showHideDialog from '../../utils/showHideDialog'
import DeleteModal from '../DeleteModal'

interface Props {
  status: string
  title: string
}

export default function Settings({ title, status }: Props) {
  const taskRef = useTaskRef()
  const editTaskRef = useEditTaskRef()
  const settingsRef = useRef<HTMLDialogElement>(null)
  const deleteRef = useRef<HTMLDialogElement>(null)
  const { deleteTask } = useTaskUpdater()

  const handleEdit = () => {
    taskRef?.current?.close()
    editTaskRef?.current?.showModal()
  }

  const onDelete = () => {
    deleteRef.current?.close()
    taskRef?.current?.close()
    deleteTask(status, title)
  }

  return (
    <>
      <div className="relative flex">
        <button onClick={() => showHideDialog(settingsRef)}>
          <img
            className="w-[0.3125rem]"
            src="/icons/ellipsis.svg"
            alt="Settings"
            width={5}
            height={20}
          />
        </button>
        <dialog
          ref={settingsRef}
          className={
            'top-full left-auto mt-4 w-48 rounded-lg p-4 shadow-lg ' +
            'dark:bg-[#20212c]'
          }
        >
          <form
            method="dialog"
            className="grid gap-y-4 text-sm font-medium leading-6"
          >
            <button className="w-fit text-[#828fa3]" onClick={handleEdit}>
              Edit Task
            </button>
            <button
              className="w-fit text-[#ea5555]"
              onClick={() => deleteRef.current?.showModal()}
            >
              Delete Task
            </button>
          </form>
        </dialog>
      </div>
      <DeleteModal ref={deleteRef} item="task" handleClick={onDelete}>
        Are you sure you want to delete the ‘{title}’ task and its subtasks?
        This action cannot be reversed.
      </DeleteModal>
    </>
  )
}
