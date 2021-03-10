import * as React from 'react';

interface UseLocalStateReturn<RecordType> {
  localState: RecordType | null;
  getLocalState: (key: string) => RecordType | null;
  updateLocalState: (item: RecordType, key: string) => void;
}

type UseLocalState = <RecordType>(
  initialValue?: RecordType | null
) => UseLocalStateReturn<RecordType>;

export const useLocalState: UseLocalState = (initialValue = null) => {
  const [localState, setLocalState] = React.useState(initialValue);

  const getLocalState = (key: string) => {
    const localItem = window.localStorage.getItem(key);
    const parsedItem = localItem ? JSON.parse(localItem) : null;
    if (parsedItem) {
      setLocalState(parsedItem);
      return parsedItem;
    }
  };

  const updateLocalState = (item: typeof localState, key: string) => {
    const parsedItem = item ? JSON.stringify(item) : null;
    parsedItem && window.localStorage.setItem(key, parsedItem);
  };

  React.useEffect(() => {
    if (initialValue) {
      const localKeys = Object.keys(initialValue);

      localKeys.length > 0 && localKeys.forEach(key => getLocalState(key));
    }
  }, []);

  return {
    localState,
    getLocalState,
    updateLocalState
  };
};
