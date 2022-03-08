import React from 'react';
import styles from '../styles/index.module.css';
import '../styles/regular/EditPage.css';
import {fillArray, get, remove} from "../httpTasks/tasks/ProductAPITasks";
import {getAPI, handleInputKeyDown, handleListItemKeyDown} from "../utils/ComponentUtils";
import {getErrorMessage} from "../httpTasks";
import {ADD_PAGE, SERVICE_PANEL} from "../routing/routing_consts";
import {Redirect} from "react-router-dom";
import {getCurrentProducts} from "../utils/ProductUtil";
import {NavigationInputHandler} from "../utils/NavigationInputHandler";

export default class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: '',
            textInputValue: '',
            labelForInput: '',
            deletePromotion: false,
            editProduct: false,
            confirmed: false,
            redirected: false,
            hasError: false,
            completed: false,
            dataArray: [],
            filteredDataArray: [],
            responseObject: null
        }
        this.responseObject = undefined;
        this.currentSection = window.location.pathname.split('/').at(-1);
        this.textInput = undefined;
        this.listItemIndex = undefined;
        
        this.onEditButtonsClick = this.onEditButtonsClick.bind(this);
        this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
        this.onListItemSelected = this.onListItemSelected.bind(this);
        this.removeFilteredData = this.removeFilteredData.bind(this);
        this.submitResponse = this.submitResponse.bind(this);
    }

    componentDidMount() {
        let newTitle;
        this.textInput = document.getElementById('textInput');
        this.textInput.addEventListener('keydown', this.handleChangeInputValue);

        switch (this.currentSection) {
            case 'product':
                newTitle = 'Редактирование | Sports Kit';
                getCurrentProducts().then(async(response) => {
                    this.setState({dataArray: await fillArray(response),
                        header: 'Редактирование объявлений', editProduct: true,
                        labelForInput: 'Введите название товара, объявление которого Вы хотите изменить:'});
                });
                break;
            case 'deleteProduct':
                newTitle = 'Удаление товара | Sports Kit';
                getCurrentProducts().then(async(response) => {
                    this.setState({dataArray: await fillArray(response), header: 'Удаление товаров',
                        labelForInput: 'Введите название товара, который хотите удалить:'
                    });
                });
                break;
            case 'deletePromotion':
                newTitle = 'Удаление скидки | Sports Kit';
                get(getAPI('products/getPromotions')).then(async(response) => {
                    this.setState({dataArray: await fillArray(response),
                        header: 'Удаление акций на товар', deletePromotion: true,
                        labelForInput: 'Введите название скидки на товар, которую нужно убрать:'
                    });
                });
                break;
            case 'deletePromoCode':
                newTitle = 'Удаление промо-кода | Sports Kit';
                get(getAPI('products/getPromoCodes')).then(async(response) => {
                    this.setState({dataArray: await fillArray(response),
                        header: 'Удаление промо-кодов',
                        labelForInput: 'Введите название промо-кода, которого необходимо удалить:'
                    });
                });
                break;
        }

        document.title = newTitle;
    }

    componentWillUnmount() {
        this.responseObject = undefined;
        if (this.textInput) {
            this.textInput.removeEventListener('keydown', this.handleChangeInputValue);
        }
    }

    handleChangeInputValue(event) {
        if (this.state.confirmed) {
            return;
        }
        const KEY = String(event.key), CODE = event.code;
        let value = event.target.value;
        if (KEY === 'Backspace') {
            value = value.slice(0, -1);
        } else if (KEY === 'Enter') {
            return;
        } else if (CODE.includes('Key') || CODE.includes('Digit') ||
            CODE.includes('Minus') || CODE.includes('Equal')) {
            value += KEY;
        }

        let filteredDataArray = [];
        if (value.length > 0) {
            filteredDataArray = this.state.dataArray.filter((element) => {
                return element.toLowerCase().includes(value.toLowerCase());
            });
        }
        this.setState({filteredDataArray, textInputValue: value});
    };

    async onListItemSelected(event, itemValue) {
        if (itemValue) {
            await this.submitResponse(event, itemValue);
        }
    }

    removeFilteredData(event) {
        if (!event.relatedTarget) {
            this.setState({filteredDataArray: []});
        }
    }

    async submitResponse(event, textInputValue) {
        event.preventDefault();
        const CURRENT_VALUE = textInputValue;
        let state, response;
        try {
            switch (this.currentSection) {
                case 'product':
                    response = await get(getAPI('products/getProduct/' + CURRENT_VALUE), true);
                    state = {hasError: false, redirected: true};
                    break;
                case 'deleteProduct':
                    response = await get(getAPI('products/getProduct/' + CURRENT_VALUE), false);
                    state = {hasError: false, confirmed: true};
                    break;
                case 'deletePromotion':
                    response = await get(encodeURI(getAPI('products/getPromotion?value=' + CURRENT_VALUE)));
                    state = {hasError: false, confirmed: true};
                    break;
                case 'deletePromoCode':
                    response = await get(getAPI('products/getPromoCode/' + CURRENT_VALUE));
                    state = {hasError: false, confirmed: true};
                    break;
            }
            if (response) {
                this.setState({responseObject: response,  ...state})
            }
        } catch (e) {
            console.log('error - ' + e);
            this.setState({hasError: true});
        }
    }

    async onEditButtonsClick(event, isCompleted) {
        event.preventDefault();

        if (!isCompleted) {
            this.setState({completed: true});
        } else {
            let response;
            const VALUE = this.state.textInputValue;
            switch (this.currentSection) {
                case 'deleteProduct':
                    response = await remove(getAPI('api/products/deleteProduct/' + VALUE));
                    break;
                case 'deletePromotion':
                    response = await remove(encodeURI(getAPI('products/deletePromotion?value=' + VALUE)));
                    break;
                case 'deletePromoCode':
                    response = await remove(getAPI('products/deletePromoCode/' + VALUE));
                    break;
            }
            if (response?.message === 'Ok') {
                this.setState({completed: true});
            }
        }
    }

    render() {
        if (this.state.redirected) {
            const RESPONSE_OBJECT = this.state.responseObject;
            return <Redirect to={{
                pathname: ADD_PAGE + '/updateProduct',
                state: {object: RESPONSE_OBJECT, isMobile: true}
            }} />
        } else if (this.state.completed) {
            return <Redirect to={SERVICE_PANEL} />
        }
        const LIST_ITEMS = document.getElementsByClassName(styles.addPromotionListItem);
        let handler = new NavigationInputHandler(this.state.filteredDataArray, this);

        return (
            <div id="editPageCommonContainer">
                <h2 className={styles.commonFont}>
                    {this.state.header}
                </h2>
                <label className="editPageLabels">
                    {this.state.labelForInput}
                    <div id="editTextInputContainer">
                         <input
                            id="textInput"
                            className={styles.addPageInputs}
                            type="text"
                            onKeyDown={(event) => /*handleInputKeyDown(this.state.filteredDataArray,
                                currentObject, document.getElementsByClassName(styles.addPromotionListItem), event)*/
                                handler.handleInputKeyDown(event, LIST_ITEMS)
                            }
                            onBlur={(event) => this.removeFilteredData(event)}
                            value={this.state.textInputValue}
                            placeholder={this.state.deletePromotion? "Например: -10% на товар..." : ""}
                            autoComplete="off"/>
                        <ul className={styles.addPromotionList}>
                            {this.state.filteredDataArray.length !== 0 &&
                                this.state.filteredDataArray.map((element) =>
                                    <li
                                        className={styles.addPromotionListItem}
                                        tabIndex="0"
                                        key={element.toString()}
                                        onKeyDown={(event) => /*
                                            handleListItemKeyDown(this.state.filteredDataArray, currentObject,
                                                document.getElementsByClassName(styles.addPromotionListItem), event).then(
                                                    (result) => this.listItemIndex = result
                                            )}*/
                                            handler.handleListItemKeyDown(event, LIST_ITEMS)
                                                .then((result) => this.listItemIndex = result)
                                        }

                                        onMouseDown={() => this.onListItemSelected(element)}
                                        onBlur={(event) => this.removeFilteredData(event)}>
                                        {element}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </label>
                {this.state.hasError &&
                    <span
                        className={styles.errorMessage}>
                        {getErrorMessage()}
                    </span>
                }
                {this.state.confirmed &&
                    <label
                        id="buttonsLabel"
                        className="editPageLabels">
                        Подтвердить действие?
                        <div>
                            <button
                                className="editPageButtons"
                                onClick={(event) => this.onEditButtonsClick(event, true)}>
                                Да
                            </button>
                            <button
                                className="editPageButtons"
                                onClick={(event) => this.onEditButtonsClick(event, false)}>
                                Нет
                            </button>
                        </div>
                    </label>
                }
            </div>
        );
    }
}
