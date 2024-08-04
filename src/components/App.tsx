import { Box } from '@chakra-ui/react';
import { RecipientsList } from './RecipientsList';
import { useRecipientListContext } from '../context/RecipientListContext';

const App = () => {
  const { onClickAvailableRecipient, onClickSelectedRecipient, availableRecipients, selectedRecipients } =
    useRecipientListContext();

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
