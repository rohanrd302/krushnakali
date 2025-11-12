
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const ADMIN_NAV_LINKS = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/devotees', label: 'Devotee Records', icon: '👥' },
    { href: '/admin/donors', label: 'Donor Records', icon: '💖' },
    { href: '/admin/settings', label: 'Site Settings', icon: '⚙️' },
];

const AdminLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
        if (isAuthenticated !== 'true') {
            navigate('/admin', { replace: true });
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem('isAdminAuthenticated');
        navigate('/admin');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out bg-custom-purple-900 text-white w-64 space-y-6 py-7 px-2 z-30 flex flex-col`}>
                <Link to="/admin/dashboard" className="text-white flex items-center space-x-2 px-4">
                    <img src="https://picsum.photos/40/40" alt="Temple Logo" className="h-10 w-10 rounded-full" />
                    <span className="text-xl font-extrabold">Admin Panel</span>
                </Link>

                <nav className="flex-grow">
                    {ADMIN_NAV_LINKS.map(link => (
                         <Link
                            key={link.label}
                            to={link.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`w-full flex items-center space-x-3 px-4 py-2 my-1 rounded-lg transition-colors ${location.pathname.startsWith(link.href) ? 'bg-custom-purple-800' : 'hover:bg-custom-purple-800'}`}
                        >
                           <span className="text-xl">{link.icon}</span>
                           <span>{link.label}</span>
                        </Link>
                    ))}
                </nav>

                 <div className="px-2">
                    <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors hover:bg-custom-purple-800 text-left">
                         <span className="text-xl">🚪</span>
                         <span>Logout</span>
                     </button>
                 </div>

            </aside>
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between md:justify-end items-center p-4 bg-white border-b">
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500 focus:outline-none">
                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    <div className="text-right">
                         <p className="font-semibold">Admin User</p>
                         <p className="text-sm text-gray-500">admin@example.com</p>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
             {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
        </div>
    );
};

export default AdminLayout;