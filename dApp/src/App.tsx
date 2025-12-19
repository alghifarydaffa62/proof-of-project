import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import DashboardLayout from "./layout/DashboardLayout"
import CreatePage from "./pages/CreatePage"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<DashboardLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="create" element={<CreatePage/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
