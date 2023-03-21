import { useEffect } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useEditBoardRef } from '../../context/FormRefsContext'
import useActiveBoard from '../../hooks/useActiveBoard'
import useBoardStore from '../../hooks/useBoardStore'
import type { Board } from '../../types'
import validateName from '../../utils/validateName'
import Modal from '../Modal'
import AddInputButton from './AddInputButton'
import DynamicInput from './DynamicInput'
import Input from './Input'
import SubmitButton from './SubmitButton'

interface Inputs {
  name: string
  columns: { name: string }[]
}

export default function EditBoard() {
  const editBoardRef = useEditBoardRef()
  const boards = useBoardStore(({ boards }) => boards)
  const activeBoard = useActiveBoard() as Board
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    getValues,
    reset
  } = useForm<Inputs>()
  const { fields, append, remove } = useFieldArray({ control, name: 'columns' })
  const updateBoard = useBoardStore(({ updateBoard }) => updateBoard)

  const validate = (name: string) => {
    return validateName(
      name,
      boards.filter(board => board.name !== activeBoard.name)
    )
  }

  const onSubmit: SubmitHandler<Inputs> = ({ name, columns }) => {
    const index = boards.findIndex(board => board.name === activeBoard.name)

    updateBoard(index, {
      name,
      columns: columns.map(({ name }) => ({ name, tasks: [] }))
    })

    editBoardRef?.current?.close()
  }

  useEffect(() => {
    reset({
      name: activeBoard.name,
      columns: activeBoard.columns.map(({ name }) => ({ name }))
    })
  }, [activeBoard, reset])

  return (
    <Modal ref={editBoardRef} title="Edit Board">
      <form className="mt-6 grid" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Board Name"
          placeholder="e.g. Web Design"
          {...register('name', { validate, required: 'Can’t be empty' })}
          error={errors.name?.message}
        />
        <h3 className="mb-2 mt-6 text-xs text-[#828fa3] dark:text-white">
          Board Columns
        </h3>
        {fields.map((column, index) => (
          <DynamicInput
            {...register(`columns.${index}.name`, {
              validate: name => validateName(name, getValues().columns, true),
              required: 'Can’t be empty'
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
