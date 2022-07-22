import { useEffect, useState, useMemo } from 'react';
import { useReactContext } from '../../context/Context';
import { throttle } from 'lodash';

const autocompleteService = { current: null };

const AutoComplete = () => {
  const { setContext } = useReactContext();

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const filteredOptions = options
    ?.map(({ description }) => description)
    .filter((option) => option !== null && option !== undefined);

  const googleMapsFetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(
          { ...request, componentRestrictions: { country: 'es' }, types: ['geocode'] },
          callback
        );
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

  const getPlacesPostCodeById = async (selectedOption) =>
    new Promise((resolve, reject) => {
      const { place_id } = selectedOption;
      if (!place_id) {
        reject('placeId not provided');
      }

      try {
        new window.google.maps.places.PlacesService(document.createElement('div')).getDetails(
          {
            placeId: place_id,
            fields: ['address_components', 'geometry'],
          },
          (details) => resolve({ ...details, ...selectedOption })
        );
      } catch (e) {
        reject(e);
      }
    });

  const handleOnSelected = (event) => {
    const option = event.target.innerText;
    let selectedOption = options?.[options.findIndex(({ description }) => option === description)];

    getPlacesPostCodeById(selectedOption).then((result) => {
      const { location } = result.geometry;
      const center = { lat: location.lat(), lng: location.lng() };
      setContext((prevContext) => ({
        ...prevContext,
        center,
        markers: [{ position: center }],
      }));
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
    <>
      <input onChange={handleOnChange} />
      {isOptionListOpen && filteredOptions.map((item, key) => renderItem(item, key))}
    </>
  );
};

export default AutoComplete;
