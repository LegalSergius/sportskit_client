import React from 'react';
import styles from "../../styles/index.module.css";
import '../../styles/regular/RegistrationPage.css';

/*
export class RegistrationInputsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const PROPS_VALUES = this.props.valuesObject;

        return (
            <>
                <p id="prompt">
                    Для создания аккаунта Вы можете использовать eMail или номер телефона
                </p>
                <div id="initialsInputsContainer">
                    <input
                        type="text"
                        className={styles.initialsInputs}
                        name="name"
                        value={PROPS_VALUES.name}
                        onChange={(event) => this.props.setInputValue(event)}
                        placeholder="Ваше имя"/>
                    <input
                        type="text"
                        className={styles.initialsInputs}
                        name="surname"
                        value={PROPS_VALUES.surname}
                        onChange={(event) => this.props.setInputValue(event)}
                        placeholder="Ваша фамилия"/>
                </div>
                <input
                    type="text"
                    className={styles.authorizationInputs}
                    name="emailOrPhone"
                    value={PROPS_VALUES.emailOrPhone}
                    onChange={(event) =>  this.props.setInputValue(event)}
                    placeholder="Ваш Email или номер телефона..."/>
                <input
                    type={(this.props.passwordVisibility) ? 'text': 'password'}
                    className={styles.authorizationInputs}
                    name="password"
                    value={PROPS_VALUES.password}
                    onChange={(event) =>  this.props.setInputValue(event)}
                    placeholder="Придумайте пароль..."/>
                <input
                    type={(this.props.passwordVisibility) ? 'text': 'password'}
                    className={styles.authorizationInputs}
                    name="validationPassword"
                    value={PROPS_VALUES.validationPassword}
                    onChange={(event) => this.props.setInputValue(event)}
                    placeholder="Подтвердите введенный пароль..."/>
            </>
        );
    }
}*/
export function RegistrationInputsContainer(props) {
    const propsValues = props.valuesObject;

    return (
        <>
            <p id="prompt">
                Для создания аккаунта Вы можете использовать eMail или номер телефона
            </p>
            <div id="initialsInputsContainer">
                <input
                    type="text"
                    className={styles.initialsInputs}
                    name="name"
                    value={propsValues.name}
                    onChange={(event) => props.setInputValue(event)}
                    placeholder="Ваше имя"/>
                <input
                    type="text"
                    className={styles.initialsInputs}
                    name="surname"
                    value={propsValues.surname}
                    onChange={(event) => props.setInputValue(event)}
                    placeholder="Ваша фамилия"/>
            </div>
            <input
                type="text"
                className={styles.authorizationInputs}
                name="emailOrPhone"
                value={propsValues.emailOrPhone}
                onChange={(event) => props.setInputValue(event)}
                placeholder="Ваш Email или номер телефона..."/>
            <input
                type={(props.passwordVisibility) ? 'text': 'password'}
                className={styles.authorizationInputs}
                name="password"
                value={propsValues.password}
                onChange={(event) => props.setInputValue(event)}
                placeholder="Придумайте пароль..."/>
            <input
                type={(props.passwordVisibility) ? 'text': 'password'}
                className={styles.authorizationInputs}
                name="validationPassword"
                value={propsValues.validationPassword}
                onChange={(event) => props.setInputValue(event)}
                placeholder="Подтвердите введенный пароль..."/>
        </>
    );
}