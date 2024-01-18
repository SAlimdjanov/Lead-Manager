import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Spinner, Container } from "react-bootstrap";

import { resetRegistered } from "../../features/auth";
import Layout from "../layout/Layout";

export default function Login() {
    /** @todo Bring redux state over. This is a temporary flag */
    const loading = false;

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    useEffect(() => {
        dispatch(resetRegistered());
    }, []);

    const onFormSubmit = (event) => {
        event.preventDefault();
    };

    const onFieldChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <Layout title="LeadFlow Pro: Login" content="LeadFlow Pro login page" header="Login">
            <Container className="pl-5 pr-5 text-center">
                <p>
                    Welcome back to LeadFlow Pro. Don't have an account? Register{" "}
                    <a href="/register">here</a>.
                </p>
            </Container>
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mt-3" controlId="formEmail">
                    <Form.Label>
                        <b>Email</b>
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="bob@example.com"
                        onChange={onFieldChange}
                        name="email"
                        value={email}
                        autoComplete="email"
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-3" controlId="formPassword">
                    <Form.Label>
                        <b>Password</b>
                    </Form.Label>
                    <Form.Control
                        type="password"
                        onChange={onFieldChange}
                        name="password"
                        value={password}
                        required
                    />
                </Form.Group>
                {loading ? (
                    <Spinner>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <Button className="mt-3" type="submit">
                        Login
                    </Button>
                )}
            </Form>
        </Layout>
    );
}
