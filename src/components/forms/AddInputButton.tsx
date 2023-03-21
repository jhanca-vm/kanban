import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  handleClick: () => void
}

export default function AddInputButton({ children, handleClick }: Props) {
  return (
    <button
      className={
        'mb-6 mt-3 h-10 rounded-[1.25rem] bg-[#635fc7]/10 text-sm ' +
        'text-[#635fc7] dark:bg-white'
      }
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
