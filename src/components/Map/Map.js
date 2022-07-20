import { Status, Wrapper } from '@googlemaps/react-wrapper';
import Marker from '../Marker/Marker';
import MapComponent from './MapComponent';
import { useReactContext } from '../../context/Context';

const Map = () => {
  const { context } = useReactContext();
  const zoom = 11;

  const render = (status) => {
    switch (status) {
      case Status.FAILURE:
      case Status.LOADING:
        return <h1>{status}</h1>;
      default:
        return (
          <MapComponent center={context.center} zoom={zoom}>
            <Marker position={context.markerPosition} />
          </MapComponent>
        );
    }
  };

  return <Wrapper apiKey={process.env.REACT_APP_API_KEY} render={render} />;
};

export default Map;
