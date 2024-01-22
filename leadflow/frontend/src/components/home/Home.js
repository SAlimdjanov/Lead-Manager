import React from "react";
import { useSelector } from "react-redux";

import Layout from "../layout/Layout";
import VisitorHome from "./VisitorHome";
import MemberHome from "./MemberHome";

export default function Home() {
    const { isAuthenticated } = useSelector((state) => state.user);

    const content = isAuthenticated ? (
        <Layout title="LeadFlow: Home" content="LeadFlow home page" header="Welcome Back">
            <MemberHome />
        </Layout>
    ) : (
        <Layout
            title="LeadFlow"
            content="LeadFlow home page"
            header="Elevate Your Lead Management with LeadFlow"
        >
            <VisitorHome />
        </Layout>
    );

    return content;
}
