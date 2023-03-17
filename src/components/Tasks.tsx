import uniqolor from 'uniqolor'
import { useActiveBoard } from '../hooks/useBoardStore'

export default function Tasks() {
  const activeBoard = useActiveBoard()

  if (!activeBoard) return null

  if (activeBoard.columns.length === 0) {
    return (
      <div
        className={'flex h-full flex-col items-center justify-center font-bold'}
      >
        <p className="mb-6 text-center text-lg text-[#828fa3] lg:mb-8">
          This board is empty. Create a new column to get started.
        </p>
        <button
          className={
            'h-12 w-44 rounded-3xl bg-[#635fc7] text-2sm text-white ' +
            'hover:bg-[#a8a4ff]'
          }
        >
          + Add New Column
        </button>
      </div>
    )
  }

  return (
    <>
      {activeBoard.columns.map(({ name, tasks }) => (
        <section key={name}>
          <h2
            className={
              'flex gap-x-3 text-xs font-bold uppercase tracking-[0.2em] ' +
              'text-[#828fa3]'
            }
          >
            <span
              className="h-[0.9375rem] w-[0.9375rem] rounded-full"
              style={{ backgroundColor: uniqolor(name.toLowerCase()).color }}
            />
            {name} ({tasks.length})
          </h2>
          <div className="mt-6 grid gap-y-5">
            {tasks.map(({ title, subtasks }) => (
              <button
                className={
                  'rounded-lg bg-white px-4 py-5 text-left font-bold ' +
                  'shadow-md hover:text-[#635fc7] dark:bg-[#2b2c37] ' +
                  'dark:hover:text-[#a8a4ff]'
                }
                key={title}
              >
                <h3 className="mb-2">{title}</h3>
                <p className="text-xs text-[#828fa3]">
                  {subtasks.filter(({ isCompleted }) => isCompleted).length}
                  {' of '}
                  {subtasks.length} substasks
                </p>
              </button>
            ))}
          </div>
        </section>
      ))}
      <button
        className={
          'mt-10 rounded-md bg-gradient-to-b from-[#e9effa] ' +
          'to-[#e9effa]/50 text-2xl font-bold text-[#828fa3] ' +
          'dark:from-[#2b2c37]/25 dark:to-[#2b2c37]/[0.125]'
        }
      >
        + New Column
      </button>
    </>
  )
}
