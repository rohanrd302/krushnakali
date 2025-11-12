import { DevoteeFormData, DonationFormData, TempleSettings } from '../types';
import { 
    getDevoteesDB, 
    addDevoteeDB, 
    getDonorsDB, 
    addDonorDB, 
    getSettingsDB, 
    updateSettingsDB 
} from './database';

// --- API Functions ---

// Devotees
export const getDevotees = (): DevoteeFormData[] => getDevoteesDB();

export const addDevotee = (devotee: Omit<DevoteeFormData, 'id' | 'registrationDate'>): void => {
    const newDevotee: DevoteeFormData = {
        ...devotee,
        id: `dev_${new Date().getTime()}`,
        registrationDate: new Date().toISOString(),
    };
    addDevoteeDB(newDevotee);
};

// Donors
export const getDonors = (): DonationFormData[] => getDonorsDB();

export const addDonor = (donor: Omit<DonationFormData, 'id' | 'date'>): void => {
    const newDonor: DonationFormData = {
        ...donor,
        id: `don_${new Date().getTime()}`,
        date: new Date().toISOString(),
    };
    addDonorDB(newDonor);
};


// Settings
export const getSettings = (): TempleSettings => getSettingsDB();
export const updateSettings = (newSettings: TempleSettings): void => {
    updateSettingsDB(newSettings);
};

// CSV Export Utility
export const downloadCSV = <T extends object>(data: T[], filename: string): void => {
    if (data.length === 0) {
        alert("No data to download.");
        return;
    }
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => JSON.stringify(row[header as keyof T], (key, value) => value === null ? '' : value)).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
