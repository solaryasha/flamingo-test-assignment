import React, { useState, type FC } from 'react';
import { Book } from 'lucide-react';
import * as SelectPrimitive from '@radix-ui/react-select';
import type { ReadingStatus, Book as BookType } from './types';
import { DialogHeader } from './ui/dialog';
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAddBook } from './hooks/useAddBook';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddBook: (book: BookType) => void;
}

const AddBookDialog: FC<Props> = ({ isOpen, onClose, onAddBook }) => {
  const { addBook } = useAddBook()
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'TO_READ',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.title && formData.author) {
      const newBook = await addBook({
        title: formData.title,
        author: formData.author,
        status: formData.status as ReadingStatus
      })
      setFormData({
        title: '',
        author: '',
        status: 'TO_READ',
      });
      onAddBook(newBook);
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
            <Book className="w-5 h-5" />
            Add New Book
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
              variant="solid"
              className="flex-1 floating-gradient hover:scale-105 transition-transform"
            >
              Add Book
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookDialog;