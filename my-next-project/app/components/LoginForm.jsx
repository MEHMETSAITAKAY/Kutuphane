import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-gray-200 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
        <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Giriş Yap
            </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm">
                <div>
                    <input id="username" name="username" type="text" autoComplete="username" required className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Kullanıcı adı" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>

            <div>
                <button type="submit" className="shadow-lg transform transition duration-300 ease-in-out hover:-translate-y-1 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Giriş Yap
                </button>
            </div>
        </form>
    </div>
</div>


  );
}

export default LoginForm;
