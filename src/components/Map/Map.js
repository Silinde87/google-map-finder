import { useEffect, useRef, useState } from 'react';

const Map = ({ center, zoom }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map]);

  return <div ref={ref} style={{ width: '100vw', height: '100vh' }} />;
};

export default Map;
