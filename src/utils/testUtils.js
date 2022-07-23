import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactContextProvider } from '../context/ContextProvider';

const renderComponent = (ui) => {
  return render(
    <ReactContextProvider>
      <Router>{ui}</Router>
    </ReactContextProvider>
  );
};

export { renderComponent };
