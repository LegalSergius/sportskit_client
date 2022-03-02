import React from 'react';
import Header from "../components/Header";
import {Link, Redirect} from "react-router-dom";
import '../styles/mobile/MobileProductPage.css';
import {ADD_PAGE, BASKET_PAGE, ENTER_PAGE} from "../routing/routing_consts";
import {ProductImageContainer} from "../components/special/ProductImageContainer";
import {ProductInformationContainer} from "../components/special/ProductInformationContainer";
import {ProductPaymentContainer} from "../components/special/ProductPaymentContainer";
import {getProduct} from "../utils/ProductUtil";

export default class MobileProductPage extends React.Component {
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

    componentDidMount() {
        getProduct(window.location.pathname.split('/'), localStorage.getItem('token'))
            .then((productResponse) => {
                this.setState(productResponse);
            });
    }


    render() {
        const PRODUCT_OBJECT = this.state.productObject, PRODUCT = PRODUCT_OBJECT.product,
            PRODUCT_NAME = PRODUCT?.name ?? "Товар", PROMOTION = PRODUCT_OBJECT.productPromotion;
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
            <div id="mobileProductContainer">
                <ProductImageContainer
                    isMobile
                    productMediaArray={PRODUCT_OBJECT?.mediaImagesArray} />
                <ProductInformationContainer
                    isMobile
                    product={PRODUCT}
                    promotion={PROMOTION} />
                <ProductPaymentContainer
                    isMobile
                    productId={PRODUCT?.id}
                    changeRedirect={async(state) => {this.setState(state)}}/>
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
        );
    }
}