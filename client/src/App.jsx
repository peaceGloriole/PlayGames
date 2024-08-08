import { Routes, Route } from "react-router-dom"

import Header from "./components/header/header/Header"
import HomePage from "./components/header/homepage/HomePage"

function App() {

  return (
    <div id="box">
      <Header />

      <main id="main-content">
        <Routes>
      <Route path="/" element={<HomePage />} />
        </Routes>
      </main>

    </div>
  )
}

export default App
