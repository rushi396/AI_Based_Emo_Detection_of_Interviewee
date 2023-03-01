import './App.css';
import './Styles/index.scss';
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import { createContext, useReducer } from 'react';
import { userInitialState, updateUser } from './Contexts/UserContext';
import Logout from './Components/Templates/Logout';
import Login from './Components/Login/Login';
import { AnimatePresence } from "framer-motion"
import Dashboard from './Components/Dashboard/Dashboard';
import Report from './Components/Report/Report';
import AudioReport from './Components/Report/AudioReport';
import TextReport from './Components/Report/TextReport';

let userContext = createContext()
function App() {
    let [login, updateLoginState] = useReducer(updateUser, userInitialState);
    return (
        <AnimatePresence>
            <userContext.Provider value={{ login, updateLoginState }}>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/report/:id" element={<Report />}></Route>
                    <Route path="/audioreport/:id" element={<AudioReport />}></Route>
                    <Route path="/textreport" element={<TextReport />}></Route>
                    <Route path="/logout" element={<Logout />}></Route>
                </Routes>
            </userContext.Provider>
        </AnimatePresence>
    );
}

export default App;
export { userContext }
