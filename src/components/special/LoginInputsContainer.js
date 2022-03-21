import React from 'react';
import styles from "../../styles/index.module.css";
import '../../styles/regular/LoginPage.css';
import '../../styles/mobile/MobileLoginPage.css';
/*
export class LoginInputsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const IS_MOBILE = this.props.isMobile;
        const INPUT_CLASS = IS_MOBILE? styles.mobileAuthorizationInputs : styles.authorizationInputs;

        return (
            <>
                <input
                    type="text"
                    className={INPUT_CLASS}
                    name="emailOrPhone"
                    value={this.props.emailOrPhone}
                    onChange={(event) => this.props.setInputValue(event)}
                    placeholder="Ваш Email или номер телефона..."/>
                <img
                    id={IS_MOBILE? "modileDivider" : "divider"}
                    src="../../static/divider.jpg"
                    alt="Разделитель" />
                <input
                    type={(this.props.passwordVisibility) ? 'text': 'password'}
                    className={INPUT_CLASS}
                    name="password"
                    value={this.props.password}
                    onChange={(event) => this.props.setInputValue(event)}
                    placeholder="Ваш пароль..." />
            </>
        );
    }
}*/

export function LoginInputsContainer(props) {
    const inputClass = props.isMobile? styles.mobileAuthorizationInputs : styles.authorizationInputs;

    return (
        <>
            <input
                type="text"
                className={inputClass}
                name="emailOrPhone"
                value={props.emailOrPhone}
                onChange={(event) => props.setInputValue(event)}
                placeholder="Ваш Email или номер телефона..."/>
            <img
                id={props.isMobile? "modileDivider" : "divider"}
                src="../../static/divider.jpg"
                alt="Разделитель" />
            <input
                type={(props.passwordVisibility) ? 'text': 'password'}
                className={inputClass}
                name="password"
                value={props.password}
                onChange={(event) => props.setInputValue(event)}
                placeholder="Ваш пароль..." />
        </>
    );
}