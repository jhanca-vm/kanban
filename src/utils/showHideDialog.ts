import type { RefObject } from 'react'

export default function showHideDialog(ref: RefObject<HTMLDialogElement>) {
  ref.current?.open ? ref.current.close() : ref.current?.show()
}
