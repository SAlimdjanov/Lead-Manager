/**
 * register.js
 *
 * Account registration route handler
 */

async function registerAccount(data) {
    try {
        const response = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error:", error + ". Something went wrong during account registration");
        throw error;
    }
}

export default registerAccount;
