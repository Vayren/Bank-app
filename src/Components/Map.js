import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
  
function SimpleMap (props) {
  let defaultProps = {
    center: {
      lat: 48.3794327,
      lng: 31.1655807
    },
    zoom: 15
  };

  if(!props.coords[0]) return null;
  return (
    <div style={{ height: '800px', width: '1200px'}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD_pYIplFYtz8DGJm_Sq-bJ_PPs16hqzlE" }}
        defaultCenter={{lat: props.coords[0].location.lat, lng: props.coords[0].location.lng}}
        defaultZoom={defaultProps.zoom}
      >
         <Marker
            lat={props.coords[0].location.lat}
            lng={props.coords[0].location.lng}
            name={props.coords[0].address}
            color="blue"
          />
      </GoogleMapReact>
    </div>
  );
}
 
export default SimpleMap;