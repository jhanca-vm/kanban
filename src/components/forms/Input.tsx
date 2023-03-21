import { forwardRef } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface Props extends UseFormRegisterReturn {
  label?: string
  error?: string
  placeholder?: string
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...props }, ref) => (
    <label className="relative w-full">
      {label && (
        <span className="mb-2 block text-xs text-[#828fa3] dark:text-white">
          {label}
        </span>
      )}
      <input aria-invalid={Boolean(error)} type="text" {...props} ref={ref} />
      {error && (
        <span
          className={
            'absolute right-4 bottom-2.5 text-sm font-medium text-[#ea5555]'
          }
        >
          {error}
        </span>
      )}
    </label>
  )
)

export default Input
