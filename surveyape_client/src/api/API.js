const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';

const headers = {
    'Accept': 'application/json'
};

export const validateSession = () =>
    fetch(`${api}/users/validateSession`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'
        // body: JSON.stringify()
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const doLogout = () =>
    fetch(`${api}/users/logout`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'
        // body: JSON.stringify()
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const doSignUp = (payload) =>
    fetch (`${api}/user/signup`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => {
        return res;
    }).catch(error => {
        console.log("Error: "+error);
        return error;
    });

export const doLogin = (payload) =>
    fetch(`${api}/user/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    }).catch(error => {
            console.log("This is error");
            console.log(error);
            return error;
        });