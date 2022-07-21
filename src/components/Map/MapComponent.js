import { useEffect, useRef, useState, Children, isValidElement, cloneElement } from 'react';
const MapComponent = ({ center, zoom, children }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map]);

  return (
    <>
      <div ref={ref} style={{ width: '100vw', height: '100vh' }} />
      {Children.map(children, (child) => {
        return isValidElement(child) && cloneElement(child, { map });
      })}
    </>
  );
};

export default MapComponent;
