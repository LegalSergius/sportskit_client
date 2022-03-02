import React from 'react';
import '../../styles/regular/HomePage.css'
import {checkTokenValidity} from "../../httpTasks/tasks/AuthAPITasks";
import {fillArray, get} from "../../httpTasks/tasks/ProductAPITasks";
import {getAPI} from "../../utils/ComponentUtils";
import {ArrayListComponent} from "./ArrayListComponent";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAuthorizationList: false,
            catalogList: false,
            sharesList: false,
            isAuth: false,
            redirected: false,
            filteredDataArray: [],
            newProductsArray: [],
            popularProductsArray: [],
            inputValue: '',
            userName: '',
        }

        this.dataArray = [];
        this.newProductsMediaArray = [];
        this.popularProductsMediaArray = [];
        this.responseObject = null;
        this.textInput = undefined;
        this.listItemIndex = undefined;
    }

    componentDidMount() {
        const TOKEN = localStorage.getItem('token');
        //this.textInput = document.getElementById('mainInput');
        let newProducts = [], popularProducts = [];

        const checkToken = async() => {
            return await checkTokenValidity(getAPI('auth/check'), TOKEN);
        }
        checkToken().then((decodedToken) => {
            if (decodedToken) {
                this.setState({isAuth: true, userName: decodedToken.name});
            }
        });
        const response = async() => {
            return await get(getAPI('products/getProducts?mediaRequired=' + false));
        };
        response().then(async(result) => {
                this.dataArray = await fillArray(result);
                await get(getAPI('products/getProducts?mediaRequired=' + true +
                    '&option=createdAt'), true).then(async(result) => {
                        this.newProductsMediaArray = result.mediaArray;
                        newProducts = result.productsObject;
                        await get(getAPI('products/getProducts?mediaRequired=' + true +
                            '&option=sales'), true).then((result) => {
                                this.popularProductsMediaArray = result.mediaArray;
                                popularProducts = result.productsObject;
                                this.setState({newProductsArray: newProducts, popularProductsArray: popularProducts});
                        })
                    });
            });
    }

    componentWillUnmount() {
        this.newProductsMediaArray = null;
        this.popularProductsMediaArray = null;
    }

    render() {
        document.title = "Главная страница | Sports Kit";

        return (
            <>
                {this.state.isAuth &&
                    <span id="userName">
                        Здравствуйте, мы рады Вас видеть, {this.state.userName}!
                    </span> }
                <div id="sortedProductsContainer">
                    <h1 className="addedItemsHeader">
                        Недавно добавленные товары
                    </h1>
                    <div className={true? "mobileHomePageLinksContainer": "homePageLinksContainer"}>
                        <ArrayListComponent
                            isMobile={true}
                            productsArray={this.state.newProductsArray}
                            productsMediaArray={this.newProductsMediaArray}
                            linkId={true? "mobileMainPageAnnouncements": "mainPageAnnouncements"}
                            imageId={true? "mobileLatestProductsImages" : "latestProductsImages"}/>
                    </div>
                    <h1
                        id="bestSellersHeader"
                        className="addedItemsHeader">
                        Товары-бестселлеры
                    </h1>
                    <div className="homePageLinksContainer">
                        <ArrayListComponent
                            isMobile={true}
                            productsArray={this.state.popularProductsArray}
                            productsMediaArray={this.popularProductsMediaArray}
                            showCountOfSales />
                    </div>
                </div>
            </>
        );
  }
}
