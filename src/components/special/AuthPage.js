import React from 'react';
import styles from '../../styles/index.module.css';
import '../../styles/regular/AuthPage.css';
import {Link} from "react-router-dom";
import {ENTER_PAGE, REGISTRATION_PAGE} from "../../routing/routing_consts";

export default class AuthPage extends React.Component {
    render() {
        document.title = "Авторизация | Sports Kit";
        const IS_MOBILE = window.matchMedia('(max-width: 992px)').matches;

        return (
            <>
                <h1
                    className={styles.header}>
                    Авторизация
                </h1>
                <div
                    id={IS_MOBILE? "mobileButtonsContainer" : "desktopButtonsContainer"}
                    className="buttonsContainer">
                    <Link
                        to={{
                            pathname: ENTER_PAGE + 'user',
                        }}
                        className="authorizationButtons">
                        Войти
                    </Link>
                    <img
                        id="dividerImage"
                        src="../static/divider.jpg"
                        alt="Разделитель" />
                    <Link
                        to={REGISTRATION_PAGE}
                        className="authorizationButtons">
                        Зарегистрироваться
                    </Link>
                </div>
            </> )
    }
}