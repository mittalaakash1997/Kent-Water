import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";

const MyMarker = (props) => {
 
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const markerClickHandle = (e) => {
    setShowInfoWindow(!showInfoWindow);
  };
  const {name, email, address, romodel, phone, lat, lng, model_pin_color} = props.mapMarker;

  return (
    <>
      <Marker
        position={{lat: parseFloat(lat), lng: parseFloat(lng)}}
        onLoad={(marker) => {
          const customIcon = (opts) =>
            Object.assign(
              {
                path: "M24,0A24,24,0,0,0,0,24C0,37.25,20,72,24,72S48,37.25,48,24A24,24,0,0,0,24,0Zm0,33a9,9,0,1,1,9-9A9,9,0,0,1,24,33Z",
                fillColor: "#34495e",
                fillOpacity: 1,
                strokeColor: "#000",
                strokeWeight: 1,
                scale: 0.4,
              },
              opts
            );

          marker.setIcon(
            customIcon({
              fillColor: model_pin_color,
              strokeColor: "black",
            })
          );
        }}
        onClick={markerClickHandle}
      >
         {showInfoWindow && (
                    <InfoWindow>
                      <p style={{lineHeight: "1.5"}}>
                        <strong>Name: </strong>{name}<br/>
                        <strong>Email: </strong>{email}<br/>
                        <strong>Address: </strong>{address}<br/>
                        <strong>Phone: </strong>{phone}<br/>
                        <strong>Ro model Name: </strong>{romodel}
                        </p>
                    </InfoWindow>
                )}
      </Marker>
    </>
  );
};

export default MyMarker;
