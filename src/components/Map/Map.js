import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { useEffect, useState } from 'react';
import MapComponent from './MapComponent';

const Map = () => {
  const [center, setCenter] = useState({ lat: 41.3879, lng: 2.16992 });
  const zoom = 11;

  const render = (status) => {
    switch (status) {
      case Status.FAILURE:
      case Status.LOADING:
        return <h1>{status}</h1>;
      default:
        return <MapComponent center={center} zoom={zoom} />;
    }
  };

  return <Wrapper apiKey={process.env.REACT_APP_API_KEY} render={render} />;
};

export default Map;
