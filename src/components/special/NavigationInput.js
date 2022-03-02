import React from 'react';
import '../../styles/regular/Header.css';
import '../../styles/mobile/MobileHeader.css'
import styles from "../../styles/index.module.css";
import {getAPI, handleInputKeyDown, handleListItemKeyDown, submitResponse} from "../../utils/ComponentUtils";
import {fillArray, get} from "../../httpTasks/tasks/ProductAPITasks";
import {Redirect} from "react-router-dom";
import {PRODUCT_PAGE} from "../../routing/routing_consts";
import Header from "../Header";
import {NavigationInputHandler} from "../../utils/NavigationInputHandler";

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
}
