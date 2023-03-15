import Header from './components/Header'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main></main>
      </div>
    </>
  )
}
