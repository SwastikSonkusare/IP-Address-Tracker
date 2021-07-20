import React, { useMap, useEffect } from "react";

import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapConsumer,
} from "react-leaflet";

import markerLogo from "../../assets/images/marker.png";

import "./IpAddressMap.scss";
import "leaflet/dist/leaflet.css";
const IpAddressMap = ({ lat, long, zoom }) => {
  const position = [lat, long];

  const markerIcon = new L.Icon({
    iconUrl: markerLogo,
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [3, -46],
  });

  
  const MyComponent = () => {
    console.log(position)

    return (
      <MapConsumer>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>You are here.</Popup>
        </Marker>
      </MapConsumer>
    );
  };


  // useEffect(() => {

  //   MyComponent();
  // }, []);


  // const ChangeView = ({ center, zoom }) => {
  //   let map = useMap();
  //   // map.setView(center, zoom);
  //   // return null;
  // };

  return (
    <>
      <MapContainer
        id="map"
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        {/* <ChangeView center={position} zoom={zoom} />  */}

        <MyComponent />
      </MapContainer>
    </>
  );
};

export default IpAddressMap;
