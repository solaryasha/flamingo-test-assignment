import React, { useState, useEffect, type FC } from 'react';
import { Edit } from 'lucide-react';
import { DialogHeader } from './ui/dialog';
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { Book } from './types';
import { useUpdateBook } from './hooks/useUpdateBook';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpdateBook: (bookId: number, data: Partial<Omit<Book, "id">>) => void;
  book: Book | null;
}

const EditBookDialog: FC<Props> = ({ isOpen, onClose, onUpdateBook, book }) => {
  const { updateBook } = useUpdateBook(book?.id);
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    status: book?.status || 'TO_READ',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (book && formData?.title && formData?.author) {
      await updateBook({ title: formData.title, author: formData.author, status: formData.status });
      onUpdateBook(book.id, formData);
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <Edit className="w-5 h-5" />
            Edit Book
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter book title"
              className="glass-effect border-white/20 text-white placeholder:text-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author" className="text-white">Author *</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              placeholder="Enter author name"
              className="glass-effect border-white/20 text-white placeholder:text-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-white">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger className="glass-effect border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-effect border-white/20">
                <SelectItem value="TO_READ">To Read</SelectItem>
                <SelectItem value="READING">Currently Reading</SelectItem>
                <SelectItem value="READ">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 floating-gradient hover:scale-105 transition-transform"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookDialog;