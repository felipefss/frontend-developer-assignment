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
        <List>
          {list.map((entry) => {
            if (entry.isDomain) {
              return (
                <details open>
                  <Box as="summary" _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}>
                    {entry.email}
                  </Box>
                  <List pl={6}>
                    {entry.recipients.map((recipients) => (
                      <ListItem _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }} key={recipients.email}>
                        {recipients.email}
                      </ListItem>
                    ))}
                  </List>
                </details>
              );
            }

            return (
              <ListItem _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }} key={entry.email}>
                {entry.email}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};
