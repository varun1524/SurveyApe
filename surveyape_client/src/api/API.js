
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';

const headers = {
    'Accept': 'application/json'
};

export const validateSession = () =>
    fetch(`${api}/user/validateSession`, {
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

export const doLogout = () =>
    fetch(`${api}/user/logout`, {
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
        console.log("Error: ");
        console.log(error);
        return error;
    });

export const doLogin = (payload) =>
    fetch(`${api}/user/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        console.log(error);
        return error;
    });

  export const verifyAccount1 = (payload) =>
        fetch(`${api}/user/verifyaccount`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => {
            return res;
        }).catch(error => {
            console.log("[API] verifyAccount() error:");
            console.log(error);
            return error;
  });

  export const verifyAccount = (payload) =>
      fetch (`${api}/user/verifyaccount?verificationcode=${payload}`,
          {
              method: 'GET',
              headers: {
                  ...headers,
                  'Content-Type': 'application/json'
              },
              credentials : "include"
          }).then(res => {
          return res;
      }).catch(error => {
          console.log("Error: ");
          console.log(error);
          return error;
});
