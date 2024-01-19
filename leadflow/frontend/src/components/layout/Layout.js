/**
 * Layout.js
 */

import React from "react";
import { Helmet } from "react-helmet";
import { Container } from "react-bootstrap";

import Header from "./Header";

/**
 * Template to render page content
 *
 * @param {Object} params Object containing page title, content metadata, and child components
 * @returns {JSX.Element}
 */
export default function Layout({ title, content, header, children }) {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={content} />
            </Helmet>
            <Header />
            <Container>
                <h1 className="text-primary text-center mt-4 mb-3">{header}</h1>
                {children}
            </Container>
        </>
    );
}
