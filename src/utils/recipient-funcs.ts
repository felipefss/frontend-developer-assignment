import { Recipient, RecipientData } from '../types/recipients';

// Aggregate emails with the same domain
export const normalizeRecipientData = (data: RecipientData[]) => {
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

export const splitAvailableSelectedRecipients = (recipients: Recipient[]) => {
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

  return {
    selectedRecipients,
    availableRecipients,
  };
};
