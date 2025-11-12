
import { DevoteeFormData, DonationFormData, TempleSettings, LandingPageData } from '../types';
import { SERVICE_CARDS as DEFAULT_SERVICE_CARDS } from '../constants';

// --- DATABASE STRUCTURE ---
interface TempleDatabase {
    devotees: DevoteeFormData[];
    donors: DonationFormData[];
    settings: TempleSettings;
}

// --- HELPER FUNCTIONS ---
const readDB = (): TempleDatabase => {
    try {
        const dbString = window.localStorage.getItem('templeDatabase');
        if (dbString) {
            return JSON.parse(dbString);
        }
    } catch (error) {
        console.error("Failed to read from database:", error);
    }
    // Return a default structure if reading fails or DB is empty
    return {
        devotees: [],
        donors: [],
        settings: defaultSettings,
    };
};

const writeDB = (db: TempleDatabase): void => {
    try {
        window.localStorage.setItem('templeDatabase', JSON.stringify(db));
    } catch (error) {
        console.error("Failed to write to database:", error);
    }
};


// --- INITIAL/DEFAULT DATA ---
const initialDevotees: DevoteeFormData[] = [
    { id: 'dev1', name: 'Arjun Sharma', email: 'arjun.s@example.com', mobile: '9876543210', birthDate: '1990-05-15', registrationDate: new Date('2024-01-10T10:00:00Z').toISOString() },
    { id: 'dev2', name: 'Priya Patel', email: 'priya.p@example.com', mobile: '9123456780', birthDate: '1985-11-22', registrationDate: new Date('2024-02-20T12:30:00Z').toISOString() },
];

const initialDonations: DonationFormData[] = [
    { id: 'don1', amount: 5000, fullName: 'Rohan Mehta', email: 'rohan.m@example.com', mobile: '8901234567', address1: '123, Temple Road', address2: '', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', status: 'Successful', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), paymentId: 'pay_mock_12345' },
    { id: 'don2', amount: 1000, fullName: 'Sunita Singh', email: 'sunita.s@example.com', mobile: '7890123456', address1: '456, Bhakti Marg', address2: '', city: 'Delhi', state: 'Delhi', pincode: '110001', status: 'Pending', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'don3', amount: 2000, fullName: 'Vikram Choudhary', email: 'vikram.c@example.com', mobile: '6789012345', address1: '789, Seva Lane', address2: '', city: 'Bengaluru', state: 'Karnataka', pincode: '560001', status: 'Failed', date: new Date().toISOString(), paymentId: 'pay_mock_67890' },
    { id: 'don4', amount: 500, fullName: 'Arjun Sharma', email: 'arjun.s@example.com', mobile: '9876543210', address1: 'A-101, Devotion Heights', address2: '', city: 'Pune', state: 'Maharashtra', pincode: '411001', status: 'Successful', date: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(), paymentId: 'pay_mock_abcde' }
];

const defaultLandingPages: LandingPageData[] = [
    { id: 1, imageUrl: '/assets/images/hero-1.jpg', title: 'Shree Shree Tribhanglalita', subtitle: 'Krushnakali Yogmaya Mandir', description: 'Experience divine grace and spiritual tranquility at our sacred temple. Join us in our journey of devotion and service.', ctaText1: 'Offer Seva', ctaLink1: '/donate', ctaText2: 'Visit Us', ctaLink2: '/contact' },
    { id: 2, imageUrl: '/assets/images/hero-2.jpg', title: 'Participate in Annadaan', subtitle: 'The Sacred Act of Food Donation', description: 'Contribute to our daily food distribution, providing sanctified meals to all devotees. Your generosity brings immense blessings.', ctaText1: 'Donate for Annadaan', ctaLink1: '/donate', ctaText2: 'Learn More', ctaLink2: '/about' },
    { id: 3, imageUrl: '/assets/images/hero-3.jpg', title: 'Embrace Gau Seva', subtitle: 'Service to Mother Cow', description: 'Support the care and protection of our sacred cows at the temple Goshala, an act of great spiritual merit.', ctaText1: 'Support our Goshala', ctaLink1: '/donate', ctaText2: 'Our Philosophy', ctaLink2: '/about' },
    { id: 4, imageUrl: '/assets/images/hero-4.jpg', title: 'Deepen Your Knowledge', subtitle: 'Spiritual Education Initiatives', description: 'Help us organize classes, seminars, and distribute spiritual literature to spread timeless Vedic wisdom to all.', ctaText1: 'Sponsor Education', ctaLink1: '/donate', ctaText2: 'Upcoming Events', ctaLink2: '/contact' },
    { id: 5, imageUrl: '/assets/images/hero-5.jpg', title: 'Become a Devotee', subtitle: 'Join Our Temple Family', description: 'Register with us to receive updates on events, festivals, and special pujas, and become part of our growing community.', ctaText1: 'Register Now', ctaLink1: '/register', ctaText2: 'Contact Us', ctaLink2: '/contact' }
];

const defaultSettings: TempleSettings = {
    logoUrl: '/assets/images/temple-logo.png',
    landingPages: defaultLandingPages,
    contactInfo: {
        address: 'Shree Shree Tribhanglalita\nKrushnakali Yogmaya Mandir\nSacred Grove, Vrindavan, India',
        email: 'contact@yogmayamandir.org',
        phone: '+91 123 456 7890',
    },
    serviceCards: DEFAULT_SERVICE_CARDS,
};


// --- DATABASE INITIALIZATION ---
const initializeDatabase = () => {
    if (!localStorage.getItem('templeDatabase')) {
        console.log("Initializing database with default data...");
        writeDB({
            devotees: initialDevotees,
            donors: initialDonations,
            settings: defaultSettings,
        });
    }
};

initializeDatabase();


// --- DATABASE ACCESS FUNCTIONS ---

// Devotees
export const getDevoteesDB = (): DevoteeFormData[] => readDB().devotees;
export const addDevoteeDB = (newDevotee: DevoteeFormData): void => {
    const db = readDB();
    db.devotees.push(newDevotee);
    writeDB(db);
};

// Donors
export const getDonorsDB = (): DonationFormData[] => readDB().donors;
export const addDonorDB = (newDonor: DonationFormData): void => {
    const db = readDB();
    db.donors.push(newDonor);
    writeDB(db);
};

// Settings
export const getSettingsDB = (): TempleSettings => readDB().settings;
export const updateSettingsDB = (newSettings: TempleSettings): void => {
    const db = readDB();
    db.settings = newSettings;
    writeDB(db);
};