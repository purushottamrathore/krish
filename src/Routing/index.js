import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "../Pages/LoginPage";
import TransactionPage from "../Pages/TransactionPage";
const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route exect path="/" element={<Loginpage />}></Route>
                <Route exect path="/transaction" element={<TransactionPage />}></Route>
            </Routes>
        </Router>
    );
}

export default Routing;