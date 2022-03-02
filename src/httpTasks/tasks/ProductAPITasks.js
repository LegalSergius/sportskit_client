import {getData, postOrPutData, removeData} from "../index";

export function addProduct(url, method, form, body) {
    const FORM_DATA = new FormData(form);
    FORM_DATA.append('description', body.description);

    for (let file of body.photosArray) {
        FORM_DATA.append('photosArray', file);
    }

    return postOrPutData(url, method, FORM_DATA, true);
}

export async function fillArray(responseArray) {
    let array = [];
    for (let element of responseArray) {
        array.push(element.name || element.title || element.code);
    }

    return array;
}

export function addPromotion(url, method, form) {
    const FORM_DATA = new FormData(form);

    return postOrPutData(url, method, FORM_DATA, true);
}

export function get(url, isMediaRequired = false) {
    return getData(url, isMediaRequired);
}

export function remove(url) {
    return removeData(url, 'DELETE');
}