interface Props {
  handleClick: () => void
}

export default function AddNewTaskButton({ handleClick }: Props) {
  return (
    <button
      className={
        'grid h-8 w-12 place-items-center rounded-3xl bg-[#635fc7] ' +
        'opacity-25 hover:opacity-100 md:h-12 md:w-[10.25rem]'
      }
      onClick={handleClick}
    >
      <img
        className="w-3 md:hidden"
        src="/icons/add.svg"
        alt="Add new task"
        width={12}
        height={12}
      />
      <span className="hidden text-2sm font-bold text-white md:inline">
        + Add New Task
      </span>
    </button>
  )
}
