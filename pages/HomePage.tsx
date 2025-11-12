
import React, { useState, ChangeEvent, FormEvent, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { DevoteeFormData, ServiceCardData, LandingPageData } from '../types';
import { getSettings, addDevotee } from '../utils/mockApi';
import { useLanguage } from '../contexts/LanguageContext';

const HeroSection: React.FC<{ landingPages: LandingPageData[] }> = ({ landingPages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = useCallback(() => {
        setCurrentIndex(currentIndex === landingPages.length - 1 ? 0 : currentIndex + 1);
    }, [currentIndex, landingPages.length]);

    useEffect(() => {
        const timer = setInterval(() => {
            goToNext();
        }, 7000); // Auto-scroll every 7 seconds
        return () => clearInterval(timer);
    }, [goToNext]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <section id="home" className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden">
            {/* Slides container */}
            <div className="relative h-full w-full">
                {landingPages.map((page, index) => (
                    <div
                        key={page.id}
                        className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out"
                        style={{
                            backgroundImage: `url('${page.imageUrl}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: index === currentIndex ? 1 : 0,
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-custom-purple-900/60 to-transparent"></div>
                    </div>
                ))}
            </div>

            {/* Content overlay */}
            <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 z-10">
                <h1 className="font-tangerine text-6xl md:text-8xl font-bold drop-shadow-lg">
                    {landingPages[currentIndex].title}
                </h1>
                <h2 className="font-tangerine text-5xl md:text-7xl font-bold drop-shadow-lg mb-4">
                    {landingPages[currentIndex].subtitle}
                </h2>
                <p className="max-w-2xl text-lg md:text-xl font-light text-custom-pink-100 drop-shadow-md mb-8">
                    {landingPages[currentIndex].description}
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link to={landingPages[currentIndex].ctaLink1} className="bg-custom-pink-200 text-custom-purple-900 hover:bg-white px-8 py-3 rounded-full text-lg font-bold transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg">
                        {landingPages[currentIndex].ctaText1}
                    </Link>
                    <Link to={landingPages[currentIndex].ctaLink2} className="border-2 border-white text-white hover:bg-white hover:text-custom-purple-900 px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 ease-in-out shadow-lg">
                        {landingPages[currentIndex].ctaText2}
                    </Link>
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {landingPages.map((_, slideIndex) => (
                    <button
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                        aria-label={`Go to slide ${slideIndex + 1}`}
                    ></button>
                ))}
            </div>
        </section>
    );
};


const ServiceCard: React.FC<{ title: string; description: string; icon: string; }> = ({ title, description, icon }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 p-8 flex flex-col items-center text-center border-b-4 border-custom-purple-700">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-custom-purple-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const ServicesSection: React.FC<{serviceCards: ServiceCardData[]}> = ({ serviceCards }) => {
    const { t } = useLanguage();
    return (
        <section id="services" className="py-20 bg-custom-pink-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-custom-purple-900">{t('ourSacredServices')}</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        {t('servicesDescription')}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {serviceCards.map(card => <ServiceCard key={card.title} {...card} />)}
                </div>
            </div>
        </section>
    );
};

const AboutSection: React.FC = () => {
    const { t } = useLanguage();
    return(
        <section id="about" className="bg-white py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-base font-semibold text-custom-purple-700 tracking-wide uppercase">{t('ourStory')}</h2>
                <p className="mt-1 text-4xl font-extrabold text-custom-purple-900 sm:text-5xl sm:tracking-tight lg:text-6xl">{t('aboutYogmayaMandir')}</p>
                <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                    {t('aboutTagline')}
                </p>
                <Link to="/about" className="mt-8 inline-block bg-custom-purple-100 text-custom-purple-800 hover:bg-custom-purple-200 px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 ease-in-out shadow-md">
                    {t('readMore')}
                </Link>
            </div>
        </section>
    );
};

const RegistrationSection: React.FC = () => {
    const { t } = useLanguage();
    const initialFormState = { name: '', email: '', mobile: '', birthDate: '' };
    const [formData, setFormData] = useState(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addDevotee(formData);
            alert(`Thank you for registering, ${formData.name}! Your details have been saved.`);
            setFormData(initialFormState);
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-custom-pink-50 to-custom-purple-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-custom-purple-900">{t('becomeDevotee')}</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    {t('joinFamily')}
                </p>
                <div className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                    <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="text-sm font-bold text-gray-600 tracking-wide">{t('fullName')}</label>
                            <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="bg-white text-gray-900 w-full text-base p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-custom-purple-500 focus:border-custom-purple-500" placeholder={t('fullNamePlaceholder')} />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-bold text-gray-600 tracking-wide">{t('email')}</label>
                            <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="bg-white text-gray-900 w-full text-base p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-custom-purple-500 focus:border-custom-purple-500" placeholder="mail@gmail.com" />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="text-sm font-bold text-gray-600 tracking-wide">{t('mobileNumber')}</label>
                            <input id="mobile" name="mobile" type="tel" required value={formData.mobile} onChange={handleChange} className="bg-white text-gray-900 w-full text-base p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-custom-purple-500 focus:border-custom-purple-500" placeholder={t('mobileNumberPlaceholder')} />
                        </div>
                        <div>
                            <label htmlFor="birthDate" className="text-sm font-bold text-gray-600 tracking-wide">{t('birthDate')}</label>
                            <input id="birthDate" name="birthDate" type="date" required value={formData.birthDate} onChange={handleChange} className="bg-white text-gray-900 w-full text-base p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-custom-purple-500 focus:border-custom-purple-500" />
                        </div>
                        <div>
                            <button type="submit" disabled={isSubmitting} className="w-full flex justify-center bg-custom-purple-700 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300 hover:bg-custom-purple-800 disabled:bg-custom-purple-300">
                                {isSubmitting ? 'Registering...' : t('registerNow')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

const DonationCtaSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="donate-cta" className="bg-white py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-custom-purple-900">{t('supportMission')}</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    {t('supportMissionDescription')}
                </p>
                <div className="mt-8">
                    <Link
                        to="/donate"
                        className="inline-block bg-custom-pink-200 text-custom-purple-900 hover:bg-white px-10 py-4 rounded-full text-xl font-bold transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg border-2 border-transparent hover:border-custom-pink-200"
                    >
                        {t('donateGenerously')}
                    </Link>
                </div>
            </div>
        </section>
    );
};

const ContactSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="contact" className="py-16 bg-custom-pink-100 text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-custom-purple-900">{t('getInTouch')}</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    {t('getInTouchDescription')}
                </p>
                <Link to="/contact" className="mt-8 inline-block bg-custom-purple-700 text-white hover:bg-custom-purple-800 px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 ease-in-out shadow-md">
                    {t('contactUs')}
                </Link>
            </div>
        </section>
    );
};

const HomePage: React.FC = () => {
    const [settings, setSettings] = useState<{landingPages: LandingPageData[], serviceCards: ServiceCardData[]} | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const fullSettings = await getSettings();
                if (fullSettings) {
                    setSettings({
                        landingPages: fullSettings.landingPages,
                        serviceCards: fullSettings.serviceCards
                    });
                }
            } catch (error) {
                console.error("Failed to fetch settings for homepage:", error);
            }
        };
        fetchSettings();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    if (!settings || !settings.landingPages || settings.landingPages.length === 0) {
        return <div className="min-h-screen flex items-center justify-center">Loading Temple...</div>;
    }

    return (
        <div>
            <HeroSection landingPages={settings.landingPages} />
            <ServicesSection serviceCards={settings.serviceCards} />
            <AboutSection />
            <RegistrationSection />
            <DonationCtaSection />
            <ContactSection />
        </div>
    );
};

export default HomePage;
