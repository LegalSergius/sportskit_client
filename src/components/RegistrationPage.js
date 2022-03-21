import React, {useContext, useEffect, useState} from 'react';
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
import {StateContext} from "../contexts";
/*
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
}*/
export default function RegistrationPage(props) {
    const contextState = useContext(StateContext);
    const previousLocation = props.location.state;

    const [stateFlags, setStateFlags] = useState({completed: false, hasError: false,
        passwordVisibility: false});
    const [inputValueState, setInputValueState] = useState();

    const emailOrPhone = inputValueState?.emailOrPhone, password = inputValueState?.password,
        name = inputValueState?.name, surname = inputValueState?.surname,
        validationPassword = inputValueState?.validationPassword;

        useEffect(() => {
        window.addEventListener('keydown', handleKeyDownSubmit);

        return () => {
            window.removeEventListener('keydown', handleKeyDownSubmit);
        };
    });

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
    };

    const setInputValue = (event) => {
        setInputValueState((state) => {
            return {...state, [event.target.name]: event.target.value};
        });
    };


    const handleSubmit = async(event) => {
        const newState = await submit(event, getAPI('auth/registration'),
            inputValueState?.emailOrPhone, inputValueState?.password, inputValueState?.name, inputValueState?.surname,
            inputValueState?.validationPassword);

        setStateFlags((prevState) => {
            return Object.assign({}, prevState, newState);
        });
    }

    document.title = "Регистрация | Sports Kit";

    if (stateFlags.completed) {
        return (previousLocation)? <Redirect to={previousLocation.previous}/> : <Redirect to={HOME_PAGE}/>;
    } else {
        return (
            <>
                {contextState.isMobile
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
                                setInputValue={setInputValue}
                                valuesObject={{emailOrPhone, password, validationPassword, name, surname}}
                                passwordVisibility={stateFlags.passwordVisibility}/>
                            </div>
                            {stateFlags.hasError &&
                                <Error message={getErrorMessage()} />
                            }
                            <AuthLinksContainer
                                isLogin={false}
                                isMobile={false}
                                passwordVisibility={stateFlags.passwordVisibility}
                                changePasswordVisibility={changePasswordVisibility}
                                previousState={previousLocation}
                                handleSubmit={handleSubmit} />
                        </> }
            </>
        );
    }
}