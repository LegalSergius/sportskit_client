let errorMessage;

function setErrorMessage(msg) {
    errorMessage = msg;
}

export function getErrorMessage() {
    return errorMessage;
}

export async function postOrPutData(url, method, body, multipart = false) {
    const headers = {};
    if (body && !multipart) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
    }
    try {
        console.log('body - ' + JSON.stringify(body));
        const response = await fetch(url, {
            method, body, headers
        });
        const data = await response.json();

        if (response.status !== 200) {
            setErrorMessage(data.message);
            console.log(data.message);
            throw new Error(data);
        }

        return data;
    } catch(e) {
        console.log('login method error - ' + e.message);
        throw e;
    }
}

export async function getData(url, isMediaRequired = false) {
    let response, data;
    try {
        response = await fetch(url);

        data = await response.json();
        if (response.status !== 200) {
            setErrorMessage(data?.message);
            throw new Error(data);
        }
    } catch(e) {
        data = (isMediaRequired) ? await response.formData() : await response.text();
        if (!data) {
            console.log('login method error - ' + e.message);
            throw e;
        }
    }

    return data;
}

export async function removeData(url, method, headers = {}) {
    let response, data;
    try {
        response = await fetch(url, {method, headers});
        data = await response.json();

        if (response.status !== 200) {
            setErrorMessage(data.message);
            throw new Error(data);
        }

        return data;
    } catch(e) {
        console.log('login method error - ' + e.message);
        throw e;
    }
}
