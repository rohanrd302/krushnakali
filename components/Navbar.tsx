
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { getSettings } from '../utils/mockApi';
import { useLanguage } from '../contexts/LanguageContext';


const TempleLogo: React.FC = () => {
    const [logoUrl, setLogoUrl] = useState('/assets/images/temple-logo.png');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const settings = await getSettings();
                if (settings && settings.logoUrl) {
                    setLogoUrl(settings.logoUrl);
                }
            } catch (error) {
                console.error("Failed to fetch settings:", error);
            }
        };
        fetchSettings();
    }, []);

    return (
        <Link to="/" className="flex items-center space-x-3">
            <img src={logoUrl} alt="Temple Logo" className="h-12 w-12 rounded-full border-2 border-custom-purple-200" />
            <div className="flex flex-col">
                <span className="font-tangerine text-2xl font-bold text-custom-purple-900 leading-tight">Shree Shree Tribhanglalita</span>
                <span className="font-tangerine text-xl font-bold text-custom-purple-800 -mt-1 leading-tight">Krushnakali Yogmaya Mandir</span>
            </div>
        </Link>
    );
};

const LanguageSelector: React.FC<{isMobile?: boolean}> = ({ isMobile = false }) => {
    const { language, setLanguage, availableLanguages } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);


    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    if (isMobile) {
        return (
            <div className="pt-2">
                 <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Language</p>
                <div className="flex justify-around mt-2">
                {Object.keys(availableLanguages).map(langCode => (
                    <button
                        key={langCode}
                        onClick={() => handleLanguageChange(langCode)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${language === langCode ? 'bg-custom-purple-700 text-white' : 'bg-custom-purple-100 text-custom-purple-800'}`}
                    >
                        {availableLanguages[langCode].name}
                    </button>
                ))}
                </div>
            </div>
        )
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-custom-purple-100 text-custom-purple-700 hover:bg-custom-purple-200 transition-colors"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span className="text-xl">🌍</span>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                    {Object.keys(availableLanguages).map(langCode => (
                        <button
                            key={langCode}
                            onClick={() => handleLanguageChange(langCode)}
                            className={`block w-full text-left px-4 py-2 text-sm ${language === langCode ? 'bg-custom-purple-100 text-custom-purple-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            {availableLanguages[langCode].displayName}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { t } = useLanguage();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const activeLinkStyle = { color: '#6d28d9', fontWeight: '600', textDecoration: 'underline', textUnderlineOffset: '4px' };
    const inactiveLinkStyle = { color: '#374151' };

    const renderLinks = (isMobile: boolean = false) =>
        NAV_LINKS.map((link) => {
            const mobileClass = isMobile ? 'block px-3 py-2 rounded-md text-base font-medium' : 'px-3 py-2 rounded-md text-sm font-medium';
            const hoverClass = isMobile ? 'hover:bg-custom-purple-100 hover:text-custom-purple-700' : 'hover:text-custom-purple-700';

            return (
                <NavLink
                    key={link.key}
                    to={link.href}
                    style={({ isActive }) => (isActive && link.href !=='/' || (isActive && location.pathname === '/')) ? activeLinkStyle : inactiveLinkStyle}
                    className={`${mobileClass} ${hoverClass} transition-colors`}
                >
                    {t(link.key)}
                </NavLink>
            );
        });

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <TempleLogo />
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">{renderLinks()}</div>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <LanguageSelector />
                        <Link to="/admin" className="bg-custom-purple-700 text-white hover:bg-custom-purple-800 px-4 py-2 rounded-full text-sm font-semibold transition-transform duration-300 ease-in-out hover:scale-105">
                            {t('adminLogin')}
                        </Link>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-custom-purple-100 inline-flex items-center justify-center p-2 rounded-md text-custom-purple-700 hover:text-white hover:bg-custom-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-custom-purple-100 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {renderLinks(true)}
                        <Link
                            to="/admin"
                            onClick={() => setIsOpen(false)}
                            className="bg-custom-purple-700 text-white hover:bg-custom-purple-800 block w-full text-left mt-2 px-3 py-2 rounded-md text-base font-medium"
                        >
                            {t('adminLogin')}
                        </Link>
                        <hr className="my-3 border-custom-purple-200" />
                         <LanguageSelector isMobile={true}/>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
