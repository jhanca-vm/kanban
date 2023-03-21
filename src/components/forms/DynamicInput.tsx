import { forwardRef } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import Input from './Input'

interface Props extends UseFormRegisterReturn {
  error?: string
  handleClick: () => void
}

const DynamicInput = forwardRef<HTMLInputElement, Props>(
  ({ error, handleClick, ...props }, ref) => (
    <div className="mb-3 flex gap-x-4 last-of-type:mb-0">
      <Input {...props} error={error} ref={ref} />
      <button
        className={error ? 'text-[#ea5555]' : 'text-[#828fa3]'}
        type="button"
        onClick={handleClick}
      >
        <svg className="w-[0.9375rem] fill-current" viewBox="0 0 15 15">
          <g fillRule="evenodd">
            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
          </g>
        </svg>
      </button>
    </div>
  )
)

export default DynamicInput
