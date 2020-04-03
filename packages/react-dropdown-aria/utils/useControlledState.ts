import { useState, useCallback, useEffect } from "react"

function useControlledState<T>(onChangeProp: (T) => undefined, prop: T, defaultValue: T) {
  const [state, setState] = useState(prop || defaultValue);
  const value = prop || state;

  useEffect(() => {
    if (state !== prop) {
      setState(prop);
    }
  }, [prop, setState, state]);

  const setvalue = useCallback((newvalue: T) => {
    if (onChangeProp) {
      onChangeProp(newvalue);
    }

    setState(newvalue);
  }, [onChangeProp, setState]);

  return [value, setvalue];
}

export default useControlledState;
