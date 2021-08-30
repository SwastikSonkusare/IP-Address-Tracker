import React, { useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import "./IpAddressMap.scss";
const IpAddressMap = ({ lat, long, zoom }) => {
  const position = {
    lat: lat,
    lng: long,
  };

  const [select, setSelect] = useState(false);

  const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap defaultZoom={zoom} defaultCenter={position}>
        {props.isMarkerShown && <Marker position={position} onClick={() => setSelect(prevState => !prevState)} />}

        {select && (
          <InfoWindow position={position}><div>You' re here!</div></InfoWindow>
        )}
      </GoogleMap>
    ))
  );


  return (
    <>
      <MyMapComponent
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100vh` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100vh` }} />}
      />
    </>
  );
};

export default IpAddressMap;
