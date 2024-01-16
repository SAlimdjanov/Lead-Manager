import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./login/Register";
import Dashboard from "./dashboard/Dashboard";
import NotFound from "./misc/NotFound";

import { store } from "./store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
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
            </Provider>
        );
    }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
