import {Link} from "react-router-dom";
import {PRODUCT_PAGE} from "../../routing/routing_consts";
import "../../styles/regular/HomePage.css";
import styles from "../../styles/index.module.css";
import {getFile} from "../../utils/ComponentUtils";
import React from "react";

export function ArrayListComponent({productsArray, productsMediaArray, isMobile,
                           showCountOfSales = false, linkId = "", imageId = ""}) {
    return (
        <>
            {productsArray.map((element) =>
                    <Link
                        key={element.id}
                        to={PRODUCT_PAGE + '/' + element.id}
                        id={linkId}
                        className={isMobile? styles.mobileAnnouncementsContainer : styles.announcementsContainer}>
                        <img
                            id={imageId}
                            className={isMobile? styles.mobilePhotos : styles.photos}
                            src={getFile(element.id, productsMediaArray)}
                            alt="Фотография товара"/>
                            {element.name}<br/>Цена: {element.price}&#8376;<br/>
                            {showCountOfSales && <>{element.sales} продаж</>}
                            {element.promotion &&
                                <span className={styles.promotionSpan}>
                                    Действует акция -{element.promotion.size}%
                                </span>
                            }
                    </Link>
                )
            }
        </>
    );
}