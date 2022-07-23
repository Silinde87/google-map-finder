import { useEffect, useRef, useState, Children, isValidElement, cloneElement } from 'react';
import { string, number, object, array } from 'prop-types';

const MapComponent = ({ dataTestId, center, zoom, children }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map]);

  useEffect(() => {
    if (ref.current && map) {
      map.panTo(center);
    }
  }, [center]);

  return (
    <>
      <div ref={ref} style={{ width: '100vw', height: '100vh' }} data-testid={dataTestId} />
      {Children.map(children, (child) => {
        return isValidElement(child) && cloneElement(child, { map });
      })}
    </>
  );
};

MapComponent.propTypes = {
  dataTestId: string,
  zoom: number,
  center: object,
  children: array,
};

export default MapComponent;
