import { Routes, Route } from "react-router-dom"

import Header from "./components/header/header/Header"
import HomePage from "./components/header/homepage/HomePage"
import Login from "./components/header/login/Login"
import Register from "./components/header/register/Register"
import CreateGame from "./components/create/CreateGame"

function App() {

    return (
        <div id="box">
            <Header />

            <main id="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create" element={<CreateGame />} />
                </Routes>
            </main>

        </div>
    )
}

export default App
