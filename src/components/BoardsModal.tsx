import { useRef } from 'react'

export default function BoardsModal() {
  const dialog = useRef<HTMLDialogElement>(null)

  return (
    <div className="md:hidden">
      <button
        className="flex items-center gap-x-2 text-lg font-bold"
        onClick={() => dialog.current?.showModal()}
      >
        Platform Launch
        <img
          className="w-2.5"
          src="/icons/chevron.svg"
          alt=""
          width={10}
          height={7}
        />
      </button>
      <dialog
        ref={dialog}
        className="w-[16.5rem] rounded-lg p-0 py-4 font-bold text-[#828fa3]
          shadow-lg"
      >
        <h2 className="ml-6 text-xs uppercase tracking-[0.2em]">All Boards</h2>
      </dialog>
    </div>
  )
}
