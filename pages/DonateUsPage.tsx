
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { DonationFormData } from '../types';
import { INDIAN_STATES } from '../constants';
import { addDonor, getSettings } from '../utils/mockApi';
import { useLanguage } from '../contexts/LanguageContext';

type FormDataState = Omit<DonationFormData, 'id' | 'status' | 'date' | 'paymentId'>;

// Add Razorpay to the window interface to avoid TypeScript errors
declare global {
    interface Window {
        Razorpay: any;
    }
}

const DonateUsPage: React.FC = () => {
    const { t } = useLanguage();
    const initialFormState: FormDataState = {
        amount: 500,
        fullName: '',
        email: '',
        mobile: '',
        address1: '',
        address2: '',
        city: '',
        state: INDIAN_STATES[0],
        pincode: '',
    };
    const [formData, setFormData] = useState<FormDataState>(initialFormState);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [isCustom, setIsCustom] = useState<boolean>(false);
    const [settings, setSettings] = useState(getSettings);

    useEffect(() => {
        setSettings(getSettings());
    }, []);

    const presetAmounts = [500, 1000, 2000, 5000];

    const handleAmountClick = (amount: number) => {
        setIsCustom(false);
        setCustomAmount('');
        setFormData({ ...formData, amount });
    };

    const handleCustomClick = () => {
        setIsCustom(true);
        setFormData({ ...formData, amount: '' });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'customAmount') {
            const numericValue = value === '' ? '' : Math.max(0, parseInt(value, 10));
            setCustomAmount(numericValue.toString());
            setFormData({ ...formData, amount: numericValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    
    const displayRazorpay = async (data: FormDataState) => {
        const options = {
            key: 'rzp_test_RZgSWi6iPvtm2s', // Your public Razorpay Key ID. The Key Secret is never used on the client-side.
            amount: Number(data.amount) * 100,
            currency: 'INR',
            name: settings.contactInfo.address.split('\n')[0] || 'Shree Shree Tribhanglalita Temple',
            description: 'Donation for Temple Seva',
            image: settings.logoUrl,
            handler: function (response: any) {
                const donationData: Omit<DonationFormData, 'id' | 'date'> = {
                    ...data,
                    status: 'Successful' as const,
                    paymentId: response.razorpay_payment_id,
                };
                addDonor(donationData);
                alert(`Payment successful! Thank you for your generous donation of ₹${data.amount}. Payment ID: ${response.razorpay_payment_id}`);
                setFormData(initialFormState);
                setCustomAmount('');
                setIsCustom(false);
            },
            prefill: {
                name: data.fullName,
                email: data.email,
                contact: data.mobile,
            },
            notes: {
                address: `${data.address1}, ${data.address2}, ${data.city}, ${data.state} - ${data.pincode}`,
            },
            theme: {
                color: '#4c1d95',
            },
        };

        const paymentObject = new window.Razorpay(options);
        
        paymentObject.on('payment.failed', function (response: any) {
            const donationData: Omit<DonationFormData, 'id' | 'date'> = {
                ...data,
                status: 'Failed' as const,
                paymentId: response.error.metadata.payment_id,
            };
            addDonor(donationData);
            alert(`Payment failed. Please try again. Error: ${response.error.description}`);
            paymentObject.close();
        });
        
        paymentObject.open();
    }
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!formData.amount || Number(formData.amount) <= 0) {
            alert("Please enter a valid donation amount.");
            return;
        }
        displayRazorpay(formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-custom-pink-100 to-custom-purple-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-custom-purple-900 sm:text-5xl">{t('makeDonation')}</h1>
                    <p className="mt-4 text-xl text-gray-600">{t('donationTagline')}</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-12 bg-white rounded-2xl shadow-2xl p-8 sm:p-12 space-y-8">
                    {/* Amount Selection */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-custom-purple-800">{t('chooseAmount')}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {presetAmounts.map((amount) => (
                                <button
                                    type="button"
                                    key={amount}
                                    onClick={() => handleAmountClick(amount)}
                                    className={`p-4 rounded-lg text-lg font-semibold border-2 transition-all ${!isCustom && formData.amount === amount ? 'bg-custom-purple-700 text-white border-custom-purple-700' : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-custom-purple-600'}`}
                                >
                                    ₹{amount}
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={handleCustomClick}
                                className={`p-4 rounded-lg text-lg font-semibold border-2 transition-all ${isCustom ? 'bg-custom-purple-700 text-white border-custom-purple-700' : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-custom-purple-600'}`}
                            >
                                {t('custom')}
                            </button>
                        </div>
                        {isCustom && (
                            <div className="relative mt-4">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-lg">₹</span>
                                <input
                                    type="number"
                                    name="customAmount"
                                    placeholder={t('enterAmount')}
                                    value={customAmount}
                                    onChange={handleChange}
                                    required
                                    className="bg-white text-gray-900 pl-8 pr-4 py-3 block w-full shadow-sm text-lg focus:ring-custom-purple-500 focus:border-custom-purple-500 border-gray-300 rounded-md"
                                />
                            </div>
                        )}
                    </div>
                    
                    {/* Personal Details */}
                    <div className="space-y-4 border-t border-gray-200 pt-8">
                        <h2 className="text-2xl font-bold text-custom-purple-800">{t('personalDetails')}</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" name="fullName" placeholder={t('fullName')} value={formData.fullName} onChange={handleChange} required className="bg-white text-gray-900 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-custom-purple-500 focus:border-custom-purple-500" />
                            <input type="email" name="email" placeholder={t('emailId')} value={formData.email} onChange={handleChange} required className="bg-white text-gray-900 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-custom-purple-500 focus:border-custom-purple-500" />
                            <input type="tel" name="mobile" placeholder={t('mobileNo')} value={formData.mobile} onChange={handleChange} required className="bg-white text-gray-900 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-custom-purple-500 focus:border-custom-purple-500" />
                         </div>
                    </div>

                    {/* Billing Details */}
                    <div className="space-y-4 border-t border-gray-200 pt-8">
                         <h2 className="text-2xl font-bold text-custom-purple-800">{t('billingDetails')}</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <input type="text" name="address1" placeholder={t('address1')} value={formData.address1} onChange={handleChange} required className="md:col-span-2 bg-white text-gray-900 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-custom-purple-500 focus:border-custom-purple-500" />
                             <input type="text" name="address2" placeholder={t('address2')} value={formData.address2} onChange={handleChange} className="md:col-span-2 bg-white text-gray-900 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-custom-purple-500 focus:border-custom-purple-500" />
                             <input type="text" name="city" placeholder={t('city')} value={formData.city} onChange={handleChange} required className="bg-white text-gray-900 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-custom-purple-500 focus:border-custom-purple-500" />
                             <select name="state" value={formData.state} onChange={handleChange} className="bg-white text-gray-900 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-custom-purple-500 focus:border-custom-purple-500">
                                 {INDIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                             </select>
                             <input type="text" value="India" readOnly className="text-gray-900 p-3 w-full border border-gray-300 rounded-md shadow-sm bg-gray-100" />
                             <input type="text" name="pincode" placeholder={t('pincode')} value={formData.pincode} onChange={handleChange} required className="bg-white text-gray-900 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-custom-purple-500 focus:border-custom-purple-500" />
                         </div>
                    </div>

                    <button type="submit" className="w-full bg-custom-purple-700 text-white font-bold py-4 px-4 rounded-lg text-xl hover:bg-custom-purple-800 transition-colors duration-300 shadow-lg">
                        {t('proceedToDonate')} ₹{formData.amount || 0}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DonateUsPage;
