import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BooksList from './pages/BooksList';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<BooksList />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="*" element={<Navigate to="/books" replace />} />
      </Routes>
    </Router>
  );
}

export default App;