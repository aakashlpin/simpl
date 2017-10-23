import { format } from 'date-fns';

export const formatDate = (str) => format(str, 'Do MMM');

export const formatAmount = (amount) => Number(amount / 100);
