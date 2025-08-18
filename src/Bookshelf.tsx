import { supabase } from "../supabaseClient";
import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import { getEmptyStateMessage, getTabCount, getTabIcon } from './utils/bookshelf';
import { useBooks } from './hooks/useBooks';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import type { Book, ReadingStatus } from './types';
import AddBookDialog from './AddBookDialog';
import BookCard from './BookCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import EditBookDialog from './EditBookDialog';


export const Bookshelf = () => {
  const [activeTab, setActiveTab] = useState('TO_READ');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [books, setBooks] = useBooks();

  const onAddBook = useCallback((newBook: Book) => {
    setBooks(prevBooks => [...prevBooks, newBook]);
  }, []);

  const updateBook = useCallback((bookId: number, updatedBookData: Partial<Omit<Book, 'id'>>) => {
    setBooks(prev => prev.map(book =>
      book.id === bookId ? { ...book, ...updatedBookData } : book
    ));
    setIsEditDialogOpen(false);
    setEditingBook(null);
  }, []);

  const updateBookStatus = useCallback((bookId: number, newStatus: ReadingStatus) => {
    setBooks(previousBooks => previousBooks.map(book =>
      book.id === bookId ? { ...book, status: newStatus } : book
    ));
  }, [])

  const deleteBook = useCallback((bookId: number) => {
    setBooks(prev => prev.filter(book => book.id !== bookId));
  }, []);

  const handleRestore = useCallback((book: Book) => {
    setBooks(prev => [book, ...prev]);
  }, []);

  const handleEditBook = useCallback((book: Book) => {
    setEditingBook(book);
    setIsEditDialogOpen(true);
  }, []);

  const handleUpdateBookId = useCallback((tempId: number, realBook: Book) => {
    setBooks(prevBooks => {
      return prevBooks.map((book) => {
        if (book.id === tempId) {
          book.id = realBook.id 
        }
        return book;
      })
    })
  }, []);

  const rollbackBook = useCallback((bookId: number, bookUpdates: Omit<Book, 'id'>) => {
    setBooks(previousBooks => previousBooks.map(book =>
      book.id === bookId ? { ...book, ...bookUpdates } : book
    ));
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const filteredBooks = useMemo(() => books.filter(book => book.status === activeTab), [books, activeTab]);


  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            My Personal Bookshelf
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Organize and track your reading journey with style
          </p>
        </motion.div>

        <Button onClick={signOut} className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white fixed right-4 top-4">
          Sign out
        </Button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-effect border-white/20 p-1">
              <TabsTrigger
                value="TO_READ"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/30 data-[state=active]:to-purple-500/30 data-[state=active]:text-white"
              >
                {getTabIcon('TO_READ')}
                <span className="hidden sm:inline">To Read</span>
                <span className="sm:hidden">To Read</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {getTabCount(books, 'TO_READ')}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="READING"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/30 data-[state=active]:to-blue-500/30 data-[state=active]:text-white"
              >
                {getTabIcon('READING')}
                <span className="hidden sm:inline">Reading</span>
                <span className="sm:hidden">Reading</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {getTabCount(books, 'READING')}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="READ"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-pink-500/30 data-[state=active]:text-white"
              >
                {getTabIcon('READ')}
                <span className="hidden sm:inline">Read</span>
                <span className="sm:hidden">Read</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {getTabCount(books, 'READ')}
                </span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value={activeTab} className="mt-0">
                <AnimatePresence mode="wait">
                  {filteredBooks.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-16"
                    >
                      <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold mb-2 text-white">
                          {getEmptyStateMessage(activeTab)}
                        </h3>
                        <p className="text-gray-400 mb-6">
                          Click the + button below to add your first book
                        </p>
                        <Button
                          onClick={() => setIsAddDialogOpen(true)}
                          className="floating-gradient hover:scale-105 transition-transform"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Book
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="books"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                      {filteredBooks.map((book, index) => (
                        <motion.div
                          key={book.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <BookCard
                            book={book}
                            onStatusChange={updateBookStatus}
                            onDelete={deleteBook}
                            onEdit={handleEditBook}
                            onRestore={handleRestore}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-14 h-14 shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-purple-500/25"
          >
            <Plus className="w-4 h-4" />

          </Button>
        </motion.div>

        <AddBookDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAddBook={onAddBook}
          onRollback={deleteBook}
          onSuccess={handleUpdateBookId}
        />

        {editingBook && (
          <EditBookDialog
            isOpen={isEditDialogOpen}
            onClose={() => {
              setIsEditDialogOpen(false);
              setEditingBook(null);
            }}
            onUpdateBook={updateBook}
            book={editingBook}
            onRollback={rollbackBook}
          />
        )}
      </div>
    </div>
  );
}