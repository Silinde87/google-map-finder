import { useState } from 'react';
import { ReactContext } from './Context';

//markers is: { position: { lat: number, lng: number } }
const initContext = {
  center: { lat: 41.3879, lng: 2.16992 },
  markers: [],
};

const ReactContextProvider = ({ children }) => {
  const [context, setContext] = useState(initContext);
  return <ReactContext.Provider value={{ context, setContext }}>{children}</ReactContext.Provider>;
};

export { ReactContextProvider };
