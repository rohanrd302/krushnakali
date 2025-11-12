
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // --- Hardcoded credentials for simulation ---
        if (email === 'admin@example.com' && password === 'password') {
            // In a real app, you'd get a token from the server.
            // Here, we just set a flag in sessionStorage.
            sessionStorage.setItem('isAdminAuthenticated', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-custom-purple-900">
            <div className="absolute top-4 left-4">
                 <Link to="/" className="text-custom-pink-100 hover:text-white transition-colors">&larr; Back to Temple Site</Link>
            </div>
            <div className="max-w-md w-full mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-custom-purple-900">Admin Panel</h1>
                    <p className="text-gray-500">Please sign in to continue</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md">{error}</p>}
                    <div>
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Email Address</label>
                        <input 
                            className="bg-white text-gray-900 w-full text-base p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-custom-purple-500 focus:border-custom-purple-500" 
                            type="email" 
                            placeholder="admin@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Password</label>
                        <input 
                            className="bg-white text-gray-900 w-full text-base p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-custom-purple-500 focus:border-custom-purple-500" 
                            type="password" 
                            placeholder="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-purple-500 focus:ring-purple-400 border-gray-300 rounded" />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center bg-custom-purple-700 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300 hover:bg-custom-purple-800">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;