import React from 'react';
import styles from "../../styles/index.module.css";
import '../../styles/regular/LoginPage.css';
import '../../styles/regular/RegistrationPage.css';
import {Link} from "react-router-dom";
import {ENTER_PAGE, FORGOT_PASSWORD_PAGE, HOME_PAGE, REGISTRATION_PAGE} from "../../routing/routing_consts";
import {isUserByURLLocation} from "../../utils/AuthorizationUtils";
import {linkObject} from "../../utils/ComponentUtils";

export class AuthLinksContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: true
        }
    }

    componentDidMount() {
        this.setState({isUser: isUserByURLLocation(window.location.pathname)});
    }

    render() {
        const IS_LOGIN = this.props.isLogin;
        const IS_MOBILE = this.props.isMobile;
        const BREAK = (!IS_LOGIN && IS_MOBILE)? <br /> : null;
        const LINK_CLASS = IS_MOBILE? styles.mobileAuthorizationLinks : styles.authorizationLinks;
        const LOGIN_OR_REGISTRATION = IS_LOGIN? 'Вы здесь впервые? Зарегистрируйтесь' :
            'У Вас уже есть аккаунт? Войдите через него';
        const BUTTON_VALUE = IS_LOGIN? 'Войти' : 'Отправить запрос';

        return (
            <div className={IS_MOBILE? styles.mobileAuthorizationLinksContainer
                : styles.authorizationLinksContainer}>
                {IS_LOGIN && this.state.isUser &&
                    <Link
                        id="forgotPassword"
                        to={linkObject(FORGOT_PASSWORD_PAGE, IS_MOBILE)}
                        className={LINK_CLASS}>
                        Забыли пароль?
                    </Link> }
                <span
                    id={IS_LOGIN? "UserPasswordState" : ""}
                    onClick={this.props.changePasswordVisibility}
                    className={LINK_CLASS}>
                    {(this.props.passwordVisibility)? 'Скрыть пароль' : 'Показать пароль'}
                </span> {BREAK}
               <Link
                    id={IS_LOGIN? "toRegistrationLink" : ""}
                    to={{pathname: (IS_LOGIN? REGISTRATION_PAGE : ENTER_PAGE), state:
                            {previous: (this.props.previousState)? this.props.previousState.previous : undefined}}}
                    className={LINK_CLASS}>
                    {LOGIN_OR_REGISTRATION}
                </Link> {BREAK}
                <Link
                    id="UserSelectHomePageLink"
                    to={HOME_PAGE}
                    className={LINK_CLASS}>
                    На главную
                </Link> {BREAK}
                <button
                    id={IS_LOGIN? "" : "registrationSubmit"}
                    type="submit"
                    onClick={(event) => this.props.handleSubmit(event)}
                    className={styles.submitButton}>
                    {BUTTON_VALUE}
                </button>
            </div>
        );
    }
}