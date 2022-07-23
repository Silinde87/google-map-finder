import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { string, number, object, array } from 'prop-types';
import Marker from '../Marker';
import MapComponent from './MapComponent';

const Map = ({ dataTestId = 'map', zoom = 11, center, markers }) => {
  const render = (status) => {
    switch (status) {
      case Status.FAILURE:
      case Status.LOADING:
        return <h1>{status}</h1>;
      default:
        return (
          <MapComponent center={center} zoom={zoom} dataTestId={dataTestId}>
            {markers.map(({ position }, key) => (
              <Marker key={key} position={position} />
            ))}
          </MapComponent>
        );
    }
  };

  return <Wrapper apiKey={process.env.REACT_APP_API_KEY} render={render} />;
};

Map.propTypes = {
  dataTestId: string,
  zoom: number,
  center: object,
  marker: array,
};

export default Map;
