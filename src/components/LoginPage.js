import React, {useContext, useEffect, useState} from 'react';
import styles from '../styles/index.module.css';
import '../styles/regular/LoginPage.css';
import {Redirect, Link} from "react-router-dom";
import {FORGOT_PASSWORD_PAGE, HOME_PAGE, REGISTRATION_PAGE, SERVICE_PANEL} from "../routing/routing_consts";
import {getErrorMessage} from "../httpTasks";
import {getAPI} from "../utils/ComponentUtils";
import MediaQuery from "react-responsive";
import {MobileLoginPage} from "../mobile/MobileLoginPage";
import {AuthLinksContainer} from "./special/AuthLinksContainer";
import {isUserByURLLocation, submit} from "../utils/AuthorizationUtils";
import {LoginInputsContainer} from "./special/LoginInputsContainer";
import {Error} from "./special/Error";
import {StateContext} from "../contexts";
/*
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: false,
            hasError: false,
            passwordVisibility: false,
            emailOrPhone: '',
            password: ''
        };
        this.handleKeyDownSubmit = this.handleKeyDownSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setInputValue = this.setInputValue.bind(this);
        this.changePasswordVisibility = this.changePasswordVisibility.bind(this);

        this.isUser = isUserByURLLocation(window.location.pathname);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDownSubmit);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDownSubmit);
    }

    handleKeyDownSubmit(event) {
        if (event.keyCode === 13) {
            this.handleSubmit(event);
        }
    }

    async handleSubmit(event) {
        const NEW_STATE = await submit(event, getAPI('auth/login?parameter=' +
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
        document.title = "Вход | Sports Kit";

        const PREVIOUS_STATE = this.props.location.state;
        console.log(this.props.location);

        if (this.state.completed) {
            return (PREVIOUS_STATE) ? <Redirect to={PREVIOUS_STATE.previous}/> :
                (this.isUser) ? <Redirect to={HOME_PAGE}/> : <Redirect to={SERVICE_PANEL}/>;
        } else {
            return (
                <MediaQuery maxDeviceWidth={992}>
                    {(matches) =>
                        matches
                            ?
                            <MobileLoginPage/>
                            :
                            <div className={styles.authorizationContainer}>
                                <h1
                                    id="headerForEnter"
                                    className={styles.commonFont}>
                                    Вход
                                </h1>
                                <LoginInputsContainer
                                    isMobile={false}
                                    emailOrPhone={this.state.emailOrPhone}
                                    password={this.state.password}
                                    passwordVisibility={this.state.passwordVisibility}
                                    setInputValue={this.setInputValue}/>
                                {this.state.hasError &&
                                    <Error message={getErrorMessage()} />
                                }
                                <AuthLinksContainer
                                    isLogin
                                    isMobile={false}
                                    passwordVisibility={this.state.passwordVisibility}
                                    changePasswordVisibility={this.changePasswordVisibility}
                                    previousState={PREVIOUS_STATE}
                                    handleSubmit={this.handleSubmit}/>
                            </div> }
                </MediaQuery>
            );
        }
    }
}*/
export default function LoginPage(props) {
    const contextState = useContext(StateContext);

    const [stateFlags, setStateFlags] = useState({completed: false, hasError: false,
    passwordVisibility: false});
    const [inputValueState, setInputValueState] = useState();

    const isUser = isUserByURLLocation(window.location.pathname);
    const previousLocation = props.location.state;

    const changePasswordVisibility = () => {
        setStateFlags((prevState) => {
            return Object.assign({}, prevState, {passwordVisibility: !prevState.passwordVisibility})
        });
    };

    const handleKeyDownSubmit = (event) => {
        const ENTER_BUTTON_CODE = 13;

        if (event.keyCode === ENTER_BUTTON_CODE) {
            handleSubmit(event);
        }
    }

    const handleSubmit = async(event) => {
        const newState = await submit(event, getAPI('auth/login?parameter=' +
            ((isUser)? 'USER' : 'ADMIN')), inputValueState?.emailOrPhone, inputValueState?.password);

        setStateFlags((prevState) => {
            return Object.assign({}, prevState, newState);
        });
    }

    const setInputValue = (event) => {
        setInputValueState((state) => {
           return {...state, [event.target.name]: event.target.value};
        });
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDownSubmit);

        return () => {
            window.removeEventListener('keydown', handleKeyDownSubmit);
        };
    });

    document.title = "Вход | Sports Kit";

    if (stateFlags.completed) {
        return (previousLocation) ? <Redirect to={previousLocation.previous}/> :
            (isUser) ? <Redirect to={HOME_PAGE}/> : <Redirect to={SERVICE_PANEL}/>;
    } else {
        return (
            <>
                {contextState.isMobile
                    ?
                    <MobileLoginPage/>
                    :
                    <div className={styles.authorizationContainer}>
                        <h1
                            id="headerForEnter"
                            className={styles.commonFont}>
                            Вход
                        </h1>
                        <LoginInputsContainer
                            isMobile={false}
                            emailOrPhone={inputValueState?.emailOrPhone}
                            password={inputValueState?.password}
                            passwordVisibility={stateFlags.passwordVisibility}
                            setInputValue={setInputValue}/>
                        {stateFlags.hasError &&
                            <Error message={getErrorMessage()} />
                        }
                        <AuthLinksContainer
                            isLogin
                            isMobile={false}
                            passwordVisibility={stateFlags.passwordVisibility}
                            changePasswordVisibility={changePasswordVisibility}
                            previousState={previousLocation}
                            handleSubmit={handleSubmit}/>
                    </div>
                }
            </>
        );
    }
}
