import React from "react";

import Layout from "../layout/Layout";
import Leads from "./Leads";
import Form from "./Form";

function Dashboard() {
    return (
        <Layout title="LeadFlow: Dashboard" content="LeadFlow dashboard" header="Dashboard">
            <Form />
            <Leads />
        </Layout>
    );
}

export default Dashboard;
