import React from 'react';
import '../../styles/regular/HomePage.css'
import {checkTokenValidity} from "../../httpTasks/tasks/AuthAPITasks";
import {fillArray, get} from "../../httpTasks/tasks/ProductAPITasks";
import {getAPI} from "../../utils/ComponentUtils";
import {ArrayListComponent} from "./ArrayListComponent";
import {LoginContext, StateContext} from "../../contexts";

export default class HomePage extends React.Component {
    static contextType = StateContext;

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

      /*  const checkToken = async() => {
            return await checkTokenValidity(getAPI('auth/check'), TOKEN);
        }
        checkToken().then((decodedToken) => {
            if (decodedToken) {
                this.setState({isAuth: true, userName: decodedToken.name});
            }
        });*/
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

    render() {
        document.title = "Главная страница | Sports Kit";

        return (
            <>
                {//this.state.isAuth  &&
                    this.context.authState.auth &&
                    <span id="userName">
                        Здравствуйте, мы рады Вас видеть, {this.context.authState.userName}!
                    </span> }
                <div id="sortedProductsContainer">
                    <h1 className="addedItemsHeader">
                        Недавно добавленные товары
                    </h1>
                    <div className={this.context.isMobile? "mobileHomePageLinksContainer": "homePageLinksContainer"}>
                        <ArrayListComponent
                            isMobile={this.context.isMobile}
                            productsArray={this.state.newProductsArray}
                            productsMediaArray={this.newProductsMediaArray}
                            linkId={this.context.isMobile? "mobileMainPageAnnouncements": "mainPageAnnouncements"}
                            imageId={this.context.isMobile? "mobileLatestProductsImages" : "latestProductsImages"}/>
                    </div>
                    <h1
                        id="bestSellersHeader"
                        className="addedItemsHeader">
                        Товары-бестселлеры
                    </h1>
                    <div className="homePageLinksContainer">
                        <ArrayListComponent
                            isMobile={this.context.isMobile}
                            productsArray={this.state.popularProductsArray}
                            productsMediaArray={this.popularProductsMediaArray}
                            showCountOfSales />
                    </div>
                </div>
            </>
        );
  }
}
