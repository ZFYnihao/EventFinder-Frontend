import HomePage from "./components/HomePage"
import TopPage from "./components/TopPage"

function App() {
  return (
    <>
        <div className="d-flex flex-column min-vh-100">
        <TopPage></TopPage>
        <HomePage></HomePage>
        </div>
    </>
  )
}

export default App
