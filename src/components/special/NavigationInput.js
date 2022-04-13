import React, {useState} from 'react';
import '../../styles/regular/Header.css';
import '../../styles/mobile/MobileHeader.css'
import styles from "../../styles/index.module.css";
import {getAPI, handleInputKeyDown, handleListItemKeyDown, submitResponse} from "../../utils/ComponentUtils";
import {fillArray, get} from "../../httpTasks/tasks/ProductAPITasks";
import {Redirect} from "react-router-dom";
import {PRODUCT_PAGE} from "../../routing/routing_consts";
import Header from "../Header";
import {NavigationInputHandler} from "../../utils/NavigationInputHandler";
/*
export class NavigationInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredDataArray: []
        }
        this.textInput = undefined;
        this.listItemIndex = undefined;

        this.setInputValue = this.setInputValue.bind(this);
        this.onListItemSelected = this.onListItemSelected.bind(this);
        this.removeFilteredData = this.removeFilteredData.bind(this);
    }

    componentDidMount() {
        this.textInput = document.getElementById('mainInput');
    }

    setInputValue(event) {
        const VALUE = event.target.value;
        let filteredDataArray = [];
        if (VALUE.length > 0) {
            filteredDataArray = this.props.dataArray.filter((data) => {
                return data.toLowerCase().includes(VALUE.toLowerCase());
            });
        }

        this.setState({[event.target.name]: VALUE, filteredDataArray});
    }


    onListItemSelected(event, itemValue) {
        if (itemValue) {
            this.props.propsSubmit(event, itemValue);
        }
    }

    removeFilteredData(event) {
        if (!event.relatedTarget) {
            this.setState({filteredDataArray: []});
        }
    }

    render() {
        const IS_NULL_LENGTH = (this.state.filteredDataArray.length === 0), CURRENT_COMPONENT = this;
        const LIST_ITEMS = document.getElementsByClassName("listItem");

        let handler = new NavigationInputHandler(this.state.filteredDataArray, CURRENT_COMPONENT);

        return (
            <div id={this.props.isMobile? "mobileInputAndListContainer" : "inputAndListContainer"}>
                <input
                    id={this.props.isMobile? "mobileMainInput" : "mainInput"}
                    type="text"
                    onChange={(event) => this.setInputValue(event)}
                    onKeyDown={(event) => handler.handleInputKeyDown(event, LIST_ITEMS)}
                    onBlur={(event) => this.removeFilteredData(event)}
                    value={this.state.inputValue}
                    name="inputValue"
                    placeholder="Поиск товара..."
                    autoComplete="off" />
                <ul className={styles.addPromotionList}>
                    {!IS_NULL_LENGTH &&
                        this.state.filteredDataArray.map((element) =>
                            <li
                                className={this.props.isMobile? "mobileListItem" : "listItem"}
                                tabIndex="0"
                                onKeyDown={(event) => {
                                    handler.handleListItemKeyDown(event, LIST_ITEMS)
                                        .then((result) => this.listItemIndex = result)
                                }}
                                onTouchStart={(event) => this.onListItemSelected(event, element)}
                                onMouseDown={(event) => this.onListItemSelected(event, element)}
                                onBlur={(event) => this.removeFilteredData(event)}>
                                {element}
                             </li>) }
                </ul>
            </div>
        );
    }
}*/

export function NavigationInput(props) {
    const ENTER_BUTTON = 13, ARROW_DOWN = 40, ARROW_UP = 38;

    const [filteredDataArray, setFilteredDataArray] = useState([]);
    const [inputAreaValue, setInputAreaValue] = useState();

    const textInput = document.getElementById('mainInput');
    const isNullLength = (filteredDataArray.length === 0);
    const currentComponent = this;
    const handler = new NavigationInputHandler(filteredDataArray, currentComponent);

    let keyCode, listItems, listItemIndex;

    const setInputValue = (event) => {
        const value = event.target.value;
        let filteredDataArray = [];

        if (value.length > 0) {
            filteredDataArray = props.dataArray.filter((data) => {
                return data.toLowerCase().includes(value.toLowerCase());
            });
        }

        setInputAreaValue((state) => {
            return {...state, [event.target.name]: event.target.value};
        });
        setFilteredDataArray(filteredDataArray);
    };

    const handleInputKeyDown = async(event) => {
        keyCode = event.keyCode;
        listItems = Array.from(document.getElementsByClassName("listItem"));

        if (keyCode === ENTER_BUTTON) {
            onListItemSelected(event, filteredDataArray[0]);
        } else if (keyCode === ARROW_DOWN) {
            listItemIndex = 0;

            listItems[listItemIndex].focus();
        }
    };

    const handleListItemKeyDown = async(event) => {
        listItems = Array.from(document.getElementsByClassName("listItem"));
        console.log(listItems);
        keyCode = event.keyCode;
        let listLength = listItems.length - 1;

        console.log(`${listItems[listItemIndex]} ${listItemIndex}`);

        if (keyCode === ENTER_BUTTON) {
            onListItemSelected(event, filteredDataArray[listItemIndex]);
        } else if (keyCode === ARROW_DOWN) {
            ++listItemIndex;

            if (listItemIndex > listLength) {
                listItemIndex = 0;
            }

            listItems[listItemIndex].focus();
        } else if (keyCode === ARROW_UP) {
            --listItemIndex;

            if (listItemIndex < 0) {
               textInput.focus();
            } else {
                listItems[listItemIndex].focus();
            }
        }

        return listItemIndex;
    };

    const onListItemSelected = (event, itemValue) => {
        if (itemValue) {
            props.propsSubmit(event, itemValue);
        }
    };

    const removeFilteredData = (event) => {
        if (!event.relatedTarget) {
            setFilteredDataArray([]);
        }
    }

    return (
        <div id={props.isMobile? "mobileInputAndListContainer" : "inputAndListContainer"}>
            <input
                id={props.isMobile? "mobileMainInput" : "mainInput"}
                type="text"
                onChange={(event) => setInputValue(event)}
                onKeyDown={(event) => handleInputKeyDown(event)}
                onBlur={(event) => removeFilteredData(event)}
                value={inputAreaValue?.inputValue}
                name="inputValue"
                placeholder="Поиск товара..."
                autoComplete="off" />
            <ul className={styles.addPromotionList}>
                {!isNullLength &&
                    filteredDataArray.map((element, index) =>
                        <li
                            className={props.isMobile? "mobileListItem" : "listItem"}
                            tabIndex="0"
                            key={index}
                            onKeyDown={(event) => {
                                listItemIndex = handleListItemKeyDown(event);
                            }}
                            onTouchStart={(event) => onListItemSelected(event, element)}
                            onMouseDown={(event) => onListItemSelected(event, element)}
                            onBlur={(event) => removeFilteredData(event)}>
                            {element}
                        </li>
                    )
                }
            </ul>
        </div>
    );

}
