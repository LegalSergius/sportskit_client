import React from "react";
import '../../styles/regular/ProductPage.css';
import '../../styles/mobile/MobileProductPage.css';
import {getErrorMessage, postOrPutData} from "../../httpTasks";
import {getAPI} from "../../utils/ComponentUtils";

/*
export class ProductPaymentContainer extends React.Component {
    async addBasketItem(productId) {
        const BASKET_ID = localStorage.getItem('basketId');
        let isConfirmed;

        if (!BASKET_ID) {
            isConfirmed = window.confirm('Вы не авторизованы в системе.\nДля получения доступа к ' +
                'корзине войдите или зарегистрируйтесь.');
            if (isConfirmed) {
                await this.props.changeRedirect({redirectedToLoginPage: true});
                return;
            }
        }
        try {
            let response = await postOrPutData(getAPI('baskets/addBasketItem'), 'POST',
                {productId, basketId: BASKET_ID});
            isConfirmed = window.confirm('Добавлен новый продукт в корзину.\nКоличество продуктов в корзине: ' +
                response.count + '.\nОткрыть корзину для просмотра? ');
        } catch (e) {
            isConfirmed = window.confirm(getErrorMessage());
        } finally {
            if (isConfirmed) {
               await this.props.changeRedirect({redirectedToBasket: true});
            }
        }
    }

    render() {
        const IS_MOBILE = this.props.isMobile;

        return (
            <div id={IS_MOBILE? "mobileProductPagePaymentContainer" : "paymentButtonsContainer"}>
                <button className={IS_MOBILE? "mobilePaymentButton" : "paymentButton"}>
                    <img
                        className="paymentImage"
                        src="../../static/cart.png"
                        alt="Тележка"/>
                    Купить
                </button>
                <button
                    id={IS_MOBILE? "" : "basket"}
                    className={IS_MOBILE? "mobilePaymentButton" : "paymentButton"}
                    onClick={() => this.addBasketItem(this.props.productId)}>
                        <span>
                            &#43;
                        </span>
                    <span className="basketSpan">
                        Добавить в корзину
                    </span>
                </button>
            </div>
        );
    }
}*/
export function ProductPaymentContainer(props) {
    const isMobile = props.isMobile;

    const addBasketItem = async(productId) => {
        const basketId = localStorage.getItem('basketId');
        let isConfirmed;

        if (!basketId) {
            isConfirmed = window.confirm('Вы не авторизованы в системе.\nДля получения доступа к ' +
                'корзине войдите или зарегистрируйтесь.');
            if (isConfirmed) {
                await props.changeRedirect({redirectedToLoginPage: true});
                return;
            }
        }
        try {
            let response = await postOrPutData(getAPI('baskets/addBasketItem'), 'POST',
                {productId, basketId});
            isConfirmed = window.confirm('Добавлен новый продукт в корзину.\nКоличество продуктов в корзине: ' +
                response.count + '.\nОткрыть корзину для просмотра? ');
        } catch (e) {
            isConfirmed = window.confirm(getErrorMessage());
        } finally {
            if (isConfirmed) {
               await props.changeRedirect({redirectedToBasket: true});
            }
        }
    };

    return (
        <div id={isMobile? "mobileProductPagePaymentContainer" : "paymentButtonsContainer"}>
            <button className={isMobile? "mobilePaymentButton" : "paymentButton"}>
                <img
                    className="paymentImage"
                    src="../../static/cart.png"
                    alt="Тележка"/>
                Купить
            </button>
            <button
                id={isMobile? "" : "basket"}
                className={isMobile? "mobilePaymentButton" : "paymentButton"}
                onClick={() => addBasketItem(props.productId)}>
                    <span>
                        &#43;
                    </span>
                <span className="basketSpan">
                    Добавить в корзину
                </span>
            </button>
        </div>
    );
}