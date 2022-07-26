import { func, string } from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import { throttle } from 'lodash';
import Input from '../../atoms/Input';
import GoogleServices from './../../../services/GoogleServices';
import { AutoCompleteWrapper, OptionsElement, OptionsWrapper } from './AutoComplete.styled';

const autocompleteService = { current: null };

const AutoComplete = ({ dataTestId = 'autocomplete', onSelected }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);

  const googleMapsFetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions({ ...request }, callback);
      }, 200),
    []
  );

  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    googleMapsFetch({ input: inputValue }, (results) => {
      let newOptions = [];

      if (results) {
        newOptions = [...newOptions, ...results];
      }

      setOptions(newOptions);
    });
  }, [inputValue, googleMapsFetch]);

  const handleOnSelected = (event) => {
    const { option } = event.target.dataset;
    let selectedOption = options.find(({ description }) => description === option);

    GoogleServices.getPlacesPostCodeById(selectedOption).then((result) => {
      const { location } = result.geometry;
      const center = { lat: location.lat(), lng: location.lng() };
      onSelected(center);
    });
    setIsOptionListOpen(false);
  };

  const handleOnChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    setIsOptionListOpen(true);
  };

  const renderItem = (item, key) => {
    return (
      <OptionsElement key={key} onClick={handleOnSelected} data-option={item}>
        {highlightedText(item)}
      </OptionsElement>
    );
  };

  const highlightedText = (text) => {
    const regex = new RegExp(inputValue, 'gi');
    let highlightText = text.replace(
      regex,
      `<span data-option="${text}" style="font-weight: 600">${inputValue}</span>`
    );
    return <span data-option={text} dangerouslySetInnerHTML={{ __html: highlightText }} />;
  };

  return (
    <AutoCompleteWrapper data-testid={dataTestId}>
      <Input onChange={handleOnChange} />
      {isOptionListOpen && options.length > 0 && (
        <OptionsWrapper data-testid="options-wrapper">
          {options.map((item, key) => renderItem(item.description, key))}
        </OptionsWrapper>
      )}
    </AutoCompleteWrapper>
  );
};

AutoComplete.propTypes = {
  dataTestId: string,
  onSelected: func,
};

export default AutoComplete;
