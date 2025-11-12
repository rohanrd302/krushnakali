
import React, { useState, useEffect, FormEvent } from 'react';
import { getSettings, updateSettings } from '../../utils/mockApi';
import { TempleSettings, LandingPageData } from '../../types';

const AdminSettingsPage: React.FC = () => {
    const [settings, setSettings] = useState<TempleSettings | null>(null);
    const [activeTab, setActiveTab] = useState('contact');

    useEffect(() => {
        setSettings(getSettings());
    }, []);

    const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!settings) return;
        setSettings({
            ...settings,
            contactInfo: {
                ...settings.contactInfo,
                [e.target.name]: e.target.value
            }
        });
    };
    
    const handleServiceCardChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!settings) return;
        const newServiceCards = [...settings.serviceCards];
        newServiceCards[index] = { ...newServiceCards[index], [e.target.name]: e.target.value };
        setSettings({ ...settings, serviceCards: newServiceCards });
    };

    const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!settings || !e.target.files || e.target.files.length === 0) return;
        
        try {
            const file = e.target.files[0];
            const base64 = await toBase64(file);
            setSettings({ ...settings, logoUrl: base64 });
        } catch (error) {
            console.error("Error converting file to base64", error);
            alert("Error uploading image. Please try again.");
        }
    };

    const handleLandingPageImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (!settings || !e.target.files || e.target.files.length === 0) return;

        try {
            const file = e.target.files[0];
            const base64 = await toBase64(file);
            const newLandingPages = [...settings.landingPages];
            newLandingPages[index].imageUrl = base64;
            setSettings({ ...settings, landingPages: newLandingPages });
        } catch (error) {
            console.error("Error converting file to base64", error);
            alert("Error uploading image. Please try again.");
        }
    };

    const handleLandingPageChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!settings) return;
        const newLandingPages = JSON.parse(JSON.stringify(settings.landingPages));
        const { name, value } = e.target;
        newLandingPages[index][name] = value;
        setSettings({ ...settings, landingPages: newLandingPages });
    };

    const handleAddSlide = () => {
        if (!settings) return;
        const newSlide: LandingPageData = {
            id: Date.now(),
            imageUrl: `/assets/images/hero-placeholder.jpg`,
            title: 'New Slide Title',
            subtitle: 'New Slide Subtitle',
            description: 'A short description for the new slide.',
            ctaText1: 'Learn More',
            ctaLink1: '/about',
            ctaText2: 'Donate',
            ctaLink2: '/donate'
        };
        setSettings({
            ...settings,
            landingPages: [...settings.landingPages, newSlide]
        });
    };

    const handleRemoveSlide = (id: number) => {
        if (!settings) return;
        if (settings.landingPages.length <= 1) {
            alert("You must have at least one slide.");
            return;
        }
        const newLandingPages = settings.landingPages.filter(page => page.id !== id);
        setSettings({ ...settings, landingPages: newLandingPages });
    };

    const handleSubmit = (e: FormEvent, section: string) => {
        e.preventDefault();
        if (settings) {
            updateSettings(settings);
            alert(`${section} settings updated successfully!`);
        }
    };

    if (!settings) return <div>Loading settings...</div>;

    const renderContent = () => {
        switch (activeTab) {
            case 'contact':
                return (
                     <form onSubmit={(e) => handleSubmit(e, 'Contact')}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea name="address" value={settings.contactInfo.address} onChange={handleContactChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" name="email" value={settings.contactInfo.email} onChange={handleContactChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input type="tel" name="phone" value={settings.contactInfo.phone} onChange={handleContactChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                            </div>
                        </div>
                         <button type="submit" className="mt-4 bg-custom-purple-700 text-white px-4 py-2 rounded-md hover:bg-custom-purple-800">Save Contact Info</button>
                    </form>
                );
            case 'cards':
                return (
                     <form onSubmit={(e) => handleSubmit(e, 'Service Card')}>
                        <div className="space-y-6">
                            {settings.serviceCards.map((card, index) => (
                                <div key={index} className="p-4 border rounded-md">
                                    <h3 className="font-bold mb-2">Card {index + 1}: {card.title}</h3>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input type="text" name="title" value={card.title} onChange={(e) => handleServiceCardChange(index, e as any)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                                    <label className="block text-sm font-medium text-gray-700 mt-2">Description</label>
                                    <textarea name="description" value={card.description} onChange={(e) => handleServiceCardChange(index, e as any)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                                    <label className="block text-sm font-medium text-gray-700 mt-2">Icon (Emoji)</label>
                                    <input type="text" name="icon" value={card.icon} onChange={(e) => handleServiceCardChange(index, e as any)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                                </div>
                            ))}
                        </div>
                        <button type="submit" className="mt-4 bg-custom-purple-700 text-white px-4 py-2 rounded-md hover:bg-custom-purple-800">Save Card Info</button>
                    </form>
                );
            case 'images':
                 return (
                     <form onSubmit={(e) => handleSubmit(e, 'Logo')}>
                        <div className="space-y-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Logo</label>
                                <div className="mt-1 flex items-center space-x-4">
                                    <img src={settings.logoUrl} alt="Current logo" className="h-16 w-16 rounded-full object-cover border" />
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleLogoChange} 
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-custom-purple-50 file:text-custom-purple-700 hover:file:bg-custom-purple-100"
                                    />
                                </div>
                            </div>
                        </div>
                         <button type="submit" className="mt-4 bg-custom-purple-700 text-white px-4 py-2 rounded-md hover:bg-custom-purple-800">Save Logo</button>
                    </form>
                );
            case 'landing':
                return (
                    <form onSubmit={(e) => handleSubmit(e, 'Landing Page')}>
                        <div className="space-y-6">
                            {settings.landingPages.map((page, index) => (
                                <div key={page.id} className="p-4 border rounded-lg bg-gray-50 relative">
                                    <h3 className="text-lg font-semibold text-custom-purple-800 mb-4">Landing Page {index + 1}</h3>
                                    
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSlide(page.id)}
                                        className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-1 leading-none hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        aria-label="Remove slide"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Image</label>
                                            <div className="mt-1 flex items-center space-x-4">
                                                <img src={page.imageUrl} alt={`Landing page ${index+1} image`} className="h-20 w-36 object-cover rounded-md border" />
                                                <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    onChange={(e) => handleLandingPageImageChange(index, e)}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-custom-purple-50 file:text-custom-purple-700 hover:file:bg-custom-purple-100"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Title</label>
                                            <input type="text" name="title" value={page.title} onChange={(e) => handleLandingPageChange(index, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                                        </div>
                                         <div>
                                            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                                            <input type="text" name="subtitle" value={page.subtitle} onChange={(e) => handleLandingPageChange(index, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Description</label>
                                            <textarea name="description" value={page.description} onChange={(e) => handleLandingPageChange(index, e)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Button 1 Text</label>
                                            <input type="text" name="ctaText1" value={page.ctaText1} onChange={(e) => handleLandingPageChange(index, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Button 1 Link</label>
                                            <input type="text" name="ctaLink1" value={page.ctaLink1} onChange={(e) => handleLandingPageChange(index, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                                        </div>
                                         <div>
                                            <label className="block text-sm font-medium text-gray-700">Button 2 Text</label>
                                            <input type="text" name="ctaText2" value={page.ctaText2} onChange={(e) => handleLandingPageChange(index, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Button 2 Link</label>
                                            <input type="text" name="ctaLink2" value={page.ctaLink2} onChange={(e) => handleLandingPageChange(index, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                            <button type="submit" className="bg-custom-purple-700 text-white px-4 py-2 rounded-md hover:bg-custom-purple-800">Save Landing Pages</button>
                            <button
                                type="button"
                                onClick={handleAddSlide}
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-semibold"
                            >
                                + Add Slide
                            </button>
                        </div>
                    </form>
                );
            default:
                return null;
        }
    };

    const TabButton: React.FC<{tabName: string, label: string}> = ({tabName, label}) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors duration-200 ${activeTab === tabName ? 'bg-white border-b-0 border border-gray-200 text-custom-purple-700' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
        >
            {label}
        </button>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Site Settings</h1>
             <div className="flex border-b border-gray-200 mb-[-1px]">
                <TabButton tabName="contact" label="Contact Info" />
                <TabButton tabName="cards" label="Service Cards" />
                <TabButton tabName="images" label="Logo" />
                <TabButton tabName="landing" label="Landing Pages" />
            </div>
            <div className="bg-white p-6 rounded-b-lg rounded-r-lg shadow-md border border-gray-200">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminSettingsPage;