import { type FC } from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown';
import type { Book, ReadingStatus } from './types';
import { Button } from './ui/button';
import { useUpdateBook } from './hooks/useUpdateBook';
import { useDeleteBook } from './hooks/useDeleteBook';
import { useToast } from './hooks/useToast';
import { getStatusColor, getStatusIcon, getStatusLabel } from './utils/bookCard';

interface Props {
  book: Book
  onStatusChange: (bookId: number, status: ReadingStatus) => void;
  onDelete: (bookId: number) => void;
  onEdit: (book: Book) => void;
  onRestore: (book: Book) => void; // Optional for restore functionality
}


const BookCard: FC<Props> = ({ book, onStatusChange, onDelete, onEdit, onRestore }) => {
  const { toast } = useToast();

  const { updateBook } = useUpdateBook(book!.id, {
    onSuccess: () => {
      toast({
        title: "Status Updated! ✨",
        description: "Book status has been successfully updated.",
      });
    },
    onError: () => {
      const previousStatus = book.status;
      toast({
        title: "Update Failed! ❌",
        description: "There was an error updating the book status.",
      });

      onStatusChange(book.id, previousStatus);
    }
  });
  const { deleteBook } = useDeleteBook(book.id, {
    onSuccess: () => {
      toast({
        title: "Book Removed 🗑️",
        description: "Book has been removed from your library.",
      });
    },
    onError: () => {
      const previousBook = book;
      toast({
        title: "Delete Failed! ❌",
        description: "There was an error deleting the book.",
      });
      onRestore(previousBook);
    }
  });

  const handleStatusChange = async (newStatus: ReadingStatus) => {
    onStatusChange(book.id, newStatus);
    await updateBook({ status: newStatus });
  };

  const handleEdit = () => {
    onEdit(book);
  };

  const handleDelete = async () => {
    onDelete(book.id);
    await deleteBook();
  };

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
            {book.status === 'TO_READ' ? 'Start Reading' : 'Read Again'}
          </Button>
        )}
        
        {book.status !== 'READ' && (
          <Button
            size="sm"
            variant="default"
            onClick={() => handleStatusChange('READ')}
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