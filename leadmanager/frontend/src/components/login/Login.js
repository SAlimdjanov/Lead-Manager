import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetRegistered } from "../../features/auth";
import Layout from "../layout/Layout";

export default function Login() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetRegistered());
    }, []);

    return (
        <Layout title="Lead Manager: Login" content="Lead Manager login page">
            <h1>Login</h1>
        </Layout>
    );
}
