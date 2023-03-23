import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTaskRef } from '../../context/FormRefsContext'
import useTaskUpdater from '../../hooks/useTaskUpdater'
import type { Task as Props } from '../../types'
import EditTask from '../forms/EditTask'
import Select from '../forms/Select'
import Settings from './Settings'

interface Inputs {
  status: string
}

export default function Task({ title, description, subtasks, status }: Props) {
  const taskRef = useTaskRef()
  const { register, getValues, reset } = useForm<Inputs>()
  const { setCurrentStatus, toggleSubtask } = useTaskUpdater()

  useEffect(() => reset({ status }), [reset, status])

  return (
    <>
      <dialog
        ref={taskRef}
        className={
          'mx-4 w-auto max-w-none rounded-md p-6 sm:mx-auto sm:max-w-[30rem] ' +
          'sm:p-8 [&_>_label]:mb-0'
        }
      >
        <header className="mb-6 flex items-center gap-x-4 sm:gap-x-6">
          <h2 className="flex-1 text-lg font-bold leading-6">{title}</h2>
          <Settings
            {...{ title, description, subtasks }}
            status={getValues().status}
          />
        </header>
        {description && (
          <p className="my-6 text-sm font-medium leading-6 text-[#828fa3]">
            {description}
          </p>
        )}
        <h3 className="mb-4 text-xs font-bold">
          Subtasks ({subtasks?.filter(({ isCompleted }) => isCompleted).length}
          {' of '}
          {subtasks?.length})
        </h3>
        <div className="mb-6 grid gap-y-2 text-xs font-bold">
          {subtasks?.map((subtask, index) => (
            <label
              className={
                'group flex cursor-pointer items-center gap-x-4 rounded ' +
                'bg-[#f4f7fd] p-3 hover:!bg-[#635fc7]/25 dark:bg-[#20212c]'
              }
              key={`${title}-${subtask.title}`}
            >
              <input
                className="dark:group-hover:bg-[#2B2C37]"
                type="checkbox"
                defaultChecked={subtask.isCompleted}
                onChange={event => {
                  toggleSubtask(getValues().status, title, index, event)
                }}
              />
              <span>{subtask.title}</span>
            </label>
          ))}
        </div>
        <Select
          label="Current Status"
          {...register('status', {
            onChange: event => setCurrentStatus(title, status, event)
          })}
        />
      </dialog>
      <EditTask {...{ title, description, status, subtasks }} />
    </>
  )
}
