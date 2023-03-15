import useBoardStore, { useActiveBoard } from '../hooks/useBoardStore'
import BoardIcon from './icons/Board'

export default function BoardList() {
  const boards = useBoardStore(({ boards }) => boards)
  const activeBoard = useActiveBoard()
  const setActiveBoard = useBoardStore(({ setActiveBoard }) => setActiveBoard)

  function activeStyle(name: string) {
    return activeBoard?.name === name ? ' !bg-[#635fc7] !text-white' : ''
  }

  return (
    <div className="font-bold text-[#828fa3] md:my-8 lg:mt-4">
      <h2 className="ml-6 text-xs uppercase tracking-[0.2em] lg:ml-8">
        All Boards ({boards.length})
      </h2>
      <form className="mt-5 text-2sm" method="dialog">
        <ul>
          {boards.map(({ name }, index) => (
            <li className="mr-6 md:mr-5 lg:mr-6" key={`${name}-${index}`}>
              <button
                className={
                  'flex h-12 w-full items-center gap-x-3 rounded-r-full ' +
                  'px-6 hover:bg-[#635fc7]/10 hover:text-[#635fc7] ' +
                  `dark:hover:bg-white lg:gap-x-4 lg:px-8${activeStyle(name)}`
                }
                onClick={() => setActiveBoard(name)}
              >
                <BoardIcon /> {name}
              </button>
            </li>
          ))}
          <li className="mr-6 md:mr-5 lg:mr-6">
            <button
              className="flex h-12 w-full items-center gap-x-3 rounded-r-full
                px-6 text-[#635fc7] hover:bg-[#635fc7]/10 dark:hover:bg-white
                lg:gap-x-4 lg:pl-8"
            >
              <BoardIcon />+ Create New Board
            </button>
          </li>
        </ul>
      </form>
    </div>
  )
}
