import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Recipient } from '../types/recipients';
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
  addEmailtoRecipientList: (email: string) => void;
};

const RecipientListContext = createContext<ContextProps | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export const RecipientListProvider = ({ children }: ProviderProps) => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  useEffect(() => {
    // Simulating data fetching
    fetch('/recipientsData.json')
      .then((res) => res.json())
      .then((data) => setRecipients(normalizeRecipientData(data)));
  }, []);

  const { availableRecipients, selectedRecipients } = splitAvailableSelectedRecipients(recipients);

  const onClickAvailableRecipient = (email: string) => {
    setRecipients((prev) => setIsSelectedByEmail(prev, email, true));
  };

  const onClickSelectedRecipient = (email: string) => {
    setRecipients((prev) => setIsSelectedByEmail(prev, email, false));
  };

  const addEmailtoRecipientList = useCallback((email: string) => {
    // TODO: Check if email already exists in list

    const inputDomain = email.split('@')[1];

    setRecipients((prev) => {
      const sameDomainIndex = prev.findIndex(
        (recipient) => recipient.email.match(/(?:\w+@)?(\S+\.\S+)/)[1] === inputDomain
      );

      const newEntry: Recipient = {
        email,
        isDomain: false,
        isSelected: false,
      };

      if (sameDomainIndex !== -1) {
        const changedState = [...prev];
        const recipient = changedState[sameDomainIndex];

        // There is a domain
        if (recipient.isDomain && recipient.email === inputDomain) {
          recipient.recipients.push(newEntry);
          return changedState;
        }

        // There is another email with the same domain
        const otherRecipient = changedState.splice(sameDomainIndex, 1)[0];
        changedState.push({
          email: inputDomain,
          isDomain: true,
          isSelected: false,
          recipients: [otherRecipient, newEntry],
        });

        return changedState;
      }

      return [...prev, newEntry];
    });
  }, []);

  const value = useMemo(
    () => ({
      availableRecipients,
      selectedRecipients,
      onClickAvailableRecipient,
      onClickSelectedRecipient,
      addEmailtoRecipientList,
    }),
    [addEmailtoRecipientList, availableRecipients, selectedRecipients]
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
