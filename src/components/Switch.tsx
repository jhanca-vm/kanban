import { ChangeEvent } from 'react'
import useThemeStore from '../hooks/useThemeStore'

export default function Switch() {
  const theme = useThemeStore(({ theme }) => theme)
  const setTheme = useThemeStore(({ setTheme }) => setTheme)

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    target.checked ? setTheme('dark') : setTheme('light')
  }

  return (
    <div
      className={
        'mx-4 mt-4 flex h-12 items-center justify-center gap-x-6 rounded-md ' +
        'bg-[#f4f7fd] dark:bg-[#20212c] md:mx-3 md:mb-2.5 lg:mx-6 lg:mb-2'
      }
    >
      <label htmlFor="theme">
        <img
          className="w-[1.125rem]"
          src="/icons/light.svg"
          alt="Light mode"
          width={19}
          height={19}
        />
      </label>
      <label
        className={
          'h-5 w-10 cursor-pointer items-center rounded-xl bg-[#635fc7] ' +
          'p-[0.1875rem] hover:bg-[#a8a4ff]'
        }
        htmlFor="theme"
      >
        <span
          className={`block h-3.5 w-3.5 rounded-full duration-200 bg-white${
            theme === 'dark' ? ' translate-x-5' : ''
          }`}
        />
      </label>
      <input
        className="hidden"
        id="theme"
        type="checkbox"
        defaultChecked={theme === 'dark'}
        onChange={handleChange}
      />
      <label htmlFor="theme">
        <img
          className="w-[0.9375rem]"
          src="/icons/dark.svg"
          alt="Dark mode"
          width={16}
          height={16}
        />
      </label>
    </div>
  )
}
