import {getAPI} from "./ComponentUtils";
import {get} from "../httpTasks/tasks/ProductAPITasks";
import {checkToken} from "./UserUtils";

export async function getProduct(currentPath, token) {
    let productId = currentPath.at(-1), role, finalResponse;
    await checkToken(token).then((decodedToken) => {
        if (decodedToken) {
            role = decodedToken.role;
        }
    });

    await get(getAPI('products/getProduct/ ' + productId), true)
        .then((response) => {
            finalResponse = {productObject: {product: response.dataValues, mediaImagesArray: response.mediaArray,
                productPromotion: response.promotion, productType: response.productType}, userRole: role};
    });

    return finalResponse;
}

export async function getCurrentProducts() {
    return await get(getAPI('products/getProducts?mediaRequired=' + false));
}