import { useMemo } from "react";
import { IdPrefix } from './constants';

const isClient = (
  typeof window !== undefined &&
  window.document &&
  window.document.documentElement
);

const isBrowser = process.env.NODE_ENV !== 'test' && isClient;

let idCount = 0;
const useId = (idProp: string): string => {
  const mergedId = useMemo(() => {
    if (idProp) return idProp;

    let id: string | number;
    if (isBrowser) {
      id = idCount;
      idCount += 1;
    } else {
      id = 'test';
    }
    return `${IdPrefix}${id}`;
  }, [idProp]);

  return mergedId;
}

export default useId;
