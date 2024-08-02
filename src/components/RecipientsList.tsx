import { Search2Icon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement, List, ListItem } from '@chakra-ui/react';
import { Recipient } from '../types/recipients';

type Props = {
  title: string;
  hasSearch?: boolean;
  list: Recipient[];
  onClickItem?: (email: string) => void;
};

export const RecipientsList = ({ title, hasSearch, onClickItem, list }: Props) => {
  return (
    <Box as="fieldset" border="1px solid" borderRadius={4} display="grid" flex={1} gap={4} p={4}>
      <legend>{title}</legend>

      {hasSearch && (
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon />
          </InputLeftElement>
          <Input borderColor="black" placeholder="search" />
        </InputGroup>
      )}

      <Box border="1px solid" borderRadius={4} p={4}>
        {/* <details open>
          <summary>timescale.com</summary>
          <List pl={6} width="fit-content">
            <ListItem _hover={{ backgroundColor: 'gray.100' }}>ann@timescale.com</ListItem>
            <ListItem>ann@timescale.com</ListItem>
          </List>
        </details> */}

        <List>
          {list.map((entry) => (
            <ListItem _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }} key={entry.email}>
              {entry.email}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};