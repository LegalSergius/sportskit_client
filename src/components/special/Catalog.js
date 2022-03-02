import React from 'react';
import '../../styles/regular/Catalog.css';
import styles from "../../styles/index.module.css";
import {LIST_PAGE} from "../../routing/routing_consts";
import {Link} from "react-router-dom";

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        document.title = "Каталог | Sports Kit";

        const IS_MOBILE = this.props.location.state?.isMobile;

        return (
            <div id="catalogContainer">
                <h1
                    id={IS_MOBILE? "mobileCatalogHeader" : "catalogHeader"}
                    className={styles.commonFont}>
                    Каталог
                </h1>
                <div>
                    <Link
                        className={IS_MOBILE? "mobileCatalogLink" : "linkButton"}
                        to={LIST_PAGE + '/equipment'}>
                        <img
                            src="../static/equipment.jpg"
                            alt="Оборудовaние"/>
                        <span
                            id="productPageLink"
                            className={styles.authorizationLinks}>
                            Оборудование
                        </span>
                    </Link>
                    <Link
                        className={IS_MOBILE? "mobileCatalogLink" : "linkButton"}
                        to={LIST_PAGE + '/accessories'}>
                        <img
                            src="../static/accessories.jpg"
                            alt="Аксессуары" />
                        <span
                            id="productPageLink"
                            className={styles.authorizationLinks}>
                            Акссесуары
                        </span>
                    </Link>
                    <Link
                        className={IS_MOBILE? "mobileCatalogLink" : "linkButton"}
                        to={LIST_PAGE + '/nutrition'}>
                        <img
                            src="../static/nutrition.jpg"
                            alt="Питание"/>
                        <span
                            id="productPageLink"
                            className={styles.authorizationLinks}>
                            Питание
                        </span>
                    </Link>
                    <Link
                        className={IS_MOBILE? "mobileCatalogLink" : "linkButton"}
                        to={LIST_PAGE + '/clothes'}>
                        <img
                            src="../static/clothes.jpg"
                            alt="Одежда"/>
                        <span
                            id="productPageLink"
                            className={styles.authorizationLinks}>
                            Одежда
                        </span>
                    </Link>
                </div>
            </div>
        );
    }
}