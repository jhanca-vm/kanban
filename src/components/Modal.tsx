import type { ReactNode } from 'react'
import { forwardRef } from 'react'

interface Props {
  title: string
  children: ReactNode
  handleClose?: () => void
}

const Modal = forwardRef<HTMLDialogElement, Props>(
  ({ title, children, handleClose }, ref) => (
    <dialog
      ref={ref}
      className={
        'mx-4 w-auto max-w-none rounded-md p-6 font-bold sm:mx-auto ' +
        'sm:max-w-[30rem] sm:p-8'
      }
      onClose={handleClose}
    >
      <h2 className="text-lg">{title}</h2>
      {children}
    </dialog>
  )
)

export default Modal
