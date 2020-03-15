import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
  
function Map ({ coords }) {

  let defaultProps = {
    center: {
      lat: 48.3794327,
      lng: 31.1655807
    },
    zoom: 15
  };

  if(!coords[0]) return null;
  return (
    <div style={{ height: '800px', width: '1200px'}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "KEY" }}
        defaultCenter={{lat: coords[0].location.lat, lng: coords[0].location.lng}}
        defaultZoom={defaultProps.zoom}
      >
         <Marker
            lat={coords[0].location.lat}
            lng={coords[0].location.lng}
            name={coords[0].address}
            color="blue"
          />
      </GoogleMapReact>
    </div>
  );
}
 
export default Map;