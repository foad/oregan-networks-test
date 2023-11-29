import React, { createContext, useState, useContext, ReactNode } from "react";

type FocusContextType = {
  focusedItem: string | null;
  keyboardListener: ((key: string) => void) | null;
  setFocusedItem: (itemId: string | null) => void;
  setKeyboardListener: (listener: (key: string) => void) => void;
};

const FocusContext = createContext<FocusContextType>({
  focusedItem: null,
  keyboardListener: () => {},
  setFocusedItem: () => {},
  setKeyboardListener: () => {},
});

export const FocusProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [focusedItem, setFocusedItem] = useState<string | null>(null);
  const [keyboardListener, setKeyboardListener] = useState<
    ((key: string) => void) | null
  >(null);

  return (
    <FocusContext.Provider
      value={{
        focusedItem,
        keyboardListener,
        setFocusedItem,
        setKeyboardListener,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  return useContext(FocusContext);
};
