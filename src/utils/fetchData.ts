import recipientsData from '../assets/recipientsData.json';
import { RecipientData } from '../types/recipients';

export const fetchData = (): Promise<RecipientData[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(recipientsData);
    });
  });
