import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Recipient } from '../types/recipients';
import { fetchData } from '../utils/fetchData';
import {
  normalizeRecipientData,
  setIsSelectedByEmail,
  splitAvailableSelectedRecipients,
} from '../utils/recipient-funcs';

type ContextProps = {
  availableRecipients: Recipient[];
  selectedRecipients: Recipient[];
  onClickAvailableRecipient: (email: string) => void;
  onClickSelectedRecipient: (email: string) => void;
};

const RecipientListContext = createContext<ContextProps | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export const RecipientListProvider = ({ children }: ProviderProps) => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  useEffect(() => {
    // Simulating data fetching
    fetchData().then((data) => setRecipients(normalizeRecipientData(data)));
  }, []);

  const { availableRecipients, selectedRecipients } = splitAvailableSelectedRecipients(recipients);

  const onClickAvailableRecipient = (email: string) => {
    setRecipients((prev) => setIsSelectedByEmail(prev, email, true));
  };

  const onClickSelectedRecipient = (email: string) => {
    setRecipients((prev) => setIsSelectedByEmail(prev, email, false));
  };

  const value = useMemo(
    () => ({
      availableRecipients,
      selectedRecipients,
      onClickAvailableRecipient,
      onClickSelectedRecipient,
    }),
    [availableRecipients, selectedRecipients]
  );

  return <RecipientListContext.Provider value={value}>{children}</RecipientListContext.Provider>;
};

export const useRecipientListContext = () => {
  const context = useContext(RecipientListContext);

  if (!context) {
    throw new Error('No RecipientListContext provided!');
  }

  return context;
};
