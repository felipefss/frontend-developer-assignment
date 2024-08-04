import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Recipient } from '../types/recipients';

type Props = {
  recipientList: Recipient[];
  updateRecipientList: (updatedList: Recipient[]) => void;
};

export const SearchInput = ({ recipientList, updateRecipientList }: Props) => {
  const [searchText, setSearchText] = useState('');

  const companyList = useMemo(
    () => recipientList.map((recipient) => recipient.email.match(/(?:\w+@)?(\S+)\.\S+/)[1]),
    [recipientList]
  );

  // Reset list when search input is empty
  useEffect(() => {
    if (searchText.length === 0) {
      updateRecipientList(recipientList);
    }
  }, [recipientList, searchText, updateRecipientList]);

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (companyList.includes(value)) {
      updateRecipientList(
        recipientList.reduce((output, recipient) => {
          if (!recipient.isDomain && recipient.email.includes(value)) {
            return [...output, recipient];
          }

          if (recipient.isDomain) {
            const filteredRecipients = recipient.recipients.filter((rec) => rec.email.includes(value));

            output.push(...filteredRecipients);
          }

          return output;
        }, [])
      );
    } else {
      updateRecipientList(recipientList);
    }

    setSearchText(value);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Search2Icon />
      </InputLeftElement>
      <Input
        borderColor="black"
        list="companies"
        placeholder="search"
        value={searchText}
        onChange={handleChangeSearchText}
      />

      <datalist id="companies">
        {companyList.map((company) => (
          <option value={company} key={company} />
        ))}
      </datalist>
    </InputGroup>
  );
};
