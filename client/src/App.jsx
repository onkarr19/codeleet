import { BrowserRouter , Routes , Route } from "react-router-dom";

import Navbar from "./Constants/Navbar/Navbar";

import HomePage from "./Components/HomePage/HomePage";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import Problemset from "./Components/Problemset/Problemset";
import Problem from "./Components/Problem/Problem";

import './App.css'

function App() {

	return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/problemset" element={<Problemset />} />
                <Route path="/problem/:pid/" element={<Problem  />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;