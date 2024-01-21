/**
 * login.js
 *
 * Account login route handler
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
