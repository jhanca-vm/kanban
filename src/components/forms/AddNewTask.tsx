import { useRef } from 'react'
import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form'
import useTaskForm from '../../hooks/useTaskForm'
import type { TaskFormInputs } from '../../types'
import { required } from '../../utils/constants'
import Modal from '../Modal'
import AddNewTaskButton from '../tasks/AddNewTaskButton'
import AddInputButton from './AddInputButton'
import DynamicInput from './DynamicInput'
import Input from './Input'
import Select from './Select'
import SubmitButton from './SubmitButton'

export default function AddNewTask() {
  const modalRef = useRef<HTMLDialogElement>(null)
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    getValues,
    reset
  } = useForm<TaskFormInputs>({
    mode: 'all',
    defaultValues: { title: '', description: '', subtasks: [] },
    resetOptions: { keepDefaultValues: true }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks'
  })
  const { createTask, validateTitle, validateSubtask } = useTaskForm(getValues)

  const onSubmit: SubmitHandler<TaskFormInputs> = task => {
    createTask(task)
    modalRef.current?.close()
  }

  return (
    <>
      <AddNewTaskButton handleClick={() => modalRef.current?.showModal()} />
      <Modal ref={modalRef} title="Add New Task" handleClose={() => reset()}>
        <form className="grid" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            placeholder="e.g. Take coffee break"
            {...register('title', {
              validate: title => validateTitle(title),
              required
            })}
            error={errors.title?.message}
          />
          <label className="mt-6 grid">
            <span className="mb-2 text-xs text-[#828fa3] dark:text-white">
              Description
            </span>
            <textarea
              placeholder={
                'e.g. It’s always good to take a break. This 15 minute break ' +
                'will recharge the batteries a little.'
              }
              {...register('description')}
            />
          </label>
          <h3 className="mb-2 mt-6 text-xs text-[#828fa3] dark:text-white">
            Subtasks
          </h3>
          {fields.map(({ id }, index) => (
            <DynamicInput
              placeholder="e.g. Make coffee"
              {...register(`subtasks.${index}.title`, {
                validate: validateSubtask,
                required
              })}
              error={errors.subtasks?.[index]?.title?.message}
              key={id}
              handleClick={() => remove(index)}
            />
          ))}
          <AddInputButton handleClick={() => append({ title: '' })}>
            + Add New Subtask
          </AddInputButton>
          <Select label="Status" {...register('status')} />
          <SubmitButton>Create Task</SubmitButton>
        </form>
      </Modal>
    </>
  )
}
