export type RecipientData = {
  email: string;
  isSelected: boolean;
};

export type Recipient = {
  isDomain: boolean;
  email: string;
  isSelected: boolean;
  recipients?: RecipientData[];
};
