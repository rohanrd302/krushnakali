
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutUsPage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-custom-purple-700 tracking-wide uppercase">{t('ourStory')}</h2>
                    <p className="mt-1 text-4xl font-extrabold text-custom-purple-900 sm:text-5xl sm:tracking-tight lg:text-6xl">{t('aboutYogmayaMandir')}</p>
                    <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                        {t('aboutTagline')}
                    </p>
                </div>

                <div className="mt-12 prose prose-lg text-gray-600 mx-auto">
                    <p>
                        The Shree Shree Tribhanglalita Krushnakali Yogmaya Mandir stands as a beacon of devotion, a spiritual haven established with the blessings of the divine. Our journey began decades ago with a small group of ardent devotees and a profound vision: to create a space where seekers from all walks of life can experience the eternal bliss of Sanatana Dharma.
                    </p>
                    <figure className="my-8">
                        <img className="w-full rounded-lg shadow-lg" src="/assets/images/about-us.jpg" alt="Temple interior" />
                        <figcaption className="text-center mt-2 text-sm text-gray-500">The serene main prayer hall of the temple.</figcaption>
                    </figure>
                    <h3>Our Mission</h3>
                    <p>
                        Our mission is threefold: to provide a sacred space for worship and meditation, to disseminate the timeless knowledge of the Vedas, and to serve humanity with compassion and love. We strive to uphold the principles of Dharma through our daily rituals, community services like Annadaan (food distribution), and educational programs.
                    </p>
                    <h3>The Deities</h3>
                    <p>
                        At the heart of our temple reside the magnificent deities, whose divine presence sanctifies the atmosphere. The intricate carvings and vibrant adornments of the deities are a testament to the deep love and devotion of the artisans and devotees who contributed to their installation. Daily pujas and aartis are performed with meticulous adherence to Vedic traditions, creating a powerful spiritual vibration that uplifts the soul.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;