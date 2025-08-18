import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import type { ReadingStatus } from '../types';

export const getStatusColor = (status: ReadingStatus) => {
    switch (status) {
      case 'TO_READ': return 'from-blue-500/20 to-purple-500/20';
      case 'READING': return 'from-green-500/20 to-blue-500/20';
      case 'READ': return 'from-purple-500/20 to-pink-500/20';
      default: return 'from-gray-500/20 to-gray-600/20';
    }
  };

  export const getStatusIcon = (status: ReadingStatus) => {
    switch (status) {
      case 'TO_READ': return <Clock className="w-4 h-4" />;
      case 'READING': return <BookOpen className="w-4 h-4" />;
      case 'READ': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

export  const getStatusLabel = (status: ReadingStatus) => {
    switch (status) {
      case 'TO_READ': return 'To Read';
      case 'READING': return 'READING';
      case 'READ': return 'Completed';
      default: return status;
    }
  };