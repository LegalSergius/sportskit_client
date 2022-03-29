import styles from "../../styles/index.module.css";
import React, { useContext, useEffect, useState } from 'react';
import '../../styles/regular/ServicePanel.css'
import {Link} from "react-router-dom";
import {ADD_PAGE, EDIT_PAGE, PRODUCT_PAGE, SERVICE_PANEL} from "../../routing/routing_consts";
import {get} from "../../httpTasks/tasks/ProductAPITasks";
import {getAPI, getFile, linkObject} from "../../utils/ComponentUtils";
import { StateContext } from "../../contexts";

/*
export default class ServicePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: [],
            countOfSales: undefined,
            userCount: undefined
        }
        this.mediaArray = [];
    }

    componentDidMount() {
        let dataArray = null, countOfSales = undefined;
        const getNewestAnnouncements = async() => {
            return await get(getAPI('products/getProducts?mediaRequired=' + true +
            '&option=updatedAt'), true);
        }
        getNewestAnnouncements().then(async(response) => {
            this.mediaArray = response.mediaArray;
            dataArray = response.productsObject;
            countOfSales = response.countOfSales;
            await get(getAPI('user/getCount')).then((data) => {
                this.setState({dataArray, countOfSales, userCount: data.count});
            })
        })
    }

    componentWillUnmount() {
        this.mediaArray = [];
    }

    render() {
        document.title = "Служебная панель | Sports Kit";

        const IS_MOBILE = this.props.history.location?.state?.isMobile;
        console.log(`isMobile - ${IS_MOBILE}`);

        return (
            <>
                <h2 className={styles.header}>
                    Служебная панель
                </h2>
                <div id="adminButtonsContainer">
                    <button className={IS_MOBILE? "mobileAdminButtons" : "adminButtons"}>
                        <Link
                            className={styles.authorizationLinks}
                            to={linkObject(ADD_PAGE + '/newProduct', true)}>
                            Добавить товар
                        </Link>
                    </button>
                    <button className={IS_MOBILE? "mobileAdminButtons" : "adminButtons"}>
                        <Link
                            className={styles.authorizationLinks}
                            to={linkObject(ADD_PAGE + '/newPromotion', true)}>
                            Добавить акцию на товар
                        </Link>
                    </button>
                    <button className={IS_MOBILE? "mobileAdminButtons" : "adminButtons"}>
                        <Link
                            className={styles.authorizationLinks}
                            to={linkObject(ADD_PAGE + '/newPromo', true)}>
                            Добавить акционный промо-код
                        </Link>
                    </button>
                    <button className={IS_MOBILE? "mobileAdminButtons" : "adminButtons"}>
                        <Link
                            className={styles.authorizationLinks}
                            to={{pathname: EDIT_PAGE + '/product'}}>
                            Редактировать объявление на товар
                        </Link>
                    </button>
                    <button
                        id="deleteProductButton"
                        className={IS_MOBILE? "mobileAdminButtons" : "adminButtons"}>
                        <Link
                            className={styles.authorizationLinks}
                            to={{pathname: EDIT_PAGE + '/deleteProduct'}}>
                            Удалить товар
                        </Link>
                    </button>
                    <button className={IS_MOBILE? "mobileAdminButtons" : "adminButtons"}>
                        <Link
                            className={styles.authorizationLinks}
                            to={{pathname: EDIT_PAGE + '/deletePromotion'}}>
                            Удалить акцию на товар
                        </Link>
                    </button>
                    <button className={IS_MOBILE? "mobileAdminButtons" : "adminButtons"}>
                        <Link
                            className={styles.authorizationLinks}
                            to={{pathname: EDIT_PAGE + '/deletePromoCode'}}>
                            Удалить промо-код
                        </Link>
                    </button>
                </div>
                <div id="downloadableInformationContainer">
                    <span className="information">
                        Количество пользователей онлайн: {this.state.userCount}
                    </span>
                    <span className="information">
                        Недавно выставленные объявления:
                    </span>
                    {this.state.dataArray &&
                        this.state.dataArray.map((element) =>
                            <Link
                                to={PRODUCT_PAGE + '/' + element.id}
                                key={element.id}
                                className={IS_MOBILE? "mobileNewAnnouncementsContainer" : "newAnnouncementsContainer"}>
                                <img
                                    className={IS_MOBILE? "mobileNewAnnouncementPicture" : "newAnnouncementPicture"}
                                    src={getFile(element.id, this.mediaArray)}
                                    alt="Объявление" />
                                <div className="announcementTextInformation">
                                    <span className="announcementSpan">
                                        {(element.name.length > 15)? element.name.slice(0, 13) + "..." : element.name}
                                    </span> <br/>
                                    <span className="announcementSpan">
                                    Цена на продукт:
                                    </span> <br/>
                                    {element.price} &#8376;
                                </div>
                            </Link>
                        )
                    }
                    <span className="information">
                        Общее количество совершенных покупок: {this.state.countOfSales}
                    </span>
                </div>
            </>
        );
    }
}*/
export default function ServicePanel(props) {
    const contextState = useContext(StateContext);

    const [productState, setProductState] = useState({dataList: [], mediaList: [], 
        salesCount: undefined, usersCount: undefined});

    useEffect(async() => {
        let dataArray = [], mediaArray = [];
        let salesCount;

        await get(getAPI('products/getProducts?mediaRequired=true&option=updatedAt'), true)
        .then(async(response) => {
            mediaArray = response.mediaArray;
            dataArray = response.productsObject;
            salesCount = response.countOfSales;
            await get(getAPI('user/getCount')).then((data) => {
                setProductState({dataList: dataArray, mediaList: mediaArray,
                     salesCount, userCount: data.count});
            });
        })
    });

    const isMobile = contextState.isMobile;
    document.title = 'Служебная панель | Sports Kit';

    return (
        <>
            <h2 className={styles.header}>
                Служебная панель
            </h2>
            <div id="adminButtonsContainer">
                <button className={isMobile? "mobileAdminButtons" : "adminButtons"}>
                    <Link
                        className={styles.authorizationLinks}
                        to={linkObject(ADD_PAGE + '/newProduct', true)}>
                        Добавить товар
                    </Link>
                </button>
                <button className={isMobile? "mobileAdminButtons" : "adminButtons"}>
                    <Link
                        className={styles.authorizationLinks}
                        to={linkObject(ADD_PAGE + '/newPromotion', true)}>
                        Добавить акцию на товар
                    </Link>
                </button>
                <button className={isMobile? "mobileAdminButtons" : "adminButtons"}>
                    <Link
                        className={styles.authorizationLinks}
                        to={linkObject(ADD_PAGE + '/newPromo', true)}>
                        Добавить акционный промо-код
                    </Link>
                </button>
                <button className={isMobile? "mobileAdminButtons" : "adminButtons"}>
                    <Link
                        className={styles.authorizationLinks}
                        to={{pathname: EDIT_PAGE + '/product'}}>
                        Редактировать объявление на товар
                    </Link>
                </button>
                <button
                    id="deleteProductButton"
                    className={isMobile? "mobileAdminButtons" : "adminButtons"}>
                    <Link
                        className={styles.authorizationLinks}
                        to={{pathname: EDIT_PAGE + '/deleteProduct'}}>
                        Удалить товар
                    </Link>
                </button>
                <button className={isMobile? "mobileAdminButtons" : "adminButtons"}>
                    <Link
                        className={styles.authorizationLinks}
                        to={{pathname: EDIT_PAGE + '/deletePromotion'}}>
                        Удалить акцию на товар
                    </Link>
                </button>
                <button className={isMobile? "mobileAdminButtons" : "adminButtons"}>
                    <Link
                        className={styles.authorizationLinks}
                        to={{pathname: EDIT_PAGE + '/deletePromoCode'}}>
                        Удалить промо-код
                    </Link>
                </button>
            </div>
            <div id="downloadableInformationContainer">
                <span className="information">
                    Количество пользователей онлайн: {productState.usersCount}
                </span>
                <span className="information">
                    Недавно выставленные объявления:
                </span>
                {productState.dataList &&
                    productState.dataList.map((element) =>
                        <Link
                            to={PRODUCT_PAGE + '/' + element.id}
                            key={element.id}
                            className={isMobile? "mobileNewAnnouncementsContainer" : "newAnnouncementsContainer"}>
                            <img
                                className={isMobile? "mobileNewAnnouncementPicture" : "newAnnouncementPicture"}
                                src={getFile(element.id, productState.mediaList)}
                                alt="Объявление" />
                            <div className="announcementTextInformation">
                                <span className="announcementSpan">
                                    {(element.name.length > 15)? element.name.slice(0, 13) + "..." : element.name}
                                </span> <br/>
                                <span className="announcementSpan">
                                Цена на продукт:
                                </span> <br/>
                                {element.price} &#8376;
                            </div>
                        </Link>
                    )
                }
                <span className="information">
                    Общее количество совершенных покупок: {productState.salesCount}
                </span>
            </div>
        </>
    );
}