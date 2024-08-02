import { Box } from '@chakra-ui/react';
import { RecipientsList } from './RecipientsList';

const App = () => (
  <Box as="main" p={8}>
    <Box maxW="50rem" display="flex" gap={4}>
      <RecipientsList title="Available recipients" />
      <RecipientsList title="Selected recipients" />
    </Box>
  </Box>
);

export default App;
