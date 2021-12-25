import { useEffect, useRef, useState } from 'react';
import { useFn } from '@lxjx/hooks';

export function useToggle(init = false) {
  const [toggle, set] = useState(init);

  const s = useFn((next?: boolean) => {
    if (next !== undefined) {
      set(next);
      return;
    }
    set(prev => !prev);
  });

  return [toggle, s] as const;
}
