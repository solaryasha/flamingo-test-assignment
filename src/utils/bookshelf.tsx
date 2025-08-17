import type { ReadingStatus, Book as BookType } from '../types';
import { Book, BookOpen, CheckCircle } from 'lucide-react';


export const getTabCount = (books: BookType[], status: ReadingStatus) => {
  return books.filter(book => book.status === status).length;
};

export const getEmptyStateMessage = (activeTab: string) => {
  switch (activeTab) {
    case 'TO_READ':
      return "Your 'To Read' list is empty. Add a book to get started!";
    case 'READING':
      return "You're not currently reading any books. Start your reading journey!";
    case 'READ':
      return "No completed books yet. Finish reading a book to see it here!";
    default:
      return "No books found.";
  }
};

export const getTabIcon = (tab: ReadingStatus) => {
    switch (tab) {
      case 'TO_READ': return <Book className="w-4 h-4" />;
      case 'READING': return <BookOpen className="w-4 h-4" />;
      case 'READ': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };