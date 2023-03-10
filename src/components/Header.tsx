import BoardsModal from './BoardsModal'
import Settings from './Settings'

export default function Header() {
  return (
    <header
      className="flex justify-between bg-white px-4 dark:bg-[#2b2c37]
        md:border-b md:border-[#e4ebfa] md:px-0 md:dark:border-[#3e3f4e]"
    >
      <div
        className="flex items-center gap-x-4 md:w-[16.25rem] md:border-r
          md:border-[#e4ebfa] md:pl-6 md:dark:border-[#3e3f4e] lg:w-[18.75rem]
          lg:pb-1.5 lg:pl-8"
      >
        <figure className="flex md:ml-0.5 md:items-center md:gap-x-4">
          <img className="w-6" src="/logo.svg" alt="" width={24} height={25} />
          <figcaption className="mb-0.5 hidden text-3xl font-bold md:block">
            kanban
          </figcaption>
        </figure>
        <BoardsModal />
      </div>
      <div
        className="py-4 md:flex md:flex-1 md:items-center md:justify-between
          md:px-6 lg:pt-5 lg:pb-7 lg:pr-8"
      >
        <h1 className="hidden text-xl font-bold md:block lg:text-2xl">
          Platform Launch
        </h1>
        <div className="flex items-center gap-x-4 md:gap-x-6">
          <button
            className="grid h-8 w-12 place-items-center rounded-3xl bg-[#635fc7]
              opacity-25 hover:opacity-100 md:h-12 md:w-[10.25rem]"
          >
            <img
              className="w-3 md:hidden"
              src="/icons/add.svg"
              alt="Add new task"
              width={12}
              height={12}
            />
            <span className="hidden text-2sm font-bold text-white sm:inline">
              + Add New Task
            </span>
          </button>
          <Settings />
        </div>
      </div>
    </header>
  )
}
