import { forwardRef, type ReactNode } from 'react'

interface Props {
  item: string
  children: ReactNode
  handleClick: () => void
}

const DeleteModal = forwardRef<HTMLDialogElement, Props>(
  ({ item, children, handleClick }, ref) => (
    <dialog
      ref={ref}
      className="max-w-[30rem] rounded-md p-6 sm:px-8 sm:pt-8 sm:pb-10"
    >
      <h2 className="text-lg font-bold leading-6 text-[#ea5555]">
        Delete this {item}?
      </h2>
      <p className="mt-5 text-sm font-medium leading-6 text-[#828fa3]">
        {children}
      </p>
      <form
        method="dialog"
        className="mt-6 grid gap-4 text-sm font-bold sm:grid-cols-2"
        onSubmit={console.log}
      >
        <button
          className={
            'h-10 rounded-[1.25rem] bg-[#ea5555] text-white hover:bg-[#ff9898]'
          }
          type="button"
          onClick={handleClick}
        >
          Delete
        </button>
        <button
          className={
            'h-10 rounded-[1.25rem] bg-[#635fc7] bg-opacity-10 text-[#635fc7] ' +
            'hover:bg-opacity-25 dark:bg-white'
          }
        >
          Cancel
        </button>
      </form>
    </dialog>
  )
)

export default DeleteModal
