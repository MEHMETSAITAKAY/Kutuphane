// components/BookForm.js
import React, { useState } from 'react';

function BookForm({onClose }) {

  const [Temin, setTemin] = useState('')
  const [BookName, setName] = useState('');
  const [InvoiceNo, setInvoiceNo] = useState('');
  const [X, SetX] = useState('');
  const [Y, SetY] = useState('');
  const [Z, SetZ] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = { BookName, InvoiceNo, Temin, X, Y, Z };

    try {
      const response = await fetch('http://localhost:5185/api/book/CreateBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      const contentType = response.headers.get('Content-Type');
      if (response.ok) {
        let responseData;
        if (contentType && contentType.includes('application/json')) {
          responseData = await response.json();
          alert('Kitap başarıyla kaydedildi!');
        } else {
          responseData = await response.text();
          alert(`Kitap başarıyla kaydedildi, ancak beklenmedik bir yanıt alındı: ${responseData}`);
        }
        setName('');
        setInvoiceNo('');
        SetX('');
        SetY('');
        SetZ('');
        setTemin('');
       

      } else {
        let errorData;
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
          alert(`Kitap kaydedilemedi: ${errorData.message}`);
        } else {
          errorData = await response.text();
          alert(`Kitap kaydedilemedi: ${errorData}`);
        }
      }
    } catch (error) {
      console.error('Kitap kaydedilirken hata oluştu:', error);
      alert(`Kitap kaydedilirken bir hata oluştu: ${error.message || "Bilinmeyen hata"}. Lütfen daha sonra tekrar deneyiniz.`);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Temin Edilen Firma Adı
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Kitap Adı"
          value={Temin}
          onChange={(e) => setTemin(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Kitap Adı
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Kitap Adı"
          value={BookName}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="InvoiceNo">
          Fatura No
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="InvoiceNo"
          type="text"
          placeholder="Fatura No"
          value={InvoiceNo}
          onChange={(e) => setInvoiceNo(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="InvoiceNo">
          Alış Fiyatı
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="X"
          type="text"
          placeholder="Fiyat"
          value={X}
          onChange={(e) => SetX(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="InvoiceNo">
          Satış Fiyatı
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Y"
          type="text"
          placeholder="Fiyat"
          value={Y}
          onChange={(e) => SetY(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="InvoiceNo">
          Z
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Z"
          type="text"
          placeholder=" No"
          value={Z}
          onChange={(e) => SetZ(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"

        >
          Kaydet
        </button>
        <div className="mt-2">
          <button className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style={{ transition: "all .15s ease" }}                    onClick={onClose} // Modalı kapat
>
            Kapat
          </button>
        </div>
      </div>
    </form>
  );
}

export default BookForm;
