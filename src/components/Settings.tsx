import { useCallback, useRef } from 'react'

export default function Settings() {
  const dialog = useRef<HTMLDialogElement>(null)
  const showHideDialog = useCallback(() => {
    dialog.current?.open ? dialog.current.close() : dialog.current?.show()
  }, [])

  return (
    <div className="relative flex">
      <button onClick={showHideDialog}>
        <img
          className="w-1 md:w-[0.3125rem]"
          src="/icons/ellipsis.svg"
          alt="Settings"
          width={5}
          height={20}
        />
      </button>
      <dialog
        ref={dialog}
        className={
          'top-full left-auto mt-5 w-48 rounded-lg p-4 shadow-lg ' +
          'dark:bg-[#20212c] md:mt-6 lg:mt-9'
        }
      >
        <form
          className="grid gap-y-4 text-sm font-medium leading-6"
          method="dialog"
        >
          <button className="w-fit text-[#828fa3]">Edit Board</button>
          <button className="w-fit text-[#ea5555]">Delete Board</button>
        </form>
      </dialog>
    </div>
  )
}
