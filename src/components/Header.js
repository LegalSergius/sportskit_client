import React, {useContext, useEffect, useState} from 'react';
import styles from "../styles/index.module.css";
import {getAPI, handleInputKeyDown, handleListItemKeyDown, linkObject, submitResponse} from "../utils/ComponentUtils";
import {Link, Redirect} from "react-router-dom";
import {AUTH_PAGE, BASKET_PAGE, CATALOG, ENTER_PAGE, HOME_PAGE, INFORMATION_PAGE,
    LIST_PAGE, MAP_PAGE, PRODUCT_PAGE, SERVICE_PANEL} from "../routing/routing_consts";
import '../styles/regular/Header.css'
import {fillArray, get} from "../httpTasks/tasks/ProductAPITasks";
import {checkTokenValidity} from "../httpTasks/tasks/AuthAPITasks";
import {changeAuthState, checkToken, fixEnter, fixExit} from "../utils/UserUtils";
import MediaQuery from 'react-responsive';
import {MobileHeader} from "../mobile/MobileHeader";
import {Logotype} from "./special/Logotype";
import {NavigationInput} from "./special/NavigationInput";
import {NavigationMenu} from "./special/NavigationMenu";
import {getCurrentProducts} from "../utils/ProductUtil";
import {StateContext} from "../contexts";
/*
export default class Header extends React.Component {
    static contextType = StateContext;

    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            redirected: false,
            showAuthorizationList: false,
            catalogList: false,
            sharesList: false,
            inputValue: '',
            userRole: '',
            dataArray: [],
            responseObject: null
        };

       this.responseObject = null;

        this.submitResponse = this.submitResponse.bind(this);
        this.showList = this.showList.bind(this);
        this.clearList = this.clearList.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        fixEnter();
        window.onbeforeunload = function () {
            fixExit();
            return '';
        }

        const TOKEN = localStorage.getItem('token');
        let dataArray, isAuth = false, userRole;

        checkToken(TOKEN).then((decodedToken) => {
            if (decodedToken) {
                isAuth = true;
                userRole = decodedToken.role;
            }
        });

        /*const response = async() => {
            return await get(getAPI('products/getProducts?mediaRequired=' + false));
        };
        response().then((async(result) => {
            dataArray = await fillArray(result);
            this.setState({dataArray, isAuth, userRole});
            })
        );
        getCurrentProducts().then(async(result) => {
            dataArray = await fillArray(result);
            this.setState({dataArray, isAuth, userRole});
        });
    }

    async submitResponse(event, inputValue) {
        event.preventDefault();
        try {
            await get(getAPI('products/getProduct/' + inputValue),
                true).then((response) => {
                    if (response.dataValues) {
                       // this.responseObject = response;
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

    showList(position) {
        if (position === 0) {
            this.setState({showAuthorizationList: true});
        } else if (position === 1) {
            document.getElementById('listItem1')
                .style.color = '#3088C7';
            this.setState({catalogList: true});
        } else {
            document.getElementById('listItem2')
                .style.color = '#3088C7';
            this.setState({sharesList: true});
        }
    }

    clearList(event, position) {
        let relatedTarget = event.relatedTarget.className;
        if (relatedTarget !== 'dropDownListItem' && relatedTarget !== 'dropDownListItemLink'
            && relatedTarget !== 'authList' && relatedTarget !== 'authListContainer'
            && relatedTarget !== 'authListItem' && relatedTarget !== 'authListItemLink') {
            if (position === 0) {
                this.setState({showAuthorizationList: false});
            }
            else if (position === 1) {
                document.getElementById('listItem1')
                    .style.color = '#FFF';
                this.setState({catalogList: false});
            } else {
                document.getElementById('listItem2')
                    .style.color = '#FFF';
                this.setState({sharesList: false});
            }
        }
    }

    logOut() {
        changeAuthState();
        this.setState({isAuth: false, userRole: ''});
        window.location.reload(true);
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
                <MediaQuery maxDeviceWidth={992}>
                    {(matches) =>
                        matches
                            ?
                            <MobileHeader/>
                            :
                            <div id="container">
                                <div id="upperContainer">
                                    <Logotype />
                                    <div id="headerContainersChild">
                                        <NavigationInput
                                            propsSubmit={(event, inputValue) => {
                                                submitResponse(event, inputValue).then((result) => {
                                                    console.log(`result - ${JSON.stringify(result)}`);
                                                    this.setState(result);
                                                }
                                               this.submitResponse
                                            }
                                            dataArray={this.state.dataArray} />
                                    </div>
                                    <div id="mainButtonsContainer">
                                        <button
                                            id="accountsButton"
                                            onMouseOver={() => this.showList(0)}
                                            onMouseOut={(event) => this.clearList(event, 0)}>
                                            <img
                                                id="accountsButtonPic"
                                                src="/static/accounts_button_pic.png"
                                                alt="Иконка авторизации"
                                                width="40"
                                                height="40"/>
                                            <Link
                                                to={(this.state.isAuth)? '/': AUTH_PAGE}
                                                id={(this.state.isAuth)? 'notActiveAuthLink': ''}
                                                className="authListItemLink">
                                                Учетные записи
                                            </Link>
                                            {this.state.showAuthorizationList &&
                                                <div className="authListContainer">
                                                    <NavigationMenu
                                                        isAuth={this.state.isAuth}
                                                        userRole={this.state.userRole}
                                                        logOut={this.logOut}/>
                                                </div> }
                                        </button>
                                        <Link
                                            to={linkObject(BASKET_PAGE, false)}
                                            id="basketButton">
                                            <img
                                                id="basketButtonPic"
                                                src="/static/basket_image.png"
                                                alt="Картинка корзины"
                                                width="40"
                                                height="40"/>
                                            Корзина товаров
                                        </Link>
                                    </div>
                                </div>
                                <ul id="navigationList">
                                    <li
                                        className="menuItem"
                                        onMouseOver={() => this.showList(1)}
                                        onMouseOut={(event) => this.clearList(event, 1)}>
                                        <Link
                                            to={linkObject(CATALOG, false)}
                                            className="menuItemLink"
                                            onMouseOut={(event) => this.clearList(event, 1)}>
                                            <span id="listItem1">
                                                Каталог
                                            </span>
                                        </Link>
                                        {this.state.catalogList &&
                                            <ul className="dropDownList">
                                                <li
                                                    className="dropDownListItem"
                                                    onMouseOut={(event) => this.clearList(event, 1)}>
                                                    <Link
                                                        to={LIST_PAGE + '/equipment'}
                                                        className="dropDownListItemLink">
                                                        Оборудование
                                                    </Link>
                                                </li>
                                                <li
                                                    className="dropDownListItem"
                                                    onMouseOut={(event) => this.clearList(event, 1)}>
                                                    <Link
                                                        to={LIST_PAGE + '/accessories'}
                                                        className="dropDownListItemLink">
                                                        Аксессуары
                                                    </Link>
                                                </li>
                                                <li
                                                    className="dropDownListItem"
                                                    onMouseOut={(event) => this.clearList(event, 1)}>
                                                    <Link
                                                        to={LIST_PAGE + '/nutrition'}
                                                        className="dropDownListItemLink">
                                                        Питание
                                                    </Link>
                                                </li>
                                                <li
                                                    className="dropDownListItem"
                                                    onMouseOut={(event) => this.clearList(event, 1)}>
                                                    <Link
                                                        to={LIST_PAGE + '/clothes'}
                                                        className="dropDownListItemLink">
                                                        Одежда
                                                    </Link>
                                                </li>
                                            </ul> }
                                    </li>
                                    <li
                                        className="menuItem"
                                        onMouseOver={() => this.showList(2)}
                                        onMouseOut={(event) => this.clearList(event, 2)}>
                                        <Link
                                            to="/"
                                            className="menuItemLink"
                                            onMouseOut={(event) => this.clearList(event, 2)}>
                                            <span id="listItem2">
                                                Акции
                                            </span>
                                        </Link>
                                        {this.state.sharesList &&
                                            <ul className="dropDownList">
                                                <li
                                                    className="dropDownListItem"
                                                    onMouseOut={(event) => this.clearList(event, 2)}>
                                                    <Link
                                                        to="/"
                                                        className="dropDownListItemLink">
                                                        Искать на товары
                                                    </Link>
                                                </li>
                                                <li
                                                    className="dropDownListItem"
                                                    onMouseOut={(event) => this.clearList(event, 2)}>
                                                    <Link
                                                        to="/"
                                                        className="dropDownListItemLink">
                                                        Ввести промо-код
                                                    </Link>
                                                </li>
                                                <li
                                                    className="dropDownListItem"
                                                    onMouseOut={(event) => this.clearList(event, 2)}>
                                                    <Link
                                                        to="/"
                                                        className="dropDownListItemLink">
                                                        Мои покупки
                                                    </Link>
                                                </li>
                                            </ul> }
                                    </li>
                                    <li className="menuItem">
                                        <Link
                                            to={MAP_PAGE}
                                            className="menuItemLink">
                                            Карта филиалов
                                        </Link>
                                    </li>
                                    <li className="menuItem">
                                        <Link
                                            to={linkObject(INFORMATION_PAGE, false)}
                                            className="menuItemLink">
                                            О магазине
                                        </Link>
                                    </li>
                                </ul>
                            </div> }
                </MediaQuery>
            </>
        )
    }
}*/

