import React from 'react';
import '../styles/mobile/MobileLoginPage.css';
import styles from '../styles/index.module.css';
import {FORGOT_PASSWORD_PAGE, HOME_PAGE, REGISTRATION_PAGE, SERVICE_PANEL} from "../routing/routing_consts";
import {Link, Redirect} from "react-router-dom";
import {getErrorMessage} from "../httpTasks";
import {AuthLinksContainer} from "../components/special/AuthLinksContainer";
import {isUserByURLLocation, submit} from "../utils/AuthorizationUtils";
import {LoginInputsContainer} from "../components/special/LoginInputsContainer";
import {getAPI} from "../utils/ComponentUtils";
import {Error} from "../components/special/Error";

export class MobileLoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: false,
            hasError: false,
            passwordVisibility: false,
            emailOrPhone: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setInputValue = this.setInputValue.bind(this);
        this.changePasswordVisibility = this.changePasswordVisibility.bind(this);

        this.isUser = isUserByURLLocation(window.location.pathname);
    }

    async handleSubmit(event) {
        const NEW_STATE = await submit(event,  getAPI('auth/login?parameter=' +
            ((this.isUser)? 'USER' : 'ADMIN')), this.state.emailOrPhone, this.state.password);

        this.setState(NEW_STATE);
    }

    setInputValue(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    changePasswordVisibility() {
        this.setState((state) => (
            {passwordVisibility: !state.passwordVisibility}
        ))
    }

    render() {
       // const PREVIOUS_STATE = this.props.location.state;
        if (this.state.completed) {
            /* return (PREVIOUS_STATE) ? <Redirect to={PREVIOUS_STATE.previous}/> :*/
            return (this.isUser) ? <Redirect to={HOME_PAGE}/> : <Redirect to={SERVICE_PANEL}/>;
        } else {
            return (
                <>
                    <h1 className={styles.header}>
                        Вход
                    </h1>
                    <div className={styles.mobileAuthorizationContainer}>
                        <LoginInputsContainer
                            isMobile
                            emailOrPhone={this.state.emailOrPhone}
                            password={this.state.password}
                            passwordVisibility={this.state.passwordVisibility}
                            setInputValue={this.setInputValue}/>
                    </div>
                    {this.state.hasError &&
                        <Error message={getErrorMessage()} />
                    }
                    <AuthLinksContainer
                        isLogin
                        isMobile
                        passwordVisibility={this.state.passwordVisibility}
                        changePasswordVisibility={this.changePasswordVisibility}
                        previousState={/*PREVIOUS_STATE*/undefined}
                        handleSubmit={this.handleSubmit}/>
                </>
            );
        }
    }
}