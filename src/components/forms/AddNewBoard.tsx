import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form'
import { useAddNewBoardRef } from '../../context/FormRefsContext'
import useBoardFormValidators from '../../hooks/useBoardFormValidators'
import useBoardStore from '../../hooks/useBoardStore'
import type { BoardFormInputs } from '../../types'
import { required } from '../../utils/constants'
import Modal from '../Modal'
import AddInputButton from './AddInputButton'
import DynamicInput from './DynamicInput'
import Input from './Input'
import SubmitButton from './SubmitButton'

export default function AddNewBoard() {
  const addNewBoardRef = useAddNewBoardRef()
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    getValues,
    reset
  } = useForm<BoardFormInputs>({ mode: 'all' })
  const { fields, append, remove } = useFieldArray({ control, name: 'columns' })
  const { validateName, validateColumn } = useBoardFormValidators(getValues)
  const addBoard = useBoardStore(({ addBoard }) => addBoard)

  const onSubmit: SubmitHandler<BoardFormInputs> = ({ name, columns }) => {
    addBoard({
      name: name.trim(),
      columns: columns.map(({ name }) => ({ name: name.trim(), tasks: [] }))
    })

    addNewBoardRef?.current?.close()
  }

  return (
    <Modal
      ref={addNewBoardRef}
      title="Add New Board"
      handleClose={() => reset({ name: '', columns: [] })}
    >
      <form className="grid" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Board Name"
          placeholder="e.g. Web Design"
          {...register('name', { validate: validateName, required })}
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
        <SubmitButton>Create New Board</SubmitButton>
      </form>
    </Modal>
  )
}
