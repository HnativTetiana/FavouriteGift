function gaps(event) {
    if (event.target.value.includes(" ")) {
        event.target.value = event.target.value.replace(/\s/g, "");
    }
}

function removeSpaces(event) {
    event.target.value = event.target.value.trim().replace(/\s+/g, " ");
};

async function delay(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForElement(selector, timeout = 5000) {
    const interval = 100;
    const endTime = Date.now() + timeout;

    while (Date.now() < endTime) {
        const element = document.querySelector(selector);
        if (element) return element;
        await delay(interval);
    }

    throw new Error(`Element with selector "${selector}" not found within ${timeout}ms`);
}

async function dataBaseConnection(method, server, myData) {
    try {
        const response = await fetch(server, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myData),
            cache: "no-cache",
        });
        if (!response.ok) {
            throw new Error("status code: " + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error);
        return error;
    }
}

export {
    gaps, removeSpaces, waitForElement, dataBaseConnection
};