//const LIST_FLAGS = {isAuthorizationListShown: 0b001, isCatalogShown: 0b010, isSharesListShown: 0b100};

export default function Header() {
    const contextState = useContext(StateContext);
    
    const [dataList, setDataList] = useState([]);
    const [overrideState, setOverrideState] = useState({responseObject: null, isRedirected: false});
   // const [flagState, setFlagState] = useState(0);
    const [flagState, setFlagState] = useState({isAuthorizationListShown: false, isCatalogShown: false, 
        isSharesListShown: false});

    useEffect(async() => {
        fixEnter();
        window.onbeforeunload = function () {
            fixExit();
            return '';
        }

        getCurrentProducts().then(async(result) => {
            let dataList = await fillArray(result);
            setDataList(dataList);
        });
    });

    if (overrideState.isRedirected) {
        return (
            <>
                <Header />
                <Redirect to={PRODUCT_PAGE + '/' + overrideState.responseObject.dataValues.id}/>
            </>);
    }
    console.log(`${flagState.isAuthorizationListShown} ${flagState.isCatalogShown} ${flagState.isSharesListShown}`);
    return (
        <>
            {contextState.isMobile
                ?
                <MobileHeader/>
                :
                <div id="container">
                    <div id="upperContainer">
                        <Logotype />
                        <div id="headerContainersChild">
                            <NavigationInput
                                propsSubmit={(event, inputValue) => {
                                    submitResponse(event, inputValue).then((result) => {
                                        console.log(`result - ${JSON.stringify(result)}`);
                                        setOverrideState(result);
                                        });
                                    }
                                }
                                dataArray={dataList} />
                        </div>
                        <div id="mainButtonsContainer">
                            <button
                                id="accountsButton"
                                //onMouseOver={() => showList(0, flagState, setFlagState)}
                                onMouseOver={() => showList(0, setFlagState)}
                                onMouseOut={/*(event) => clearList(event, 0,
                                flagState, setFlagState)*/(event) => clearList(event, 0, setFlagState)}>
                                <img
                                    id="accountsButtonPic"
                                    src="/static/accounts_button_pic.png"
                                    alt="Иконка авторизации"
                                    width="40"
                                    height="40"/>
                                <Link
                                    to={(contextState.authState.auth)? '/': AUTH_PAGE}
                                    id={(contextState.authState.auth)? 'notActiveAuthLink': ''}
                                    className="authListItemLink">
                                    Учетные записи
                                </Link>
                                {/*(flagState & LIST_FLAGS.isAuthorizationListShown) &&*/}
                                {flagState.isAuthorizationListShown &&
                                    <div className="authListContainer">
                                        <NavigationMenu
                                            isAuth={contextState.authState.auth}
                                            userRole={contextState.authState.userRole}
                                            logOut={() => {
                                                changeAuthState();
                                                contextState.setAuthState({auth: false, userName: '',
                                                    userRole: ''});
                                                window.location.reload(true);
                                                }
                                            } />
                                    </div>
                                }
                            </button>
                            <Link
                                to={BASKET_PAGE}
                                id="basketButton">
                                <img
                                    id="basketButtonPic"
                                    src="/static/basket_image.png"
                                    alt="Картинка корзины"
                                    width="40"
                                    height="40"/>
                                Корзина товаров
                            </Link>
                        </div>
                    </div>
                    <ul id="navigationList">
                        <li
                            className="menuItem"
                            //onMouseOver={() => showList(1, flagState, setFlagState)}
                            onMouseOver={() => showList(1, setFlagState)}
                            onMouseOut={/*(event) => clearList(event, 1,
                                flagState, setFlagState)*/(event) => clearList(event, 1, setFlagState)}>
                            <Link
                                to={CATALOG}
                                className="menuItemLink"
                                onMouseOut={/*(event) => clearList(event, 1,
                                    flagState, setFlagState)*/(event) => clearList(event, 1, setFlagState)}>
                                <span id="listItem1">
                                    Каталог
                                </span>
                            </Link>
                             {/*(flagState & LIST_FLAGS.isCatalogShown) &&*/}
                             {flagState.isCatalogShown &&
                                <ul className="dropDownList">
                                    <li
                                        className="dropDownListItem"
                                        onMouseOut={(event) => clearList(event, 1,
                                            flagState, setFlagState)}>
                                        <Link
                                            to={LIST_PAGE + '/equipment'}
                                            className="dropDownListItemLink">
                                            Оборудование
                                        </Link>
                                    </li>
                                    <li
                                        className="dropDownListItem"
                                        onMouseOut={/*(event) => clearList(event, 1,
                                            flagState, setFlagState)*/(event) => clearList(event, 1, setFlagState)}>
                                        <Link
                                            to={LIST_PAGE + '/accessories'}
                                            className="dropDownListItemLink">
                                            Аксессуары
                                        </Link>
                                    </li>
                                    <li
                                        className="dropDownListItem"
                                        onMouseOut={/*(event) => clearList(event, 1,
                                            flagState, setFlagState)*/(event) => clearList(event, 1, setFlagState)}>
                                        <Link
                                            to={LIST_PAGE + '/nutrition'}
                                            className="dropDownListItemLink">
                                            Питание
                                        </Link>
                                    </li>
                                    <li
                                        className="dropDownListItem"
                                        onMouseOut={/*(event) => clearList(event, 1,
                                            flagState, setFlagState)*/(event) => clearList(event, 1, setFlagState)}>
                                        <Link
                                            to={LIST_PAGE + '/clothes'}
                                            className="dropDownListItemLink">
                                            Одежда
                                        </Link>
                                    </li>
                                </ul>
                            }
                        </li>
                        <li
                            className="menuItem"
                            //onMouseOver={() => showList(2, flagState, setFlagState)}
                            onMouseOver={() => showList(2, setFlagState)}
                            onMouseOut={/*(event) => clearList(event, 2,
                                flagState, setFlagState)*/(event) => clearList(event, 2, setFlagState)}>
                            <Link
                                to="/"
                                className="menuItemLink"
                                onMouseOut={/*(event) => clearList(event, 2,
                                    flagState, setFlagState)*/(event) => clearList(event, 2, setFlagState)}>
                                <span id="listItem2">
                                    Акции
                                </span>
                            </Link>
                             {/*(flagState & LIST_FLAGS.isSharesListShown) &&*/}
                            {flagState.isSharesListShown &&
                                <ul className="dropDownList">
                                    <li
                                        className="dropDownListItem"
                                        onMouseOut={/*(event) => clearList(event, 2,
                                            flagState, setFlagState)*/(event) => clearList(event, 2, setFlagState)}>
                                        <Link
                                            to="/"
                                            className="dropDownListItemLink">
                                            Искать на товары
                                        </Link>
                                    </li>
                                    <li
                                        className="dropDownListItem"
                                        onMouseOut={/*(event) => clearList(event, 2,
                                            flagState, setFlagState)*/(event) => clearList(event, 2, setFlagState)}>
                                        <Link
                                            to="/"
                                            className="dropDownListItemLink">
                                            Ввести промо-код
                                        </Link>
                                    </li>
                                    <li
                                        className="dropDownListItem"
                                        onMouseOut={/*(event) => clearList(event, 2,
                                            flagState, setFlagState)*/(event) => clearList(event, 2, setFlagState)}>
                                        <Link
                                            to="/"
                                            className="dropDownListItemLink">
                                            Мои покупки
                                        </Link>
                                    </li>
                                </ul>
                            }
                        </li>
                        <li className="menuItem">
                            <Link
                                to={MAP_PAGE}
                                className="menuItemLink">
                                Карта филиалов
                            </Link>
                        </li>
                        <li className="menuItem">
                            <Link
                                to={INFORMATION_PAGE}
                                className="menuItemLink">
                                О магазине
                            </Link>
                        </li>
                    </ul>
                </div>
            }
        </>
    );
}

