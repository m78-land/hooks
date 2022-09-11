import { useEffect } from "react";
import { useFirstMountState } from "@m78/hooks";

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) return effect();
  }, deps);
};
