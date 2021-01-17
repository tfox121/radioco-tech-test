import { useState } from 'react';

export default (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(window.localStorage.getItem(key) || initialValue);

  const setValue = (value) => {
    window.localStorage.setItem(key, value);
    setStoredValue(value);
  };

  return [storedValue, setValue];
};
