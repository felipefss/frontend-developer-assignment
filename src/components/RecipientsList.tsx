import { Box, List, ListItem } from '@chakra-ui/react';
import { Recipient } from '../types/recipients';
import { useEffect, useState } from 'react';
import { SearchInput } from './SearchInput';

type Props = {
  title: string;
  hasSearch?: boolean;
  list: Recipient[];
  onClickItem?: (email: string) => void;
};

export const RecipientsList = ({ title, hasSearch, onClickItem, list }: Props) => {
  const [filteredList, setFilteredList] = useState<Recipient[]>([]);

  // This could be done differently. Perhaps have a wrapper component and then two separate for each list
  // Then, this side effect wouldn't be needed
  useEffect(() => {
    if (!hasSearch) {
      setFilteredList(list);
    }
  }, [hasSearch, list]);

  const handleUpdateRecipientList = (updatedList: Recipient[]) => {
    setFilteredList(updatedList);
  };

  return (
    <Box as="fieldset" border="1px solid" borderRadius={4} display="flex" flexDir="column" flex={1} gap={4} p={4}>
      <legend>{title}</legend>

      {hasSearch && <SearchInput recipientList={list} updateRecipientList={handleUpdateRecipientList} />}

      <Box border="1px solid" borderRadius={4} flex={1} p={4}>
        <List data-testid="outer-list">
          {filteredList.map((entry) => {
            if (entry.isDomain) {
              return (
                <details key={entry.email} open>
                  <Box
                    as="summary"
                    onMouseDown={() => {
                      onClickItem(entry.email);
                    }}
                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                    data-testid="summary"
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
