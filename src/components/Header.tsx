import useActiveBoard from '../hooks/useActiveBoard'
import BoardsModal from './BoardsModal'
import AddNewTask from './forms/AddNewTask'
import Settings from './Settings'

export default function Header() {
  const activeBoard = useActiveBoard()

  return (
    <header
      className={
        'flex h-16 justify-between bg-white px-4 dark:bg-[#2b2c37] ' +
        'md:h-[5.0625rem] md:border-b md:border-[#ececec] md:px-0 ' +
        'md:dark:border-[#3e3f4e] lg:h-[6.0625rem]'
      }
    >
      <div
        className={
          'flex items-center gap-x-4 md:w-[16.25rem] md:border-r ' +
          'md:border-[#e4ebfa] md:pl-6 md:dark:border-[#3e3f4e] ' +
          'lg:w-[18.75rem] lg:pb-1.5 lg:pl-8'
        }
      >
        <figure
          className={
            'flex md:ml-0.5 md:mb-4 md:items-center md:gap-x-4 md:self-end ' +
            'lg:mb-6'
          }
        >
          <img className="w-6" src="/logo.svg" alt="" width={24} height={25} />
          <figcaption className="mb-0.5 hidden text-3xl font-bold md:block">
            kanban
          </figcaption>
        </figure>
        <BoardsModal />
      </div>
      {activeBoard && (
        <div
          className={
            'py-4 md:flex md:flex-1 md:items-center md:justify-between md:px-6 ' +
            'lg:pt-5 lg:pb-7 lg:pr-8'
          }
        >
          <div className="hidden md:block">
            <h1 className="text-xl font-bold lg:text-2xl">
              {activeBoard.name}
            </h1>
          </div>
          <div className="flex items-center gap-x-4 md:gap-x-6">
            {activeBoard.columns.length > 0 && <AddNewTask />}
            <Settings />
          </div>
        </div>
      )}
    </header>
  )
}
