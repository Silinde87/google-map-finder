import { Status, Wrapper } from '@googlemaps/react-wrapper';
import Marker from '../Marker/Marker';
import MapComponent from './MapComponent';
import { useReactContext } from '../../context/Context';
import { useEffect } from 'react';

const Map = ({ zoom = 11, center }) => {
  const { context, setContext } = useReactContext();

  useEffect(() => {
    if (center) {
      setContext((prevContext) => ({
        ...prevContext,
        center,
      }));
    }
  }, [center]);

  const render = (status) => {
    switch (status) {
      case Status.FAILURE:
      case Status.LOADING:
        return <h1>{status}</h1>;
      default:
        return (
          <MapComponent center={context.center} zoom={zoom}>
            {context.markers.map(({ position }, key) => (
              <Marker key={key} position={position} />
            ))}
          </MapComponent>
        );
    }
  };

  return <Wrapper apiKey={process.env.REACT_APP_API_KEY} render={render} />;
};

export default Map;
