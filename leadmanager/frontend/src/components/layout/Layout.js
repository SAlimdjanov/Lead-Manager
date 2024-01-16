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
export default function Layout({ title, content, children }) {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={content} />
            </Helmet>
            <Header />
            <Container className="mt-5 pt-3">{children}</Container>
        </>
    );
}
