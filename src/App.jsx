import "./App.css"
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoutes from "./Services/ProtectedRoutes"
import Login from "./Components/Login"
import Register from "./Components/Register"
import Home from "./Pages/Home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
