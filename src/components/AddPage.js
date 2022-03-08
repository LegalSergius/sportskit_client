import React from 'react';
import styles from '../styles/index.module.css';
import '../styles/regular/AddPage.css';
import {addProduct, addPromotion, fillArray, get} from "../httpTasks/tasks/ProductAPITasks";
import {getAPI, handleInputKeyDown, handleListItemKeyDown} from "../utils/ComponentUtils";
import {getErrorMessage} from "../httpTasks";
import {SERVICE_PANEL} from "../routing/routing_consts";
import {Redirect} from "react-router-dom";

export default class AddPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: null,
            isNewProduct: false,
            isNewPromoCode: false,
            isUpdate: false,
            isClickedOnPhoto: false,
            productTypeForUpdate: '',
            nameOfNewElement: '',
            priceOrNumberValue: '',
            priceSpan: 'тенге',
            productName: '',
            editablePhotoIndex: null,
            selectValue: 'Оборудование',
            textareaValue: '',
            hasError: false,
            completed: false,
            filteredDataArray: []
        };
        this.productNameArray = [];
        this.updatableMediaArray = [];
        this.updatableProductId = undefined;
        this.fileInput = undefined;
        this.textInput = undefined;
        this.listItemIndex = undefined;

        this.displayClearButton = this.displayClearButton.bind(this);
        this.clearPhoto = this.clearPhoto.bind(this);
        this.onListItemSelected = this.onListItemSelected.bind(this);
        this.downloadFiles = this.downloadFiles.bind(this);
        this.onPhotoClick = this.onPhotoClick.bind(this);
        this.submitResponse = this.submitResponse.bind(this);
        this.removeFilteredData = this.removeFilteredData.bind(this);
        this.getFiles = this.getFiles.bind(this);
    }

    componentDidMount() {
        let currentPath = window.location.pathname.split('/');
        let currentSection = currentPath.at(-1);

        this.fileInput = document.getElementById('fileChoice');
        this.fileInput.addEventListener('change', this.downloadFiles);


        switch (currentSection) {
            case 'newProduct':
                document.title = "Добавление товаров | Sports Kit";

                this.displayClearButton();
                this.setState({isNewProduct: true, header: 'Добавление объявлений',
                    nameOfNewElement: 'Наименование товара:', priceOrNumberValue: 'Цена на товар:'});
                break;
            case 'newPromotion':
                document.title = "Добавление акций | Sports Kit";
                this.textInput = document.getElementById('productNameInput');

                let products;
                let getData = async() => {
                    products = await get(getAPI('products/getProducts?mediaRequired=' + false));
                }
                getData().then(async() => {
                    this.productNameArray = await fillArray(products);
                    this.setState({header: 'Добавление акций', nameOfNewElement: 'Выберите товар, ' +
                            'на который появится акция:', priceOrNumberValue: 'Величина акции:', priceSpan: '%'});
                });
                break;
            case 'newPromo' :
                document.title = "Добавление промо-кодов | Sports Kit";

                this.setState({isNewPromoCode: true, header: 'Добавление промо-кода',
                    priceOrNumberValue: 'Величина скидки:', priceSpan: '%'});
                break;
            case 'updateProduct':
                document.title = "Обновление товара | Sports Kit";
                const updatableObject = this.props.location.state.object, dataValues = updatableObject.dataValues;
                this.updatableMediaArray = updatableObject.mediaArray;
                this.updatableProductId = dataValues.id;

                this.downloadFiles(true);
                this.displayClearButton();
                this.setState({header: 'Изменение объявления', isUpdate: true, productTypeForUpdate: updatableObject.productType,
                    productName: dataValues.name, nameOfNewElement: 'Имя обновляемого товара: ', textareaValue: dataValues.description,
                    priceOrNumberValue: 'Цена обновляемого товара: ', price: dataValues.price});
                break;
        }
    }

    componentWillUnmount() {
        this.productNameArray = [];
        this.updatableMediaArray = [];
        this.updatableProductId = undefined;

        if (this.fileInput) {
            this.fileInput.removeEventListener('keydown', this.downloadFiles);
        }
    }

    downloadFiles(isUpdate) {
        let currentPhotoIndex = (this.state.editablePhotoIndex !== null) ? this.state.editablePhotoIndex : 0;
        let input = document.getElementById('fileChoice'),
            photos = document.getElementsByClassName('productPhoto');
        let selectedFiles = (isUpdate && typeof isUpdate !== 'object') ? this.updatableMediaArray
            : input.files;

        if (selectedFiles.length !== 0) {
            for (let i = 0; i < selectedFiles.length; i++) {
                photos[currentPhotoIndex].src = (isUpdate && typeof isUpdate !== 'object') ?
                    "data:image/png;base64," + selectedFiles[i] : window.URL.createObjectURL(selectedFiles[i]);
                currentPhotoIndex++;
                if (currentPhotoIndex > 2) {
                    break;
                }
            }
        }

        this.displayClearButton();
        this.setState({editablePhotoIndex: null, isClickedOnPhoto: false});

    }

    onPhotoClick(index) {
        this.setState({editablePhotoIndex: index, isClickedOnPhoto: true});
        document.getElementById('fileChoice').click();
    }

    setInputValue(event, element) {
        switch (element) {
            case 'select':
                this.setState({selectValue: event.target.value});
                break;
            case 'input':
                const value = event.target.value;
                if (event.target.id === 'productNameInput') {
                    let filteredDataArray = [];
                    if (value.length > 0) {
                        filteredDataArray = this.productNameArray.filter((product) => {
                            return product.toLowerCase().includes(value.toLowerCase());
                        });
                    }
                    this.setState({filteredDataArray, productName: value});
                } else {
                    this.setState({[event.target.name]: value});
                }
                break;
            case 'textarea':
                this.setState({textareaValue: event.target.value});
                break;
        }
    }

    onListItemSelected(itemValue) {
        this.setState({productName: itemValue, filteredDataArray: []});
    }

    removeFilteredData(event) {
        if (!event.relatedTarget) {
            this.setState({filteredDataArray: []});
        }
    }

    async submitResponse(event) {
        event.preventDefault();
        let productType = this.state.selectValue, description = this.state.textareaValue;
        let images = document.getElementsByClassName('productPhoto'),
            photosArray = await this.getFiles(images);
        try {
            let response;
            if (this.state.isNewProduct || this.state.isUpdate) {
                let method = this.state.isUpdate? 'PUT' : 'POST';
                let url = this.state.isUpdate? getAPI('products/updateProduct/' + this.updatableProductId) :
                    getAPI('products/addProduct/' + productType);
                response = await addProduct(url, method, document.getElementById('form'),
                    {description, photosArray});
            } else if (this.state.isNewPromoCode) {
                response = await addPromotion(getAPI('products/addPromocode/' + productType), 'POST',
                    document.getElementById('form'));
            } else {
                response = await addPromotion(getAPI('products/addPromotion'), 'POST',
                    document.getElementById('form'));
            }
            if (response.message === 'Ok') {
                this.setState({completed: true});
            }
        } catch(e) {
            console.log('submitResponse error - ' + e);
            this.setState({hasError: true});
        }
    }

    displayClearButton() {
        let images = document.getElementsByClassName('productPhoto');
        for (let index = 0; index < images.length; index++) {
            let span = document.getElementById(String(index));
            if (images[index].src.includes('add_picture')) {
                span.className = "notClearPhotoItem";
            } else {
                span.className = "clearPhotoItem";
            }
        }
    }

    clearPhoto(photoIndex) {
        let images = document.getElementsByClassName('productPhoto')
            ?? document.getElementsByClassName('mobileProductPhoto');
        images[photoIndex].src = "../../static/add_picture.png";

        this.displayClearButton();
    }

    async getFiles(imageContainer) {
        let array = Array.from(imageContainer), mediaArray = [];

        for (let item of array) {
            console.log('src - ' + item.src);
            if (!item.src.includes('add_picture')) {
                await fetch(item.src).then((result) => result.blob()).then((blob) => {
                    const file = new File([blob], String(new Date().getTime()) + '.png', blob);
                    console.log('file - ' + file);
                    mediaArray.push(file);
                });
            }
        }
        console.log('mediaArray - ' + mediaArray);
        return mediaArray;
    }

    render() {
        if (this.state.completed) {
            return <Redirect to={SERVICE_PANEL} />
        }
        const productCategory = this.state.isUpdate? 'Категория товара: ' + this.state.productTypeForUpdate
                                                        : 'Выберите категорию товара: ';
        const photosTitle = this.state.isNewProduct? 'Добавьте несколько фотографий: ' : 'Фотографии товара: ';
        const currentObject = this;

        const IS_MOBILE = this.props.history.location?.state?.isMobile;
        console.log(`isMobile - ${IS_MOBILE}`);

        return (
            <div id="addPageContainer">
                <h2
                    id={IS_MOBILE? "addPageMobileHeader" : ""}
                    className={styles.commonFont}>
                    {this.state.header}
                </h2>
                <div>
                    <form
                        id="form"
                        encType="multipart/form-data"
                        onSubmit={(e) => this.submitResponse(e)}>
                        {(this.state.isNewProduct || this.state.isNewPromoCode || this.state.isUpdate) &&
                            <label>
                                {productCategory}
                                {!this.state.isUpdate &&
                                    <select
                                        id="addPageSelect"
                                        value={this.state.selectValue}
                                        onChange={(event) => this.setInputValue(event, 'select')}>
                                        <option value="Оборудование">
                                            Оборудование
                                        </option>
                                        <option value="Аксессуары">
                                            Аксессуары
                                        </option>
                                        <option value="Питание">
                                            Питание
                                        </option>
                                        <option value="Одежда">
                                            Одежда
                                        </option>
                                    </select> }
                            </label> }
                        {!this.state.isNewPromoCode &&
                            <label className="addPageLabels">
                                {this.state.nameOfNewElement}
                                <div id={IS_MOBILE? "mobileAddPromotionContainer" : "addPromotionContainer"}>
                                    <input
                                        id="productNameInput"
                                        type="text"
                                        onChange={(event) => this.setInputValue(event, 'input')}
                                        onKeyDown={(event) => handleInputKeyDown(this.state.filteredDataArray,
                                            currentObject, document.getElementsByClassName(styles.addPromotionListItem), event)}
                                        onBlur={(event) => this.removeFilteredData(event)}
                                        value={this.state.productName}
                                        name="productName"
                                        autoComplete="off"
                                        className={styles.addPageInputs} />
                                    {!this.state.isNewProduct && !this.state.isUpdate &&
                                        <ul className={styles.addPromotionList}>
                                            {this.state.filteredDataArray.map((element) =>
                                                    <li
                                                        className={styles.addPromotionListItem}
                                                        tabIndex="0"
                                                        onKeyDown={(event) => {
                                                            handleListItemKeyDown(this.state.filteredDataArray, currentObject,
                                                                document.getElementsByClassName(styles.addPromotionListItem), event).then(
                                                                (result) => this.listItemIndex = result
                                                            )}}
                                                        onMouseDown={() => this.onListItemSelected(element)}
                                                        onBlur={(event) => this.removeFilteredData(event)}>
                                                        {element}
                                                    </li> )}
                                        </ul> }
                                </div>
                            </label>
                        }
                        {(this.state.isNewProduct || this.state.isUpdate) &&
                            <label className="addPageLabels">
                                Описание товара:
                                <textarea
                                    id={IS_MOBILE? "mobileAddPageTextArea" : "addPageTextarea"}
                                    value={this.state.textareaValue}
                                    onChange={(event) => this.setInputValue(event, 'textarea')}/>
                            </label> }
                        {this.state.isNewPromoCode &&
                            <label className="addPageLabels">
                                Введите 6-значный код промо-скидки:
                                <input
                                    id="priceInput"
                                    type="text"
                                    onChange={(event) => this.setInputValue(event, 'input')}
                                    value={this.state.promo}
                                    maxLength="6"
                                    name="promo"
                                    className={styles.addPageInputs} />
                            </label> }
                        <label className="addPageLabels">
                            {this.state.priceOrNumberValue}
                            <input
                                id={IS_MOBILE? "mobilePriceInput" : "priceInput"}
                                type="number"
                                onChange={(event) => this.setInputValue(event, 'input')}
                                value={this.state.price}
                                name="price"
                                className={styles.addPageInputs} />
                            <span id="priceInputSpan">
                                {this.state.priceSpan}
                            </span>
                        </label>
                        <div id={(this.state.isNewProduct || this.state.isUpdate) ? "newProductContainer" : "notNewProductContainer"}>
                            <label
                                id="addPhotoLabel"
                                className="addPageLabels"
                                htmlFor="fileChoice">
                                {photosTitle}
                            </label>
                            <input
                                id="fileChoice"
                                type="file"
                                onClick={(event) => {event.target.value = ''}}
                                accept=".jpg, .jpeg, .png"
                                multiple />
                            <div id="photosContainer">
                                <div className={IS_MOBILE? "mobilePhotosContainerChild" : "photosContainerChild"}>
                                    <img
                                        className="productPhoto"
                                        src="../../static/add_picture.png"
                                        onClick={() => this.onPhotoClick(0)}
                                        alt="Фото товара" />
                                    <span
                                        id="0"
                                        onClick={() => {this.clearPhoto(0)}}
                                        className="clearPhotoItem">
                                        &times;
                                    </span>
                                </div>
                                <div className={IS_MOBILE? "mobilePhotosContainerChild" : "photosContainerChild"}>
                                    <img
                                        className="productPhoto"
                                        src="../../static/add_picture.png"
                                        onClick={() => this.onPhotoClick(1)}
                                        alt="Фото товара"/>
                                    <span
                                        id="1"
                                        onClick={() => {this.clearPhoto(1)}}
                                        className="clearPhotoItem">
                                        &times;
                                    </span>
                                </div>
                                <div className={IS_MOBILE? "mobilePhotosContainerChild" : "photosContainerChild"}>
                                    <img
                                        className="productPhoto"
                                        src="../../static/add_picture.png"
                                        onClick={() => this.onPhotoClick(2)}
                                        alt="Фото товара"/>
                                    <span
                                        id="2"
                                        onClick={() => {this.clearPhoto(2)}}
                                        className="clearPhotoItem">
                                        &times;
                                    </span>
                                </div>
                            </div>
                        </div>
                        {this.state.hasError &&
                            <span
                                id="addPageError"
                                className={styles.errorMessage}>
                                {getErrorMessage()}
                            </span> }
                        <button
                            id="addButton"
                            className={styles.submitButton}>
                            {this.state.isUpdate? "Редактировать" : "Добавить"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
