export class NavigationInputHandler {
    constructor(dataArray, currentComponent) {
        this.dataArray = dataArray;
        this.component = currentComponent;
        this.enterButton = 13;
        this.arrowDown = 40;
        this.arrowUp = 38;
    }

    async handleInputKeyDown(event, listItems) {
        const KEY_CODE = event.keyCode;

        if (KEY_CODE === this.enterButton) {
            await this.component.onListItemSelected(event, this.dataArray[0]);
        } else if (KEY_CODE === this.arrowDown) {
            this.component.listItemIndex = 0;

            const CURRENT_ITEM = listItems[this.component.listItemIndex];
            console.log(CURRENT_ITEM);
            CURRENT_ITEM?.focus();
        }
    }

    async handleListItemKeyDown(event, listItems) {
        const KEY_CODE = event.keyCode, LIST_LENGTH = listItems.length - 1;
        let listItemIndex = this.component.listItemIndex;
        alert(`KEYCODE - ${KEY_CODE}`);
        if (KEY_CODE === this.enterButton) {
            await this.component.onListItemSelected(event, this.dataArray[listItemIndex]);
        } else if (KEY_CODE === this.arrowDown) {
            listItemIndex++;
            if (listItemIndex > LIST_LENGTH) {
                listItemIndex = 0;
            }
            listItems[listItemIndex].focus();
        } else if (KEY_CODE === this.arrowUp) {
            listItemIndex--;
            if (listItemIndex < 0) {
                this.component.textInput.focus();
            } else {
                listItems[listItemIndex].focus();
            }
        }

        return listItemIndex;
    }
}