import jwt_decode from 'jwt-decode';
import {getData, postOrPutData} from "../index";
let user = null;

export const registration = (url, method = 'GET', body = null) => {
    return postOrPutData(url, method, body)
}

export const checkTokenValidity = async (url, token, method = 'GET') => {
    const headers = {};
    headers['Authorization'] = 'Bearer ' + token;
    try {
        const response = await fetch(url, {
            method, headers
        });
        const data = await response.json();
        if (response.status !== 202) {
            return null;
        }

        return jwt_decode(data.token);
    } catch(e) {
        console.log('check token error - ' + e.message);
        throw e;
    }
}

export function login(url, method = 'GET', body = null) {
    return postOrPutData(url, method, body);
}

export function checkUserEmail(url) {
    return getData(url)
}

export function updatePassword(url, method = 'GET', body = null) {
    return postOrPutData(url, method, body);
}

export function checkPINCode(url, method, body) {
    return postOrPutData(url, method, body);
}

export function sendPINCode(url) {
    return getData(url);
}

export function setCurrentUser(currentUser) {
    user = currentUser;
}

export function getCurrentUser() {
    return user;
}


