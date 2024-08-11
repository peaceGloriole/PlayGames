import { Routes, Route } from "react-router-dom"

import { AuthContextProvider } from "./context/AuthContext"

import HomePage from "./components/homepage/HomePage"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import Logout from "./components/logout/Logout"
import CreateGame from "./components/create/CreateGame"
import Header from "./components/header/Header"
import Catalog from "./components/catalog/Catalog"
import Details from "./components/catalog/details/Details"

function App() {

    return (
        <AuthContextProvider>

            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/games" element={<Catalog />} />
                        <Route path="/games/:gameId/details" element={<Details />} />
                        <Route path="/games/create" element={<CreateGame />} />
                    </Routes>
                </main>

            </div>
        </AuthContextProvider>
    )
}

export default App
