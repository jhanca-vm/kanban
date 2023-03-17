import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Tasks from './components/Tasks'
import { useActiveBoard } from './hooks/useBoardStore'

export default function App() {
  const activeBoard = useActiveBoard()
  const hasColumns = Boolean(activeBoard?.columns.length)

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className={hasColumns ? 'grid ' : undefined}>
          <Tasks />
        </main>
      </div>
    </>
  )
}
