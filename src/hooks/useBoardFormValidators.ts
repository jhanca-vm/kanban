import type { UseFormGetValues } from 'react-hook-form'
import type { BoardFormInputs } from '../types'
import validateExistence from '../utils/validateExistence'
import useActiveBoard from './useActiveBoard'
import useBoardStore from './useBoardStore'

export default function useBoardFormValidators(
  getValues: UseFormGetValues<BoardFormInputs>
) {
  const boards = useBoardStore(({ boards }) => boards)
  const activeBoard = useActiveBoard()

  const validateName = (name: string) => {
    return validateExistence('name', name, boards)
  }

  const validateEditedName = (name: string) => {
    return validateExistence(
      'name',
      name,
      boards.filter(board => board.name !== activeBoard?.name)
    )
  }

  const validateColumn = (name: string) => {
    return validateExistence('name', name, getValues().columns, true)
  }

  return { validateName, validateEditedName, validateColumn }
}
