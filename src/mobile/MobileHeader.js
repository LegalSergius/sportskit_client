import React from 'react';
import '../styles/mobile/MobileHeader.css';
import {NavigationInput} from "../components/special/NavigationInput";
import {Link, Redirect} from "react-router-dom";
import {
    AUTH_PAGE, BASKET_PAGE, CATALOG, ENTER_PAGE, INFORMATION_PAGE,
    LIST_PAGE, MAP_PAGE, PRODUCT_PAGE, SERVICE_PANEL
} from "../routing/routing_consts";
import {Logotype} from "../components/special/Logotype";
import {changeAuthState, checkToken, fixEnter, fixExit} from "../utils/UserUtils";
import {getAPI, linkObject} from "../utils/ComponentUtils";
import {getCurrentProducts} from "../utils/ProductUtil";
import {fillArray, get} from "../httpTasks/tasks/ProductAPITasks";
import Header from "../components/Header";

export class MobileHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            catalogList: false,
            promotionList: false,
            authorizationList: false,
            isAuth: false,
            redirected: false,
            userRole : '',
            dataArray: [],
            responseObject: null
        }

        this.togglingActiveMenu = this.togglingActiveMenu.bind(this);
        this.togglingListTumbler = this.togglingListTumbler.bind(this);
        this.submitResponse = this.submitResponse.bind(this);
    }

    componentDidMount() {
        fixEnter();
        window.onbeforeunload = function () {
            fixExit();
            return '';
        }
        const TOKEN = localStorage.getItem('token');
        let isAuth = false, userRole;

        checkToken(TOKEN).then((decodedToken) => {
            if (decodedToken) {
                isAuth = true;
                userRole = decodedToken.role;
            }
        });

        getCurrentProducts().then(async(result) => {
            let dataArray = await fillArray(result);
            this.setState({dataArray, isAuth, userRole});
        });
    }

    togglingActiveMenu(event) {
        let mobileNavigation = document.querySelector('.mobileNavigation');
        let navigationHamburgerButton = document.querySelector('.mobileButtonHamburger');
        let mobileImageSwitcher = document.querySelector('.mobileImageSwitcher');
        let productListPaginationContainer = document.querySelector('.bottomContainer');

        mobileNavigation?.classList?.toggle('mobileNavigationActive');
        navigationHamburgerButton?.classList?.toggle('mobileButtonHamburgerActive');
        mobileImageSwitcher?.classList?.toggle('mobileImageSwitcherBlur');
        productListPaginationContainer?.classList?.toggle('bottomContainerBlur');
    }

    togglingListTumbler(event, tumblerId) {
        event.preventDefault();

        let currentTumbler = document.getElementById(tumblerId);
        currentTumbler.classList.toggle('mobileListTumblerActive');

        if (tumblerId === 'catalogListTumbler') {
            this.setState((state) => ({
               catalogList: !state.catalogList
            }));
        } else if (tumblerId === 'promotionListTumbler') {
            this.setState((state) => ({
                promotionList: !state.promotionList
            }));
        } else {
            this.setState((state) => ({
                authorizationList: !state.authorizationList
            }));
        }
    }

    async submitResponse(event, inputValue) {
        try {
            await get(getAPI('products/getProduct/' + inputValue),
                true).then((response) => {
                    if (response.dataValues) {
                        this.setState({responseObject: response, redirected: true});
                    }
                }
            );
        } catch (e) {
            console.log(`ошибка - ${e}`);
            if (inputValue) {
                alert('К сожалению, по значению "' + inputValue + '" ничего найдено. Повторите снова');
            }
        }
    }

    render() {
        if (this.state.redirected) {
            return (
                <>
                    <Header />
                    <Redirect to={PRODUCT_PAGE + '/' + this.state.responseObject.dataValues.id}/>
                </>);
        }

        return (
            <>
                <div id="mobileHeaderContainer">
                    <div id="mobileHeaderContainerChild">
                        <NavigationInput
                            isMobile
                            propsSubmit={this.submitResponse}
                            dataArray={this.state.dataArray} />
                    </div>
                    <div className="mobileNavigation">
                        <button
                            id="mobileNavigationButton"
                            onClick={(event) => this.togglingActiveMenu(event)}>
                            <span className="mobileButtonHamburger">
                            </span>
                        </button>
                        <Logotype
                            isMobile
                            toggleMenu={this.togglingActiveMenu} />
                        <nav className="mobileNavigationList">
                            <div>
                                <Link
                                    to={linkObject(CATALOG, true)}
                                    className="mobileExpandableLink mobileNavigationLinks">
                                    Каталог
                                </Link>
                                <span
                                    id="catalogListTumbler"
                                    className="mobileListTumbler"
                                    onClick={(event) =>
                                        this.togglingListTumbler(event, 'catalogListTumbler')}>
                                    &#x25B2;
                                </span>
                                {this.state.catalogList &&
                                    <ul className="mobileCatalogAndPromotionList">
                                        <Link
                                            to={linkObject(LIST_PAGE + '/equipment', true)}
                                            className="mobileCatalogListLinks">
                                            Оборудование
                                        </Link>
                                        <Link
                                            to={linkObject(LIST_PAGE + '/accessories', true)}
                                            className="mobileCatalogListLinks">
                                            Аксессуары
                                        </Link>
                                        <Link
                                            to={linkObject(LIST_PAGE + '/nutrition', true)}
                                            className="mobileCatalogListLinks">
                                            Питание
                                        </Link>
                                        <Link
                                            to={linkObject(LIST_PAGE + '/clothes', true)}
                                            className="mobileCatalogListLinks">
                                            Одежда
                                        </Link>
                                    </ul> }
                            </div>
                            <div>
                                <Link
                                    to="/"
                                    onTouchStart={(event) => this.togglingActiveMenu(event)}
                                    className="mobileExpandableLink mobileNavigationLinks">
                                    Акции
                                </Link>
                                <span
                                    id="promotionListTumbler"
                                    className="mobileListTumbler"
                                    onClick={(event) =>
                                        this.togglingListTumbler(event, 'promotionListTumbler')}>
                                    &#x25B2;
                                </span>
                                {this.state.promotionList &&
                                    <ul className="mobileCatalogAndPromotionList">
                                        <Link
                                            to="/"
                                            className="mobileCatalogListLinks">
                                            Искать на товары
                                        </Link>
                                        <Link
                                            to="/"
                                            className="mobileCatalogListLinks">
                                            Ввести промо-код
                                        </Link>
                                        <Link
                                            to="/"
                                            className="mobileCatalogListLinks">
                                            Мои покупки
                                        </Link>
                                </ul> }
                            </div>
                            <Link
                                to={MAP_PAGE}
                                onTouchStart={(event) => this.togglingActiveMenu(event)}
                                className="mobileNavigationLinks">
                                Карта филиалов
                            </Link>
                            <Link
                                to={linkObject(INFORMATION_PAGE, true)}
                                onTouchStart={(event) => this.togglingActiveMenu(event)}
                                className="mobileNavigationLinks">
                                О магазине
                            </Link>
                            <div>
                                <Link
                                    to={linkObject(AUTH_PAGE)}
                                    className="mobileExpandableLink mobileNavigationLinks">
                                    Учетные записи
                                </Link>
                                <span
                                    id="authorizationListTumbler"
                                    className="mobileListTumbler"
                                    onClick={(event) =>
                                        this.togglingListTumbler(event, 'authorizationListTumbler')}>
                                    &#x25B2;
                                </span>
                                {this.state.authorizationList &&
                                    <ul className="mobileCatalogAndPromotionList">
                                        {this.state.isAuth?
                                            <span
                                                className="mobileCatalogListLinks"
                                                onClick={() => {
                                                    changeAuthState();
                                                    this.setState({isAuth: false, userRole: ''});
                                                    window.location.reload(true);
                                                }}>
                                                Выйти
                                            </span>
                                            :
                                            <>
                                                <Link
                                                    to={{
                                                        pathname: ENTER_PAGE + 'user'
                                                    }}
                                                    className="mobileCatalogListLinks">
                                                    Войти
                                                </Link>
                                                <Link
                                                    to={{
                                                        pathname: ENTER_PAGE + 'admin'
                                                    }}
                                                    className="mobileCatalogListLinks">
                                                    Я - админ.
                                                </Link>
                                            </>}
                                        {this.state.userRole === 'ADMIN' &&
                                            <Link
                                                to={linkObject(SERVICE_PANEL, true)}
                                                className="mobileCatalogListLinks">
                                                Служебная панель
                                            </Link>
                                        }
                                    </ul> }
                            </div>
                            <Link
                                to={linkObject(BASKET_PAGE, true)}
                                onTouchStart={(event) => this.togglingActiveMenu(event)}
                                className="mobileNavigationLinks">
                                Корзина товаров
                            </Link>
                        </nav>
                    </div>
                </div>
            </>
        );
    }
}