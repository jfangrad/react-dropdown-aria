import { useState, Dispatch, SetStateAction, useMemo, useCallback } from 'react';
import { filterDropdownOptions } from './helper';
import { DropdownOption } from './types';

const useSearch = (setFocusedIndex: Dispatch<SetStateAction<number>>, options: DropdownOption[], searchable: boolean) => {
  const [searchTerm, setSearchTermState] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm.trim() || !isSearching) return options;

    return filterDropdownOptions(options, searchTerm)
  }, [options, searchTerm, isSearching]);

  const setSearchTerm = useCallback((newSearchTerm: string, newIsSearching = true) => {
    setIsSearching(newIsSearching);
    setSearchTermState(newSearchTerm)
    setFocusedIndex(0);
  }, [setFocusedIndex, setSearchTermState, setIsSearching]);


  return { searchTerm, setSearchTerm, filteredOptions, isSearching, setIsSearching };
}

export default useSearch;
