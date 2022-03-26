import React from "react";
import '../../styles/regular/ProductPage.css';
import '../../styles/mobile/MobileProductPage.css';
/*
export class ProductInformationContainer extends React.Component {
    getNewPrice(productPrice, promotionSize) {
        return (productPrice / 100) * (100 - promotionSize);
    }

    render() {
        const PRODUCT = this.props.product, PROMOTION = this.props.promotion, IS_MOBILE = this.props.isMobile;

        return (
            <div id={IS_MOBILE? "mobileProductInformationContainer" : ""}>
                <span className="productName">
                    {PRODUCT?.name ?? 'Товар'}
                </span>
                <hr color="#000"/>
                <span id={IS_MOBILE? "mobileProductInformationHeader" : "descriptionHeader"}>
                    Описание:
                </span>
                <p id={IS_MOBILE? "mobileProductDescription" : "description"}>
                    {PRODUCT?.description ?? 'На товар нет описания'}
                </p>
                <hr color="#000"/>
                <span className={IS_MOBILE? "" : "price"}>
                    Цена:
                    <span
                        id={(PROMOTION)? "priceWithPromotion" : IS_MOBILE? "mobileProductPagePrice" : ""}
                        className={IS_MOBILE? "" : "price"}>
                        {PRODUCT?.price ?? 0}
                    </span>
                        &#8376;
                        {PROMOTION &&
                            <span className="productPromotion">
                                C учетом скидки на товар: {this.getNewPrice(PRODUCT?.price, PROMOTION?.size)}
                                &#8376;
                            </span> }
                </span>
            </div>
        );
    }
}*/
export function ProductInformationContainer(props) {
    const product = props.product;
    const promotion = props.promotion;
    const isMobile = props.isMobile;
   
    const getNewPrice = (productPrice, promotionSize) => {
        return (productPrice / 100) * (100 - promotionSize);
    };

    return (
        <div id={isMobile? "mobileProductInformationContainer" : ""}>
            <span className="productName">
                {product?.name ?? 'Товар'}
            </span>
            <hr color="#000"/>
            <span id={isMobile? "mobileProductInformationHeader" : "descriptionHeader"}>
                Описание:
            </span>
            <p id={isMobile? "mobileProductDescription" : "description"}>
                {product?.description ?? 'На товар нет описания'}
            </p>
            <hr color="#000"/>
            <span className={isMobile? "" : "price"}>
                Цена:
                <span
                    id={(promotion)? "priceWithPromotion" : isMobile? "mobileProductPagePrice" : ""}
                    className={isMobile? "" : "price"}>
                    {product?.price ?? 0}
                </span>
                    &#8376;
                    {promotion &&
                        <span className="productPromotion">
                            C учетом скидки на товар: {getNewPrice(product?.price, promotion?.size)}
                            &#8376;
                        </span> }
            </span>
        </div>
    );
}