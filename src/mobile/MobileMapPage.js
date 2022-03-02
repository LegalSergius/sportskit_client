import React from 'react';
import '../styles/mobile/MobileMapPage.css';
import {MapContainer} from "../components/special/MapContainer";

export class MobileMapPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="mobileMapContainer">
                <MapContainer isMobile />
            </div>
        );
    }
}