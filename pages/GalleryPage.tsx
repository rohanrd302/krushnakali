
import React, { useState, useEffect } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const GalleryPage: React.FC = () => {
    const { t } = useLanguage();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const openModal = (src: string) => {
        setSelectedImage(src);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    // Close modal on escape key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="bg-custom-pink-50 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-custom-purple-900 sm:text-5xl">{t('gallery')}</h1>
                    <p className="mt-4 text-xl text-gray-600">Glimpses of Divinity</p>
                </div>

                <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {GALLERY_IMAGES.map((image, index) => (
                        <div
                            key={index}
                            className="group aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                            onClick={() => openModal(image.src)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white text-2xl">🖼️</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image preview"
                >
                    <button
                        className="absolute top-4 right-4 text-white text-4xl hover:text-custom-pink-200"
                        onClick={closeModal}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                    <div className="relative max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
                        <img
                            src={selectedImage}
                            alt="Enlarged gallery view"
                            className="rounded-lg shadow-2xl object-contain max-w-full max-h-[90vh]"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
