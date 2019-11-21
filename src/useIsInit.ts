import { useEffect, useRef } from 'react';
import { useSelf } from './useSelf';

export function useIsInit(): boolean {
  const count = useRef(0);
  const isInit = count.current === 0;
  useEffect(() => {
    count.current++;
  }, []);

  return isInit;
}
