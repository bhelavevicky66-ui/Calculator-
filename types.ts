
export type ButtonVariant = 'default' | 'operator' | 'equals' | 'clear';

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}
