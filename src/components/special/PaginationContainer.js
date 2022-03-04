import React from 'react';
import '../../styles/regular/ListPage.css';

export function PaginationContainer({showNewPage, pageCount, page}) {
    let pageNumbersArray = [];

    if (pageCount < 6) {
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
            pageNumbersArray.push(pageNumber);
        }
    } else {
        const STARTING_INDEX = 1, FINISHING_INDEX = pageCount;

        let currentPage = page, leftEnumerationSign = false, rightEnumerationSign = false;
        if ((FINISHING_INDEX - currentPage) >= 3) {
            rightEnumerationSign = true;
        }
        if ((currentPage - STARTING_INDEX) >= 3) {
            leftEnumerationSign = true;
        }

        let previousNumber = ((currentPage - 1) <= 1) ? undefined : currentPage - 1,
            leftSign = (leftEnumerationSign) ? '...' : undefined;
        let nextNumber = ((currentPage + 1) >= FINISHING_INDEX) ? undefined : currentPage + 1,
            rightSign = (rightEnumerationSign) ? '...' : undefined;
        currentPage = (currentPage === 1 || currentPage === FINISHING_INDEX)? undefined : currentPage;
        pageNumbersArray = [STARTING_INDEX, leftSign, previousNumber, currentPage,
            nextNumber, rightSign, FINISHING_INDEX];
    }

    return (
        <div id="paginationContainer">
            {pageCount > 1 &&
                <button
                    className="paginationArrowButtons"
                    onClick={() => showNewPage(page - 1)}>
                        <span className="paginationSpan">
                            &#8592;
                        </span>
                </button> }
            {pageNumbersArray.map((element) =>
                (typeof element == 'number' || typeof element == 'string') && element &&
                    <button
                        className={(element === page)? "currentPaginationButton" :
                            (element === '...')? "enumeration" : "paginationButtons"}
                        key={element}
                        onClick={() => showNewPage(element)}>
                            <span
                                id={element}
                                className="paginationSpan">
                                {element}
                            </span>
                    </button> )
            }
            {pageCount > 1 &&
                <button
                    className="paginationArrowButtons"
                    onClick={() => showNewPage(page + 1)}>
                        <span className="paginationSpan">
                            &#8594;
                        </span>
                </button> }
        </div>
    );
}