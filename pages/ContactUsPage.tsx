
import React, { useState, useEffect } from 'react';
import { getSettings } from '../utils/mockApi';
import { ContactInfoData } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const ContactUsPage: React.FC = () => {
    const [contactInfo, setContactInfo] = useState<ContactInfoData | null>(null);
    const { t } = useLanguage();

    useEffect(() => {
        setContactInfo(getSettings().contactInfo);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you shortly. (Frontend demo)');
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="bg-custom-pink-50">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
                <div className="divide-y-2 divide-custom-purple-200">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                        <h2 className="text-2xl font-extrabold text-custom-purple-900 sm:text-3xl">{t('getInTouch')}</h2>
                        <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-0 lg:col-span-2">
                           {contactInfo ? (
                                <>
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-custom-purple-900">{t('templeAddress')}</h3>
                                    <dl className="mt-2 text-base text-gray-600">
                                        <div className="mt-1">
                                            <dt className="sr-only">Address</dt>
                                            <dd className="whitespace-pre-line">{contactInfo.address}</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-custom-purple-900">{t('contact')}</h3>
                                    <dl className="mt-2 text-base text-gray-600">
                                        <div className="mt-1">
                                            <dt className="sr-only">Phone number</dt>
                                            <dd>{contactInfo.phone}</dd>
                                        </div>
                                        <div className="mt-1">
                                            <dt className="sr-only">Email</dt>
                                            <dd>{contactInfo.email}</dd>
                                        </div>
                                    </dl>
                                </div>
                                </>
                           ) : <p>Loading contact info...</p>}
                        </div>
                    </div>
                    <div className="mt-16 pt-16 lg:grid lg:grid-cols-3 lg:gap-8">
                        <h2 className="text-2xl font-extrabold text-custom-purple-900 sm:text-3xl">{t('sendMessage')}</h2>
                        <div className="mt-8 lg:mt-0 lg:col-span-2">
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                                    <div className="mt-1">
                                        <input type="text" name="first-name" id="first-name" autoComplete="given-name" required className="py-3 px-4 block w-full shadow-sm focus:ring-custom-purple-500 focus:border-custom-purple-500 border-gray-300 rounded-md" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                                    <div className="mt-1">
                                        <input type="text" name="last-name" id="last-name" autoComplete="family-name" required className="py-3 px-4 block w-full shadow-sm focus:ring-custom-purple-500 focus:border-custom-purple-500 border-gray-300 rounded-md" />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <div className="mt-1">
                                        <input id="email" name="email" type="email" autoComplete="email" required className="py-3 px-4 block w-full shadow-sm focus:ring-custom-purple-500 focus:border-custom-purple-500 border-gray-300 rounded-md" />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <div className="mt-1">
                                        <textarea id="message" name="message" rows={4} required className="py-3 px-4 block w-full shadow-sm focus:ring-custom-purple-500 focus:border-custom-purple-500 border border-gray-300 rounded-md"></textarea>
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-custom-purple-700 hover:bg-custom-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-purple-500">
                                        {t('sendMessage')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;