import React, { useContext, useEffect, useMemo, useState } from 'react';
import '../styles/regular/ListPage.css';
import styles from "../styles/index.module.css";
import {get} from "../httpTasks/tasks/ProductAPITasks";
import {getAPI} from "../utils/ComponentUtils";
import {ArrayListComponent} from "./special/ArrayListComponent";
import {PaginationContainer} from "./special/PaginationContainer";
import {SortingContainer} from "./special/SortingContainer";
import { StateContext } from '../contexts';
/*
export default class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: '',
            productType: '',
            page: 1,
            dataArray: [],
            sortingObject: {
                sortItem: undefined,
                sortItemClass: 'sortingSpan',
                sortingPricesIndex: 0,
                sortingMethod: ''
            }
        }
        this.mediaObjectsArray = [];
        this.pageCount = undefined;
        this.currentPath = window.location.pathname.split('/');

        this.getMethod = this.getMethod.bind(this);
        this.getSortedDataBy = this.getSortedDataBy.bind(this);
        this.showNewPage = this.showNewPage.bind(this);
        this.changeContent = this.changeContent.bind(this);
    }

    componentDidMount() {
        let currentSection = this.currentPath.at(-1);
        this.changeContent(currentSection);
    }

    componentWillReceiveProps(nextProps) {
        console.log('сведения - ' + JSON.stringify(nextProps.location.pathname));
        let newPathSection = nextProps.location.pathname.split('/');
        this.changeContent(newPathSection.at(-1));
    }

    async getMethod(sortingMethod, page, category) {
        return await get(getAPI('products/getProducts?mediaRequired=' + true + '&where=' + category +
            '&sortingMethod=' + sortingMethod + '&page=' + page), true)
    }

    changeContent(newPathSection) {
        let currentSection = undefined;
        switch (newPathSection) {
            case 'equipment':
                document.title = "Оборудование | Sports Kit";
                currentSection = 'Оборудование';
                break;
            case 'accessories':
                document.title = "Аксессуары | Sports Kit";
                currentSection = 'Аксессуары';
                break;
            case 'nutrition':
                document.title = "Питание | Sports Kit";
                currentSection = 'Питание';
                break;
            case 'clothes':
                document.title = "Одежда | Sports Kit";
                currentSection = 'Одежда';
                break;
        }
        this.getMethod(this.state.sortingObject.sortingMethod, this.state.page, currentSection)
            .then((response) => {
                console.log(JSON.stringify(response));
                this.mediaObjectsArray = response.mediaObjects;
                this.pageCount = Math.floor(response.objectsCount / 1);

                this.setState({header: currentSection, productType: currentSection,
                    dataArray: response.productsObject});
            });
    }


    componentWillUnmount() {
        this.mediaObjectsArray = null;
    }

    getSortedDataBy(radioIndex, event) {
        let sortingMethod = '', sortItemClass = event.currentTarget.className,
            sortItem = undefined, sortingPricesIndex = undefined;
            if (sortItemClass === 'sortingSpan') {
                sortItemClass = 'selectedSpan';
            } else {
                if (radioIndex === 0) {
                    radioIndex = 1;
                    sortingPricesIndex = 1;
                } else {
                    if (radioIndex === 1) {
                        sortingPricesIndex = 0;
                    }
                    radioIndex = undefined;
                    sortItemClass = 'sortingSpan';
                }
            }
        sortingPricesIndex ??= 0;

        switch (radioIndex) {
            case 0:
                sortItem = 'prices';
                sortingMethod = 'increasingPrices';
                break;
            case 1:
                sortItem = 'prices';
                sortingMethod = 'decreasingPrices';
                break;
            case 2:
                sortItem = 'sales';
                sortingMethod = 'popularSales';
                break;
            case 3:
                sortItem = 'new';
                sortingMethod = 'newestArrivals';
                break;
            case 4:
                sortItem = 'promotions';
                sortingMethod = 'byDiscountValues';
                break;
            case undefined:
                sortingMethod = '';
                break;
        }

        this.getMethod(sortingMethod, this.state.page, this.state.productType).then((response) => {
            console.log('xyx - ' + JSON.stringify(response));
            this.mediaObjectsArray = response.mediaObjects;
            this.pageCount = Math.floor(response.objectsCount / 1);

            this.setState({dataArray: response.productsObject, sortingObject: {
                    sortingMethod, sortItem, sortItemClass, sortingPricesIndex
                }})
        });
    }

    showNewPage(number) {
        if (number > this.pageCount) {
            number = 1;
        } else if (number === 0) {
            number = this.pageCount;
        }

        this.getMethod(this.state.sortingObject.sortingMethod, number, this.state.productType).then((response) => {
            this.mediaObjectsArray = response.mediaObjects;
            this.pageCount = Math.floor(response.objectsCount / 1);

            this.setState({page: number, dataArray: response.productsObject});
        });
    }

    render() {
        const IS_MOBILE = this.props.location.state?.isMobile;

        return (
            <div id="listPageContainer">
                <div className={IS_MOBILE? "" : "headingItemContainer"}>
                    <h1
                        id={IS_MOBILE? "mobileListPageHeader" : "listPageHeader"}
                        className={styles.commonFont}>
                        {this.state.header}
                    </h1>
                </div>
                <div id="productsContainer">
                    <ArrayListComponent
                        isMobile={IS_MOBILE}
                        productsArray={this.state.dataArray}
                        productsMediaArray={this.mediaObjectsArray} />
                </div>
                <div
                    id={IS_MOBILE? "mobileBottomContainer" : "desktopBottomContainer"}
                    className="bottomContainer">
                    <PaginationContainer
                        showNewPage={this.showNewPage}
                        pageCount={this.pageCount}
                        page={this.state.page} />
                    <SortingContainer
                        isMobile={IS_MOBILE}
                        getSortedDataBy={this.getSortedDataBy}
                        sortingObject={this.state.sortingObject} />
                </div>
            </div>
        );
    }
}*/
export default function ListPage(props) {
    const contextState = useContext(StateContext);
    const isMobile = contextState.isMobile;

    const [page, setPage] = useState(1);
    const [productTypeInformation, setProductTypeInformation] = useState({header: '', type: ''});
    const [data, setData] = useState({products: [], media: []});
    const [sortingObject, setSortingObject] = useState({sortItem: undefined, sortItemClass: 'sortingSpan',
        sortingPricesIndex: 0, sortingMethod: ''});

    let currentPathSection = window.location.pathname.split('/').at(-1);
    let pageCount;

    useEffect(() => {
        changeContent(currentPathSection);
    });

    const getMethod = async(sortingMethod, page, category) => {
        return await get(getAPI('products/getProducts?mediaRequired=true&where=' + category +
            '&sortingMethod=' + sortingMethod + '&page=' + page), true);
    };
   
    const changeContent = (newPathSection) => {
        let currentSection, title = '';

        switch (newPathSection) {
            case 'equipment':
                title = 'Оборудование | Sports Kit';
                currentSection = 'Оборудование';
                break;
            case 'accessories':
                title = 'Аксессуары | Sports Kit';
                currentSection = 'Аксессуары';
                break;
            case 'nutrition':
                title = 'Питание | Sports Kit';
                currentSection = 'Питание';
                break;
            case 'clothes':
                title = 'Одежда | Sports Kit';
                currentSection = 'Одежда';
                break;
        }
        document.title = title;

        getMethod(sortingObject.sortingMethod, page, currentSection)
            .then((response) => {
                console.log(JSON.stringify(response));

                pageCount = Math.floor(response?.objectsCount / 1);

                setProductTypeInformation({header: currentSection, type: currentSection});
                setData({products: response?.productsObject, media: response?.mediaObjects});
            });
    };

    useMemo(() => {
        currentPathSection = props.location.pathname.split('/').at(-1);
        changeContent(currentPathSection);
    }, [props.location.pathname]);

    const getSortedDataBy = (radioIndex, event) => {
        let sortingMethod = '', sortItemClass = event.currentTarget.className;
        let sortItem, sortingPricesIndex;
            if (sortItemClass === 'sortingSpan') {
                sortItemClass = 'selectedSpan';
            } else {
                if (!radioIndex) {
                    radioIndex = 1;
                    sortingPricesIndex = 1;
                } else {
                    if (radioIndex === 1) {
                        sortingPricesIndex = 0;
                    }
                    radioIndex = undefined;
                    sortItemClass = 'sortingSpan';
                }
            }
        sortingPricesIndex ??= 0;

        switch (radioIndex) {
            case 0:
                sortItem = 'prices';
                sortingMethod = 'increasingPrices';
                break;
            case 1:
                sortItem = 'prices';
                sortingMethod = 'decreasingPrices';
                break;
            case 2:
                sortItem = 'sales';
                sortingMethod = 'popularSales';
                break;
            case 3:
                sortItem = 'new';
                sortingMethod = 'newestArrivals';
                break;
            case 4:
                sortItem = 'promotions';
                sortingMethod = 'byDiscountValues';
                break;
            case undefined:
                sortingMethod = '';
                break;
        }
    
        getMethod(sortingMethod, page, productTypeInformation.type).then((response) => {
            console.log('xyx - ' + JSON.stringify(response));
            
            pageCount = Math.floor(response?.objectsCount / 1);

            setSortingObject({sortingMethod, sortItem, sortItemClass, sortingPricesIndex});
            setData({products: response?.productsObject, media: response?.mediaObjects});
        });
    };

    const showNewPage = (number) => {
        if (number > pageCount) {
            number = 1;
        } else if (!number) {
            number = pageCount;
        }

        getMethod(sortingObject.sortingMethod, number, productTypeInformation.type).then((response) => {
            pageCount = Math.floor(response.objectsCount / 1);

            setPage(number);
            setData({products: response?.productsObject, media: response?.mediaObjects});
        });
    };

    
    return (
        <div id="listPageContainer">                
            <div className={isMobile? "" : "headingItemContainer"}>
                <h1
                    id={isMobile? "mobileListPageHeader" : "listPageHeader"}
                    className={styles.commonFont}>
                    {productTypeInformation.header}
                </h1>               
            </div>
            <div id="productsContainer">
                <ArrayListComponent
                    isMobile={isMobile}
                    productsArray={data.products}
                    productsMediaArray={data.media} />
            </div>
            <div
                id={isMobile? "mobileBottomContainer" : "desktopBottomContainer"}
                className="bottomContainer">
                <PaginationContainer
                    showNewPage={showNewPage}
                    pageCount={pageCount}
                    page={page} />
                <SortingContainer
                    isMobile={isMobile}
                    getSortedDataBy={getSortedDataBy}
                    sortingObject={sortingObject} />
            </div>
        </div>
    );
}