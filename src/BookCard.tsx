import React, { type FC } from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Edit, Trash2, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown';
import type { Book, ReadingStatus } from './types';
import { Button } from './ui/button';

interface Props {
  book: Book
  // onStatusChange:
}


const BookCard: FC<Props> = ({ book}) => {
  const getStatusColor = (status: ReadingStatus) => {
    switch (status) {
      case 'TO_READ': return 'from-blue-500/20 to-purple-500/20';
      case 'READING': return 'from-green-500/20 to-blue-500/20';
      case 'READ': return 'from-purple-500/20 to-pink-500/20';
      default: return 'from-gray-500/20 to-gray-600/20';
    }
  };

  const getStatusIcon = (status: ReadingStatus) => {
    switch (status) {
      case 'TO_READ': return <Clock className="w-4 h-4" />;
      case 'READING': return <BookOpen className="w-4 h-4" />;
      case 'read': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: ReadingStatus) => {
    switch (status) {
      case 'TO_READ': return 'To Read';
      case 'READING': return 'READING';
      case 'read': return 'Completed';
      default: return status;
    }
  };

  const handleStatusChange = (newStatus) => {};

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <div
      className={`glass-effect rounded-xl p-4 transition-all duration-300 cursor-pointer bg-gradient-to-br ${getStatusColor(book.status)} border border-white/20`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className={`flex items-center gap-2 px-2 py-1 rounded-full bg-gradient-to-r ${getStatusColor(book.status)} border border-white/20`}>
          {getStatusIcon(book.status)}
          <span className="text-xs font-medium text-white">
            {getStatusLabel(book.status)}
          </span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="glass-effect border-white/20">
            <DropdownMenuItem onClick={handleEdit} className="text-white hover:bg-white/10">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDelete} 
              className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-white text-lg mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-gray-300 text-sm mb-2">
          by {book.author}
        </p>
      </div>


      <div className="flex gap-2">
        {book.status !== 'READING' && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStatusChange('READING')}
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            {book.status === 'TO_READ' ? 'Start READING' : 'Read Again'}
          </Button>
        )}
        
        {book.status !== 'READ' && (
          <Button
            size="sm"
            variant="default"
            onClick={() => handleStatusChange('read')}
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            Mark as Read
          </Button>
        )}

        {book.status === 'READING' && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStatusChange('TO_READ')}
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            Move to To Read
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookCard;