import React from 'react';
import '../../styles/regular/Header.css';
import '../../styles/mobile/MobileHeader.css';
import {Link} from "react-router-dom";
import {HOME_PAGE} from "../../routing/routing_consts";

export class Logotype extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={this.props.isMobile? "mobileLogotypeContainer" : "logotypeContainer"}>
                <Link to={HOME_PAGE}>
                    <img
                        id="logo"
                        src="/static/logo_image.png"
                        alt="Логотип компании"
                        onTouchStart={(event) => this.props.toggleMenu(event)}
                        width={this.props.isMobile? "200px" : "300px"}
                        height={this.props.isMobile? "35px" : "50px"} />
                </Link>
            </div>
        );
    }
}