import CallToAction from './components/CallToAction'
import AddNewBoard from './components/forms/AddNewBoard'
import EditBoard from './components/forms/EditBoard'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Tasks from './components/Tasks'
import { useAddNewBoardRef } from './context/FormRefsContext'
import useActiveBoard from './hooks/useActiveBoard'
import useBoardStore from './hooks/useBoardStore'

export default function App() {
  const addNewBoardRef = useAddNewBoardRef()
  const boards = useBoardStore(({ boards }) => boards)
  const activeBoard = useActiveBoard()
  const hasColumns = Boolean(activeBoard?.columns.length)

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className={hasColumns ? 'grid ' : undefined}>
          {boards.length > 0 ? (
            <Tasks />
          ) : (
            <CallToAction
              message="Create a new board to get started."
              action="+ Create New Board"
              handleClick={() => addNewBoardRef?.current?.showModal()}
            />
          )}
        </main>
      </div>
      <AddNewBoard />
      <EditBoard />
    </>
  )
}
