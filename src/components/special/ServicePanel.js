import styles from "../../styles/index.module.css";
import React from 'react';
import '../../styles/regular/ServicePanel.css'
import {Link} from "react-router-dom";
import {ADD_PAGE, EDIT_PAGE, PRODUCT_PAGE} from "../../routing/routing_consts";
import {get} from "../../httpTasks/tasks/ProductAPITasks";
import {getAPI, getFile} from "../../utils/ComponentUtils";

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
                            to={{pathname: ADD_PAGE + '/newProduct'}}>
                            Добавить товар
                        </Link>
                    </button>
                    <button className={IS_MOBILE? "mobileAdminButtons" : "adminButtons"}>
                        <Link
                            className={styles.authorizationLinks}
                            to={{pathname: ADD_PAGE + '/newPromotion'}}>
                            Добавить акцию на товар
                        </Link>
                    </button>
                    <button className={IS_MOBILE? "mobileAdminButtons" : "adminButtons"}>
                        <Link
                            className={styles.authorizationLinks}
                            to={{pathname: ADD_PAGE + '/newPromo'}}>
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
}