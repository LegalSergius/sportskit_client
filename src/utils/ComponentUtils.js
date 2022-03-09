import {get} from "../httpTasks/tasks/ProductAPITasks";

export async function handleInputKeyDown(dataArray, currentComponentObject, listItems, event) {
    console.log('code - ' + event.keyCode);
    const enterButton = 13, arrowDown = 40;
    if (event.keyCode === enterButton) {
        await currentComponentObject.onListItemSelected(event, dataArray[0]);
    } else if (event.keyCode === arrowDown) {
        currentComponentObject.listItemIndex = 0;

        const currentItem = listItems[currentComponentObject.listItemIndex];
        currentItem?.focus();
    }
}

export async function handleListItemKeyDown(dataArray, currentComponentObject, listItems, event) {
    const ENTER_BUTTON = 13, ARROW_DOWN = 40, arrowUp = 38;
    let listLength = listItems.length - 1, listItemIndex = currentComponentObject.listItemIndex;
    if (event.keyCode === ENTER_BUTTON) {
        await currentComponentObject.onListItemSelected(event, dataArray[listItemIndex]);
    } else if (event.keyCode === ARROW_DOWN) {
        console.log('до - ' + listItemIndex);
        listItemIndex++;
        console.log('после - ' + listItemIndex);
        if (listItemIndex > listLength) {
            listItemIndex = 0;
        }
        listItems[listItemIndex].focus();
    } else if (event.keyCode === arrowUp) {
        listItemIndex--;
        if (listItemIndex < 0) {
            currentComponentObject.textInput.focus();
        } else {
            listItems[listItemIndex].focus();
        }
    }

    return listItemIndex;
}

export function submitResponse(event, inputValue) {
    try {
        get(getAPI('products/getProduct/' + inputValue),
            true).then((response) => {
                if (response.dataValues) {
                    console.log(`response - ${JSON.stringify(response.dataValues)}`);
                    return {responseObject: response, redirected: true};
                }
            }
        );
    } catch (e) {
        console.log(`ошибка - ${e}`);
        if (inputValue) {
            alert('К сожалению, по значению "' + inputValue + '" ничего найдено. Повторите снова');
        }
    }
}

export function getFile(productId, mediaArray) {
    let fileObject = mediaArray.filter((element) => {
        return (element.id === productId);
    });

    return "data:image/png;base64," + fileObject[0].file;
}

export function linkObject(page, isMobile = false) {
    return {
        pathname: page,
        state: {
            isMobile
        }};
}


export function getAPI(address) {
    return 'http://192.168.1.43:6677/api/' + address;
}
