import React from 'react';
import styles from '../styles/index.module.css';
import '../styles/regular/RegistrationPage.css';
import {HOME_PAGE} from "../routing/routing_consts";
import {Redirect} from "react-router-dom";
import {getErrorMessage} from "../httpTasks";
import {getAPI} from "../utils/ComponentUtils";
import MediaQuery from "react-responsive";
import {MobileRegistrationPage} from "../mobile/MobileRegistrationPage";
import {AuthLinksContainer} from "./special/AuthLinksContainer";
import {RegistrationInputsContainer} from "./special/RegistrationInputsContainer";
import {submit} from "../utils/AuthorizationUtils";
import {Error} from "./special/Error";

export default class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: false,
            hasError: false,
            passwordVisibility: false,
            name: '',
            surname: '',
            emailOrPhone: '',
            password: '',
            validationPassword: ''
        }

        this.handleKeyDownSubmit = this.handleKeyDownSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setInputValue = this.setInputValue.bind(this);
        this.changePasswordVisibility = this.changePasswordVisibility.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDownSubmit);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDownSubmit);
    }

    setInputValue(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleKeyDownSubmit(event) {
        if (event.keyCode === 13) {
            this.handleSubmit(event);
        }
    }

    async handleSubmit(event) {
        const NEW_STATE = await submit(event, getAPI('auth/registration'), this.state.emailOrPhone,
            this.state.password, this.state.name, this.state.surname, this.state.validationPassword);

        this.setState(NEW_STATE);
    }

    changePasswordVisibility() {
        this.setState((state) => ({
            passwordVisibility: !state.passwordVisibility
        }));
    }

    render() {
        document.title = "Регистрация | Sports Kit";

        let emailOrPhone = this.state.emailOrPhone, password = this.state.password, name = this.state.name,
            surname = this.state.surname, validationPassword = this.state.validationPassword;

        const PREVIOUS_STATE = this.props.location.state;

        if (this.state.completed) {
            return (PREVIOUS_STATE)? <Redirect to={PREVIOUS_STATE.previous}/> : <Redirect to={HOME_PAGE}/>;
        } else {
            return (
                <MediaQuery maxDeviceWidth={992}>
                    {(matches) =>
                        matches
                            ?
                            <MobileRegistrationPage/>
                            :
                            <>
                                 <div className={styles.authorizationContainer}>
                                    <h1
                                        id="headerForRegistration"
                                        className={styles.commonFont}>
                                        Регистрация
                                    </h1>
                                    <RegistrationInputsContainer
                                        setInputValue={this.setInputValue}
                                        valuesObject={{emailOrPhone, password, name, surname, validationPassword}}
                                        passwordVisibility={this.state.passwordVisibility}/>
                                </div>
                                {this.state.hasError &&
                                    <Error message={getErrorMessage()} />
                                }
                                <AuthLinksContainer
                                    isLogin={false}
                                    isMobile={false}
                                    passwordVisibility={this.state.passwordVisibility}
                                    changePasswordVisibility={this.changePasswordVisibility}
                                    previousState={PREVIOUS_STATE}
                                    handleSubmit={this.handleSubmit} />
                            </> }
                </MediaQuery>
            );
        }
    }
}