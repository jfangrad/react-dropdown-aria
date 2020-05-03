import { useCallback, useEffect, MutableRefObject, useRef } from 'react';

export const useClickListener = (closeDropdown: () => void, container: MutableRefObject<HTMLDivElement | null>) => {
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
  }, [container.current, closeDropdown]);
};

const ScrollBuffer = 8;
export const useScroll = (focusedIndex: number, optionContainer: MutableRefObject<HTMLUListElement | null>) => {
  useEffect(() => {
    if (optionContainer.current && focusedIndex >= 0) {
      const children = optionContainer.current.getElementsByClassName('dropdown-option');
      if (children.length) {
        const focusedChild = children[focusedIndex] as HTMLDivElement;
        const { height: optionHeight } = focusedChild.getBoundingClientRect();
        const { height: listHeight } = optionContainer.current.getBoundingClientRect();

        const scrollTop = optionContainer.current.scrollTop;
        const isAbove = focusedChild.offsetTop <= scrollTop;
        const isInView = (
          focusedChild.offsetTop >= scrollTop &&
          focusedChild.offsetTop + optionHeight <= scrollTop + listHeight
        );

        if (!isInView) {
          if (focusedIndex === 0) {
            optionContainer.current.scrollTo({ top: 0 });
          } else if (isAbove) {
            optionContainer.current.scrollTo({ top: focusedChild.offsetTop });
          } else {
            optionContainer.current.scrollTo({ top: focusedChild.offsetTop - listHeight + optionHeight + ScrollBuffer});
          }
        }
      }
    }
  }, [focusedIndex]);
};

