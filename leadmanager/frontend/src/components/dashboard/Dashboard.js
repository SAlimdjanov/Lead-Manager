import React from "react";

import Layout from "../layout/Layout";
import Leads from "./Leads";
import Form from "./Form";

function Dashboard() {
    return (
        <Layout title="Lead Manager: Dashboard" content="Lead Manager dashboard">
            <Form />
            <Leads />
        </Layout>
    );
}

export default Dashboard;
