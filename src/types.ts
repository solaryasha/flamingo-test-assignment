export type ReadingStatus = 'TO_READ' | 'READING' | 'READ';

export interface Book {
  id: number;
  title: string;
  author: string;
  status: ReadingStatus;
}