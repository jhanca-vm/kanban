import { useState } from 'react'
import BoardList from './BoardList'
import HideIcon from './icons/Hide'
import Switch from './Switch'

export default function Sidebar() {
  const [style, setStyle] = useState<string | undefined>()

  return (
    <>
      <aside className={style}>
        <BoardList />
        <div>
          <Switch />
          <button
            className="sidebar--btn-hide"
            onClick={() => setStyle('md:-ml-[16.25rem] lg:-ml-[18.75rem]')}
          >
            <HideIcon />
            Hide Sidebar
          </button>
        </div>
      </aside>
      <button
        className={
          'fixed bottom-8 hidden h-12 w-14 rounded-r-full bg-[#635fc7] ' +
          'pl-[1.125rem] opacity-25 hover:opacity-100 md:block'
        }
        onClick={() => setStyle(undefined)}
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
