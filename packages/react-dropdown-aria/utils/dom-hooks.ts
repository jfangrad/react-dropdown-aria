import { useCallback, useEffect, MutableRefObject } from 'react';

const useClickListener = (closeDropdown: () => void, container: MutableRefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    document.addEventListener('mouseup', onClick, false);
    document.addEventListener('touchend', onClick, false);

    return () => {
      document.removeEventListener('mouseup', onClick);
      document.removeEventListener('touchend', onClick);
    }
  }, []);

  const onClick = useCallback((e: Event) => {
    if (container.current && !container.current.contains(e.target as Node)) {
      closeDropdown();
    }
  }, [container.current]);
};

export default useClickListener
