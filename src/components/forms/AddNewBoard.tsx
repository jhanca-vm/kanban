import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form'
import { useAddNewBoardRef } from '../../context/FormRefsContext'
import useBoardStore from '../../hooks/useBoardStore'
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

export default function AddNewBoard() {
  const addNewBoardRef = useAddNewBoardRef()
  const boards = useBoardStore(({ boards }) => boards)
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    getValues,
    reset
  } = useForm<Inputs>()
  const { fields, append, remove } = useFieldArray({ control, name: 'columns' })
  const addBoard = useBoardStore(({ addBoard }) => addBoard)

  const onSubmit: SubmitHandler<Inputs> = ({ name, columns }) => {
    addBoard({
      name,
      columns: columns.map(({ name }) => ({ name, tasks: [] }))
    })

    addNewBoardRef?.current?.close()
  }

  return (
    <Modal
      ref={addNewBoardRef}
      title="Add New Board"
      handleClose={() => reset({ name: '', columns: [] })}
    >
      <form className="mt-6 grid" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Board Name"
          placeholder="e.g. Web Design"
          {...register('name', {
            validate: name => validateName(name, boards),
            required: 'Can’t be empty'
          })}
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
        <SubmitButton>Create New Board</SubmitButton>
      </form>
    </Modal>
  )
}
