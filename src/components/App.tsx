import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { RecipientsList } from './RecipientsList';
import { Recipient } from '../types/recipients';
import { fetchData } from '../utils/fetchData';
import {
  normalizeRecipientData,
  setIsSelectedByEmail,
  splitAvailableSelectedRecipients,
} from '../utils/recipient-funcs';

// TODO: Check if email already exists in list

const App = () => {
  // In a more complex app, all of this logic would be in a Context or state management library
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

  return (
    <Box as="main" p={8}>
      <Box maxW="50rem" display="flex" gap={4}>
        <RecipientsList
          title="Available recipients"
          onClickItem={onClickAvailableRecipient}
          hasSearch={true}
          list={availableRecipients}
        />
        <RecipientsList title="Selected recipients" onClickItem={onClickSelectedRecipient} list={selectedRecipients} />
      </Box>
    </Box>
  );
};

export default App;
