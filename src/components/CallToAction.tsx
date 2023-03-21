interface Props {
  message: string
  action: string
  handleClick: () => void
}

export default function CallToAction({ message, action, handleClick }: Props) {
  return (
    <div
      className={'flex h-full flex-col items-center justify-center font-bold'}
    >
      <p className="mb-6 text-center text-lg text-[#828fa3] lg:mb-8">
        {message}
      </p>
      <button
        className={
          'h-12 rounded-3xl bg-[#635fc7] px-5 text-2sm text-white ' +
          'hover:bg-[#a8a4ff]'
        }
        onClick={handleClick}
      >
        {action}
      </button>
    </div>
  )
}
