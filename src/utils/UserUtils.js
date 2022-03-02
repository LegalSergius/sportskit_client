import {postOrPutData} from "../httpTasks";
import {getAPI} from "./ComponentUtils";
import {checkTokenValidity} from "../httpTasks/tasks/AuthAPITasks";

export async function fixEnter() {
    await postOrPutData(getAPI('user/enter'), 'POST',
            {'key': 1});
}

export async function fixExit() {
    await postOrPutData(getAPI('user/exit'), 'POST',
            {});
}

export async function checkToken(token) {
    return await checkTokenValidity(getAPI('auth/check'), token);
}

export function changeAuthState() {
    localStorage.removeItem('token');
    localStorage.removeItem('basketId');
}