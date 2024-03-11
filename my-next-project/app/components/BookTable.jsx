// components/BookTable.js
import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
function BookTable({ onLogout, books, onDelete, onAdd, setBooks, userID }) {

    console.log(userID);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState({});
    const [isContentVisible, setContentVisible] = useState(false);
    const [filteredBooks, setFilteredBooks] = useState(books);

    useEffect(() => {
        setFilteredBooks(books);
    }, [books]);

    const handleSearch = (searchTerm) => {
        const filtered = books.filter((book) =>
            book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    const handleEditClick = (book) => {
        setEditingBook(book);
        setIsEditModalOpen(true);
    };



    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5185/api/book/UpdateBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingBook),
            });

            if (!response.ok) {
                throw new Error('error');
            }

            const updatedBooks = books.map(b => b.BookID === editingBook.BookID ? editingBook : b);
            setBooks(updatedBooks);
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Kitap Adı Güncellenemedi:', error);
        }
    };


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:5185/api/book/GetAllBook');
                if (!response.ok) {
                    throw new Error('Bağlantı hatasık');
                }
                const data = await response.json();
                setBooks(data);

            } catch (error) {
                console.error('Kitaplar getirilemedi:', error);
            }
        };
        fetchBooks();
    }, []);



    return (
        <div>
            <button onClick={onLogout} className=" mt-2 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
                Çıkış Yap
            </button>
            <SearchBar onSearch={handleSearch} />
            {userID !== 1 ? null : (
                <div className="flex justify-center items-center text-center">
                    <button
                        className="flex mb-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                        onClick={onAdd}
                    >
                        <svg className="h-5 w-5 text-white mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 4v16m8-8H4"></path>
                        </svg>
                        Kitap Ekle
                    </button>
                </div>



            )}

            <div id="capture" class=" grid col-span-12 ">
                <div id="capture" class=" grid col-span-12">
                    <div class=" py-10">
                        <div class=" grid center col-span-12 grid-cols-1 md:grid-cols-4 gap-4">
                            {filteredBooks.map((book, index) => (
                                <div key={book.bookID} className="flex flex-col col-span-12 md:flex-row md:items-start bg-white rounded-lg shadow-lg overflow-hidden">
                                    <div className="p-4 w-full md:w-3/3">
                                        <h3 className="text-lg font-semibold mb-4">Kitap Bilgileri</h3>
                                        <table className="">
                                            <tbody>
                                                <tr>
                                                    <th className="text-left font-medium p-2 bg-gray-100">Temin Edilen Firma Adı</th>
                                                    <td className="p-2">{book.temin}</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-left font-medium p-2 bg-gray-100">Kitap Adı</th>
                                                    <td className="p-2">{book.bookName}</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-left font-medium p-2 bg-gray-100">Fatura No</th>
                                                    <td className="p-2">{book.invoiceNo}</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-left font-medium p-2 bg-gray-100">Alış Fiyatı</th>
                                                    <td className="p-2">{book.x}</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-left font-medium p-2 bg-gray-100">Satış Fiyatı</th>
                                                    <td className="p-2">{book.y}</td>
                                                </tr>
                                                <tr>
                                                    <th className="text-left font-medium p-2 bg-gray-100">Z</th>
                                                    <td className="p-2">{book.z}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="  bg-gray-50">
                                        <h4 className="font-semibold mb-4">İşlemler</h4>
                                        <div className="flex">
                                            {userID === 1 && (
                                                <button onClick={() => onDelete(book.bookID)} className="text-white bg-red-500 hover:bg-red-600 font-bold py-2 px-4 rounded">
                                                    Sil
                                                </button>
                                            )}
                                            {(userID === 1 || userID === 2) && (
                                                <>
                                                    <button onClick={() => handleEditClick(book)} className="ml-4 text-white bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded">
                                                        Düzelt
                                                    </button>

                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>





                            ))}
                            {isEditModalOpen && (
                                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                                        <div className="mt-3 text-center">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Kitap Düzenle</h3>
                                            <form className="mt-2 space-y-5" onSubmit={handleEditSubmit}>
                                                <input
                                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    placeholder="Kitap Adı"
                                                    type="text"
                                                    value={editingBook.bookName || ''}
                                                    onChange={(e) => setEditingBook({ ...editingBook, bookName: e.target.value })}
                                                />
                                                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    Kaydet
                                                </button>
                                            </form>
                                            <div className="mt-2">
                                                <button className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style={{ transition: "all .15s ease" }} onClick={() => setIsEditModalOpen(false)}>
                                                    Kapat
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookTable;
