
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSettings } from '../utils/mockApi';
import { ContactInfoData } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
    const [contactInfo, setContactInfo] = useState<ContactInfoData | null>(null);
    const { t } = useLanguage();

    useEffect(() => {
        const settings = getSettings();
        setContactInfo(settings.contactInfo);
    }, []);

    return (
        <footer className="bg-custom-purple-900 text-custom-pink-100">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white tracking-wider uppercase">{t('contactInfo')}</h3>
                        {contactInfo ? (
                            <>
                                <p className="leading-relaxed whitespace-pre-line">
                                    {contactInfo.address}
                                </p>
                                <p>Email: {contactInfo.email}</p>
                                <p>Phone: {contactInfo.phone}</p>
                            </>
                        ) : <p>Loading contact info...</p>}
                    </div>

                    {/* Temple Location */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white tracking-wider uppercase">{t('templeLocation')}</h3>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-custom-purple-700">
                           <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.814360343393!2d77.69768297593645!3d27.562305076326464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973736a6e543669%3A0x2961358359f5bbf!2sPrem%20Mandir%2C%20Vrindavan!5e0!3m2!1sen!2sin!4v16285129 Prem Mandir, Vrindavan"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Temple Location on Google Maps"
                            ></iframe>
                        </div>
                    </div>

                    {/* Donate Us */}
                    <div className="space-y-4 flex flex-col items-start">
                         <h3 className="text-lg font-semibold text-white tracking-wider uppercase">{t('supportOurCause')}</h3>
                         <p>{t('donationHelp')}</p>
                         <Link 
                            to="/donate" 
                            className="bg-custom-pink-200 text-custom-purple-900 hover:bg-white px-8 py-3 rounded-full text-lg font-bold transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg">
                            {t('donateNow')}
                         </Link>
                    </div>
                </div>

                <div className="mt-12 border-t border-custom-purple-700 pt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;