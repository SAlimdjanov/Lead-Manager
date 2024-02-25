/**
 * login.js
 *
 * Account login route handler
 */

/**
 * Makes a request to the API to process and validate incoming login attempts
 *
 * @param {Object} data Object containing login credentials
 * @returns {Object} Object containing response data and tokens
 */
async function loginToAccount(data) {
    try {
        const tokenResponse = await fetch("/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            return res;
        });
        const tokenData = await tokenResponse.json();
        return { response: tokenResponse, data: tokenData };
    } catch (error) {
        console.error("Error:", error + ". Something went wrong during login");
        throw error;
    }
}

export default loginToAccount;
