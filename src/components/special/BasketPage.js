import React from 'react';
import styles from '../../styles/index.module.css';
import '../../styles/regular/BasketPage.css'
import {Redirect, Link} from "react-router-dom";
import {CATALOG, ENTER_PAGE, PRODUCT_PAGE} from "../../routing/routing_consts";
import {checkTokenValidity} from "../../httpTasks/tasks/AuthAPITasks";
import {get} from "../../httpTasks/tasks/ProductAPITasks";
import {getAPI, getFile} from "../../utils/ComponentUtils";
import {removeData} from "../../httpTasks";
import {checkToken} from "../../utils/UserUtils";


export default class BasketPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            redirected: undefined,
            itemsArray: []
        }
        this.mounted = false;
        this.clickedDelete = false;
        this.mediaArray = [];

        this.getProductPrice = this.getProductPrice.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        const TOKEN = localStorage.getItem('token');

        checkToken(TOKEN).then(async (decodedToken) => {
            if (decodedToken) {
                await get(getAPI('baskets/getBasketById/' +
                    localStorage.getItem('basketId')), true)
                    .then((response) => {
                        this.mounted = true;
                        this.mediaArray = response.mediaArray;
                        this.setState({login: true, itemsArray: response.productsArray});
                    });
            } else {
                this.mounted = true;
                this.setState({login: false});
            }
        });
    }

    getProductPrice(price, promotion) {
        if (!promotion) {
            return price;
        }

        return (price / 100) * (100 - promotion.size);
    }

    async deleteItem(itemId) {
        this.clickedDelete = true;

        await removeData(getAPI('baskets/deleteBasketItemById?productId=' +
            itemId + '&basketId=' + localStorage.getItem('basketId')), 'DELETE')
            .then((response) => {
                this.mediaArray = response?.mediaArray;
                this.setState({itemsArray: response?.productsArray});
            });
    }

    componentWillUnmount() {
        this.mounted = false;
        this.mediaArray = null;
    }

    render() {
        document.title = "Корзина Ваших товаров | Sports Kit";

        const ITEMS_ARRAY = this.state.itemsArray, ARRAY_IS_EMPTY = (ITEMS_ARRAY.length === 0),
            TOTAL_COUNT = ITEMS_ARRAY.length, REDIRECT_ID = this.state.redirected,
            IS_MOBILE = this.props.location.state?.isMobile;

        let enumeration = 0, showPrice = '', totalPrice = 0;

        for (let index = 0; index < TOTAL_COUNT; index++) {
            let elementPrice = this.getProductPrice(ITEMS_ARRAY[index].price, ITEMS_ARRAY[index].promotion);

            if (TOTAL_COUNT > 1) {
                if (index !== 0) {
                    showPrice += '+ ';
                }
                showPrice += elementPrice + ' ';
            }
            totalPrice += elementPrice;
        }

        if (!this.state.login && this.mounted) {
            return <Redirect to={{pathname: ENTER_PAGE + 'user', state: {previous: this.props.location.pathname}}} />
        } else if (REDIRECT_ID) {
            return <Redirect to={PRODUCT_PAGE + '/' + REDIRECT_ID} />
        }

        return (
            <div
                id={IS_MOBILE? "" : "desktopBasketContainer"}
                className="basketContainer">
                <h2
                    id={IS_MOBILE? "mobileBasketHeader" : ""}
                    className={styles.commonFont}>
                    Корзина товаров
                </h2>
                <span id="productsCount">
                    Количество товаров в Вашей корзине: {TOTAL_COUNT}
                </span>
                {ARRAY_IS_EMPTY
                    ?
                    <span id="emptyBasket">
                        Ваша корзина на данный момент пуста. Выберите что-нибудь, чтобы пополнить её.
                        <Link
                            to={CATALOG}
                            className="basketPageLink">
                            Поиск товаров
                        </Link>
                    </span>
                    :
                    <>
                        {ITEMS_ARRAY.map((element) =>
                            <>
                                <div
                                    id="topBorder"
                                    className="dividerContainer">
                                </div>
                                <div className={IS_MOBILE? "mobileBasketItemContainer" : "basketItemContainer"}
                                    onClick={() => {
                                        (this.clickedDelete)?
                                            this.clickedDelete = false : this.setState({redirected: element.id}
                                        )
                                    }}>
                                    {++enumeration}.
                                    <img
                                        className={IS_MOBILE? "mobileBasketItemPicture" : "basketItemPicture"}
                                        src={getFile(element.id, this.mediaArray)}
                                        alt="Картинка"/>
                                        <span className={IS_MOBILE? "mobileBasketItemInformation" :
                                            "basketItemInformation"}>
                                            {element.name}
                                        </span>
                                        <span className={IS_MOBILE? "mobileBasketItemInformation" :
                                            "basketItemInformation"}>
                                            Цена: {this.getProductPrice(element.price, element.promotion)} &#8376;
                                        </span>
                                        <div className={IS_MOBILE? "" : "removeItemContainer"}>
                                            <div
                                                className={IS_MOBILE? "mobileRemoveItem" : "removeItem"}
                                                onClick={() => this.deleteItem(element.id)}>
                                                &times;
                                            </div>
                                        </div>
                                    </div>
                                <div className="dividerContainer">
                                </div>
                            </>
                        )}
                        <span className={IS_MOBILE? "mobileTotalSpan" : "totalSpan"}>
                            Итого к оплате
                        </span>
                        : {showPrice !== '' && showPrice + ' ='} {totalPrice} &#8376;
                        <Link
                            to="/"
                            className="basketPageLink">
                            Перейти к оплате
                        </Link>
                    </>
                }
            </div>
        );
    }
}