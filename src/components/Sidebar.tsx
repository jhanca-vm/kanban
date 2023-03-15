import { useState } from 'react'
import BoardList from './BoardList'
import HideIcon from './icons/Hide'
import Switch from './Switch'

export default function Sidebar() {
  const [style, setStyle] = useState('')

  return (
    <>
      <aside
        className={
          'z-10 -mt-px hidden flex-col justify-between border-r ' +
          'border-[#e4ebfa] bg-white transition-[margin] duration-300 ' +
          'dark:border-[#3e3f4e] dark:bg-[#2b2c37] md:flex ' +
          'md:h-[calc(100vh_-_5rem)] md:w-[16.25rem] ' +
          `lg:h-[calc(100vh_-_6.0625rem_+_1px)] lg:w-[18.75rem]${style}`
        }
      >
        <BoardList />
        <div>
          <Switch />
          <button
            className="mb-8 flex h-12 w-[calc(100%_-_1.25rem)] items-center
              gap-x-3 rounded-r-full pl-6 text-2sm font-bold text-[#828fa3]
              hover:bg-[#635fc7]/10 hover:text-[#635fc7] dark:hover:bg-white
              lg:w-[calc(100%_-_1.5rem)] lg:gap-x-4 lg:pl-8"
            onClick={() => setStyle(' md:-ml-[16.25rem] lg:-ml-[18.75rem]')}
          >
            <HideIcon />
            Hide Sidebar
          </button>
        </div>
      </aside>
      <button
        className="fixed bottom-8 hidden h-12 w-14 rounded-r-full bg-[#635fc7]
          pl-[1.125rem] hover:bg-[#a8a4ff] md:block"
        onClick={() => setStyle('')}
      >
        <img
          className="w-4"
          src="/icons/show.svg"
          alt="Show sidebar"
          width={16}
          height={11}
        />
      </button>
    </>
  )
}
