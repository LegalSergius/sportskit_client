import {Map, Placemark, YMaps} from "react-yandex-maps";
import React, {useContext, useState} from "react";
import '../../styles/regular/MapPage.css';
import '../../styles/mobile/MobileMapPage.css';
import {StateContext} from "../../contexts";
/*
export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWindow: false,
            markerInfo: {}
        };
        this.showInfo = this.showInfo.bind(this);
    }

    showInfo(filialNumber, address, productsCount, promosCount) {
        this.setState({showWindow: true, markerInfo: {
            filialNumber, address, productsCount, promosCount
            }});
    }

    onContainerBlur() {
        this.setState({showWindow: false});
    }

    render() {
        const markerInfo = this.state.markerInfo;

        return (
            <>
                <YMaps query={{
                    apikey: 'e1cc0e38-9fa7-4126-998c-f7fc1ca71458'
                }}>
                    {this.state.showWindow &&
                        <div id={this.props.isMobile ? "mobileInfoWindow" :"infoWindow"}>
                            <span>
                                Филиал #{markerInfo.filialNumber} <br/>
                                Aдрес: {markerInfo.address} <br/>
                                Количество доступных товаров: {markerInfo.productsCount} <br/>
                                Количество доступных промо-кодов: {markerInfo.promosCount}
                            </span>
                            <button
                                id={this.props.isMobile? "mobileCloseWindow": "closeWindow"}
                                onClick={() => this.onContainerBlur(this)}>
                                Ок
                            </button>
                        </div>
                    }
                    <Map
                        width="100%"
                        height={this.props.isMobile? "600px" : "450px"}
                        defaultState={{
                            center: [43.25, 76.9], zoom: 11
                        }}>
                        <Placemark
                            geometry={{
                                type: 'Point',
                                coordinates: [43.19121, 76.98631]
                            }}
                            options={{
                                iconColor: 'purple'
                            }}
                            properties={{
                                hintContent: 'Филиал 1'
                            }}
                            modules={['geoObject.addon.hint']}
                            tabIndex="0"
                            onClick={() => this.showInfo(1,
                                'ул.Ладушкина, д.60/130', 60, 20)}
                            onMouseOut={this.onContainerBlur}>
                        </Placemark>
                        <Placemark
                            geometry={{
                                type: 'Point',
                                coordinates: [43.23536, 76.87270]
                            }}
                            options={{
                                iconColor: 'purple'
                            }}
                            properties={{
                                hintContent: 'Филиал 2'
                            }}
                            modules={['geoObject.addon.hint']}
                            tabIndex="0"
                            onClick={() => this.showInfo(1,
                                'просп.Абая-ул.Тлендиева', 60, 20)}
                            onMouseOut={this.onContainerBlur}/>
                        <Placemark
                            geometry={{
                                type: 'Point',
                                coordinates: [43.23127, 76.93929]
                            }}
                            options={{
                                iconColor: 'purple'
                            }}
                            properties={{
                                hintContent: 'Филиал 3'
                            }}
                            modules={['geoObject.addon.hint']}
                            tabIndex="0"
                            onClick={() => this.showInfo(3,
                                'просп.Сейфуллина-ул.Тимирязева', 60, 20)}
                            onMouseOut={this.onContainerBlur}/>
                        <Placemark
                            geometry={{
                                type: 'Point',
                                coordinates: [43.24778, 76.92212]
                            }}
                            options={{
                                iconColor: 'purple'
                            }}
                            properties={{
                                hintContent: 'Филиал 4'
                            }}
                            modules={['geoObject.addon.hint']}
                            tabIndex="0"
                            onClick={() => this.showInfo(4,
                                'ул.Кабанбай Батыра, д.164', 60, 20)}/>
                    </Map>
                </YMaps>
            </>
        );
    }
};*/
export default function MapContainer() {
    const contextState = useContext(StateContext);

    const [isWindowShown, setIsWindowShown] = useState(false);
    const [markerInfo, setMarkerInfo] = useState({});

    const showInfo = (filialNumber, address, productsCount, promosCount) => {
        setIsWindowShown(true);
        setMarkerInfo({filialNumber, address, productsCount, promosCount});
    };

    document.title = "Карта | Sports Kit";

    return (
        <div id={contextState.isMobile? "mobileMapContainer" : "mapContainer"}>
            <YMaps query={{
                apikey: 'e1cc0e38-9fa7-4126-998c-f7fc1ca71458'
            }}>
                {isWindowShown &&
                    <div id={contextState.isMobile? "mobileInfoWindow" :"infoWindow"}>
                            <span>
                                Филиал #{markerInfo.filialNumber} <br/>
                                Адрес: {markerInfo.address} <br/>
                                Количество доступных товаров: {markerInfo.productsCount} <br/>
                                Количество доступных промо-кодов: {markerInfo.promosCount}
                            </span>
                        <button
                            id={contextState.isMobile? "mobileCloseWindow": "closeWindow"}
                            onClick={() => setIsWindowShown(false)}>
                            Ок
                        </button>
                    </div>
                }
                <Map
                    width="100%"
                    height={contextState.isMobile? "600px" : "450px"}
                    defaultState={{
                        center: [43.25, 76.9], zoom: 11
                    }}>
                    <Placemark
                        geometry={{
                            type: 'Point',
                            coordinates: [43.19121, 76.98631]
                        }}
                        options={{
                            iconColor: 'purple'
                        }}
                        properties={{
                            hintContent: 'Филиал 1'
                        }}
                        modules={['geoObject.addon.hint']}
                        tabIndex="0"
                        onClick={() => showInfo(1,
                            'ул.Ладушкина, д.60/130', 60, 20)}
                        onMouseOut={() => setIsWindowShown(false)}>
                    </Placemark>
                    <Placemark
                        geometry={{
                            type: 'Point',
                            coordinates: [43.23536, 76.87270]
                        }}
                        options={{
                            iconColor: 'purple'
                        }}
                        properties={{
                            hintContent: 'Филиал 2'
                        }}
                        modules={['geoObject.addon.hint']}
                        tabIndex="0"
                        onClick={() => showInfo(1,
                            'просп.Абая-ул.Тлендиева', 60, 20)}
                        onMouseOut={() => setIsWindowShown(false)}/>
                    <Placemark
                        geometry={{
                            type: 'Point',
                            coordinates: [43.23127, 76.93929]
                        }}
                        options={{
                            iconColor: 'purple'
                        }}
                        properties={{
                            hintContent: 'Филиал 3'
                        }}
                        modules={['geoObject.addon.hint']}
                        tabIndex="0"
                        onClick={() => showInfo(3,
                            'просп.Сейфуллина-ул.Тимирязева', 60, 20)}
                        onMouseOut={() => setIsWindowShown(false)}/>
                    <Placemark
                        geometry={{
                            type: 'Point',
                            coordinates: [43.24778, 76.92212]
                        }}
                        options={{
                            iconColor: 'purple'
                        }}
                        properties={{
                            hintContent: 'Филиал 4'
                        }}
                        modules={['geoObject.addon.hint']}
                        tabIndex="0"
                        onClick={() => showInfo(4,
                            'ул.Кабанбай Батыра, д.164', 60, 20)}/>
                </Map>
            </YMaps>
        </div>
    );
}