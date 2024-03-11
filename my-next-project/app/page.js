"use client"
import React, { useEffect, useState } from 'react';
import BookTable from './components/BookTable';
import BookForm from './components/BookForm';
import LoginForm from './components/LoginForm';
import Register from './components/Register';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [activeForm, setActiveForm] = useState('login');
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(1);


  const onRegister = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5185/api/Account/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName: username, UserPassword: password }),
      });

      if (response.ok) {
        alert("Kayıt başarılı");
      } else {
        alert("Kayıt başarısız");
      }
    } catch (error) {
      console.error("Kayıt işlemi sırasında bir hata oluştu", error);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5185/api/Account/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName: username, UserPassword: password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("bu", data);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        setUserID(data.userID);
      } else {
        alert("Giriş başarısız");      }
    } catch (error) {
      console.error("HATA ", error);
    }
  };



const logout = () => {
  setIsLoggedIn(false); 
  setUserID(null);
};


  const handleAddBook = (book) => {
    setBooks([...books, { ...book, id: Date.now() }]);
  };
  const close = () => {
    setShowForm(false);
  }

  const handleDeleteBook = async (bookID) => {
    try {
      await fetch(`http://localhost:5185/api/book/DeleteBook/${bookID}`, {
        method: 'DELETE'
      });
      setBooks(books.filter(book => book.bookID !== bookID));
    } catch (error) {
      console.error('Kitap silinirken bir hata oluştu:', error);
    }
  };

  const toggleForm = () => {
    setActiveForm(activeForm === 'login' ? 'register' : 'login');
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []);
  return (
    <div className="flex justify-center items-center max-w-8xl">
      {!isLoggedIn ? (
        <>
          {activeForm === 'login' ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <Register onRegister={onRegister} />
          )}
          <button onClick={toggleForm} className="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:-translate-y-1">
            {activeForm === 'login' ? 'Kayıt' : 'Giriş'} formu için tıklayın
          </button>


        </>
      ) : (
        <div className="w-full max-w-7xl">
          {showForm ? (
            <BookForm onSave={handleAddBook} onClose={() => close(false)} />
          ) : (
            <div className="overflow-hidden">
              <BookTable onLogout={logout} books={books} onDelete={handleDeleteBook} setBooks={setBooks} userID={userID} onAdd={() => setShowForm(true)} />
            </div>
          )}
        </div>
      )}
    </div>

  );
}

export default HomePage;