function showList(position, setFlagState) {
    let newState = {};

    if (position === 0) {
        //flagState |= LIST_FLAGS.isAuthorizationListShown;
        newState = {isAuthorizationListShown: true};
    } else if (position === 1) {
        document.getElementById('listItem1').style.color = '#3088C7';
       //flagState |= LIST_FLAGS.isCatalogShown;
       newState = {isCatalogShown: true};
    } else {
        document.getElementById('listItem2').style.color = '#3088C7';
        //flagState |= LIST_FLAGS.isSharesListShown;
        newState = {isSharesListShown: true};
    }
    //setFlagState(flagState);
    setFlagState((state) => {
        return Object.assign({}, state, newState);
    });
}

function clearList(event, position, setFlagState) {
    let relatedTarget = event.relatedTarget.className;
    let newState = {};

    if (relatedTarget !== 'dropDownListItem' && relatedTarget !== 'dropDownListItemLink'
        && relatedTarget !== 'authList' && relatedTarget !== 'authListContainer'
        && relatedTarget !== 'authListItem' && relatedTarget !== 'authListItemLink') {
        if (position === 0) {
            //flagState &= ~LIST_FLAGS.isAuthorizationListShown;
            newState = {isAuthorizationListShown: false};
        }
        else if (position === 1) {
            document.getElementById('listItem1').style.color = '#FFF';
            //flagState &= ~LIST_FLAGS.isCatalogShown;
            newState = {isCatalogShown: false};
        } else {
            document.getElementById('listItem2').style.color = '#FFF';
            //flagState &= ~LIST_FLAGS.isSharesListShown;
            newState = {isSharesListShown: false};
        }
    }

    //setFlagState(flagState);
    setFlagState((state) => {
        return Object.assign({}, state, newState);
    });
}
