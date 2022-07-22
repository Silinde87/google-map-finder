import { useEffect, useState } from 'react';
import { object } from 'prop-types';

useEffect;
const Marker = (options) => {
  const [marker, setMarker] = useState();
  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

Marker.propTypes = {
  options: object,
};

export default Marker;
