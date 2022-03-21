import React from 'react';
import '../../styles/regular/Header.css';
import '../../styles/mobile/MobileHeader.css';
import {Link} from "react-router-dom";
import {HOME_PAGE} from "../../routing/routing_consts";

export function Logotype(props) {
    return (
        <div id={props.isMobile? "mobileLogotypeContainer" : "logotypeContainer"}>
            <Link to={HOME_PAGE}>
                <img
                    id="logo"
                    src="/static/logo_image.png"
                    alt="Логотип компании"
                    onTouchStart={(event) => props.toggleMenu(event)}
                    width={props.isMobile? "200px" : "300px"}
                    height={props.isMobile? "35px" : "50px"} />
            </Link>
        </div>
    );

}