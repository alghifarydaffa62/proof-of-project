import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import DashboardLayout from "./layout/DashboardLayout"
import CreatePage from "./pages/CreatePage"
import ActiveEscrows from "./pages/ActiveEscrows"
import EscrowPage from "./pages/EscrowPage"
import Archive from "./pages/Archive"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<DashboardLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="create" element={<CreatePage/>}/>
            <Route path="active" element={<ActiveEscrows/>}/>
            <Route path="active/escrow/:id" element={<EscrowPage/>}/>
            <Route path="archive" element={<Archive/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
