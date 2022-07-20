import Map from '../../components/Map';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { useEffect } from 'react';

function Home() {
  const center = {
    lat: 10.99835602,
    lng: 77.01502627,
  };
  const zoom = 11;

  const render = (status) => {
    return <h1>{status}</h1>;
  };

  return (
    <Wrapper apiKey={process.env.REACT_APP_API_KEY} render={render}>
      <Map center={center} zoom={zoom} />
    </Wrapper>
  );
}

export default Home;
