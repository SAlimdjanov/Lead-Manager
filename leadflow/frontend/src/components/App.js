import React, { Component, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./login/Register";
import Dashboard from "./dashboard/Dashboard";
import NotFound from "./misc/NotFound";

import { checkAuthentication } from "../features/auth";
import { store } from "./store";

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthentication());
    });

    return (
        <Router>
            <>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </>
        </Router>
    );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
