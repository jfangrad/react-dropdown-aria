import { useState, useCallback, MutableRefObject, useRef, Dispatch, SetStateAction } from "react";
import { Option } from './types';

const useSearch = (setFocusedIndex: Dispatch<SetStateAction<number>>, flattenedOptions: Option[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchTimer: MutableRefObject<NodeJS.Timer | null> = useRef(null);

  const searchList = useCallback((value: string) => {
    const index = flattenedOptions.findIndex(option => option.value.toLowerCase().indexOf(value) === 0);
    if (index) setFocusedIndex(index);
  }, [flattenedOptions, setFocusedIndex]);

  const clearTimer = useCallback(() => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
      searchTimer.current = null;
    }
  }, [searchTimer.current])

  const clearSearch = useCallback(() => setSearchTerm(''), [setSearchTerm]);

  const searchDropdown = useCallback((key: string) => {
    const oldTerm = searchTerm;
    setSearchTerm(p => (p + key));
    searchList(oldTerm + key);

    clearTimer();
    const timer = setTimeout(clearSearch, 1500);
    searchTimer.current = timer
  }, [searchTerm]);

  return searchDropdown;
}

export default useSearch;
