import React, {useState} from 'react';
import styles from "../styles/index.module.css";
import '../styles/regular/ForgotPasswordPage.css';
import {Link} from "react-router-dom";
import {ENTER_PAGE, HOME_PAGE} from "../routing/routing_consts";
import {checkUserEmail, sendPINCode, updatePassword,
    checkPINCode, setCurrentUser, getCurrentUser} from "../httpTasks/tasks/AuthAPITasks";
import {getErrorMessage} from "../httpTasks";
import {getAPI} from "../utils/ComponentUtils";
/*
export default class ForgotPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordVisibility: false,
            step1: true,
            step2: false,
            step3: false,
            completed: false,
            hasError: false
        }
        this.setInputValue = this.setInputValue.bind(this);
        this.changePasswordVisibility = this.changePasswordVisibility.bind(this);
        this.openContentSection = this.openContentSection.bind(this);
    }

    setInputValue(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    changePasswordVisibility() {
        this.setState((state) => ({
            passwordVisibility: !state.passwordVisibility
        }));
    }

    changeContentVisibility(nextStep) {
        switch(nextStep) {
            case 'step2':
                this.setState({step1: false, step2: true});
                break;
            case 'step3':
                this.setState({step2: false, step3: true});
                break;
            case 'completed':
                this.setState({step3: false, completed: true});
                break;
        }
    }

    async openContentSection(currentElement) {
        let respondedData = null, emailOrPhone = null;
        try {
            switch (currentElement) {
                case 'emailOrPhone':
                    emailOrPhone = this.state.emailOrPhone;
                    respondedData = await checkUserEmail(getAPI('auth/getUserBy/' + emailOrPhone));
                    if (respondedData) {
                        setCurrentUser(respondedData.user);
                        respondedData = await sendPINCode(getAPI('auth/sendPINCode/' + emailOrPhone));
                        console.log(respondedData.message);
                        if (respondedData.message === 'Ok') {
                            this.changeContentVisibility('step2');
                        }
                    }
                    break;
                case 'validationCode':
                    const validationCode = this.state.validationCode;
                    respondedData = await checkPINCode(getAPI('auth/checkPINCode'), 'POST', {validationCode});
                    if (respondedData.message === 'Ok') {
                        this.changeContentVisibility('step3');
                    }
                    break;
                case 'newPassword':
                    const password = this.state.password, user = getCurrentUser();
                    const name = user.name, surname = user.surname, role = user.role;
                    const updatedUser = {emailOrPhone, password, name, surname, role};
                    console.log('update ' + updatedUser);
                    respondedData = await updatePassword(getAPI('auth/updateUser/' + user.id),
                                            'PUT', {updatedUser});
                    if (respondedData.message === 'Ok') {
                        this.changeContentVisibility('completed');
                    }
                    break;
            }
        } catch(e) {
            console.log('openContentSection error - ' + e.message);
            this.setState({hasError: true});
        }
     }

    render() {
        document.title = "Обновление пароля | Sports Kit";
        const showOrHidePassword = (this.state.passwordVisibility) ? 'Скрыть пароль' : 'Показать пароль';
        const passwordType = (this.state.passwordVisibility) ? 'text': 'password';
        const IS_MOBILE = this.props.history.location?.state?.isMobile;

        return (
            <>
                <h2 className={styles.header}>
                    Обновление пароля
                </h2>
                <div id="forgotPasswordContainer">
                    <label>
                        Введите Email или номер телефона Вашей учетной записи, к которой
                        Вы хотите изменить пароль:
                        <input
                            className={IS_MOBILE? "mobileForgottenPasswordInputs" : "forgottenPasswordInputs"}
                            type="text"
                            name="emailOrPhone"
                            onChange={(event) => this.setInputValue(event)}
                            value={this.state.emailOrPhone}
                            placeholder="Bвод"/>
                    </label>
                    {this.state.hasError && this.state.step1 &&
                        <span id="errorMessage">
                            {getErrorMessage()}
                        </span>
                    }
                    {this.state.step1 &&
                        <button
                            className="submitEmailOrPhoneInput"
                            onClick={() => this.openContentSection('emailOrPhone')}>
                            Ок
                        </button>
                    }
                    {(this.state.step2 || this.state.step3 || this.state.completed) &&
                        <label>
                            Для подтверждения владения Вами учетной записью мы выслали шестизначный код.
                            Пожалуйста, введитe его ниже:
                            <input
                                className={IS_MOBILE? "mobileForgottenPasswordInputs" : "forgottenPasswordInputs"}
                                type="text"
                                name="validationCode"
                                onChange={(event) => this.setInputValue(event)}
                                value={this.state.validationCode}
                                placeholder="Шестизначный код"
                            />
                        </label>
                    }
                    {this.state.hasError && this.state.step2 &&
                        <span id="errorMessage">
                            {getErrorMessage()}
                        </span>
                    }
                    {this.state.step2 &&
                        <button
                            className="submitEmailOrPhoneInput"
                            onClick={() => this.openContentSection('validationCode')}>
                            Ок
                        </button>
                    }
                    {(this.state.step3 || this.state.completed) &&
                        <label>
                            Введите Ваш новый пароль:
                            <input
                                className={IS_MOBILE? "mobileForgottenPasswordInputs" : "forgottenPasswordInputs"}
                                type={passwordType}
                                name="password"
                                onChange={(event) => this.setInputValue(event)}
                                value={this.state.password}
                                placeholder="Новый пароль"
                            />
                        </label>
                    }
                    {this.state.hasError && this.state.step3 &&
                        <span id="errorMessage">
                            {getErrorMessage()}
                        </span>
                    }
                    {this.state.step3 &&
                        <>
                            <span
                                id="forgottenPasswordVisibility"
                                className={styles.authorizationLinks}
                                onClick={this.changePasswordVisibility}>
                                {showOrHidePassword}
                            </span>
                            <button
                                id="submitPasswordButton"
                                className="submitEmailOrPhoneInput"
                                onClick={() => this.openContentSection('newPassword')}>
                                Ок
                            </button>
                        </>
                    }
                    {this.state.completed &&
                        <>
                            <p>
                                Пароль к учетной записи успешно обновлен! Теперь Вы можете им воспользоваться.
                            </p>
                            <Link
                                to={ENTER_PAGE}
                                className={styles.authorizationLinks}>
                                Вернуться ко входу в аккаунт
                            </Link>
                            <Link
                                id="selectPageLink"
                                to={HOME_PAGE}
                                className={styles.authorizationLinks}>
                                На главную
                            </Link>
                        </>
                    }
                </div>
            </>
        );
    }
}*/
export default function ForgotPasswordPage(props) {
    const [inputedValueState, setInputedValueState] = useState();
    const [stateFlags, setStateFlags] = useState({completed: false, hasError: false,
        passwordVisibility: false, step1: true, step2: false, step3: false});

    const showOrHidePassword = stateFlags.passwordVisibility? 'Скрыть пароль' : 'Показать пароль';
    const passwordType = stateFlags.passwordVisibility? 'text': 'password';
    const isMobile = props.history.location?.state?.isMobile;

    const setInputValue = (event) => {
        setInputedValueState((state) => {
            return {...state, [event.target.name]: event.target.value};
         });
    };

    const changePasswordVisibility = () => {
        setStateFlags((prevState) => {
            return Object.assign({}, prevState, {passwordVisibility: !prevState.passwordVisibility})
        });
    };

    const changeContentVisibility = (nextStep) => {
        let newState = {};

        switch(nextStep) {
            case 'step2':
                newState = {step1: false, step2: true}
                break;
            case 'step3':
                newState = {step2: false, step3: true};
                break;
            case 'completed':
                newState = {step3: false, completed: true};
                break;
        }

        setStateFlags((prevState) => {
            return Object.assign({}, prevState, newState);
        });
    };

    const openContentSection = async(currentElement) => {
        let respondedData = null, emailOrPhone = inputedValueState?.emailOrPhone;

        try {
            switch (currentElement) {
                case 'emailOrPhone':
                    emailOrPhone = inputedValueState?.emailOrPhone;
                    respondedData = await checkUserEmail(getAPI('auth/getUserBy/' + emailOrPhone));
                    if (respondedData) {
                        setCurrentUser(respondedData.user);
                        respondedData = await sendPINCode(getAPI('auth/sendPINCode/' + emailOrPhone));

                        if (respondedData?.message === 'Ok') {
                            changeContentVisibility('step2');
                        }
                    }
                    break;
                case 'validationCode':
                    const validationCode = inputedValueState?.validationCode;
                    respondedData = await checkPINCode(getAPI('auth/checkPINCode'), 'POST', {validationCode});

                    if (respondedData.message === 'Ok') {
                        changeContentVisibility('step3');
                    }
                    break;
                case 'newPassword':
                    const password = inputedValueState?.password, user = getCurrentUser();
                    const emailOrPhone = inputedValueState?.emailOrPhone;
                    const name = user?.name, surname = user?.surname, role = user?.role;
                    const updatedUser = {emailOrPhone, password, name, surname, role};
                    console.log('update ' + updatedUser);

                    respondedData = await updatePassword(getAPI('auth/updateUser/' + user?.id),
                                            'PUT', {updatedUser});
                    if (respondedData.message === 'Ok') {
                        changeContentVisibility('completed');
                    }
                    break;
            }
        } catch(e) {
            console.log('openContentSection error - ' + e.message);
            setStateFlags((prevState) => {
                return Object.assign({}, prevState, {hasError: true})
            });
        }
     };

     document.title = "Обновление пароля | Sports Kit";

     return (
        <>
            <h2 className={styles.header}>
                Обновление пароля
            </h2>
            <div id="forgotPasswordContainer">
                <label>
                    Введите Email или номер телефона Вашей учетной записи, к которой
                    Вы хотите изменить пароль:
                    <input
                        className={isMobile? "mobileForgottenPasswordInputs" : "forgottenPasswordInputs"}
                        type="text"
                        name="emailOrPhone"
                        onChange={(event) => setInputValue(event)}
                        value={inputedValueState?.emailOrPhone}
                        placeholder="Bвод"/>
                </label>
                {stateFlags.hasError &&stateFlags.step1 &&
                    <span id="errorMessage">
                        {getErrorMessage()}
                    </span>
                }
                {stateFlags.step1 &&
                    <button
                        className="submitEmailOrPhoneInput"
                        onClick={() => openContentSection('emailOrPhone')}>
                        Ок
                    </button>
                }
                {(stateFlags.step2 || stateFlags.step3 || stateFlags.completed) &&
                    <label>
                        Для подтверждения владения Вами учетной записью мы выслали шестизначный код.
                        Пожалуйста, введитe его ниже:
                        <input
                            className={isMobile? "mobileForgottenPasswordInputs" : "forgottenPasswordInputs"}
                            type="text"
                            name="validationCode"
                            onChange={(event) => setInputValue(event)}
                            value={inputedValueState?.validationCode}
                            placeholder="Шестизначный код"
                        />
                    </label>
                }
                {stateFlags.hasError && stateFlags.step2 &&
                    <span id="errorMessage">
                        {getErrorMessage()}
                    </span>
                }
                {stateFlags.step2 &&
                    <button
                        className="submitEmailOrPhoneInput"
                        onClick={() => openContentSection('validationCode')}>
                        Ок
                    </button>
                }
                {(stateFlags.step3 || stateFlags.completed) &&
                    <label>
                        Введите Ваш новый пароль:
                        <input
                            className={isMobile? "mobileForgottenPasswordInputs" : "forgottenPasswordInputs"}
                            type={passwordType}
                            name="password"
                            onChange={(event) => setInputValue(event)}
                            value={inputedValueState?.password}
                            placeholder="Новый пароль"
                        />
                    </label>
                }
                {stateFlags.hasError && stateFlags.step3 &&
                    <span id="errorMessage">
                        {getErrorMessage()}
                    </span>
                }
                {stateFlags.step3 &&
                    <>
                        <span
                            id="forgottenPasswordVisibility"
                            className={styles.authorizationLinks}
                            onClick={changePasswordVisibility}>
                            {showOrHidePassword}
                        </span>
                        <button
                            id="submitPasswordButton"
                            className="submitEmailOrPhoneInput"
                            onClick={() => openContentSection('newPassword')}>
                            Ок
                        </button>
                    </>
                }
                {stateFlags.completed &&
                    <>
                        <p>
                            Пароль к учетной записи успешно обновлен! Теперь Вы можете им воспользоваться.
                        </p>
                        <Link
                            to={ENTER_PAGE}
                            className={styles.authorizationLinks}>
                            Вернуться ко входу в аккаунт
                        </Link>
                        <Link
                            id="selectPageLink"
                            to={HOME_PAGE}
                            className={styles.authorizationLinks}>
                            На главную
                        </Link>
                    </>
                }
            </div>
        </>
    );

}