import React, {useContext, useState} from 'react';
import '../../styles/regular/InformPage.css'
import styles from '../../styles/index.module.css'
import {StateContext} from "../../contexts";
/*
export default class InformationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 1,
        }
        this.selectImage = this.selectImage.bind(this);
        this.images =  {
            1: '../static/image_for_switcher_1.png',
            2: '../static/image_for_switcher_2.png',
            3: '../static/image_for_switcher_3.png',
            4: '../static/image_for_switcher_4.png'
        };
    }

    selectImage(counter) {
        if (counter > 4) {
            counter = 1;
        } else if (counter < 1) {
            counter = 4;
        }

        this.setState({counter});
    }

    render() {
        document.title = "Справка | Sports Kit";

        let counter = this.state.counter;
        const IS_MOBILE = this.props.location.state?.isMobile;
        const SELECT_BUTTONS_CLASS = IS_MOBILE? "mobileSelectButtons" : "selectButtons";

        return (
            <div id={IS_MOBILE? "mobileCommonContainer" : "commonContainer"}>
                <h1 className={styles.commonFont}>
                    О сайте
                </h1>
                <p
                    id={IS_MOBILE? "mobileDescription" : "description"}
                    className={styles.commonFont}>
                    <mark><b>Sports Kit</b></mark> - компания по производству и распространению качественного спортивного
                    снаряжения, одежды, питания и прочего инвентаря для занятий силовыми видами спорта. Вы здесь
                    найдете уникальный ассортимент <b>качественных изделий</b>, имеющие продолжительную <b>гарантию</b> и
                    самое главное - <b>по приятной цене!</b> Также при покупке любого товара,
                    Вы имеете возможность заказать бесплатную доставку, чтобы быстрее получить нашу продукцию :)
                </p>
                <p
                    id={IS_MOBILE? "mobileIllustrationTitle" : ""}
                    className={styles.commonFont}>
                    Иллюстрации содержимого:
                </p>
                <div className={IS_MOBILE? "mobileImageSwitcher" : "imageSwitcher"}>
                    <button
                        id="leftButton"
                        className={SELECT_BUTTONS_CLASS}
                        onClick={() => this.selectImage(--counter)}>
                        <img
                            className={IS_MOBILE? "mobileSelectButtonsImage" : ""}
                            src="../static/to_left.png"
                            alt="Предыдущая фотография"/>
                    </button>
                    <img
                        id={IS_MOBILE? "mobileCurrentImage" : "currentImage"}
                        src={this.images[counter]}
                        alt="Фотография товаров" />
                    <button
                        id="rightButton"
                        className={SELECT_BUTTONS_CLASS}
                        onClick={() => this.selectImage(++counter)}>
                        <img
                            className={IS_MOBILE? "mobileSelectButtonsImage" : ""}
                            src="../static/to_right.png"
                            alt="Следущая фотография"/>
                    </button>
                    <span
                        id="imageSwitcherSelector"
                        className={styles.commonFont}>
                        {counter} из 4
                    </span>
                </div>
            </div>
        );
    }
}*/

export default function InformationPage() {
    const contextState = useContext(StateContext);
    const selectButtonsClass = contextState.isMobile? "mobileSelectButtons" : "selectButtons";
    const IMAGES = {
        1: '../static/image_for_switcher_1.png',
        2: '../static/image_for_switcher_2.png',
        3: '../static/image_for_switcher_3.png',
        4: '../static/image_for_switcher_4.png'
    };

    let [counter, setCounter] = useState(1);

    const selectImage = (counter) => {
        if (counter > 4) {
            counter = 1;
        } else if (counter < 1) {
            counter = 4;
        }

        setCounter(counter);
    }

    document.title = "Справка | Sports Kit";

    return (
        <div id={contextState.isMobile? "mobileCommonContainer" : "commonContainer"}>
            <h1 className={styles.commonFont}>
                О сайте
            </h1>
            <p
                id={contextState.isMobile? "mobileDescription" : "description"}
                className={styles.commonFont}>
                <mark><b>Sports Kit</b></mark> - компания по производству и распространению качественного спортивного
                снаряжения, одежды, питания и прочего инвентаря для занятий силовыми видами спорта. Вы здесь
                найдете уникальный ассортимент <b>качественных изделий</b>, имеющие продолжительную <b>гарантию</b> и
                самое главное - <b>по приятной цене!</b> Также при покупке любого товара,
                Вы имеете возможность заказать бесплатную доставку, чтобы быстрее получить нашу продукцию :)
            </p>
            <p
                id={contextState.isMobile? "mobileIllustrationTitle" : ""}
                className={styles.commonFont}>
                Иллюстрации содержимого:
            </p>
            <div className={contextState.isMobile? "mobileImageSwitcher" : "imageSwitcher"}>
                <button
                    id="leftButton"
                    className={selectButtonsClass}
                    onClick={() => selectImage(--counter)}>
                    <img
                        className={contextState.isMobile? "mobileSelectButtonsImage" : ""}
                        src="../static/to_left.png"
                        alt="Предыдущая фотография"/>
                </button>
                <img
                    id={contextState.isMobile? "mobileCurrentImage" : "currentImage"}
                    src={IMAGES[counter]}
                    alt="Фотография товаров" />
                <button
                    id="rightButton"
                    className={selectButtonsClass}
                    onClick={() => selectImage(++counter)}>
                    <img
                        className={contextState.isMobile? "mobileSelectButtonsImage" : ""}
                        src="../static/to_right.png"
                        alt="Следущая фотография"/>
                </button>
                <span
                    id="imageSwitcherSelector"
                    className={styles.commonFont}>
                        {counter} из 4
                    </span>
            </div>
        </div>
    );
}
