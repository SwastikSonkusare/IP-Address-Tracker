import React from "react";

// import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "./IpAddressMap.scss";
import "leaflet/dist/leaflet.css";
const IpAddressMap = ({ lat, long }) => {
  let position = [lat, long];
  console.log(position);

  return (
    <>
      {position ? (
        <MapContainer
          id="map"
          center={position}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default IpAddressMap;
