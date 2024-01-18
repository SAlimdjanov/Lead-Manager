import React from "react";

import Layout from "../layout/Layout";
import VisitorHome from "./VisitorHome";
import MemberHome from "./MemberHome";

export default function Home() {
    /** @todo Bring authentication state in. This is a temporaray flag */
    const isLoggedIn = false;

    return isLoggedIn ? (
        <Layout title="LeadFlow Pro: Home" content="LeadFlow Pro home page" header="Welcome Back">
            <MemberHome />
        </Layout>
    ) : (
        <Layout
            title="LeadFlow Pro"
            content="LeadFlow Pro home page"
            header="Elevate Your Lead Management with LeadFlow Pro"
        >
            <VisitorHome />
        </Layout>
    );
}
