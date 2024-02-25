/**
 * register.js
 *
 * Account registration route handler
 */

/**
 * Sends a POST request to the API to register a new user account
 *
 * @param {Object} data Object containing new user account credentials
 * @returns {Number} HTTP response status code
 */
async function registerAccount(data) {
    try {
        const response = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            return res;
        });
        return response.status;
    } catch (error) {
        console.error("Error:", error + ". Something went wrong during account registration");
        throw error;
    }
}

export default registerAccount;
