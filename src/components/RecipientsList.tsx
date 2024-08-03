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
    <Box as="fieldset" border="1px solid" borderRadius={4} display="flex" flexDir="column" flex={1} gap={4} p={4}>
      <legend>{title}</legend>

      {hasSearch && (
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon />
          </InputLeftElement>
          <Input borderColor="black" placeholder="search" />
        </InputGroup>
      )}

      <Box border="1px solid" borderRadius={4} flex={1} p={4}>
        <List>
          {list.map((entry) => {
            if (entry.isDomain) {
              return (
                <details key={entry.email} open>
                  <Box
                    as="summary"
                    onMouseDown={() => {
                      onClickItem(entry.email);
                    }}
                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                  >
                    {entry.email}
                  </Box>
                  <List pl={6}>
                    {entry.recipients.map((recipient) => (
                      <ListItem
                        onMouseDown={() => {
                          onClickItem(recipient.email);
                        }}
                        _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                        key={recipient.email}
                      >
                        {recipient.email}
                      </ListItem>
                    ))}
                  </List>
                </details>
              );
            }

            return (
              <ListItem
                onMouseDown={() => {
                  onClickItem(entry.email);
                }}
                _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                key={entry.email}
              >
                {entry.email}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};
