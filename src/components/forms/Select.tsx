import { forwardRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import useActiveBoard from '../../hooks/useActiveBoard'

interface Props extends UseFormRegisterReturn {
  label: string
}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, ...props }, ref) => {
    const { columns } = useActiveBoard()!

    return (
      <label className="mb-6 grid">
        <span className="mb-2 text-xs font-bold text-[#828fa3] dark:text-white">
          {label}
        </span>
        <select className="dark:focus:bg-[#20212c]" {...props} ref={ref}>
          {columns.map(({ name }) => (
            <option className="text-sm font-medium text-[#828fa3]" key={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
    )
  }
)

export default Select
