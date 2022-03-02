import React from 'react';
import '../../styles/regular/ListPage.css';

export function SortingContainer({isMobile, getSortedDataBy, sortingObject}) {
    return (
        <div
            id={isMobile? "mobileSortingContainer" :"desktopSortingContainer"}
            className="sortingContainer">
            Настроить сортировку:
            <div>
                <span
                    className={(sortingObject.sortItem === 'prices')?
                        sortingObject.sortItemClass: "sortingSpan"}
                    onClick={(event) =>
                                getSortedDataBy(sortingObject.sortingPricesIndex, event)}>
                    Цена{(sortingObject.sortingPricesIndex === 0)? <>&#8593;</>: <>&#8595;</>}
                </span>
                <span
                    className={(sortingObject.sortItem === 'sales')?
                        sortingObject.sortItemClass : "sortingSpan"}
                    onClick={(event) => getSortedDataBy(2, event)}>
                    Продажи
                </span>
                <span
                    className={(sortingObject.sortItem === 'new')?
                        sortingObject.sortItemClass : "sortingSpan"}
                    onClick={(event) => getSortedDataBy(3, event)}>
                    Новые
                </span>
                <span
                    className={(sortingObject.sortItem === 'promotions')?
                        sortingObject.sortItemClass: "sortingSpan"}
                    onClick={(event) => getSortedDataBy(4, event)}>
                    Акции
                </span>
                <span
                    className="sortingSpan"
                    onClick={(event) => getSortedDataBy(undefined, event)}>
                    Отменить
                </span>
            </div>
        </div>
    );
}