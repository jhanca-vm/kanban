import type { PropsWithChildren } from 'react'

export default function SubmitButton({ children }: PropsWithChildren) {
  return (
    <button
      className="h-10 rounded-[1.25rem] bg-[#635fc7] text-sm text-white"
      type="submit"
      autoFocus
    >
      {children}
    </button>
  )
}
