import { createContext, useContext, useEffect } from "react";

type BackFn = (() => void) | null;

export const BackButtonContext = createContext<{
  setBack: (fn: BackFn) => void;
}>({ setBack: () => {} });

/** Register a back navigation handler for the current route. */
export function useBackButton(fn: () => void) {
  const { setBack } = useContext(BackButtonContext);
  useEffect(() => {
    setBack(fn);
    return () => setBack(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
