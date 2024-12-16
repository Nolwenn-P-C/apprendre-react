import baseURL from "./caller.service";

export let login = async (credentials) => {
    const response = await fetch(baseURL + "/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return response.json();
};

let saveToken = (token) => {
    localStorage.setItem('token', token);
};

let logout = () => {
    localStorage.removeItem('token');
};

let isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token;
};

let getToken = () => {
    return localStorage.getItem('token');
};

let getTokenInfo = () => {
    const token = getToken();
    if (!token) return null;

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const accountService = {
    login, saveToken, logout, isLogged, getToken, getTokenInfo
};
