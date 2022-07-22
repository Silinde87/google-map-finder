import { func, string } from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import { throttle } from 'lodash';
import Input from '../../atoms/Input';
import GoogleServices from './../../../services/GoogleServices';

const autocompleteService = { current: null };

const AutoComplete = ({ dataTestId = 'autocomplete', onSelected }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const filteredOptions = options
    ?.map(({ description }) => description)
    .filter((option) => option !== null && option !== undefined);

  const googleMapsFetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions({ ...request }, callback);
      }, 200),
    []
  );

  useEffect(() => {
    let isActive = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    googleMapsFetch({ input: inputValue }, (results) => {
      if (isActive) {
        let newOptions = [];

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      isActive = false;
    };
  }, [inputValue, googleMapsFetch]);

  const handleOnSelected = (event) => {
    const option = event.target.innerText;
    let selectedOption = options?.[options.findIndex(({ description }) => option === description)];

    GoogleServices.getPlacesPostCodeById(selectedOption).then((result) => {
      const { location } = result.geometry;
      const center = { lat: location.lat(), lng: location.lng() };
      onSelected(center);
    });
    setIsOptionListOpen(false);
  };

  const handleOnChange = (event) => {
    const { value } = event.target;
    if (value === '') {
      setOptions([]);
    } else {
      setOptions(value ? [value, ...options] : options);
    }
    setInputValue(value);
    setIsOptionListOpen(true);
  };

  const renderItem = (item, key) => {
    return (
      <p key={key} onClick={handleOnSelected}>
        {item}
      </p>
    );
  };

  return (
    <div data-testid={dataTestId}>
      <Input onChange={handleOnChange} />
      {isOptionListOpen && filteredOptions.map((item, key) => renderItem(item, key))}
    </div>
  );
};

AutoComplete.propTypes = {
  dataTestId: string,
  onSelected: func,
};

export default AutoComplete;
