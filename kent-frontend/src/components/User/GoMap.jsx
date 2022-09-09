import React, { useRef, useEffect, useState } from "react";

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import MyMarker from "./MyMarker";
import axios from "axios";
import { FaLocationArrow, FaSearchLocation, FaTimes  } from "react-icons/fa";
import { Button, Col, Form, Row } from "react-bootstrap";

const libraries = ['places']
const GoMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.React_App_Google_Map_Api_Key,
    libraries,
  });

  
  const [latCordinate, setLatCordinate] = useState("");
  const [lngCordinate, setLngCordinate] = useState("");
  const [mapMarkers, setMapMarkers] = useState([]);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  useEffect( () => {
    getMarkers();
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLatCordinate(position.coords.latitude);
        setLngCordinate(position.coords.longitude);
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
  }, []);
  const getMarkers = () => {
    const url = `${process.env.React_App_Host}/mapMarkers`;
    axios
      .get(url)
      .then((response) => setMapMarkers(response.data.response))
      .catch((error) => console.log(error.message));
  };


  if (!isLoaded) {
    return <div />;
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }
  
  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }
 
  return (
    <>
      <div>
        <div className="position-relative" style={{ height: "76vh" }}>
          <div className="position-absolute top-0 left-0 w-100 h-100">
            <GoogleMap
              center={{ lat: latCordinate, lng: lngCordinate }}
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
              }}
              onLoad={(map) => setMap(map)}
            >
              <Marker
                position={{ lat: latCordinate, lng: lngCordinate }}
                onLoad={(marker) => {
                  const customIcon = (opts) =>
                    Object.assign(
                      {
                        path: "M136.09,529.64q-2-9.91-4-19.81l-12.5-62.52-12.28-61.38-12-60-12-60c-.31-1.56-.69-3.1-.93-4.67a1.9,1.9,0,0,0-1.26-1.58,127.18,127.18,0,0,1-32.65-22.07C30,220.33,17.32,199.45,11.14,174.83A128.92,128.92,0,0,1,88,23.76a126.89,126.89,0,0,1,55.23-9.12A128.89,128.89,0,0,1,256.3,96.18a124.8,124.8,0,0,1,8.58,56.47c-3.12,38.19-20.07,69-50.12,92.71a119.23,119.23,0,0,1-23.37,14.28,2.33,2.33,0,0,0-1.39,1.93q-5.19,26.09-10.41,52.17-6.12,30.63-12.25,61.26l-12,60-12.25,61.25-6.57,32.84c0,.19-.1.38-.15.57Zm.25-450.69a64.5,64.5,0,1,0,64.4,64.55A64.49,64.49,0,0,0,136.34,78.94Z",
                        fillColor: "#34495e",
                        fillOpacity: 1,
                        strokeColor: "#000",
                        strokeWeight: 1,
                        scale: 0.08,
                      },
                      opts
                    );

                  marker.setIcon(
                    customIcon({
                      fillColor: "#04f1e1",
                      strokeColor: "black",
                    })
                  );
                }}
              />
             
              {mapMarkers &&
                mapMarkers.map((mapMarker, i) => (
                  <MyMarker key={i} mapMarker={mapMarker} />
                ))}

{directionsResponse ?
            <DirectionsRenderer directions={directionsResponse} />
            : ''
          }
            </GoogleMap>
          </div>
          
          <div
            className="position-absolute top-0 p-3 bg-white rounded shadow-lg"
            style={{ left: "50%", transform: "translateX(-50%)", zIndex: "2" }}
          >
            <Form>
              <Row>
                <Col md={4}>
                  <Autocomplete>
                    <Form.Control
                      type="text"
                      placeholder="Origin"
                      ref={originRef}
                    />
                  </Autocomplete>
                </Col>
                <Col md={4}>
                  <Autocomplete>
                    <Form.Control
                      type="text"
                      placeholder="Destination"
                      ref={destiantionRef}
                    />
                  </Autocomplete>
                </Col>
                <Col md={4} className="p-0">
                  <Button
                    // type="submit"
                    title="Search"
                    className="mr-0"
                    onClick={calculateRoute}
                  >
                    <FaLocationArrow />
                  </Button>
                  <Button className="bg-danger border-0 mr-0" 
                   title="Clear Route"
                    onClick={clearRoute}
                  >
                    <FaTimes  />
                  </Button>
                  <Button
              title="Locate Me"
              className="shadow-lg"
              onClick={() => {
                map.panTo({ lat: latCordinate, lng: lngCordinate });
              }}
            >
              <FaSearchLocation />
            </Button>
                </Col>
              </Row>
              <Row>
              {distance &&
                <Col>
                <p className="p-2 bg-light mt-2 mb-0">Distance: {distance}</p>
                </Col>
}
              {duration &&
                <Col>
                <p className="p-2 bg-light mt-2 mb-0">Duration: {duration}</p>
                </Col>
}
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoMap;
