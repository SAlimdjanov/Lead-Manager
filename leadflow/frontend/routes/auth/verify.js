/**
 * verify.js
 *
 * api/verify handler.
 */

import Cookies from "js-cookie";

/**
 * Sends a POST request to the API to validate an access token
 *
 * @returns {Number} HTTP response status code
 */
async function verifyUser() {
    const accessToken = Cookies.get(["access"]);
    try {
        const response = await fetch("/api/token/verify/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: accessToken }),
        }).then((res) => {
            return res;
        });
        return response.status;
    } catch (error) {
        console.error("Error:", error + ". Something went wrong during verification");
        throw error;
    }
}

export default verifyUser;
