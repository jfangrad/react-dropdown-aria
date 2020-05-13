import { useState, Dispatch, SetStateAction, useMemo, useCallback } from 'react';
import { filterDropdownOptions } from './helper';
import { DropdownOption } from './types';

const useSearch = (setFocusedIndex: Dispatch<SetStateAction<number>>, options: DropdownOption[], searchable: boolean) => {
  const [searchTerm, setSearchTermState] = useState('');

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm.trim()) return options;
    return filterDropdownOptions(options, searchTerm)
  }, [options, searchTerm]);

  const setSearchTerm = useCallback((newSearchTerm: string) => {
    setSearchTermState(newSearchTerm)
    setFocusedIndex(0);
  }, [setFocusedIndex, setSearchTermState]);

  return { searchTerm, setSearchTerm, filteredOptions };
}

export default useSearch;
