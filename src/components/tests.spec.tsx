import '@testing-library/jest-dom';
import { render, screen, waitFor, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { RecipientListProvider } from '../context/RecipientListContext';
import { RecipientsList } from './RecipientsList';
import { RecipientData } from '../types/recipients';
import { normalizeRecipientData, splitAvailableSelectedRecipients } from '../utils/recipient-funcs';
import App from './App';

const recipientsDataMock: RecipientData[] = [
  {
    email: 'john.doe@example.com',
    isSelected: false,
  },
  {
    email: 'jane.doe@example.com',
    isSelected: false,
  },
  {
    email: 'jose@awesome.com',
    isSelected: false,
  },
];

describe('Recipients list', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(recipientsDataMock));
  });

  it('should display initial list of domains and emails', () => {
    const normalizedData = normalizeRecipientData(recipientsDataMock);
    const { availableRecipients } = splitAvailableSelectedRecipients(normalizedData);

    render(
      <RecipientListProvider>
        <RecipientsList list={availableRecipients} title="Recipients List" />
      </RecipientListProvider>
    );

    expect(screen.getByTestId('summary')).toHaveTextContent('example.com');

    ['john.doe@example.com', 'jane.doe@example.com', 'jose@awesome.com'].forEach((email) => {
      expect(screen.getByText(email)).toBeInTheDocument();
    });
  });

  it('should add a valid email to the list', async () => {
    render(
      <RecipientListProvider>
        <App />
      </RecipientListProvider>
    );

    const input = screen.getByPlaceholderText('search');
    await userEvent.type(input, 'abc@omg.com');

    const addButton = await screen.findByRole('button', { name: 'Add' });

    await userEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('abc@omg.com')).toBeInTheDocument();
    });
  });

  it('should move an email to the selected column when clicked', async () => {
    render(
      <RecipientListProvider>
        <App />
      </RecipientListProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('jose@awesome.com')).toBeInTheDocument();
    });

    const email = screen.getByText('jose@awesome.com');
    await userEvent.click(email);

    expect(within(screen.getAllByTestId('outer-list')[1]).getByText('jose@awesome.com')).toBeInTheDocument();
  });
});
