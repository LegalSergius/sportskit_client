import React from 'react';
import '../styles/regular/MapPage.css';
import {MobileMapPage} from '../mobile/MobileMapPage';
import MediaQuery from 'react-responsive';
import {MapContainer} from "./special/MapContainer";

export default class MapPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        document.title = "Карта | Sports Kit";

        return (
            <>
                <MediaQuery maxDeviceWidth={992}>
                    {(matches) =>
                        matches
                            ?
                            <MobileMapPage />
                            :
                            <div id="mapContainer">
                                <MapContainer isMobile={false} />
                            </div> }
                </MediaQuery>
            </>
        );
    }
}