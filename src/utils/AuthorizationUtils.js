import {postOrPutData} from "../httpTasks";

export function isUserByURLLocation(url) {
    let currentPath = url.split('/');

    return (currentPath.at(-1) === 'user');
}

export async function submit(event, url, emailOrPhone, password, name = null,
                             surname = null, validationPassword = null) {
    event.preventDefault();

    try {
        const TOKEN = await postOrPutData(url, 'POST', {emailOrPhone, password,
            name, surname, validationPassword});

        if (TOKEN) {
            localStorage.setItem('token', TOKEN.token);
            localStorage.setItem('basketId', TOKEN.basketId);
            return {completed: true};
        }
    } catch (e) {
        console.log('login error - ' + e.message);
        return {hasError: true};
    }
}