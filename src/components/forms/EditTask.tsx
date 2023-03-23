import { useEffect } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useEditTaskRef } from '../../context/FormRefsContext'
import useTaskForm from '../../hooks/useTaskForm'
import type { Task as Props, TaskFormInputs } from '../../types'
import { required } from '../../utils/constants'
import Modal from '../Modal'
import AddInputButton from './AddInputButton'
import DynamicInput from './DynamicInput'
import Input from './Input'
import Select from './Select'
import SubmitButton from './SubmitButton'

export default function EditTask({
  title,
  description,
  status,
  subtasks
}: Props) {
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    getValues,
    reset
  } = useForm<TaskFormInputs>({ mode: 'all' })
  const editTaskRef = useEditTaskRef()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks'
  })
  const { saveChanges, validateEditedTitle, validateSubtask } =
    useTaskForm(getValues)

  const onSubmit: SubmitHandler<TaskFormInputs> = task => {
    saveChanges(title, status, task)
    editTaskRef?.current?.close()
  }

  useEffect(() => {
    reset({
      title,
      description,
      status,
      subtasks: subtasks?.map(({ title }) => ({ title }))
    })
  }, [title, description, status, subtasks, reset])

  return (
    <Modal ref={editTaskRef} title="Edit Task">
      <form className="grid" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Title"
          placeholder="e.g. Take coffee break"
          {...register('title', {
            validate: editedTitle => validateEditedTitle(title, editedTitle),
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
        <SubmitButton>Save Changes</SubmitButton>
      </form>
    </Modal>
  )
}
