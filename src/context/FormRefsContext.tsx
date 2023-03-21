import type { PropsWithChildren, RefObject } from 'react'
import { createContext, useContext, useRef } from 'react'

type FormRefs = Map<string, RefObject<HTMLDialogElement>>

const FormRefsContext = createContext<FormRefs>(new Map())

const useFormRefs = () => useContext(FormRefsContext)

export function FormRefsProvider({ children }: PropsWithChildren) {
  const formRefs: FormRefs = new Map()

  formRefs.set('addNewBoard', useRef(null))
  formRefs.set('editBoard', useRef(null))

  return (
    <FormRefsContext.Provider value={formRefs}>
      {children}
    </FormRefsContext.Provider>
  )
}

export const useAddNewBoardRef = () => useFormRefs().get('addNewBoard')

export const useEditBoardRef = () => useFormRefs().get('editBoard')
