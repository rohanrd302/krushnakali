
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { DevoteeFormData } from '../types';
import { addDevotee } from '../utils/mockApi';
import { useLanguage } from '../contexts/LanguageContext';

const DevoteeRegistrationPage: React.FC = () => {
    const { t } = useLanguage();
    const initialFormState: Omit<DevoteeFormData, 'id' | 'registrationDate'> = {
        name: '',
        email: '',
        mobile: '',
        birthDate: '',
    };
    const [formData, setFormData] = useState<Omit<DevoteeFormData, 'id' | 'registrationDate'>>(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addDevotee(formData);
            alert(`Thank you for registering, ${formData.name}! You will now receive updates from the temple.`);
            setFormData(initialFormState);
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-custom-pink-50 to-custom-purple-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-custom-purple-900">
                        {t('registerAsDevotee')}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {t('joinCommunity')}
                    </p>
                </div>
                <div className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="text-sm font-bold text-gray-600 tracking-wide">{t('fullName')}</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-white text-gray-900 w-full text-base p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-custom-purple-500 focus:border-custom-purple-500"
                                placeholder={t('fullNamePlaceholder')}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-bold text-gray-600 tracking-wide">{t('email')}</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-white text-gray-900 w-full text-base p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-custom-purple-500 focus:border-custom-purple-500"
                                placeholder="mail@gmail.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="text-sm font-bold text-gray-600 tracking-wide">{t('mobileNumber')}</label>
                            <input
                                id="mobile"
                                name="mobile"
                                type="tel"
                                required
                                value={formData.mobile}
                                onChange={handleChange}
                                className="bg-white text-gray-900 w-full text-base p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-custom-purple-500 focus:border-custom-purple-500"
                                placeholder={t('mobileNumberPlaceholder')}
                            />
                        </div>
                        <div>
                             <label htmlFor="birthDate" className="text-sm font-bold text-gray-600 tracking-wide">{t('birthDate')}</label>
                             <input
                                id="birthDate"
                                name="birthDate"
                                type="date"
                                required
                                value={formData.birthDate}
                                onChange={handleChange}
                                className="bg-white text-gray-900 w-full text-base p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-custom-purple-500 focus:border-custom-purple-500"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center bg-custom-purple-700 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300 hover:bg-custom-purple-800 disabled:bg-custom-purple-300"
                            >
                                {isSubmitting ? 'Registering...' : t('register')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DevoteeRegistrationPage;
