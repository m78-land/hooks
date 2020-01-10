import { useState, useCallback } from 'react';

export interface SetState<T> {
  (patch: Partial<T> | ((prevState: T) => Partial<T>)): void;
}

/* 与react-use的useSetState一样, 但是额外返回了一个setOverState用于覆盖状态 */
export const useSetState = <T extends object>(
  initialState = {} as (() => T) | T,
): [T, SetState<T>, SetState<T>] => {
  const [state, set] = useState<T>(initialState);
  const setState = useCallback(
    patch => {
      set(prevState => ({ ...prevState, ...(patch instanceof Function ? patch(prevState) : patch) }));
    },
    [set],
  );

  return [state, setState, set as SetState<T>];
};
