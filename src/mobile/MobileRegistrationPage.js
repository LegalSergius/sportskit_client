import React, { useState } from 'react';
import '../styles/mobile/MobileRegistrationPage.css';
import styles from '../styles/index.module.css';
import {ENTER_PAGE, HOME_PAGE} from "../routing/routing_consts";
import {Link, Redirect} from "react-router-dom";
import {AuthLinksContainer} from "../components/special/AuthLinksContainer";
import {RegistrationInputsContainer} from "../components/special/RegistrationInputsContainer";
import {submit} from "../utils/AuthorizationUtils";
import {getAPI} from "../utils/ComponentUtils";
import {getErrorMessage} from "../httpTasks";
import {Error} from "../components/special/Error";
/*
export class MobileRegistrationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            passwordVisibility: false,
            completed: false,
            hasError: false,
            name: '',
            surname: '',
            emailOrPhone: '',
            password: '',
            validationPassword: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setInputValue = this.setInputValue.bind(this);
        this.changePasswordVisibility = this.changePasswordVisibility.bind(this);
    }

    changePasswordVisibility() {
        this.setState((state) => ({
            passwordVisibility: !state.passwordVisibility
        }));
    }

    setInputValue(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event) {
        const NEW_STATE = await submit(event, getAPI('auth/registration'), this.state.emailOrPhone,
            this.state.password, this.state.name, this.state.surname, this.state.validationPassword);

        this.setState(NEW_STATE);
    }

    render() {
       // const PREVIOUS_STATE = this.props.location.pathname;

        let emailOrPhone = this.state.emailOrPhone, password = this.state.password, name = this.state.name,
            surname = this.state.surname, validationPassword = this.state.validationPassword;

        if (this.state.completed) {
          //  return (PREVIOUS_STATE) ? <Redirect to={PREVIOUS_STATE.previous}/> : <Redirect to={HOME_PAGE}/>;
        } else {
            return (
                <>
                    <h1 className={styles.header}>
                        Регистрация
                    </h1>
                    <div className={styles.mobileAuthorizationContainer}>
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
                        isMobile
                        passwordVisibility={this.state.passwordVisibility}
                        changePasswordVisibility={this.changePasswordVisibility}
                        //previousState={PREVIOUS_STATEundefined}
                        handleSubmit={this.handleSubmit} />
                </>
            );
        }
    }
}*/
export function MobileRegistrationPage(props) {
    const contextState = useContext(StateContext);
    const previousLocation = props.location.state;

    const [inputValueState, setInputValueState] = useState();
    const [stateFlags, setStateFlags] = useState({completed: false, hasError: false,
        passwordVisibility: false});

    const emailOrPhone = inputValueState?.emailOrPhone, password = inputValueState?.password,
        name = inputValueState?.name, surname = inputValueState?.surname,
        validationPassword = inputValueState?.validationPassword;

    const setInputValue = (event) => {
        setInputValueState((state) => {
            return {...state, [event.target.name]: event.target.value};
         });
    };

    const changePasswordVisibility = () => {
        setStateFlags((prevState) => {
            return Object.assign({}, prevState, {passwordVisibility: !prevState.passwordVisibility});
        });
    };

    const handleSubmit = async(event) => {
        const newState = await submit(event, getAPI('auth/registration'),
            inputValueState?.emailOrPhone, inputValueState?.password, inputValueState?.name, inputValueState?.surname,
            inputValueState?.validationPassword);

        setStateFlags((prevState) => {
            return Object.assign({}, prevState, newState);
        });
    };

    if (stateFlags.completed) {
        return (previousLocation)? <Redirect to={previousLocation.previous}/> : <Redirect to={HOME_PAGE}/>;
    } else {
        return (
            <>
                <h1 className={styles.header}>
                    Регистрация
                </h1>
                <div className={styles.mobileAuthorizationContainer}>
                    <RegistrationInputsContainer
                        setInputValue={setInputValue}
                        valuesObject={{emailOrPhone, password, name, surname, validationPassword}}
                        passwordVisibility={stateFlags.passwordVisibility}/>
                </div>
                {stateFlags.hasError &&
                    <Error message={getErrorMessage()} />
                }
                <AuthLinksContainer
                    isLogin={false}
                    isMobile
                    passwordVisibility={stateFlags.passwordVisibility}
                    changePasswordVisibility={stateFlags.changePasswordVisibility}
                    previousState={previousLocation}
                    handleSubmit={handleSubmit} />                    
            </>
        );
    }
} 