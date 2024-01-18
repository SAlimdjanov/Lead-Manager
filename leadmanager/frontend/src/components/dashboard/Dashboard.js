import React from "react";

import Layout from "../layout/Layout";
import Leads from "./Leads";
import Form from "./Form";

function Dashboard() {
    return (
        <Layout title="LeadFlow Pro: Dashboard" content="LeadFlow Pro dashboard" header="Dashboard">
            <Form />
            <Leads />
        </Layout>
    );
}

export default Dashboard;
