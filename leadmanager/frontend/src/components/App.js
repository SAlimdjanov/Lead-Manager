import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import Header from "./layout/Header";
import Dashboard from "./dashboard/Dashboard";

class App extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="container">
                    <Dashboard />
                </div>
            </>
        );
    }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
