import { useEffect } from 'react'
import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form'
import { useEditBoardRef } from '../../context/FormRefsContext'
import useActiveBoard from '../../hooks/useActiveBoard'
import useBoardFormValidators from '../../hooks/useBoardFormValidators'
import useBoardStore from '../../hooks/useBoardStore'
import type { BoardFormInputs } from '../../types'
import { required } from '../../utils/constants'
import Modal from '../Modal'
import AddInputButton from './AddInputButton'
import DynamicInput from './DynamicInput'
import Input from './Input'
import SubmitButton from './SubmitButton'

export default function EditBoard() {
  const editBoardRef = useEditBoardRef()
  const activeBoard = useActiveBoard()
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    getValues,
    reset
  } = useForm<BoardFormInputs>({ mode: 'all' })
  const { fields, append, remove } = useFieldArray({ control, name: 'columns' })
  const { validateEditedName, validateColumn } =
    useBoardFormValidators(getValues)
  const updateBoard = useBoardStore(({ updateBoard }) => updateBoard)

  const onSubmit: SubmitHandler<BoardFormInputs> = ({ name, columns }) => {
    updateBoard(activeBoard!.name, {
      name: name.trim(),
      columns: columns.map(({ name }) => ({
        name: name.trim(),
        tasks:
          activeBoard?.columns.find(column => column.name === name.trim())
            ?.tasks ?? []
      }))
    })

    editBoardRef?.current?.close()
  }

  useEffect(() => {
    reset({
      name: activeBoard?.name,
      columns: activeBoard?.columns.map(({ name }) => ({ name }))
    })
  }, [activeBoard, reset])

  return (
    <Modal ref={editBoardRef} title="Edit Board">
      <form className="grid" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Board Name"
          placeholder="e.g. Web Design"
          {...register('name', { validate: validateEditedName, required })}
          error={errors.name?.message}
        />
        <h3 className="mb-2 mt-6 text-xs text-[#828fa3] dark:text-white">
          Board Columns
        </h3>
        {fields.map((column, index) => (
          <DynamicInput
            {...register(`columns.${index}.name`, {
              validate: validateColumn,
              required
            })}
            error={errors.columns?.[index]?.name?.message}
            key={column.id}
            handleClick={() => remove(index)}
          />
        ))}
        <AddInputButton handleClick={() => append({ name: '' })}>
          + Add New Column
        </AddInputButton>
        <SubmitButton>Save Changes</SubmitButton>
      </form>
    </Modal>
  )
}
