import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { RecipientsList } from './RecipientsList';
import { Recipient, RecipientData } from '../types/recipients';
import { fetchData } from '../utils/fetchData';

// TODO: Check if email already exists in list

// TODO: move this to another file
// Aggregate emails with the same domain
const normalizeData = (data: RecipientData[]) => {
  const domains: Record<string, RecipientData[]> = {};

  data.forEach(({ email, isSelected }) => {
    const domain = email.split('@')[1];

    if (!(domain in domains)) {
      domains[domain] = [];
    }

    domains[domain].push({ email, isSelected });
  });

  const recipientList = Object.entries(domains).map<Recipient>(([domainName, recipients]) => {
    if (recipients.length > 1) {
      return {
        isDomain: true,
        email: domainName,
        isSelected: false,
        recipients,
      };
    }

    return {
      ...recipients[0],
      isDomain: false,
    };
  });

  return recipientList;
};

const App = () => {
  // In a more complex app, all of this logic would be in a Context or state management library
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  useEffect(() => {
    // Simulating data fetching
    fetchData().then((data) => setRecipients(normalizeData(data)));
  }, []);

  // TODO: move the following two to a hook
  const selectedRecipients = recipients.reduce<Recipient[]>((output, recipient) => {
    if (recipient.isSelected) {
      return [...output, recipient];
    }

    if (recipient.isDomain) {
      const selectedDomainRecipients = recipient.recipients.filter((r) => r.isSelected);

      if (selectedDomainRecipients.length) {
        output.push({
          ...recipient,
          recipients: selectedDomainRecipients,
        });
      }
    }

    return output;
  }, []);

  const availableRecipients = recipients.reduce<Recipient[]>((output, recipient) => {
    if (!recipient.isDomain && !recipient.isSelected) {
      return [...output, recipient];
    }

    if (recipient.isDomain) {
      const availableDomainRecipients = recipient.recipients.filter((r) => !r.isSelected);

      if (availableDomainRecipients.length) {
        output.push({
          ...recipient,
          recipients: availableDomainRecipients,
        });
      }
    }

    return output;
  }, []);

  return (
    <Box as="main" p={8}>
      <Box maxW="50rem" display="flex" gap={4}>
        <RecipientsList title="Available recipients" hasSearch={true} list={availableRecipients} />
        <RecipientsList title="Selected recipients" list={selectedRecipients} />
      </Box>
    </Box>
  );
};

export default App;
