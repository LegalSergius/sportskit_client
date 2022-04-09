import React, { useContext, useEffect, useState } from 'react';
import '../styles/regular/ProductPage.css';
import {ADD_PAGE, BASKET_PAGE, ENTER_PAGE} from "../routing/routing_consts";
import {Link, Redirect} from "react-router-dom";
import Header from "./Header";
import MediaQuery from "react-responsive";
import MobileProductPage from "../mobile/MobileProductPage";
import {ProductImageContainer} from "./special/ProductImageContainer";
import {ProductPaymentContainer} from "./special/ProductPaymentContainer";
import {ProductInformationContainer} from "./special/ProductInformationContainer";
import {getProduct} from "../utils/ProductUtil";
import { StateContext } from '../contexts';
/*
export default class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: '',
            redirectedToBasket: false,
            redirectedToLoginPage: false,
            productObject: {
                product: null,
                productPromotion: null,
                productType: undefined,
                mediaImagesArray: [],
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const NEW_PRODUCT = prevProps.history.location.pathname;
        const PREVIOUS_PRODUCT = prevProps.location.pathname;

        if (NEW_PRODUCT !== PREVIOUS_PRODUCT) {
            console.log(`ProductPage prevProps - ${prevProps.history.location.pathname};
                prevState - ${prevProps.location.pathname}`);
            getProduct(NEW_PRODUCT.split('/'), localStorage.getItem('token'))
                .then((productResponse) => {
                    this.setState(productResponse);
                });
        }
    }

    componentDidMount() {
        console.log(`productPage - ${window.location.pathname.split('/')}`);
        getProduct(window.location.pathname.split('/'), localStorage.getItem('token'))
            .then((productResponse) => {
                this.setState(productResponse);
            });
    }

    render() {
        const PRODUCT_OBJECT = this.state.productObject, PRODUCT = PRODUCT_OBJECT.product,
                PRODUCT_NAME = PRODUCT?.name ?? "Товар", PROMOTION = PRODUCT_OBJECT.productPromotion;
        console.log(`productName - ${PRODUCT_NAME}`);
        document.title = PRODUCT_NAME + " | Sports Kit";

        if (this.state.redirectedToBasket) {
            return (
                <>
                    <Header />
                    <Redirect to={BASKET_PAGE} />
                </>);
        } else if (this.state.redirectedToLoginPage) {
            return <Redirect to={ENTER_PAGE} />
        }

        return (
            <MediaQuery maxDeviceWidth={992}>
                {(matches) =>
                    matches
                        ?
                        <MobileProductPage/>
                        :
                        <div id="imageSelector">
                            <div id="productImageContainer">
                                <ProductImageContainer productMediaArray={PRODUCT_OBJECT?.mediaImagesArray} />
                                <ProductPaymentContainer
                                    productId={PRODUCT?.id}
                                    changeRedirect={async(state) => {this.setState(state)}}/>
                            </div>
                            <div id="productDescriptionContainer">
                                <ProductInformationContainer
                                    product={PRODUCT}
                                    promotion={PROMOTION} />
                                <div id="editPageContainer">
                                    {this.state.userRole === 'ADMIN' &&
                                    <Link
                                        to={{
                                            pathname: ADD_PAGE + '/updateProduct',
                                            state: {
                                                object: {
                                                    dataValues: PRODUCT,
                                                    mediaArray: PRODUCT_OBJECT?.mediaImagesArray,
                                                    productType: PRODUCT_OBJECT?.productType
                                                }
                                            }
                                        }}
                                        className="editPageButton">
                                        Редактировать объявление
                                    </Link>
                                    }
                                </div>
                            </div>
                        </div>
                }
            </MediaQuery>
        );
    }
}*/
export default function ProductPage(props) {
    const contextState = useContext(StateContext);
    
    const [links, setLinks] = useState({redirectedToBasket: false, redirectedToLoginPage: false});
    const [productInformation, setProductInformation] = useState({product: null, promotion: null, type: undefined,
        media:[]});

    useEffect(() => {
        getProduct(window.location.pathname.split('/'), localStorage.getItem('token'))
        .then((productResponse) => {
            setProductInformation(productResponse);
        });
    }, [props.history.location.pathname]);

    const product = productInformation.product;
    const productName = product?.name ?? 'Товар', productPromotion = productInformation.promotion;

    document.title = productName + " | Sports Kit";

    if (links.redirectedToBasket) {
        return (
            <>
                <Header />
                <Redirect to={BASKET_PAGE} />
            </>);
    } 
    if (links.redirectedToLoginPage) {
        return <Redirect to={ENTER_PAGE} />
    }

    return (
        <>
            {contextState.isMobile
                ?
                <MobileProductPage/>
                :
                <div id="imageSelector">
                    <div id="productImageContainer">
                        <ProductImageContainer media={productInformation.media} />
                        <ProductPaymentContainer
                            productId={product?.id}
                            changeRedirect={async(state) => {setLinks(state)}}/>
                    </div>
                    <div id="productDescriptionContainer">
                        <ProductInformationContainer
                            product={product}
                            promotion={productPromotion} />
                        <div id="editPageContainer">
                            {contextState.authState.userRole === 'ADMIN' &&
                                <Link
                                    to={{                                                
                                        pathname: ADD_PAGE + '/updateProduct',
                                        state: {
                                            object: {
                                                dataValues: product,
                                                mediaArray: productInformation.media,
                                                productType: productInformation.type 
                                            }                                                    
                                        }
                                    }}
                                    className="editPageButton">
                                    Редактировать объявление
                                </Link>
                            }   
                        </div>
                    </div>
                </div>
            }
        </>
    );
}