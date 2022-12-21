import "./App.css"
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoutes from "./Services/ProtectedRoutes"
import Login from "./Components/Login"
import Register from "./Components/Register"
import Home from "./Pages/Home"
import PresentationPage from "./Pages/PresentationPage"
import HomePage from "./Pages/HomePage"
import AnonymousPage from "./Pages/AnonymousPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="login/:groupId" element={<Login />} />
        <Route
          path="/app/presentation/:presentationId"
          element={<PresentationPage />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<HomePage />} />

        <Route path="/:presentationId" element={<AnonymousPage />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
