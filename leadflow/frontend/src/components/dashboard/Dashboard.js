/**
 * Dashboard.js
 *
 * The dashboard component, where users can view their account details, view, modify, and delete
 * leads.
 *
 * @TODO Implementation
 */

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

import Layout from "../layout/Layout";
import Leads from "./Leads";
import Form from "./Form";

function Dashboard() {
    const { isAuthenticated, user, loading } = useSelector((state) => state.user);
    if (!isAuthenticated && !loading && user === null) {
        return <Navigate to="/login" />;
    }
    return (
        <Layout title="LeadFlow: Dashboard" content="LeadFlow dashboard" header="Dashboard">
            {loading || user === null ? (
                <Spinner>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <>
                    <h2>User Details</h2>
                    <ul>
                        <li>First name: {user.first_name}</li>
                        <li>Last name: {user.last_name}</li>
                        <li>email: {user.email}</li>
                    </ul>
                </>
            )}
            <Form />
            <Leads />
        </Layout>
    );
}

export default Dashboard;
